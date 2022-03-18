import path from 'path';
import { readdirSync, statSync, writeFileSync } from 'fs';
import Template from './stringTemplate';
import { getOptions } from '../defaultConfig';
var getCurFiles = function (dir, SuffixIncludes, unFileIncludes) {
    if (SuffixIncludes === void 0) { SuffixIncludes = []; }
    if (unFileIncludes === void 0) { unFileIncludes = []; }
    var filenameList = readdirSync(dir).sort().filter(function (filename) {
        var fileInfo = statSync(path.join(dir, filename));
        var suffix = filename.slice(filename.lastIndexOf(".") + 1);
        return fileInfo.isFile() && SuffixIncludes.includes(suffix) && isNotReadme(filename) && !unFileIncludes.includes(filename);
    });
    return filenameList;
};
var isNotReadme = function (filename) { return filename.toLocaleLowerCase() !== "readme.md"; };
var getAllDirs = function (dir, unDirIncludes) {
    if (dir === void 0) { dir = "."; }
    var items = readdirSync(dir);
    var allDirs = [];
    items.forEach(function (item) {
        var dirName = path.join(dir, item);
        if (statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
            allDirs.push(dirName);
            allDirs = allDirs.concat(getAllDirs(dirName, unDirIncludes));
        }
    });
    return allDirs;
};
var getCurDirs = function (dir, unDirIncludes) {
    if (dir === void 0) { dir = "."; }
    var items = readdirSync(dir);
    var allCurDirs = [];
    items.forEach(function (item) {
        var dirName = path.join(dir, item);
        if (statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
            allCurDirs.push(dirName);
        }
    });
    return allCurDirs;
};
var createREADME = function (dir, unDirIncludes, unFileIncludes) {
    if (unDirIncludes === void 0) { unDirIncludes = []; }
    if (unFileIncludes === void 0) { unFileIncludes = []; }
    var configs = {
        files: getCurFiles(dir, ['md'], unFileIncludes),
        folders: getCurDirs(dir, unDirIncludes).map(function (item) {
            return {
                title: item.substring(item.lastIndexOf('/') + 1),
                link: item.replace(dir, '.'),
                items: getCurFiles(item, ['md'], unFileIncludes) || []
            };
        })
    };
    var content = Template.READMETemplate(configs, dir.substring(dir.lastIndexOf('/') + 1));
    var file = path.join(dir, './README.md');
    writeFileSync(file, content);
};
var hasSubDirs = function (path, unDirIncludes) {
    if (unDirIncludes === void 0) { unDirIncludes = []; }
    return getCurDirs(path, unDirIncludes).length > 0;
};
var getMdFiles = function (path, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var options = getOptions();
    var files = getCurFiles(path, ['md'], options.ignoreFiles);
    createREADME(path);
    return files.map(function (item) { return prefix + item; });
};
export default {
    getCurFiles: getCurFiles,
    getAllDirs: getAllDirs,
    getCurDirs: getCurDirs,
    createREADME: createREADME,
    hasSubDirs: hasSubDirs,
    getMdFiles: getMdFiles
};
