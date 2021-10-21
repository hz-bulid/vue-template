/*
 * @Author: wsx
 * @Date: 2021-04-02 23:20:10
 * @LastEditTime: 2021-04-03 13:19:15
 * @LastEditors: Please set LastEditors
 * @Description: 创建上下文（使用依赖注入实现，可用于组件间的传值）
 * @FilePath: \hz-finances\src\hooks\core\useContext.ts
 */
/* eslint-disable symbol-description */
import {
  InjectionKey,
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  // defineComponent,
  UnwrapRef,
} from 'vue'

export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideData)

  // const Provider = createProvider
  //   ? defineComponent({
  //       name: 'Provider',
  //       inheritAttrs: false,
  //       setup(_, { slots }) {
  //         provide(key, provideData);
  //         return () => slots.default?.();
  //       },
  //     })
  //   : null;

  return {
    // Provider,
    state,
  }
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T;

export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
