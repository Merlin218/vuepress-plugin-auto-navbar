import { getNav } from './handleNav'
import { resolve } from 'path';
import { Options } from './types';

import {setOptions,defaultOptions} from './defaultConfig'

const AutoNavPlugin = (options: Partial<Options>) => {
  if(!options) options = defaultOptions
  const assignOptions = Object.assign({}, defaultOptions, options)
  setOptions(assignOptions)
  const path = resolve(process.cwd(), 'docs');
  const nav = getNav(path,0);
  console.log(nav);
  return nav;
}

export default AutoNavPlugin;
