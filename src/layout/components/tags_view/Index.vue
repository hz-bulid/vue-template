<!--
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-24 10:35:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-03 11:51:52
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ name: tag.name, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item borderRadius"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
      >
        {{ tag.meta.title }}
        <span
          v-if="visitedViews.length > 1"
          class="iconfont icon-guanbi"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ScrollPane>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { useStore } from '@/store'
import { TagsActionTypes } from '@/store/modules/tagsview/action-types'
import { TagView } from '@/store/modules/tagsview/state'
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeMount, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { AppRouteRecordRaw } from '@/router/types'
// import { useI18n } from "vue-i18n";
import ScrollPane from './ScrollPane.vue'
export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const instance = getCurrentInstance()
    const currentRoute = useRoute()
    const scrollPaneRef = ref(null)

    const toLastView = (visitedViews: TagView[], view: TagView) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView !== undefined && latestView.fullPath !== undefined) {
        router.push(latestView.fullPath).catch(err => {
          console.warn(err)
        })
      } else {
        // Default redirect to the home page if there is no tags-view, adjust it if you want
        if (view.name === 'Dashboard') {
          // to reload home page
          router.push({ path: '/redirect' + view.fullPath }).catch(err => {
            console.warn(err)
          })
        } else {
          router.push('/').catch(err => {
            console.warn(err)
          })
        }
      }
    }

    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} as TagView,
      affixTags: [] as TagView[],
      isActive: (route: TagView) => {
        return route.path === currentRoute.path
      },
      isAffix: (tag: TagView) => {
        return tag.meta && tag.meta.affix
      },
      refreshSelectedTag: (view: TagView) => {
        store.dispatch(TagsActionTypes.ACTION_DEL_CACHED_VIEW, view)
        const { fullPath } = view
        nextTick(() => {
          router.replace({ path: '/redirect' + fullPath }).catch(err => {
            console.warn(err)
          })
        })
      },
      closeSelectedTag: (view: TagView) => {
        store.dispatch(TagsActionTypes.ACTION_DEL_VIEW, view)
        if (state.isActive(view)) {
          toLastView(store.state.tagViews.visitedViews, view)
        }
      },
      closeOthersTags: () => {
        if (state.selectedTag.fullPath !== currentRoute.path && state.selectedTag.fullPath !== undefined) {
          router.push(state.selectedTag.fullPath).catch(err => {
            console.log(err)
          })
        }
        store.dispatch(TagsActionTypes.ACTION_DEL_OTHER_VIEW, state.selectedTag as TagView)
      },
      closeAllTags: (view: TagView) => {
        store.dispatch(TagsActionTypes.ACTION_DEL_ALL_VIEWS, undefined)
        if (state.affixTags.some(tag => tag.path === currentRoute.path)) {
          return
        }
        toLastView(store.state.tagViews.visitedViews, view)
      },
      closeMenu: () => {
        state.visible = false
      },
      handleScroll: () => {
        state.closeMenu()
      }
    })

    const visitedViews = computed(() => {
      return store.state.tagViews.visitedViews
    })
    const routes = computed(() => store.state.permission.routes)

    const filterAffixTags = (routes: AppRouteRecordRaw[], basePath = '/') => {
      let tags: TagView[] = []

      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }

        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path)
          if (childTags.length >= 1) {
            tags = tags.concat(childTags)
          }
        }
      })
      return tags
    }

    const initTags = () => {
      state.affixTags = filterAffixTags(routes.value)
      for (const tag of state.affixTags) {
        // Must have tag name
        if (tag.name) {
          store.dispatch(TagsActionTypes.ACTION_ADD_VISITED_VIEW, tag as TagView)
        }
      }
    }

    const addTags = () => {
      if (currentRoute.name) {
        console.log(currentRoute.name, 'currentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.name')
        store.dispatch(TagsActionTypes.ACTION_ADD_VIEW, currentRoute)
      }
      return false
    }

    const moveToCurrentTag = () => {
      const tags = instance?.refs.tag as any[]
      nextTick(() => {
        if (tags === null || tags === undefined || !Array.isArray(tags)) { return }
        for (const tag of tags) {
          if ((tag.to as TagView).path === currentRoute.path) {
            (scrollPaneRef.value as any).moveToCurrentTag(tag)
            // When query is different then update
            if ((tag.to as TagView).fullPath !== currentRoute.fullPath) {
              store.dispatch(TagsActionTypes.ACTION_UPDATE_VISITED_VIEW, currentRoute)
            }
          }
        }
      })
    }

    watch(() => currentRoute.name, () => {
      const prohibit:string[] = ['Login', '404']
      if (!prohibit.includes(currentRoute.name as string)) {
        addTags()
        moveToCurrentTag()
      }
    })

    // life cricle
    onBeforeMount(() => {
      initTags()
      addTags()
    })

    console.log('🚀 ~ file: Index.vue ~ line 248 ~ setup ~ routes', currentRoute.meta, this)
    return {
      visitedViews,
      routes,
      currentRoute,
      scrollPaneRef,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  // background: #fff;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 40px;
      line-height: 37px;
      border: 1px solid #eee;
      box-sizing: border-box;
      color: #666666;
      border-radius: 5px 5px 0 0;
      background: #fafafa;
      padding: 0 15px;
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      overflow: hidden;
      .iconfont {
        display: inline-block;
        font-weight: bold;
        margin-left: 5px;
        font-size: 14px;
        color: #c6c6c6;
        transition: all 0.3s;
        &:hover {
          transform: rotate(45deg);
        }
      }

      &.active {
        background-color: #fff;
        color: #388ff3;
        border-right: 0;
        font-size: 12px;
        &::before {
          content: "";
          background: #388ff3;
          display: inline-block;
          width: 100%;
          height: 3px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
