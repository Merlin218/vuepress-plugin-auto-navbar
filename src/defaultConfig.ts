import { Options } from "./types"

let defaultOptions:Options = {
  subNavShow: [],
  ignoreFolders: [],
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
