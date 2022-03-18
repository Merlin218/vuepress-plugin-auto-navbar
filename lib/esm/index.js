import path, { resolve } from 'path';
import { readdirSync, statSync, writeFileSync } from 'fs';

var commonTop = function (config) { return "---\ntitle: " + config.title + "\n---\n## \u8BE5\u7AE0\u8282\u5305\u542B\u4EE5\u4E0B\u5185\u5BB9"; };
var READMETemplate = function (config, title) {
    if (config['files'].length === 0 && config['folders'].length === 0)
        return '';
    return commonTop({ title: title }) + "\n  \n  " + config['files'].map(function (item) { return "\n- [".concat(item.replace('.md', ''), "](").concat(item, ")\n\n  "); }).join('') + config['folders'].map(function (item) {
        var itemsTemplate = item.items.map(function (child) { return "\n- [".concat(child.replace('.md', ''), "](").concat(item.link + '/' + child, ")\n\n  "); }).join('');
        return "\n#### [".concat(item.title, "\u4E13\u9898](").concat(item.link, ")\n    ") + itemsTemplate;
    }).join('');
};
var Template = {
    READMETemplate: READMETemplate
};

var defaultOptions = {
    subNavShow: [],
    ignoreFolders: [],
    ignoreFiles: [],
    dirPrefix: '📂  ',
    filePrefix: '✏️  ',
    deep: 2,
};
function setOptions(options) {
    defaultOptions = options;
}
function getOptions() {
    return defaultOptions || {};
}

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
var FileHelper = {
    getCurFiles: getCurFiles,
    getAllDirs: getAllDirs,
    getCurDirs: getCurDirs,
    createREADME: createREADME,
    hasSubDirs: hasSubDirs,
    getMdFiles: getMdFiles
};

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

var AutoNavPlugin = function (options) {
    if (!options)
        options = defaultOptions;
    var assignOptions = Object.assign({}, defaultOptions, options);
    setOptions(assignOptions);
    var path = resolve(process.cwd(), 'docs');
    return getNav(path, 0);
};

export { AutoNavPlugin as default };
