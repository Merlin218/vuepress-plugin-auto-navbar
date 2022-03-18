import { getNav } from './handleNav'
import { resolve } from 'path';
import { Options } from '../types/custom';

import {setOptions,defaultOptions} from './defaultConfig'

const AutoNavPlugin = (options: Partial<Options>) => {
  if(!options) options = defaultOptions
  const assignOptions = Object.assign({}, defaultOptions, options)
  setOptions(assignOptions)
  const path = resolve(process.cwd(), 'docs');
  return getNav(path,0);
}

export default AutoNavPlugin;
