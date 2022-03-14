/*
 * @Author: your name
 * @Date: 2022-03-10 20:18:37
 * @LastEditTime: 2022-03-14 17:14:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vuepress-auto-navbar-plugin/src/index.ts
 */
import { getNav } from './handleNav'
import { resolve } from 'path';

interface Options {
  subNavShow?: string[]
  ignoreFolders?: string[]
}

const AutoNavPlugin = (options: Options = {
  subNavShow: [],
  ignoreFolders: []
}) => {
  options = Object.assign({
    subNavShow: [],
    ignoreFolders: []
  }, options)
  const path = resolve(process.cwd(), 'docs');
  return getNav(path, options.ignoreFolders, options.subNavShow);
}

export { AutoNavPlugin as default };
