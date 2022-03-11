declare const _default: {
    getAllFiles: (dir: string, SuffixIncludes?: string[]) => string[];
    getAllDirs: (dir?: string, unDirIncludes?: string[]) => string[];
    getAllCurDirs: (dir?: string, unDirIncludes?: string[]) => string[];
    createREADME: (dir: string, unDirIncludes?: string[]) => void;
    hasSubDirs: (path: string, unDirIncludes?: string[]) => boolean;
    getMdFiles: (path: string, prefix?: string) => string[];
};
export default _default;
