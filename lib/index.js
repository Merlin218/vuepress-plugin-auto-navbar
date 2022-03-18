import { getNav } from './handleNav';
import { resolve } from 'path';
import { setOptions, defaultOptions } from './defaultConfig';
var AutoNavPlugin = function (options) {
    if (!options)
        options = defaultOptions;
    var assignOptions = Object.assign({}, defaultOptions, options);
    setOptions(assignOptions);
    var path = resolve(process.cwd(), 'docs');
    var nav = getNav(path, 0);
    console.log(nav);
    return nav;
};
export default AutoNavPlugin;
