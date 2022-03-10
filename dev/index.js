'use strict';

var path = require('path');
var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const commonTop = (config) => `---
sidebar: false
title: ` + config.title + `
---
## 该章节包含以下内容`;
/**
 * @description:
 * @param {string} files 文件列表
 * @param {string} title 生成页面标题
 * @return {*}
 */
const READMETemplate = (config, title) => {
    //  如果为空数组
    if (config['files'].length === 0 && config['folders'].length === 0)
        return '';
    return commonTop({ title }) + `
  
  ` + config['files'].map(item => `
#### [${item.replace('.md', '')}](${item})

  `).join('') + commonTop({ title }) + config['folders'].map((item) => {
        // 获取该每个子目录的md文件
        let childrenTemplate = item.children.map((child) => `
- [${child.replace('.md', '')}](${item.link + '/' + child})

  `).join('');
        return `
#### [${item.title}](${item.link})
    ` + childrenTemplate;
    }).join('');
};
var Template = {
    READMETemplate
};

/**
 *
 * @param {String} dir 目录路径
 * @param {Array} SuffixIncludes 需要处理的文件后缀
 * @returns
 */
const getAllFiles = (dir, SuffixIncludes = []) => {
    // readdirSync 仅返回当前这层的数据
    const filenameList = fs.readdirSync(dir).filter((filename) => {
        // statSync() 用来获取文件信息 stat => status
        const fileInfo = fs.statSync(path__default["default"].join(dir, filename));
        //获取后缀
        const suffix = filename.slice(filename.lastIndexOf(".") + 1);
        return fileInfo.isFile() && SuffixIncludes.includes(suffix) && isNotReadme(filename);
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
const isNotReadme = (filename) => filename.toLocaleLowerCase() !== "readme.md";
/**
 *
 * @param {String} dir 当前的目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @returns {Array} allDirs 所有的目录
 */
const getAllDirs = (dir = ".", unDirIncludes = []) => {
    // 获取目录数据
    const items = fs.readdirSync(dir);
    let allDirs = [];
    // 递归遍历目录中所有文件夹
    items.forEach((item) => {
        const dirName = path__default["default"].join(dir, item);
        if (fs.statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
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
const getAllCurDirs = (dir = ".", unDirIncludes = []) => {
    // 获取目录数据
    const items = fs.readdirSync(dir);
    const allCurDirs = [];
    // 递归遍历目录中所有文件夹
    items.forEach((item) => {
        const dirName = path__default["default"].join(dir, item);
        if (fs.statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
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
const createREADME = (dir, unDirIncludes = []) => {
    // 获取md文件列表
    const configs = {
        files: getAllFiles(dir, ['md']),
        folders: getAllCurDirs(dir, unDirIncludes).map(item => {
            return {
                title: item.substring(item.lastIndexOf('/') + 1),
                link: item.replace(dir, '.'),
                children: getAllFiles(item, ['md']) || []
            };
        })
    };
    // 生成文件内容
    const content = Template.READMETemplate(configs, dir.substring(dir.lastIndexOf('/') + 1));
    // 文件路径
    const file = path__default["default"].join(dir, './README.md');
    // 写入文件
    fs.writeFileSync(file, content);
};
var FileHelper = {
    getAllFiles, getAllDirs, getAllCurDirs, createREADME
};

/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {string} unDirIncludes 排除文件
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
const getNav = (path, unDirIncludes = [], showSubNavCtx = []) => {
    const allCurDirs = FileHelper.getAllCurDirs(path, unDirIncludes);
    return allCurDirs.map((dir) => {
        const text = dir.substring(dir.lastIndexOf('/') + 1);
        const link = dir.substring(dir.lastIndexOf('/')) + '/';
        return hasSubDirs(dir, unDirIncludes) ? {
            text,
            link,
            children: getSubNav(dir, unDirIncludes, link, showSubNavCtx)
        } : {
            text,
            children: getMdFiles(dir, link)
        };
    });
};
/**
 * @description: 获取二级目录配置
 * @param {string} path 目录路径
 * @param {string} unDirIncludes 排除文件
 * @param {string} prefix 父级前缀
 * @return {*} 返回二级nav配置
 */
const getSubNav = (path, unDirIncludes = [], prefix = '/', showSubNavCtx = []) => {
    // 获取全部子目录路径
    const allCurDirs = FileHelper.getAllCurDirs(path, unDirIncludes);
    return [...getMdFiles(path, prefix), ...allCurDirs.map((dir) => {
            // 处理配置
            const text = dir.substring(dir.lastIndexOf('/') + 1);
            const link = prefix + text + '/';
            // 创建README.md
            FileHelper.createREADME(dir);
            // 如果存在符合条件的子目录
            if (hasSubDirs(dir, unDirIncludes)) {
                // 获取子目录的nav配置
                const subFolder = FileHelper.getAllCurDirs(dir, unDirIncludes).map((subFolderDir) => {
                    const subFolderText = subFolderDir.substring(subFolderDir.lastIndexOf('/') + 1);
                    const subFolderLink = link + subFolderText + '/';
                    // 给子目录也创建README.md
                    FileHelper.createREADME(subFolderDir);
                    return {
                        text: subFolderText,
                        link: subFolderLink
                    };
                });
                return {
                    text,
                    link,
                    children: showSubNavCtx.includes(text) ? subFolder : []
                };
            }
            // 不存在子目录
            return {
                text,
                link,
                children: showSubNavCtx.includes(text) ? getMdFiles(dir, link) : []
            };
        })];
};
/**
 * @description: 判断是否存在子目录
 * @param {string} path 目录路径
 * @param {string} unDirIncludes 排除文件
 * @return {*} 返回布尔值
 */
const hasSubDirs = (path, unDirIncludes = []) => {
    return FileHelper.getAllCurDirs(path, unDirIncludes).length !== 0;
};
/**
 * @description: 获取子目录文件
 * @param {string} path 目录路径
 * @param {string} prefix 文件前缀
 * @return {array} 返回带前缀的文件名列表
 */
const getMdFiles = (path, prefix = '') => {
    const files = FileHelper.getAllFiles(path, ['md']);
    //自动在该目录下生成README文件
    FileHelper.createREADME(path);
    return files.map((item) => prefix + item);
};

function AutoNavPlugin(options = {
    subNav: {
        show: []
    },
    ignore: {
        folders: [],
        files: []
    }
}) {
    const path$1 = path.resolve(process.cwd(), 'docs');
    return getNav(path$1, options.ignore.folders, options.subNav.show);
}
module.exports = AutoNavPlugin;
//# sourceMappingURL=index.js.map
