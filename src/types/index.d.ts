declare interface Options {
    subNavShow?: string[]
    ignoreFolders?: string[]
}

declare const AutoNavPlugin: (options?: Options) => ({
    text: string;
    link: string;
    children: (string | {
        text: string;
        link: string;
        children: {
            text: string;
            link: string;
        }[];
    } | {
        text: string;
        link: string;
        children: string[];
    })[];
} | {
    text: string;
    children: string[];
    link?: undefined;
})[];

export default AutoNavPlugin;
