import { getNav } from './handleNav'
import { resolve } from 'path';

interface Options {
  subNav?: {
    show?: string[]
  },
  ignore?: {
    folders?: string[]
    // files?: string[]
  }
}

const AutoNavPlugin = (options: Options = {
  subNav: {
    show: []
  },
  ignore: {
    folders: [],
    // files: []
  }
}) => {
  options = Object.assign({
    subNav: {
      show: []
    },
    ignore: {
      folders: [],
      // files: []
    }
  }, options)
  const path = resolve(process.cwd(), 'docs');
  return getNav(path, options.ignore?.folders, options.subNav?.show)
}

export { AutoNavPlugin as default };
