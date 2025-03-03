# 文本标签

标签的语义，有利于 SEO，无障碍阅读（屏幕阅读器），便于理解维护。对于有语义的标签，不要为了其样式而滥用。

## \<h1>

headline，标题，块级内容，一共提供了 6 级，从高到低 h1 h2 h3 h4 h5 h6

## \<p>

paragraph，段落，块级内容

## \<span>

无语义，行级内容

## \<ul>

unorder list，无序列表，可嵌套 \<ul> \<ol> \<dl>

```html
<ul>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

## \<ol>

order list，有序列表，可嵌套 \<ul> \<ol> \<dl>

```html
<ol start="4" reversed>
  <li>豆汁</li>
  <li value="2">焦圈</li>
</ol>
```

- start 属性允许编号从指定数字开始计数，如例子中从 4 开始编号
- reversed 属性使编号顺序反转为降序，默认是升序
- value 属性使列表项可以自定义编号

## \<em>

emphasis，强调语气，用于表达字面以外的含义（阴阳怪气），行级内容，文字斜体

## \<strong>

强调内容的重要性，用于警告提醒的含义，文字加粗

## \<mark>

强调内容与上下文的相关性，例如搜索结果中的搜索关键词，文字高亮

## \<b>

bold，历史遗留，无语义，加粗，万不得已才使用

## \<i>

italics，历史遗留，无语义，斜体，万不得已才使用

## \<u>

underline，历史遗留，无语义，下划线，万不得已才使用

## \<a>

anchor，锚

```html
<a href="https://www.mozilla.org/zh-CN/">Mozilla 主页</a>
```

- 标签内可嵌套块级内容，使其成为块级链接
- title 属性，鼠标悬停在链接上时会显示补充信息
- href 属性，相对路径或绝对路径，相对路径中 ../ 代表上一级目录
- target 属性，\_blank 链接在新页面打开，\_self 链接在此页面打开
- 最佳实践

```html
<a href="https://www.mozilla.org/firefox/"> 下载 Firefox </a>
```

标签内容不要出现链接的地址或“点击此处”、“链接”等字样

```html
<a href="https://www.example.com/large-report.pdf">
  下载销售报告（PDF，大小为 10 MB）</a
>
```

如果链接指向非 html 文件的资源，如视频、文档等，要留下清晰的提示

- download 属性，设置下载内容的文件名，点击连接时会下载文件

- 电子邮件链接，可以配置收件人、抄送、主题、内容，点击后会打开邮件应用

```html
<a
  href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email"
>
  发送含有 cc、bcc、主题和主体的邮件</a
>
```

%20 表示空格，详见[URL 编码](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%88%86%E5%8F%B7%E7%BC%96%E7%A0%81)

## \<dl>

description list，描述列表，标记术语或定义

```html
<dl>
  <dt>内心独白</dt>
  <dd>
    戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。
  </dd>
</dl>
```

- \<dt> description term 描述的术语

- \<dd> description definition 描述的定义

- 一个 \<dt> 下可以有多个 \<dd>

## \<blockquote>

块引用，对标签里的内容进行段落缩进，cite 属性表示引用源，但浏览器并不会展示其内容

```html
<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote"
>
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>
```

## \<q>

quote，行内引用，将标签里的内容用引号包裹，cite 属性表示引用源，但浏览器并不会展示其内容

```html
<q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q">
  intended for short quotations that don't require paragraph breaks.
</q>
```

## \<cite>

表示引用源，虽然有属性 cite，但是浏览器、屏幕阅读器并没有对其充分利用，因此有了标签 \<cite> 用于显示引用源，一般习惯于和 \<a> 标签组合使用

```html
<a href="/zh-CN/docs/Web/HTML/Element/q"> <cite>MDN q page</cite></a>
```

## \<abbr>

abbreviation，缩略语，文字有点下划线，在文字上悬浮会展示 title 属性（缩略语的全称）

```html
<abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr>
```

## \<sup>

superscript，上标

## \<sub>

subdcript，下标

## \<code>

代码，等宽字体（ monospace ）

## \<pre>

代码块

## \<var>

变量

## \<kbd>

keyboard，键盘输入，等宽字体（ monospace ）

## \<samp>

sample，程序输出，等宽字体（ monospace ）

## \<time>

时间，其 datetime 属性代表标签内时间的机器格式，方便搜索引擎抓取

```html
<!-- 标准简单日期 -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- 只包含年份和月份-->
<time datetime="2016-01">January 2016</time>
<!-- 只包含月份和日期 -->
<time datetime="01-20">20 January</time>
<!-- 只包含时间，小时和分钟数 -->
<time datetime="19:30">19:30</time>
<!-- 还可包含秒和毫秒 -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- 日期和时间 -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- 含有时区偏移值的日期时间 -->
<time datetime="2016-01-20T19:30+01:00"
  >7.30pm, 20 January 2016 is 8.30pm in France</time
>
<!-- 提及特定周 -->
<time datetime="2016-W04">The fourth week of 2016</time>
```
