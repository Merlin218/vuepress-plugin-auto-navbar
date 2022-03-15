import { Options } from "./types";
declare let defaultOptions: Options;
declare function setOptions(options: Options): void;
declare function getOptions(): Options;
export { defaultOptions, setOptions, getOptions };
