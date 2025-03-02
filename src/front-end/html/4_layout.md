# 布局标签

```html
<header>
    <h1>观鸟网</h1>
    <img src="dove.png" alt="一张鸽子剪影图片">
</header>
    <nav>
      <ul>
        <li><span>主页</span></li>
        <li><a href="#">开始</a></li>
        <li><a href="#">图片</a></li>
      </ul>
    </nav>

  <main>
    <section>
      <h2>欢迎</h2>
      <p>时不我待！赶快带齐装备，关上电脑，去拥抱美丽的大自然吧！</p>
    </section>
    <aside>
      <h2>收藏照片</h2>
      <a href="favorite-1.jpg"><img src="favorite-1_th.jpg" alt="一只体型小巧的鸟，羽毛蓝绿色，爪黑白相间，黑色的喙细且锋利。点击缩略图查看完整照片。"></a>
      <a href="favorite-2.jpg"><img src="favorite-2_th.jpg" alt="一只美丽的孔雀的上半身图片，它的颈上覆盖蓝色的羽毛，有浅色的喙和蓝色的冠。点击缩略图查看完整照片。"></a>
  </main>
  <footer>
    <p>本虚拟站点遵守 CC0 协议，所有内容均可任意修改和复用。原始版本由 Chris Mills 于 2016 年编写。Roy Tian 于 2019 年汉化。</p>
    <p><a href="http://game-icons.net/lorc/originals/dove.html">鸽子图标</a> 由 Lorc 绘制。</p>
  </footer>
```

## \<header>

页眉

## \<nav>

导航栏

## \<main>

主内容

## \<aside>

侧边栏

## \<footer>

页脚

## \<article>

文章，每个文章都是独立的，它们之间没有任何关系

## \<section>

章节，通常多个 \<section> 同时出现，共同组成一个页面的主要部分

```html
<section>
  <article>
    <section class="title">标题1</section>
    <section class="content">内容1</section>
  </article>
  <article>
    <section class="title">标题2</section>
    <section class="content">内容2</section>
  </article>
</section>
```

区分：如果一块内容相对来说比较独立的、完整的 时候，应该使用 \<article>，但是如果你想将一块内容分成几段的时候，应该使用 \<section>

## \<address>

联系信息，在一个网站的页脚使用它来包括整个网站的联系信息，或者在一篇文章里面使用它来包括作者的联系信息，这都是正确的，但不能用来标记与该页面内容无关的地址列表。、

## \<div>

无语义，万不得已再用

## \<br>

换行，单标签

\<br>是 HTML 写法

\<br/>是 XHTML1.1 的写法，也是 XML 写法

\<br />是 XHTML 为兼容 HTML 的写法，也是 XML 写法

## \<hr>

水平分割线，单标签
