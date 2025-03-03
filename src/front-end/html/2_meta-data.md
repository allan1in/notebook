# 元数据标签

元数据（Metadata）即保存文档相关信息的数据

## \<title>

HTML 文档的标题，收藏时的默认名称

```html
<title>Document</title>
```

## \<meta>

元数据

1. 字符集

   ```html
   <meta charset="utf-8" />
   ```

2. 作者

   ```html
   <meta name="author" content="Chris Mills" />
   ```

3. 描述

   网站描述信息，用于搜索引擎优化（ SEO ）

   ```html
   <meta name="description" content="The MDN Web Docs site" />
   ```

4. 关键词

   关键词，用于 SEO，由于开发者滥用，已被搜索引擎忽略

   ```html
   <meta name="keywords" content="fill, in, your, keywords, here" />
   ```

5. 元数据协议

   比如 Facebook 的 [Open Graph Data](https://ogp.me/) ，Twitter 的 [Twitter Cards](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) ，当使用协议的网址被分享在一些社交平台上时，社交平台可以抓取元数据的信息（此网页的图片、标题、介绍等）并展示，下面的例子使用了 Open Graph Data 协议，提供了网址的图片、介绍、标题信息。

   ```html
   <meta
     property="og:image"
     content="https://developer.mozilla.org/mdn-social-share.png"
   />
   ```

   ```html
   <meta
     property="og:description"
     content="The Mozilla Developer Network (MDN) provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and HTML Apps."
   />
   ```

   ```html
   <meta property="og:title" content="Mozilla Developer Network" />
   ```

## \<link>

### 网站图标

图标一般为 .ico .png .gif 格式

动态图片作为图标：

```html
<link rel="icon" href="favicon.ico" type="image/x-icon" />
```

```html
<link rel="icon" href="1.gif" type="image/gif" />
```

静态图片做为图标：

```html
<link rel="shortcut icon" href="1.png" type="image/png" />
```

关于 type 属性：

- 这个属性被用于定义链接的内容类型。属性值应该是类似于 text/html、text/css 这样的 MIME 类型
- MIME（多用途互联网邮件扩展）是一种用于描述除 ASCII 文本以外的其他格式文档的标准，例如音频、视频和图像。最初用于电子邮件附件，现已成为用于在任何地方定义文档类型的事实标准。
- [MIME 列表](https://www.iana.org/assignments/media-types/media-types.xhtml)

### 引入 CSS

```html
<link rel="stylesheet" href="my-css-file.css" />
```

## \<script>

引入 JS，defer 以告诉浏览器在解析完成 HTML 后再加载 JavaScript

```html
<script src="my-js-file.js" defer></script>
```
