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
export { defaultOptions, setOptions, getOptions };
