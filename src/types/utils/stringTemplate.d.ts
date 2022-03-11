declare type FolderConfig = {
    title: string;
    link?: string;
    children: (string | FolderConfig)[];
}[];
declare type FileConfig = string[];
declare const _default: {
    READMETemplate: (config: {
        files: FileConfig;
        folders: FolderConfig;
    }, title: string) => any;
};
export default _default;
