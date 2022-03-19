declare const _default: {
    getCurFiles: (dir: string, SuffixIncludes?: string[], unFileIncludes?: string[]) => string[];
    getAllDirs: (dir: string | undefined, unDirIncludes: string[]) => string[];
    getCurDirs: (dir?: string) => string[];
    createREADME: (dir: string) => void;
    hasSubDirs: (path: string) => boolean;
    getMdFiles: (path: string, prefix?: string) => string[];
};
export default _default;
