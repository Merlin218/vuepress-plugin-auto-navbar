
import {NavItem} from '@vuepress/types'
import FileHelper from './utils/fileHelper'
import {getOptions} from './defaultConfig';
/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {number} depth 目录深度
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
const getNav =  (path: string,depth:number,prefix='/'):NavItem[]=> {
  const options = getOptions();
  // if(depth >= options.deep) return [];
  const arr:NavItem[] = []
  FileHelper.getCurDirs(path).sort().forEach((dir:string) => {
    const text = dir.substring(dir.lastIndexOf('/') + 1);
    const link = prefix+ text+ '/';
    const subNav = getNav(dir,depth+1,link);
      arr.push({
        text: `${options.dirPrefix}${text}`,
        link: options.useREADME ? link : (subNav[0]?.link ?? link),
        items: (depth === 0 || options.subNavShow.includes(text)) ? subNav :[]
      });
  })
  // 获取当前目录的文件
  let files = [];
  if((files = FileHelper.getMdFiles(path,prefix)).length > 0){
    files.sort()
    .filter((item=>!options.ignoreFiles.includes(item.substring(item.lastIndexOf('/') + 1,item.lastIndexOf('.')))))
    .forEach((item)=>{
      arr.push({
        text: `${options.filePrefix}${item.substring(item.lastIndexOf('/') + 1,item.lastIndexOf('.'))}`,
        link:item
      })
    })
  }
  return arr;
}

export { getNav }
