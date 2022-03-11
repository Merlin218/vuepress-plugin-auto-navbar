interface Options {
    subNav?: {
        show?: string[];
    };
    ignore?: {
        folders?: string[];
        files?: string[];
    };
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

export { AutoNavPlugin as default };
