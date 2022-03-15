
import {NavItem} from '@vuepress/types'
import FileHelper from './utils/fileHelper'
import {getOptions} from './defaultConfig';
/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {string} unDirIncludes 排除文件
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
const getNav =  (path: string, unDirIncludes: string[] = [], showSubNavCtx: string[] = [],depth:number,prefix='/'):NavItem[]=> {
  const options = getOptions();
  if(depth >= options.deep) return [];
  const arr:NavItem[] = []
  FileHelper.getAllCurDirs(path, unDirIncludes).forEach((dir:string) => {
    const text = dir.substring(dir.lastIndexOf('/') + 1);
    const link = prefix+ text+ '/';
    FileHelper.createREADME(dir);
    if(FileHelper.hasSubDirs(dir, unDirIncludes)){
      arr.push({
        text,
        link,
        items: getNav(dir, unDirIncludes, showSubNavCtx,depth+1,link)
      });
    }else{
      arr.push({
        text,
        link
      })
    }
  })
  return arr;
}


// /**
//  * @description: 获取二级目录配置
//  * @param {string} path 目录路径
//  * @param {string} unDirIncludes 排除文件
//  * @param {string} prefix 父级前缀
//  * @return {*} 返回二级nav配置
//  */
// const getSubNav = (path: string, unDirIncludes: string[] = [], prefix = '/', showSubNavCtx: string[] = []):NavItem[]  => {
//   const arr:NavItem[] = [];
//   // 获取全部子目录路径
//   const allCurDirs = FileHelper.getAllCurDirs(path, unDirIncludes);
//   FileHelper.getMdFiles(path, prefix)
//   return allCurDirs.map((dir: string) => {
//     // 处理配置
//     const text = dir.substring(dir.lastIndexOf('/') + 1)
//     const link = prefix + text + '/'
//     // 创建README.md
//     FileHelper.createREADME(dir);
//     // 如果存在符合条件的子目录
//     if (FileHelper.hasSubDirs(dir, unDirIncludes)) {
//       // 获取子目录的nav配置
//       const subFolder = FileHelper.getAllCurDirs(dir, unDirIncludes).map((subFolderDir: string) => {
//         const subFolderText = subFolderDir.substring(subFolderDir.lastIndexOf('/') + 1)
//         const subFolderLink = link + subFolderText + '/'
//         // 给子目录也创建README.md
//         FileHelper.createREADME(subFolderDir);
//         return {
//           text: subFolderText,
//           link: subFolderLink
//         }
//       })
//       return {
//         text,
//         link,
//         items: showSubNavCtx.includes(text) ? subFolder : []
//       }
//     }
//     // 不存在子目录
//     return {
//       text,
//       link,
//       items: showSubNavCtx.includes(text) ? FileHelper.getMdFiles(dir, link) : []
//     }
//   });
// }

export { getNav }
