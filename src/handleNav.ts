
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
const getNav =  (path: string,depth:number,prefix='/'):NavItem[]=> {
  const options = getOptions();
  if(depth >= options.deep) return [];
  const arr:NavItem[] = []
  FileHelper.getCurDirs(path, options.ignoreFolders).forEach((dir:string) => {
    const text = dir.substring(dir.lastIndexOf('/') + 1);
    const link = prefix+ text+ '/';
    if(depth > 0) FileHelper.createREADME(dir);
    if( FileHelper.hasSubDirs(dir, options.ignoreFolders) ){
      arr.push({
        text:`${options.dirPrefix}${text}`,
        link,
        items: (depth === 0 || options.subNavShow.includes(text)) ? getNav(dir,depth+1,link) :[]
      });
    }else{
      arr.push({
        text:`${options.dirPrefix}${text}`,
        link
      })
    }
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
