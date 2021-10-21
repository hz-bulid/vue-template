/*
 * @Author: your name
 * @Date: 2021-03-26 15:17:14
 * @LastEditTime: 2021-03-26 17:40:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finance\src\router\constant.ts
 */
export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

/**
 * @description: parent-layout
 */
export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME
      })
    })
}

// export const getParentLayout = (name: string) => {
//   return () =>
//     new Promise((resolve) => {
//       resolve({
//         ...ParentLayout,
//         name,
//       });
//     });
// };
