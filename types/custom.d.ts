import {NavItem} from '@vuepress/types'

declare interface Options {
    subNavShow: string[]
    ignoreFolders: string[]
    ignoreFiles: string[]
    dirPrefix:string,
    filePrefix:string,
    useREADME:boolean,
    deep:number
}

declare const AutoNavPlugin: (options?: Options) => NavItem[];
  