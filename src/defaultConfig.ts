import { Options } from "../types/custom"

let defaultOptions:Options = {
  subNavShow: [],
  ignoreFolders: [],
  ignoreFiles:[],
  dirPrefix : '📂  ',
  filePrefix :'✏️  ',
  useREADME:false,
  deep:2,
}

function setOptions(options:Options){
  defaultOptions = options 
}

function getOptions(){
  return defaultOptions || {};
}

export {
  defaultOptions, setOptions,getOptions
}
