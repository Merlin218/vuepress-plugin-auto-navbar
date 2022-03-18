import FileHelper from './utils/fileHelper';
import { getOptions } from './defaultConfig';
var getNav = function (path, depth, prefix) {
    if (prefix === void 0) { prefix = '/'; }
    var options = getOptions();
    if (depth >= options.deep)
        return [];
    var arr = [];
    FileHelper.getCurDirs(path, options.ignoreFolders).forEach(function (dir) {
        var text = dir.substring(dir.lastIndexOf('/') + 1);
        var link = prefix + text + '/';
        FileHelper.createREADME(dir);
        if (FileHelper.hasSubDirs(dir, options.ignoreFolders)) {
            arr.push({
                text: "".concat(options.dirPrefix).concat(text),
                link: link,
                items: (depth === 0 || options.subNavShow.includes(text)) ? getNav(dir, depth + 1, link) : []
            });
        }
        else {
            arr.push({
                text: "".concat(options.dirPrefix).concat(text),
                link: link
            });
        }
    });
    var files = [];
    if ((files = FileHelper.getMdFiles(path, prefix)).length > 0) {
        files.sort()
            .filter((function (item) { return !options.ignoreFiles.includes(item.substring(item.lastIndexOf('/') + 1, item.lastIndexOf('.'))); }))
            .forEach(function (item) {
            arr.push({
                text: "".concat(options.filePrefix).concat(item.substring(item.lastIndexOf('/') + 1, item.lastIndexOf('.'))),
                link: item
            });
        });
    }
    return arr;
};
export { getNav };
