# notebook

这是一个用于记录个人学习笔记的静态网站，基于 [VitePress](https://vitepress.dev/zh/) 快速搭建，并通过 [Github Actions](https://docs.github.com/zh/actions) + [Github Pages](https://docs.github.com/zh/pages) 自动化构建部署到 [allan1in.github.io/notebook/](https://allan1in.github.io/notebook/)。

## 安装

### 先决条件

- **Node.js**：确保你安装了正确版本的 [Node.js](https://nodejs.org/zh-cn)（建议版本：16.x 或更高）。
- **Git**：确保你已安装 [Git](https://git-scm.com/)，用于克隆项目。

### 安装步骤

1. 克隆项目

   打开 git bash，执行以下命令

   ```bash
   git clone https://github.com/your-username/notebook.git
   cd notebook
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 本地运行

   ```bash
   npm run dev
   ```

   这将启动具有即时热更新的本地开发服务器，以供在本地展示实时效果。

4. 构建项目

   ```bash
   npm run build
   ```

   这将会构建静态文件并生成到 dist/ 目录。

5. 构建效果预览

   ```bash
   npm run preview
   ```

   preview 命令将启动一个本地静态 Web 服务 http://localhost:4173，该服务以 .vitepress/dist 作为源文件。这是检查生产版本在本地环境中是否正常的一种简单方法。

## 欢迎讨论

如果有任何问题或建议，欢迎在 [Issues](https://github.com/allan1in/notebook/issues) 区域提出，欢迎进行讨论。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。
