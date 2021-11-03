<!--
 * @Author: your name
 * @Date: 2021-11-02 14:37:39
 * @LastEditTime: 2021-11-03 11:25:47
 * @LastEditors: Please set LastEditors
 * @Description: tab
 * @FilePath: \vue-template\src\layout\components\MyTab.vue
-->
<template>
  <div class='MyTab' >
    <vuescroll 
      class='my-tabs-content'
      ref="vs" 
      :ops="ops"
      @mousewheel.native='mousewheel'
      @mouseenter.native="enter()" 
      @mouseleave.native="leave()"
      > 
      <template v-for="(item,index) in tabs" >
          <div 
            class="my-tab"
            :id="'tab-' + index"
            :class='{actived: currentTab.menuId === item.menuId}' 
            :key="item.menuId"
            @click.stop="clickTab(item,index)"
          >
            <span>{{item.menuName}}</span>
            <i class='iconfont icon-guanbi' @click.stop="closeTab(item,index)"></i>
          </div>
        </template>
      <!-- <ul class="my-tabs" >
        <template v-for="(item,index) in tabs" >
          <li 
            class="my-tab"
            :id="'tab-' + index"
            :class='{actived: currentTab.menuId === item.menuId}' 
            :key="item.menuId"
            @click.stop="clickTab(item,index)"
          >
            <span>{{item.menuName}}</span>
            <i class='iconfont icon-guanbi' @click.stop="closeTab(item,index)"></i>
          </li>
        </template>
      </ul> -->
    </vuescroll>
  </div>
</template>
<script>
  import vuescroll from 'vuescroll';
export default {
  name: 'MyTab',
  components: {vuescroll},
  data () {
    return {
      isSlide: false,
      scrollWidth: 0,
      scrollLeft: 0,
      downX: 0,
      tabs:[
      ],
      currentTab:{
          menuId:'2',
          menuName:'my-tab',
      },
      ops:{
        mode: 'slide',
        scrollingX: true,
        scrollingY: false,
        locking: true,
        bar:{
          keepShow: false,
          size: '5px',
          background: 'var(--scrollbar-thumb-bg)',

        }
      }
    }
  },
  created () {
  },
  computed: {},
  mounted () {
    for(let i = 0; i <20;i++){
      this.tabs.push({
        menuId: i,
        menuName:'my-my-tab'+i,
      });
    }
    this.initTab()
  },
  methods: {
    initTab(){
      this.currentTab = this.tabs[0] || {};
      setTimeout(()=>{
        this.currentTab = this.tabs[this.tabs.length-1] || {};
        this.$refs["vs"].scrollIntoView("#tab-"+(this.tabs.length-1), 500);
      },3000)
    },
    closeTab(item,index){
      this.$delete(this.tabs,index)
    },
    clickTab(item){
      let currentviewDom = this.$refs["vs"].getCurrentviewDom();
      console.log('%c [ currentviewDom ]', 'font-size:13px; background:pink; color:#bf2c9f;', currentviewDom)
      this.currentTab = item;
    },
    mousewheel(e){
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const {  scrollLeft } = this.$refs["vs"].getPosition();
      let left = scrollLeft - eventDelta / 4
      this.$refs["vs"].scrollTo(
        {
          x: left
        },
        500
      );
    },
    enter(){
      this.ops.bar.keepShow = true;
    },
    leave(){
      this.ops.bar.keepShow = false;
    },
  },
}
</script>

<style lang="scss" scoped>
  $height: 42px;
.MyTab {
    width: 100%;
    height: $height;
    color: #000;
    // border: 1px solid var(--border-color-lighter);
    // border-bottom: 0;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    .my-tabs,
    ::v-deep.my-tabs-content .__view{
      height: $height;
      width: 100%;
      display:flex;
      flex-direction:row;
      white-space: nowrap;
      flex-shrink: 0;
      
      .my-tab{
        height: 100%;
        min-width: 80px;
        border-right: 1px solid var(--border-color-lighter);
        background-color: var(--tag-bg);
        display:flex;
        justify-content:center;
        align-items:center;
        padding: 0 10px;
        cursor: pointer;
        border: 1px solid var(--border-color-lighter);
        border-left: none;
        border-radius: 4px 4px 0 0 ;
        font-size: 16px;
        &.actived{
          color: var(--inverse-color);
          background: #fff;
          border-bottom: none;
          box-shadow: 0 0.28vh 0 0 var(--sideline-bg) inset;
          span{
            color: var(--primary);
          }
        }
        &:first-child{
          border-left: 1px solid var(--border-color-lighter);
        }
        .iconfont{
          margin-left: 5px;
          font-weight: 900;
          color: var(--tag-close-color);
        }
      }
    }
   
}
</style>
