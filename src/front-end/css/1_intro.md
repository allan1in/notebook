# CSS 介绍

CSS (Cascading Style Sheets)，层叠样式表，一种标记语言

```css
h1 {
  color: red;
  font-size: 5em;
}
```

包含四部分：选择器、大括号、属性名、属性值

## 引入方式

1. 外部样式表，通过 \<head> 标签中的 \<link> 标签引入，推荐使用
2. 内部样式表，通过 \<head> 标签中的 \<style> 标签引入
3. 内联样式表，写在 html 元素的属性中，尽可能避免使用

```html
<h1 style="color: blue;background-color: yellow;border: 1px solid black;">
  Hello World!
</h1>
```

## 运行流程

加载 HTML ==> 解析 HTML ==> 生成 DOM 树 ==> 根据 HTML 加载解析 CSS 并渲染到 DOM ==> 着色

图解[css 运行流程](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps/How_CSS_works/rendering.svg)

DOM（Document Object Model），文件对象模型，DOM 是文件在计算机内存中的表现形式

## CSS 兼容

CSS 由 W3C (万维网联盟) 中的一个名叫 CSS Working Group 团体发展起来的，浏览器并不会同时实现所有的新 CSS，当浏览器遇到无法解析的 CSS 选择器或声明的时候，会选择什么也不会做，继续解析下一个 CSS 样式

```css
.box {
  width: 500px;
  width: calc(100% - 50px);
}
```

如上代码，兼容了不支持 calc() 函数的浏览器

## 注释

```css
/* 注释 */
```
