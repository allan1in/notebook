# CSS 样式

## 样式前缀

浏览器厂商们有时会给实验性的或者非标准的 CSS 属性和 JavaScript API 添加前缀，这样开发者就可以用这些新的特性进行试验，同时（理论上）防止他们的试验代码被依赖，从而在标准化过程中破坏 web 开发者的代码。开发者应该等到浏览器行为标准化之后再使用未加前缀的属性。

浏览器厂商们正在努力停止使用前缀来表示实验性质的代码的行为。Web 开发者一直在生产环境的网站上使用这些实验性代码，这使得浏览器厂商更难保证浏览器兼容性和处理新特性；这也伤害了更小众的浏览器，它们被迫添加其他浏览器前缀以加载热门网站。

现在的趋势是将实验性功能添加在需要用户自行设置偏好或标记（flag）的地方，同时编写一个更小规模的规范，以更快达到稳定状态。

### 主流浏览器引擎前缀

- -webkit- （谷歌，Safari，新版 Opera 浏览器，以及几乎所有 iOS 系统中的浏览器（包括 iOS 系统中的火狐浏览器）；基本上所有基于 WebKit 内核的浏览器）
- -moz- （火狐浏览器）
- -o- （旧版 Opera 浏览器）
- -ms- （IE 浏览器 和 Edge 浏览器）

## 背景

### 背景颜色

```css
.box {
  background-color: #567895;
}
```

### 背景图像

```css
.a {
  background-image: url(balloons.jpg);
}
```

### 控制背景平铺行为

background-repeat，可用的值是：

- no-repeat，阻止背景重复平铺。
- repeat-x，仅水平方向上重复平铺。
- repeat-y，仅垂直方向上重复平铺。
- repeat，默认值，在水平和垂直两个方向重复平铺。

### 背景图像大小

background-size，可用值为：

- cover：浏览器将使图像足够大，使它完全覆盖了盒子区域，同时仍然保持其宽高比。在这种情况下，图像的部分区域可能会跳出盒子外。
- contain：浏览器会将图像调整到适合框内的尺寸。在这种情况下，如果图像的长宽比与盒子的长宽比不同，你可能会在图像的两边或顶部和底部出现空隙。
- 数值：`background-size: 100px 10em;`，第一个参数为宽，第二个参数为高

### 背景图像定位

background-position，可用值为：

- `background-position: 10cpx 8px;`，距离左边框 10px，距离上边框 8px
- `background-position: top;`，顶部居中
- `background-position: left;`，左部居中
- `background-position: right;`，右部居中
- `background-position: bottom;`，底部居中
- `background-position: center;`，水平垂直居中
- `background-position: bottom 10px right 20px;`，距离底部 10px，距离右边 20px

### 渐变背景

- linear-gradient，线性渐变
- radial-gradient，辐射渐变

[渐变背景在线生成](https://cssgradient.io/)

### 多个背景图像

```css
background-image: url(image1.png), url(image2.png), url(image3.png),
  url(image4.png);

background-repeat: no-repeat, repeat-x, repeat;

background-position: 10px 20px, top right;
```

background-image 中先出现的图片背景会覆盖后出现的图片背景

当不同的属性具有不同数量的值时，属性值较少的会循环。在上面的例子中有四个背景图像，但是只有两个背景位置值。前两个位置值将应用于前两个图像，然后它们将再次循环 image3 将被赋予第一个位置值，image4 将被赋予第二个位置值。

### 背景滚动方式

background-attachment 属性，只有在有内容要滚动时（出现 scroll bar）才会有效果，可以取以下值：

- scroll：背景在页面滚动时滚动，如果滚动元素内部的内容，背景不会移动。
- fixed：当页面或元素内容滚动时，它都不会滚动。
- local：当页面或元素内容滚动时，它都会滚动。

[在线示例](https://mdn.github.io/learning-area/css/styling-boxes/backgrounds/background-attachment.html)

### 简写属性

background 属性被指定多个背景层时，使用逗号分隔每个背景层

每一层的语法如下：

- 在每一层中，下列的值可以出现 0 次或 1 次：
  - \<attachment>
  - \<bg-image>
  - \<position>
  - \<bg-size>
  - \<repeat-style>
  - \<bg-size> 只能紧接着 \<position> 出现，以"/"分割，如： "center/80%".
- \<box> 可能出现 0 次、1 次或 2 次。如果出现 1 次，它同时设定 background-origin（背景位置参考范围）和 background-clip（背景覆盖范围）。如果出现 2 次，第一次的出现设置 background-origin，第二次的出现设置 background-clip。
- \<background-color> 只能被包含在最后一层。

### 无障碍考虑

- 把文字放在背景图片或颜色上面时，要保证有足够的对比度让文字清晰易读。
- 如果设置了一个背景图像，并且文本将被放置在该图像的顶部，还应该指定一个 background-color，以便在图像未加载时文本也足够清晰。
- 屏幕阅读器不能解析背景图像，因此背景图片应该只是纯粹的装饰；任何重要的内容都应该是 HTML 页面的一部分，而不是包含在背景中。

### 背景裁切

- 剪切路径：clip-path
- polygon() 多边形函数，选择 n 个点，这 n 个点按顺序相连，得到裁切的背景
- [clip 工具](https://bennettfeely.com/clippy/)

```css
clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
```

## 边框

### 简写属性

```css
.box {
  border: 1px solid black;
}

/* 上方简写等价于下面： */

.box {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}

.box {
  border-top: 1px solid black;
}

/* 上方简写等价于下面： */

.box {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: black;
}
```

### 边框圆角

即使元素没有边框，圆角也可以用到 background 上面，具体效果受 background-clip 影响。

```css
/* 四个角都有 10px 的圆角半径 */

.box {
  border-radius: 10px;
}

/* 右上角的水平半径为 1em，垂直半径为 10％ */

.box {
  border-top-right-radius: 1em 10%;
}
```

属性的简写：

- 一个参数，所有圆角
- 两个参数，(左上右下) (左下右上)
- 三个参数，(左上) (右上左下) (右下)
- 四个参数，(左上) (右上) (右下) (左上)
- 斜线左边是水平半径，右边是垂直半径

```css
border-radius: 4px 3px 6px / 2px 4px;

/* 左上水平半径为 4px，右上左下水平半径为 3px，右下水平半径为 6px，左上右下垂直半径为 2px，右上左下垂直半径为 4px ，等价于： */

border-top-left-radius: 4px 2px;
border-top-right-radius: 3px 4px;
border-bottom-right-radius: 6px 2px;
border-bottom-left-radius: 3px 4px;
```

## 不同方向的文本

### 书写模式

writing-mode，三个值分别是：

- horizontal-tb: 块流向从上至下。对应的文本方向是横向的。
- vertical-rl: 块流向从右向左。对应的文本方向是纵向的。
- vertical-lr: 块流向从左向右。对应的文本方向是纵向的。

书写模式会改变元素内的块元素和行内元素的方向，例如，默认情况下，块元素是从上到下排列，行内元素从左到右排列，但如果设置了 vertical-rl，会使块元素的排列方向变为水平从左到右，行内元素方向变为从上到下

根据某些语言的书写习惯，文字会自动改变方向

### 逻辑属性和逻辑值

逻辑属性，可以根据书写模式灵活改变属性作用的方向（水平或垂直）

#### 内联尺寸和块级尺寸

width，height 可以设置宽度和高度，但不会随书写模式改变，为了使元素的宽高和书写模式联动，可以使用 内联尺寸（inline-size）或 块级尺寸（block-size）代替 width，height

- 内联尺寸，表示行内元素方向的尺寸，如果 writing-mode: horizontal-tb，inline-size 等同于 width。如果 writing-mode: vertical-rl，inline-size 等同于 height。
- 块级尺寸，表示块元素方向的尺寸，如果 writing-mode: horizontal-tb，block-size 等同于 height。如果 writing-mode: vertical-rl，block-size 等同于 width。

#### 其他逻辑属性

- margin-top 属性映射是 margin-block-start
- padding-left 属性映射是 padding-inline-start
- border-bottom 属性映射是 border-block-end

更多参考[此处](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_logical_properties_and_values)

#### 逻辑值

有一些属性的取值是一些物理值（如 top、right、bottom、left）。

这些值同样拥有逻辑值映射（block-start、inline-end、block-end、inline-start）

#### 物理属性还是逻辑属性？

逻辑属性是在物理属性之后出现的，因而最近才开始在浏览器中应用。你可以通过查看 MDN 的属性页面来了解浏览器对逻辑属性的支持情况。如果你并没有应用多种书写模式，那么现在你可能更倾向于使用物理属性，因为这些在你使用弹性布局和网格布局时非常有用。

## 图像和视频

### 可替换元素

图像和视频（\<iframe>、\<video>、\<embed>、\<img>）被描述为 **替换元素**。这意味着 CSS 不能影响它们的内部布局，仅影响它们在页面上相对于其他元素的位置。

某些替换元素（例如图像和视频）也具有宽高比。这意味着它在水平（x）和垂直（y）方向上均具有大小，并且默认情况下将使用文件的固有尺寸进行显示。

### 调整大小

如何处理溢出？

- max-width 设为 100%
- 或者设置 `object-fit: cover;`，表示替换元素完全覆盖盒子，且比例不变，但是可能有一部分被盒子裁切掉
- 或者设置 `object-fit: contain;`，表示替换元素完整的放到盒子中，且比例不变，但是可能有一部分盒子产生空白
- 或者设置 `object-fit: fill;`，表示替换元素完全覆盖盒子，但是比例会会变化

### 布局中的替换元素

在对替换元素使用各种 CSS 布局时，你可能会发现他们的表现方式与其他元素有一些细节上的差异。例如，flex 或者 grid 布局中，默认情况下元素会被拉伸到充满整块区域。但是图像不会被拉伸，而会对齐到网格区域或者弹性容器的起始处。

为了强制图像拉伸，以充满其所在的网格单元：

```css
img {
  width: 100%;
  height: 100%;
}
```

这将会无条件地拉伸图像，所以很可能不会是你想要的。

## 表单

### 表单元素默认不继承

在一些浏览器中，表单元素默认不会继承字体样式，需要通过 inherit 属性值实现样式继承

### 重置表单样式

```css
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

textarea {
  overflow: auto;
}
```

## 表格

### 固定列宽

```css
table {
  border-collapse: collapse;
}
```

通常情况下，表列的尺寸会根据所包含的内容大小而变化，通过 `table-layout: fixed`，你可以根据列标题的宽度来规定列的宽度

### 消除单元格边框之间的空隙

```css
table {
  border-collapse: collapse;
}
```

collapse，倒塌，消除单元格边框之间的空隙

### 单元格条纹效果

```css
tbody tr:nth-child(odd) {
  background-color: #ff33cc;
}

tbody tr:nth-child(even) {
  background-color: #e495e4;
}
```

### 标题位置

```css
caption {
  caption-side: bottom;
}
```

## 盒子阴影

### 简单阴影

```css
.simple {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.7);
}
```

- 第一个长度值是水平偏移量（horizontal offset）——即向右的距离，阴影被从原始的框中偏移 (如果值为负的话则为左)。
- 第二个长度值是垂直偏移量（vertical offset）——即阴影从原始盒子中向下偏移的距离 (或向上，如果值为负)。
- 第三个长度的值是模糊半径（blur radius）——在阴影中应用的模糊度。
- 颜色值是阴影的基本颜色（base color）。

### 多个阴影

一个盒子可以有多个阴影，可以实现多个光源的复杂效果

```css
.multiple {
  box-shadow: 1px 1px 1px black, 2px 2px 1px black, 3px 3px 1px red, 4px 4px 1px
      red, 5px 5px 1px black, 6px 6px 1px black;
}
```

### 内部阴影

```css
button {
  box-shadow: inset 2px 2px 1px black, inset 2px 3px 5px rgba(0, 0, 0, 0.3),
    inset -2px -3px 5px rgba(255, 255, 255, 0.5);
}
```

## 滤镜

滤镜可以应用在任何元素上，包括块元素和行内元素

```css
.filter {
  -webkit-filter: drop-shadow(5px 5px 1px rgba(0, 0, 0, 0.7));
  filter: drop-shadow(5px 5px 1px rgba(0, 0, 0, 0.7));
}
```

上面的例子根据边框轮廓产生阴影，括号内参数和 box-shadow() 一样，和他不同的是，使用滤镜，边框阴影会随边框样式（dot、dash）改变

[更多滤镜](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

## 混合模式

### background-blend-mode

将一个元素的两个背景混合

[更多属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-blend-mode)

### mix-blend-mode

将一个元素的两个背景，以及下方元素的背景混合

[更多属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)

### text-clip

将背景图像剪贴到元素文本的形状

```css
.text-clip {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 字体

### 字体样式

#### 字体颜色

```css
p {
  color: red;
}
```

#### 字体种类

```css
p {
  font-family: arial;
}
```

##### 网页安全字体

网络安全字体在几乎所有最常用的操作系统（Windows，Mac，最常见的 Linux 发行版，Android 和 iOS 版本）中都可用

- Arial（sans-serif）通常认为最佳做法还是添加 Helvetica 作为 Arial 的首选替代品，尽管它们的字体面几乎相同，但 Helvetica 被认为具有更好的形状，即使 Arial 更广泛地可用。
- Courier New（monospace）使用 Courier New 作为 Courier 的首选替代方案，被认为是最佳做法。
- Georgia（serif）
- Times New Roman serif 使用 Times 作为 Times New Roman 的首选替代方案，被认为是最佳做法。
- Trebuchet MS（sans-serif）在移动操作系统上并不广泛。
- Verdana（sans-serif）

[查看主流字体在操作系统中的覆盖率](https://www.cssfontstack.com/)

##### 默认字体

CSS 定义了 5 个常用的字体名称：serif, sans-serif, monospace, cursive, 和 fantasy. 这些都是非常通用的，当使用这些通用名称时，使用的字体完全取决于每个浏览器，而且它们所运行的每个操作系统也会有所不同。

- serif，衬线字体，即有衬线的字体（衬线是指字体笔画尾端的小装饰，存在于某些印刷体字体中）。
- sans-serif，无衬线字体。
- monospace，等宽字体，指包含的全部字符的宽度相同的字体，通常在编辑代码时使用。
- cursive，手写字体，对于英文字符而言通常具有顺滑的连接笔画以模拟手写效果。
- fantasy，装饰字体。

##### 字体栈

```css
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

当字体名称有多个单词时，需要用引号包裹

#### 字体大小

浏览器的根元素 font-size 标准设置的值为 16px

```css
html {
  font-size: 10px;
}
```

#### 字体样式

font-style: 用来打开和关闭文本 italic (斜体)。可能的值如下 (你很少会用到这个属性，除非你因为一些理由想将斜体文字关闭斜体状态)：

- normal: 将文本设置为普通字体 (将存在的斜体关闭)
- italic: 如果当前字体的斜体版本可用，那么文本设置为斜体版本；如果不可用，那么会利用 oblique 状态来模拟 italics。
- oblique: 将文本设置为斜体字体的模拟版本，也就是将普通文本倾斜的样式应用到文本中。

#### 字体粗细

font-weight: 设置文字的粗体大小。这里有很多值可选 (比如 -light, -normal, -bold, -extrabold, -black, 等等), 不过事实上你很少会用到 normal 和 bold 以外的值：

- normal, bold: 普通或者加粗的字体粗细
- lighter, bolder: 将当前元素的粗体设置为比其父元素粗体更细或更粗一步。100–900: 数值粗体值，如果需要，可提供比上述关键字更精细的粒度控制。

#### 文本转换

text-transform: 允许你设置要转换的字体。值包括：

- none: 防止任何转型。
- uppercase: 将所有文本转为大写。
- lowercase: 将所有文本转为小写。
- capitalize: 转换所有单词让其首字母大写。
- full-width: 将所有字形转换成全角，即固定宽度的正方形，类似于等宽字体，允许拉丁字符和亚洲语言字形（如中文，日文，韩文）对齐。

#### 文本装饰

text-decoration: 设置/取消字体上的文本装饰 (你将主要使用此方法在设置链接时取消设置链接上的默认下划线。) 可用值为：

- none: 取消已经存在的任何文本装饰。
- underline: 文本下划线。
- overline: 文本上划线。
- line-through: 穿过文本的线。

注意 text-decoration 是一个缩写形式，它由 text-decoration-line, text-decoration-style 和 text-decoration-color 构成。你可以使用这些属性值的组合来创建有趣的效果，比如 text-decoration: line-through red wavy，表示设置穿过文本的线，颜色为红色，样式为波浪线

#### 文字阴影

```css
text-shadow: 4px 4px 5px red;
```

四个属性值：水平偏移量，垂直偏移量，模糊距离，颜色

可以同时设置多个文字阴影，[这里是一些有趣的实践](https://www.sitepoint.com/moonlighting-css-text-shadow/)

### 文本布局

#### 文本缩进

text-indent，段落首行缩进

#### 文本对齐

text-align 属性用来控制文本如何和它所在的内容盒子对齐。可用值如下，并且在与常规文字处理器应用程序中的工作方式几乎相同：

- left: 左对齐文本。
- right: 右对齐文本。
- center: 居中文字。
- justify: 使文本展开，改变单词之间的差距，使所有文本行的宽度相同。特别是当应用于其中有很多长单词的段落时。可以和 `hyphens:manual`（连字符换行）搭配使用，打破一些更长的词语。

#### 行高

可以设置一个无单位的值，作为乘数，通常这种是比较好的做法。无单位的值乘以 font-size 来获得 line-height。推荐的行高大约是 1.5–2

```css
line-height: 1.5;
```

文字如何在盒子内垂直居中？

- 将行高（line-height）设置为盒子的内容高度（height）

#### 字母和单词间距

```css
p {
  letter-spacing: 2px;
  word-spacing: 4px;
}
```

### 字体简写

- 只有 font-size 和 font-family 是一定要指定的
- font-size 和 line-height 属性之间必须以斜杠分隔。
- font-family 必须最后指定。
- font-style、font-variant 和 font-weight 必须在 font-size 之前。

```css
font: italic normal bold normal 3em/1.5 Helvetica, Arial, sans-serif;
```

### 网络字体

#### 字体资源

- [fontsquirrel](https://www.fontsquirrel.com/)
- [dafont](https://www.dafont.com/)
- [everythingfonts](https://everythingfonts.com/)

#### 使用网络字体

下载 ttf 字体文件，通过[网络字体生成器](https://www.fontsquirrel.com/tools/webfont-generator)生成工具包，将工具包内的 stylesheet.css 文件（ @font-face 代码块 ）导入 html，或者复制到 css 内，便可以通过 font-family 属性在 css 中使用网络字体（字体名称在 stylesheet.css 中）

关于 @font-face 的细节：

```css
@font-face {
  font-family: "ciclefina";
  src: url("fonts/cicle_fina-webfont.eot");
  src: url("fonts/cicle_fina-webfont.eot?#iefix") format("embedded-opentype"), url("fonts/cicle_fina-webfont.woff2")
      format("woff2"), url("fonts/cicle_fina-webfont.woff") format("woff"), url("fonts/cicle_fina-webfont.ttf")
      format("truetype"),
    url("fonts/cicle_fina-webfont.svg#ciclefina") format("svg");
  font-weight: normal;
  font-style: normal;
}
```

- font-family：这一行指定了你想要引用的字体的名称。
- src：这些行指定要导入到你的 CSS(url 部分) 的字体文件的路径，以及每种字体文件的格式 (format 部分)。后面的部分不是必要的，但是声明它是很有用的，因为它允许浏览器更快地找到可以使用的字体。可以列出多个声明，用逗号分隔——浏览器会搜索并使用它能找到的第一个——因此，最好是把新的、更好的格式比如 WOFF2 放在前面，把偏老的，不是那么好的格式像 TTF 这样的放在后面。
- font-weight/font-style: 这些行指定字体的粗细，以及它是否斜体。如果你正在导入相同字体的多个粗细，你可以指定它们的粗细/样式，然后使用不同的 font-weight/font-style 来选择它们之间的不同值，而不必调用字体种类不同名称的所有不同成员。

#### 在线字体服务

[Google Font](https://www.google.com/fonts)

## 列表

### 符号样式

用于 ul 或 ol，如下例子，设置列表项前的符号为大写罗马数字

```css
ol {
  list-style-type: upper-roman;
}
```

### 符号位置

用于 ul 或 ol，如下例子，默认值为 outside，这使项目符号位于列表项之外，设置列表项前的符号在行内。

```css
ol {
  list-style-position: inside;
}
```

### 自定义符号图片

用于 ul 或 ol，可以自定义符号为指定的图片

```css
ul {
  list-style-image: url(star.svg);
}
```

此属性无法控制图片的位置、大小，建议使用 background 属性设置符号图片:

```css
ul li {
  padding-left: 2rem;
  background-image: url(star.svg);
  background-position: 0 0;
  background-size: 1.6rem 1.6rem;
  background-repeat: no-repeat;
}
```

### 简写属性

```css
ul {
  list-style-type: square;
  list-style-image: url(example.png);
  list-style-position: inside;
}
```

简写为

```css
ul {
  list-style: square url(example.png) inside;
}
```

### 自定义计数规则

CSS 提供了自定义编号的方法，参考以下关键词：

- @counter-style
- counter-increment
- counter-reset

## 链接

### 链接状态

每个链接状态对应一个伪类，因此可以通过伪类为某个状态设定特殊的样式

- Link：有目的地的链接（即不只是一个具名锚点），使用 :link 伪类来应用样式。
- Visited：已访问过（存在于浏览器历史记录中）的链接，使用 :visited 伪类来应用样式。
- Hover：被用户鼠标指针悬停的链接，使用 :hover 伪类来应用样式。
- Focus：被选中的链接（比如通过键盘的 Tab 移动到这个链接，或者使用像 HTMLElement.focus() 这样的方法编程地聚焦链接），使用 :focus 伪类来应用样式。
- Active：激活（如点击）的链接，使用 :active 伪类来应用样式。

### 默认样式

- 链接以下划线表示。
- 未访问链接为蓝色。
- 已访问链接为紫色。
- 悬停链接时，鼠标指针会变成一个小手图标。
- 聚焦链接的周围有一个轮廓——按下键盘上的制表符键，就能聚焦本页面上的链接。（在 Mac 上，需要使用 option + tab，或通过按下 Ctrl + F7 启用全键盘控制选项。
- 活动链接为红色。尝试在点击链接时按住鼠标键。

### 伪类顺序

对同一个链接，设置多个伪类时，第一个规则的样式也会在后面的规则中生效，比如一个链接被激活的时候，它也是处于悬停状态的。如果你搞错了顺序，那么就可能不会产生正确的效果。

顺序口诀：LoVe Fears HAte

即 :link :visited :focus :hover :active

### 轮廓

outline 属性可以设置元素的轮廓，元素轮廓是绘制于元素周围的一条线，位于 border 的外围，使元素突出

border 和 outline 很类似，但有如下区别：

- outline 不占据空间，绘制于元素内容周围。
- 根据规范，outline 通常是矩形，但也可以是非矩形的。
- outline-offset: 3px; 可以设置轮廓与内容的间隙

```css
outline: 1px dashed red;
```

可以看出，outline 是下面三个样式的简写：

- outline-style，轮廓样式
- outline-width，轮廓宽度
- outline-color，轮廓颜色

### 光标悬停样式

鼠标指针悬停在元素上时显示相应样式，如下例子将指针设为小手

```css
cursor: pointer;
```

### 应用：链接中加入图标

如下，实现效果：在链接文字后紧跟着一个小图标

```css
a[href^="http"] {
  background: url("external-link-52.png") no-repeat 100% 0;
  background-size: 16px 16px;
  padding-right: 19px;
}
```

选择拥有 href 属性且属性值以 http 开头的元素，设置一个背景，不重复，距离左边为父元素的 100%，距离顶部为 0

### 应用：样式化链接为按钮（TODO）

## 调整尺寸

### 固有尺寸

使用 \<img> 标签，且 CSS 中没有设置其尺寸，那么将使用其固有尺寸显示

块级元素的固有尺寸（内部没有内容时），高度为 0，宽度为父元素的 100%

### 设置具体尺寸

#### 基本属性

使用 width, height 属性设置宽高

#### min- 和 max- 前缀的属性

例如设置一个 min-height 属性。盒子就会一直保持大于这个最小高度，但是如果有比这个盒子在最小高度状态下所能容纳的更多内容，那么盒子就会变大。

对 \<img> 使用 max-width: 100%，图像可以变得比固有尺寸更小，但是不会大于固有尺寸的 100%。这样做的目的是，在没有足够空间以原有宽度展示图像时，让图像缩小，同时确保它们不会比 max-width 的宽度大。

## 溢出

元素内的内容过多时会产生溢出。

现代网页布局的方式可以很好地处理溢出。但是在以往，开发者会更多地使用固定高度，尽力让毫无关联的盒子的底部对齐。这是很脆弱的，一些盒子，它们的内容遮到了页面上的其他内容。这就是溢出，理论上你应该能重新排布这些布局，使得它不必依赖于盒子尺寸的调整。

在开发网站的时候，你应该一直把溢出的问题挂在心头，你应该用或多或少的内容测试设计，增加文本的字号，确保你的 CSS 可以正常地协调。改变溢出属性的值，来隐藏内容或者增加滚动条，会是你仅仅在少数特别情况下需要的，例如在你确实需要一个可滚动盒子的时候。

### overflow 属性

overflow 属性是你控制一个元素溢出的方式，可以取以下值：

- visible，默认值，溢出内容可见
- hidden，隐藏溢出内容
- scroll，溢出内容滚动可见，`overflow-y: scroll` 仅在 y 轴滚动
- auto，浏览器自动控制，一般是内容溢出时再显示滚动条

属性的简写：overflow: scroll hidden 会把 overflow-x 设置成 scroll，而 overflow-y 则为 hidden

如果需要在小盒子里面和长英文词打交道，可以了解一下 word-break 或者 overflow-wrap 属性

### 溢出会建立区块格式化上下文

在你使用诸如 scroll 或者 auto 的时候，你就建立了一个区块格式化上下文（Block Formatting Context）。结果就是，你改变了 overflow 的值的话，对应的盒子就变成了更加小巧的状态。在容器之外的东西没法混进容器内，也没有东西可以突出盒子，进入周围的版面。

## 变换

CSS 变换（CSS transform）可以在 **_不影响正常文档流_** 的情况下改变作用内容的位置

**_只有使用盒模型的元素可以被变换_**

两个主要属性：

- transform-origin。指定原点的位置。默认值为元素的中心，可以被移动。很多变换需要用到这个属性，比如旋转、缩放和倾斜，它们都需要一个指定的点作为参数。
- transform。指定作用在元素上的变换。取值为空格分隔的一系列变换的列表，它们会像被组合操作请求一样被分别执行。复合变换按从右到左的顺序高效地应用。

### 设置原点

原点在中心：

```css
transform-origin: center;
```

原点在左上角：

```css
transform-origin: top left;
```

原点距离左边 50px，距离上边 50px：

```css
transform-origin: 50px 50px;
```

### 变换函数

transform 的属性是各种变换函数

```css
transform: scale(2, 0.5);
```

可以省略 transform，以上代码等价于：

```css
scale: 2 0.5;
```

#### 缩放

x,y 方向同时放大两倍（等比例缩放）：

```css
scale: 2;
```

x 轴方向放大 2 倍，y 轴缩小到 0.5：

```css
scale: 2 0.5;
```

#### 旋转

顺时针旋转 90 度（默认以 z 轴为旋转轴）：

```css
rotate: 90deg;
```

#### 平移

沿着 x 轴向右移动自身宽度的 50%:

```css
translate: 50%;
```

沿着 x 轴向右移动 20px，沿着 y 轴向下平移 20px:

```css
translate: 20px 20px;
```

沿着 z 轴移动 30px（等比缩放的效果）:

```css
translate: 0 0 30px;
```

## 过渡

CSS 过渡提供了一种在更改 CSS 属性时控制动画速度的方法

通常将两个状态之间的过渡称为隐式过渡，因为开始与结束之间的状态由浏览器决定

### 过渡对象

如下，指定 margin-right 为过渡对象，只有此属性值变化时会有动画效果

```css
transition-property: margin-right;
```

可以使用属性值 all 指定所有属性

### 过渡时间

指定过渡动画的时长为 1s

```css
transition-duration: 1s;
```

### 速率曲线

可以为过渡设置动画速率曲线：

```css
transition-timing-function: ease;
```

- ease - 规定过渡效果，先缓慢地开始，中间加速，然后缓慢地结束（默认）
- linear - 规定从开始到结束具有相同速度的过渡效果
- ease-in -规定缓慢开始的过渡效果
- ease-out - 规定缓慢结束的过渡效果
- ease-in-out - 规定开始和结束较慢的过渡效果（中间不会变快，中间是一段匀速）
- cubic-bezier(p0,p1,p2,p3) - 允许您在三次贝塞尔函数中定义自己的值

#### 贝塞尔曲线函数

```css
cubic-bezier(p0,p1,p2,p3)
```

[图解贝塞尔曲线](https://www.runoob.com/wp-content/uploads/2019/10/cubic-bezier-02.jpg)

p0 默认是(0,0)，p3 默认是(1,1)

我们需要关注的是 P1 和 P2 两点的取值，而其中 X 轴的取值范围是 0 到 1，当取值超出范围时 cubic-bezier 将失效；Y 轴的取值没有规定，当然也毋须过大。

最直接的理解是，将以一条直线放在范围只有 1 的坐标轴中，并从中间拿出两个点来拉扯（X 轴的取值区间是 [0, 1]，Y 轴任意），最后形成的曲线就是动画的速度曲线。

### 延迟

等待 3s 后再执行过渡动画：

```css
transition-delay: 3s;
```

### 属性缩写

```css
transition: <property> <duration> <timing-function> <delay> <iteration-count>
  <direction> <fill-mode> <play-state> <name>;
```

## 动画

CSS animations 使得可以将从一个 CSS 样式配置转换到另一个 CSS 样式配置。动画包括两个部分：描述动画的样式规则和用于指定动画开始、结束以及中间点样式的关键帧。

CSS 动画主要优点：

- 能够非常容易地创建简单动画，你甚至不需要了解 JavaScript 就能创建动画。
- 动画运行效果良好，甚至在低性能的系统上。渲染引擎会使用跳帧或者其他技术以保证动画表现尽可能的流畅。而使用 JavaScript 实现的动画通常表现不佳（除非经过很好的设计）。
- 让浏览器控制动画序列，允许浏览器优化性能和效果，如降低位于隐藏选项卡中的动画更新频率。

### 自定义动画

如下定义了一个名为 slidein 的动画，从自身原本位置开始移动，终点位于距离原本位置 100% 的右方：

```css
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

和 转换 transition 相比，关键帧 keyframes 可以控制动画序列的中间步骤：

```css
@keyframes identifier {
  0% {
    top: 0;
    left: 0;
  }
  30% {
    top: 50px;
  }
  68%,
  72% {
    left: 50px;
  }
  100% {
    top: 100px;
    left: 100%;
  }
}
```

- 可以自由定义任何数量的关键帧，例子中，top 属性分别出现在关键帧 0%、30% 和 100% 的中，而 left 属性分别出现在关键帧 0%、68%、72% 和 100% 中。
- 如果关键帧被重复定义（有两个 50%），那么只会应用后边的关键帧

### 引用动画

```css
animation-name: slidein;
```

### 动画时长

```css
animation-duration: 3s;
```

### 动画播放次数

无限循环播放：

```css
animation-iteration-count: infinite;
```

### 往复运动动画

从终点回到起点的过程中也应用动画：

```css
animation-direction: alternate;
```

### 填充模式

animation-fill-mode，决定动画开始前或结束后应用的样式

- none。当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。
- forwards，动画结束时，保留动画最后一个关键帧的样式。
- backwards，在 animation-delay 期间，动画将使用第一个关键帧中定义的样式
- both，动画将同时使用 forwards 和 backwards 的规则

### 简写属性

```css
animation: 时长 | 速率曲线 | 延迟 | 循环次数 | direction | fill-mode |
  play-state | 动画名称;
```

[详细介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)
