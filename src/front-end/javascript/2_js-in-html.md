# HTML 中的 JavaScript

## 引入方式

### 内联方式

```html
<script>
  console.log('hello');
</script>
```

### 外部引入

推荐这种引入方式，原因如下：

- 可维护性
- 缓存，浏览器会缓存 js 文件，多个 html 使用同一个 js 文件时不会重复下载
- 兼容，XHTML 对内部脚本的编写有更严格的规则，而外部脚本不用考虑这个问题

```html
<!-- 最佳实践：此标签放在 body 内中的末尾 -->
<script src="main.js"></script>
```

## 标签位置

放在 \<head> 中，下载所有 js 文件后载执行 html，可能会很慢

防止 \<body> 后，加快页面加载速度

## 推迟执行脚本

defer 只对外部脚本有效，会在解析完 html 后再按顺序执行 js

```html
<script defer src="main.js"></script>
```

## 异步执行脚本

只适用于外部脚本，会异步下载所有的脚本，但是它们不一定会按照出现顺序执行，谁先下载完谁执行

```html
<script async src="main.js"></script>
```

## 动态加载脚本

js 中可以使用 DOM 添加 \<script> 标签，这种方式添加的 js 默认异步加载，但不建议使用

## \<noscript> 元素

有以下任何一种情况时，\<noscript> 中的内容会被渲染

- 浏览器不支持脚本
- 浏览器被禁用脚本

最初，此标签是用于兼容不支持 JavaScript 的浏览器，但现在对于禁用脚本的浏览器也很有用
