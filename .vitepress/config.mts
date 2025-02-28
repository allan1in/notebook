import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Allan's Notebook",
  description: "一个关于编程的记事本",
  base: "/notebook/",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "前端", link: "/front-end/index.md" },
      { text: "算法", link: "/algorithm/index.md" },
      { text: "问题", link: "/issues/index.md" },
    ],

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
          text: "前端",
          items: [{ text: "Index", link: "/front-end/" }],
        },
      ],
      "/algorithm/": [
        {
          text: "算法",
          items: [{ text: "Index", link: "/algorithm/" }],
        },
      ],
      "/issues/": [
        {
          text: "问题",
          items: [{ text: "Index", link: "/issues/" }],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/allan1in" }],
  },
});
