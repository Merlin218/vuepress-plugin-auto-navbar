# vuepress-plugin-auto-navbar

vuepress导航栏自动生成

[效果预览](https://www.merlin218.top)

## Feature

- 支持功能
    - [x] 自动生成navbar配置
    - [x] 自动生成目录README文件
    - [x] TypeScript支持
    - [x] 目录/文件前缀设置，默认为「 📂 」/「 ✏️ 」
    - [x] 目录/文件的过滤
    - [x] 读取深度设置

- 下一步优化:
   - [ ] 支持README模板自定义
   - [ ] 插件配置待丰富
   - [ ] 过滤支持正则

## Usage

1. 安装插件

```bash
pnpm i vuepress-plugin-auto-navbar
```

2. 在`vuepress`配置中使用插件，示例如下

```ts
import AutoNavPlugin from 'vuepress-plugin-auto-navbar'

module.exports = {
  themeConfig: {
    navbar: AutoNavPlugin({
      subNavShow: ['其他', '工具使用', 'Vue', '设计模式', '前端工程化', '计算机网络', '算法基础', '刷题技巧'], // 要显示子目录的目录
      ignoreFolders: ["node_modules", "assets", "public", ".vuepress", "code", ".obsidian", "utils"], // 需要排除的一些目录
      ignoreFiles: ['个人简历'], // 需要排除的一些文件
      dirPrefix: '目录：',
      filePrefix: '文件：',
      depth:2 // 读取目录的深度
    })
};
```

## README Template

![示例](https://cdn.jsdelivr.net/gh/Merlin218/image-storage@master/picX/image.1mrpn3vwas8w.jpg)
