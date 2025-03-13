import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Allan's Notebook",
  description: "一个关于编程的记事本",
  base: "/notebook/",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: "最后更新于",
    },
    search: {
      provider: "local",
    },
    nav: [
      { text: "前端", link: "/front-end/", activeMatch: "/front-end/" },
      { text: "算法", link: "/algorithm/", activeMatch: "/algorithm/" },
      { text: "问题", link: "/issues/", activeMatch: "/issues/" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/allan1in" }],

    sidebar: {
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/examples/api-examples" },
          ],
        },
      ],
      "/front-end/": [
        {
          text: "HTML",
          collapsed: true,
          items: [
            { text: "链接", link: "/front-end/html/0_links" },
            { text: "介绍", link: "/front-end/html/1_intro" },
            { text: "元数据", link: "/front-end/html/2_meta-data" },
            { text: "文本", link: "/front-end/html/3_text" },
            { text: "布局", link: "/front-end/html/4_layout" },
            { text: "媒体", link: "/front-end/html/5_media" },
            { text: "表格", link: "/front-end/html/6_table" },
            { text: "表单", link: "/front-end/html/7_input" },
          ],
        },
        {
          text: "CSS",
          collapsed: true,
          items: [
            { text: "链接", link: "/front-end/css/0_links" },
            { text: "介绍", link: "/front-end/css/1_intro" },
            { text: "选择器", link: "/front-end/css/2_selector" },
            { text: "优先级", link: "/front-end/css/3_specificity" },
            { text: "盒模型", link: "/front-end/css/4_box-model" },
            { text: "样式", link: "/front-end/css/5_styles" },
            { text: "值与单位", link: "/front-end/css/6_values" },
            { text: "布局", link: "/front-end/css/7_layout" },
            { text: "响应式", link: "/front-end/css/8_responsive" },
            { text: "兼容性", link: "/front-end/css/9_compatibility" },
          ],
        },
        {
          text: "Javascript",
          collapsed: true,
          items: [
            { text: "链接", link: "/front-end/javascript/0_links" },
            { text: "介绍", link: "/front-end/javascript/1_intro" },
            {
              text: "HTML 中的 JavaScript",
              link: "/front-end/javascript/2_js-in-html",
            },
            { text: "基础语法", link: "/front-end/javascript/3_basic-grammar" },
            {
              text: "变量、作用域与内存",
              link: "/front-end/javascript/4_variable-scope-memory",
            },
            {
              text: "基本引用类型",
              link: "/front-end/javascript/5_basic-reference-type",
            },
            {
              text: "集合引用类型",
              link: "/front-end/javascript/6_collection-reference-type",
            },
            {
              text: "迭代器与生成器",
              link: "/front-end/javascript/7_iterator-generator",
            },
            {
              text: "面向对象",
              link: "/front-end/javascript/8_object-oriented",
            },
            {
              text: "代理与反射",
              link: "/front-end/javascript/9_proxy-reflect",
            },
            { text: "函数", link: "/front-end/javascript/10_function" },
            {
              text: "期约和异步函数",
              link: "/front-end/javascript/11_promise",
            },
          ],
        },
      ],
      "/algorithm/": [
        {
          text: "代码随想录",
          items: [
            { text: "链接", link: "/algorithm/programmercarl/0_links" },
            { text: "数组", link: "/algorithm/programmercarl/1_array" },
            { text: "链表", link: "/algorithm/programmercarl/2_linked-list" },
            { text: "哈希表", link: "/algorithm/programmercarl/3_hash-map" },
          ],
        },
      ],
      "/issues/": [
        {
          text: "问题",
          items: [{ text: "Index", link: "/issues/" }],
        },
      ],
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: "版权所有 © 2025 allan1in",
    },
  },
});
