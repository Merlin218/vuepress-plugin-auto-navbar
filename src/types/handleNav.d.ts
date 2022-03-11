/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {string} unDirIncludes 排除文件
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
declare const getNav: (path: string, unDirIncludes?: string[], showSubNavCtx?: string[]) => ({
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
export { getNav };
