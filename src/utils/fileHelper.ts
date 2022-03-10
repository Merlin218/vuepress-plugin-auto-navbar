import path from 'path';
import { readdirSync, statSync, writeFileSync } from 'fs'
import Template from '@/utils/stringTemplate'

/**
 *
 * @param {String} dir 目录路径
 * @param {Array} SuffixIncludes 需要处理的文件后缀
 * @returns
 */
const getAllFiles = (dir: string, SuffixIncludes: string[] = []) => {
  // readdirSync 仅返回当前这层的数据
  const filenameList = readdirSync(dir).filter((filename: string) => {
    // statSync() 用来获取文件信息 stat => status
    const fileInfo = statSync(path.join(dir, filename));
    //获取后缀
    const suffix = filename.slice(filename.lastIndexOf(".") + 1);
    return fileInfo.isFile() && SuffixIncludes.includes(suffix) && isNotReadme(filename)
  });
  //  排序
  filenameList.sort();
  return filenameList;
};

/**
 * @description: 判断是否是README文件
 * @param {string} filename
 * @return {*}
 */
const isNotReadme = (filename: string) => filename.toLocaleLowerCase() !== "readme.md"

/**
 *
 * @param {String} dir 当前的目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @returns {Array} allDirs 所有的目录
 */
const getAllDirs = (dir = ".", unDirIncludes: string[] = []) => {
  // 获取目录数据
  const items = readdirSync(dir);
  let allDirs: string[] = [];
  // 递归遍历目录中所有文件夹
  items.forEach((item: string) => {
    const dirName = path.join(dir, item);
    if (statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
      allDirs.push(dirName);
      allDirs = allDirs.concat(getAllDirs(dirName, unDirIncludes));
    }
  });
  return allDirs;
};

/**
 *
 * @param {String} dir 当前的目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @returns {Array} allCurDirs 当前这层所有的目录
 */
const getAllCurDirs = (dir = ".", unDirIncludes: string[] = []): string[] => {
  // 获取目录数据
  const items = readdirSync(dir);
  const allCurDirs: string[] = [];
  // 递归遍历目录中所有文件夹
  items.forEach((item: string) => {
    const dirName = path.join(dir, item);
    if (statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
      allCurDirs.push(dirName);
    }
  });
  return allCurDirs;
};

/**
 * @description: 生成目录README.md
 * @param {string} dir 文件目录
 * @return {*}
 */
const createREADME = (dir: string, unDirIncludes: string[] = []) => {
  // 获取md文件列表
  const configs = {
    files: getAllFiles(dir, ['md']), 
    folders: getAllCurDirs(dir, unDirIncludes).map(item => {
      return {
        title: item.substring(item.lastIndexOf('/') + 1),
        link: item.replace(dir, '.'),
        children: getAllFiles(item, ['md']) || []
      }
    })
  }
    // 生成文件内容
    const content = Template.READMETemplate(configs, dir.substring(dir.lastIndexOf('/') + 1));
    // 文件路径
    const file = path.join(dir, './README.md')
  // 写入文件
  writeFileSync(file, content)
  }

  export default {
    getAllFiles, getAllDirs, getAllCurDirs, createREADME
  }
