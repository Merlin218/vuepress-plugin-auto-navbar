import { getNav } from '@/handleNav'
import { resolve } from 'path'
interface Options {
  subNav: {
    show: string[]
  },
  ignore: {
    folders: string[]
    files: string[]
  }
}

function AutoNavPlugin(options: Options = {
  subNav: {
    show: []
  },
  ignore: {
    folders: [],
    files: []
  }
}) {
  const path = resolve(process.cwd(), 'docs');
  return getNav(path, options.ignore.folders,options.subNav.show)
}

module.exports = AutoNavPlugin