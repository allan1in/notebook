# CSS 布局

## 介绍

正常布局流（normal flow）是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式。

HTML 元素完全按照源码中出现的先后次序显示

块元素内容的布局方向被描述为 **_块方向_**，**_内联方向_** 是内联内容（如句子）的运行方向，块方向默认是垂直，内联方向默认是水平，通过书写模式属性可以改变

设置某些 CSS 会覆盖默认的布局行为：

- display 属性
- float 属性
- position 属性
- 表格布局。表格的布局方式可以用在非表格内容上，可以使用 display: table 和相关属性在非表元素上使用。
- 多列布局。Multi-column layout 属性可以让块按列布局，比如报纸的内容就是一列一列排布的。

## 常规流

块元素特性：

- 块元素默认会填满父元素 100% 宽度
- 块元素的默认 总宽/高 = 内容宽/高 + 内边距宽/高 + 边框宽/高
- 块元素默认内容区高度（height）是子元素的总高度（包括 height padding border margin）
- 块元素会在上个元素下面另起一行
- 块元素之间会有外边距折叠现象，即大的外边距会覆盖小的外边距

行元素特性：

- 行元素会与相邻的行元素在同一行上，如果溢出会自动换行
- 行元素的宽高属性失效，宽高依赖于文字内容大小
- 行元素垂直方向的内边距、边框会生效，但是不占位
- 行元素垂直方向的外边距不生效
- 行元素水平方向的内边距、外边距、边框会生效，且占位

## 浮动

### 背景介绍

最初，浮动用于在文本中插入图片，使文本环绕在图片周围，也可以实现首字下沉的效果（drop-cap），[首字下沉例子](https://css-tricks.com/snippets/css/drop-caps/)，使用 :first-letter 选择器选取第一个字母

后来，浮动被应用于界面的布局，它可以使得元素横向排列

### 表现

以文本环绕块元素为例，看看浮动发生了什么？

```html
<div class="out">
  <div class="box">Float</div>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam
    dolor
  </p>
</div>
```

- 给 box 块元素设置 `float:left` 属性，浮动会使元素脱离常规流（normal flow），并吸附到父容器（ out 元素）的左边，常规流布局的元素（p 元素）如果之前在其下面，那么文字会上移并填满其右侧空间
- p 元素行内盒子已被缩短，故文字会排布在浮动元素周围，但是浮动元素从正常文档流移出，故 p 元素行内盒子仍然保持全部宽度
- 因为浮动，无论 box 元素有多高，也不会再撑大其父元素（out 元素），out 元素的高度仅由 p 元素决定
- 如果以电脑屏幕为 x y 轴平面，那么 z 轴方向就是眼睛和屏幕相连的方向，浮动的元素就好像沿着 z 轴移动，离屏幕越远了，并且离眼睛更近了，因此浮动元素之后的块元素会被浮动元素覆盖。

### 清除浮动

浮动的影响：

- 浮动元素的父元素高度不会被撑大，高度为 0，会影响下方的常规流布局（下方块元素会向上塌陷）

#### clearfix 方法

设置 clear 属性的元素会移除它受到的浮动影响，并且之后的元素也不会再受到浮动影响

```css
.cleared {
  clear: left;
}
```

clear 属性接受下列值：

- left：停止任何活动的左浮动
- right：停止任何活动的右浮动
- both：停止任何活动的左右浮动

clearfix 方法：向包含浮动内容及其本身的盒子后方插入一些生成的内容，并将生成的内容清除浮动。这与在浮动盒子后手动添加诸如 div 的 HTML 元素，并设置其样式为 clear:both 是等效的。这样，可以通过给浮动元素的父元素设置样式类，方便地清除浮动

```css
.clearfix::after {
  content: "";
  clear: both;
  display: block;
}
```

更优的写法：

```css
.clearfix::before,
.clearfix::after {
  content: '';
  clear: both;
  display: table;
}
```

添加 before 伪元素，并且使用 table 的原因：

> The use of `table` rather than `block` is only necessary if using `:before` to contain the top-margins of child elements.

案例：

[在线演示](https://codepen.io/allan1in/pen/OJemXoQ)

```html
<div class="box-wrapper clearfix">
  <div class="box">float box</div>
  <div class="box">float box</div>
  <div class="normal-box">normal box</div>
</div>
```

```css
.clearfix::before,
.clearfix::after {
  content: '';
  clear: both;
  display: table;
}

.box-wrapper {
  background-color: orange;
}

.box {
  float: left;
  height: 40px;
  background-color: grey;
  margin: 20px;
}

.normal-box {
  height: 40px;
  background-color: grey;
  width: 200px;
  margin-left: 300px;
  margin-top: 20px;
}
```

尝试着改变 clearfix 的写法，会发现如果缺少了 `::before`，或者使用 `display:block`，非浮动元素 normal-box 的上边距会塌陷

#### overflow 方法

一个替代的方案是将浮动元素父元素的 overflow 属性设置为除 visible 外的其他值，比如 `overflow:auto`

这个例子之所以能够生效，是因为创建了所谓的 块格式化上下文（BFC）。可以把它看作页面内部包含所需元素的一小块布局区域。如此设置可以让浮动元素包含在 BFC 及其背景之内。

缺点：

- 大部分情况下这种小技巧都可以奏效，但是可能会出现莫名其妙的滚动条或裁剪阴影，这是使用 overflow 带来的一些副作用
- 不利于代码的维护，难以理解

#### display:flow-root 方法

一个较为现代的方案是使用 display 属性的 flow-root 值（根元素流式布局）。它可以无需小技巧来创建块格式化上下文（BFC），在使用上没有副作用。

该元素生成一个块级元素盒，其会建立一个新的区块格式化上下文，定义格式化上下文的根元素

你可以从 flow-root 这个值的名字上看出来，它创建一个新的用于流式布局的上下文，行为如同 \<html> 元素。

### 区块格式化上下文（BFC）

区块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

格式化上下文影响布局，通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局，因为它将：

- 包含内部浮动
- 排除外部浮动
- 阻止外边距重叠

[详细介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)

## 定位

定位会覆盖默认的常规流

### 静态定位

静态定位是每个元素的默认值，它只是意味着“将元素放入它在文档布局流中的正常位置

```css
position: static;
```

### 相对定位

相对元素本来的位置，使用 top，bottom，left 和 right 属性移动元素位置

```css
position: relative;
```

### 绝对定位

绝对定位的元素不再存在于正常文档布局流中。相反，它坐在它自己的层独立于一切。这是非常有用的：这意味着我们可以创建不干扰页面上其他元素的位置的隔离的 UI 功能。例如，弹出信息框和控制菜单；翻转面板；可以在页面上的任何地方拖放的 UI 功能

```css
position: absolute;
```

#### 子绝父相

如果所有的父元素都没有显式地定义 position 属性，那么所有的父元素默认情况下 position 属性都是 static，这样，绝对定位元素会被包含在 **初始块容器** 中。这个初始块容器有着和浏览器视口一样的尺寸，并且 \<html> 元素也被包含在这个容器里面

给父元素设置 `position: relative;` 属性，可以给子元素设置 `position: absolute;` ，改变 **定位上下文** ，这样，子元素会以父元素为基准进行定位

#### z-index

当有多个元素设置了绝对定位，它们会产生重叠现象，可以通过设置 z-index 属性决定元素的覆盖关系

默认情况下，定位的元素都具有 z-index 为 auto，实际上为 0，其属性值只能接受整数值，z-index 值大的覆盖值小的元素

### 固定定位

元素会保持在窗口的固定位置上，无论如何滚动页面

```css
position: fixed;
```

### 粘性定位

相对定位 和 绝对定位的混合，它允许被定位的元素表现得像相对定位一样，直到它滚动到某个阈值点（例如，从视口顶部起 10 像素）为止，此后它就变得固定了。

top 属性设置距离视口顶部的阈值，left 属性设置距离视口左边的阈值

```css
position: sticky;
```

#### 应用：滚动索引

在正常布局流中，\<dt>元素将随内容滚动。当我们在 \<dt> 元素上添加 position: sticky，并将 top 的值设置为 0，当标题滚动到视口的顶部时，支持此属性的浏览器会将标题粘贴到那个位置。随后，每个后续标题将替换前一个标题，直到它向上滚动到该位置

```html
<h1>Sticky positioning</h1>

<dl>
  <dt>A</dt>
  <dd>Apple</dd>
  <dd>Ant</dd>
  <dd>Altimeter</dd>
  <dd>Airplane</dd>
  <dt>B</dt>
  <dd>Bird</dd>
  <dd>Buzzard</dd>
  <dd>Bee</dd>
  <dd>Banana</dd>
  <dd>Beanstalk</dd>
  <dt>C</dt>
  <dd>Calculator</dd>
  <dd>Cane</dd>
  <dd>Camera</dd>
  <dd>Camel</dd>
</dl>
```

```css
dt {
  background-color: black;
  color: white;
  padding: 10px;
  position: sticky;
  top: 0;
  left: 0;
  margin: 1em 0;
}
```

## 弹性盒子 (flex 布局)

长久以来，CSS 布局中唯一可靠且跨浏览器兼容的创建工具只有 floats 和 positioning。这两个工具大部分情况下都很好使，但是在某些方面它们具有一定的局限性，让人难以完成任务

弹性盒子的真正价值可以体现在它的灵活性/响应性，如果你调整浏览器窗口的大小，或者增加一个 flex 项，这时的布局仍旧是好的。

### flex 模型

[flex 模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox/flex_terms.png)

- 主轴（main axis）是沿着 flex 元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 main start 和 main end。
- 交叉轴（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 cross start 和 cross end。
- flex 容器（flex container）：设置了 display: flex 的父元素
- flex 项（flex item）：在 flex 容器中表现为弹性的盒子的元素

### 指定主轴的方向

它可以指定主轴的方向——它默认值是 row，这使得 flex 项 在按你浏览器的默认语言方向排成一行（在英语/中文浏览器中是从左到右）

```css
flex-direction: column;
```

这会将 flex 项 设置为列布局：所有 flex 项 竖着排成一列

还可以使用 row-reverse 和 column-reverse 值反向排列 flex 项

### 换行

给 flex 容器设置：

```css
flex-wrap: wrap;
```

给 flex 项设置（意味着每个声明将至少为 200px 宽）：

```css
flex: 200px;
```

这样当 flex 项 过多时不会溢出，会自动换到下一行

### 简写属性 flex-flow

```css
flex-flow: row wrap;
```

等价于：

```css
flex-direction: row;
flex-wrap: wrap;
```

### 调整 flex 项尺寸

此属性是以下 CSS 属性的简写：

- flex-grow
- flex-shrink
- flex-basis

#### flex-grow

给每个 flex 项添加以下属性（相当于 flex-grow），它们会等分排布：

```css
flex: 1;
```

这是一个无单位的比例值，表示每个 flex 项沿主轴的可用空间大小。它是一个比例，这意味着将每个 flex 项的设置为 400000 的效果和 1 的时候是完全一样的

#### flex-shrink

指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值（整数比例值，默认为 1 ），值越大收缩的越多

#### flex-basis

你还可以指定 flex 的最小值：

```css
flex: 1 200px;
```

这表示，每个 flex 项将首先给出 200px 的可用空间（flex-basis），然后，剩余的可用空间将根据分配的比例共享

### 水平与垂直对齐

#### 垂直方向

给 flex 容器设置 align-items 控制所有 flex 项在交叉轴（垂直方向）上的对齐方式。

- 默认值是 stretch，其会使所有 flex 项沿着交叉轴的方向拉伸以填充父容器。如果父容器在交叉轴方向上没有固定宽度（即高度），则所有 flex 项将变得与最长的 flex 项一样长（即高度保持一致）
- center 值会使这些项保持其原有的高度，但是会在交叉轴（垂直方向）居中。
- flex-start 或 flex-end 使 flex 项在交叉轴的开始或结束处对齐所有的值。查看 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 了解更多。

你可以给某一个 flex 项设置 align-self 属性，以覆盖 align-items 的行为，这样使能够某一个 flex 项应用其他的对齐方式

#### 水平方向

justify-content 控制 flex 项在主轴上的位置。

- 默认值是 flex-start，这会使所有 flex 项都位于主轴的开始处
- 你也可以用 flex-end 来让 flex 项到结尾处
- center，可以让 flex 项在主轴居中。
- space-around，会使所有 flex 项沿着主轴均匀地分布，在任意一端都会留有一点空间。
- space-between，它和 space-around 非常相似，只是它不会在两端留下任何空间。

### flex 项排序

弹性盒子也有可以改变 flex 项的布局位置的功能，而不会影响到源顺序（即 dom 树里元素的顺序）。这也是传统布局方式很难做到的一点。

给某个 flex 项设置：

```css
order: 1;
```

- 所有 flex 项默认的 order 值是 0。
- order 值大的 flex 项比 order 值小的在显示顺序中更靠后。
- 相同 order 值的 flex 项按源顺序显示（位置越靠前顺序越靠前）。所以假如你有四个元素，其 order 值分别是 2，1，1 和 0，那么它们的显示顺序就分别是第四，第二，第三，和第一。第三个元素显示在第二个后面是因为它们的 order 值一样，且第三个元素在源顺序中排在第二个后面。
- 可以给 order 设置负值使它们比值为 0 的元素排得更前面

### 跨浏览器兼容性

大多数浏览器都支持弹性盒子，诸如 Firefox、Chrome、Opera、Microsoft Edge 和 IE 11，较新版本的 Android/iOS 等等。但是你应该要意识到仍旧有被人使用的老浏览器不支持弹性盒子（或者支持，但是只是支持非常非常老版本的弹性盒子）。

弹性盒子相较其他一些 CSS 特性可能更为棘手。例如，如果浏览器缺少 CSS 阴影，则该网站可能仍然可用。但是假如不支持弹性盒子功能就会完全打破布局，使其不可用。

## 网格布局（grid 布局）

### grid 模型

[grid 模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids/grid.png)

- 列（column）
- 行（row）
- 沟槽（gutter）：行与行、列与列之间的间隙

### 定义一个网格布局

如下，定义了网格布局，并且添加了三个宽度为 200px 的列

```css
display: grid;
grid-template-columns: 200px 200px 200px;
```

使用 fr 单位响应式定义布局列，如下，会生成等分的三列：

```css
grid-template-columns: 1fr 1fr 1fr;
```

#### repeat() 函数

第一个参数是重复次数，第二个参数是重复的值，可以使用 repeat() 简写以上的属性：

```css
grid-template-columns: repeat(3, 1fr);
```

```css
grid-template-columns: repeat(2, 2fr 1fr);

/* 相当于以下属性 */

grid-template-columns: 2fr 1fr 2fr 1fr；
```

关于第一个参数的特殊属性值：

- auto-fill，浏览器会根据每个

### 网格间隙

可以使用 grid-column-gap 属性来定义列间隙；使用 grid-row-gap 来定义行间隙，设置 grid-gap 可以同时定义列间隙和行间隙属性，如下：

```css
grid-gap: 20px;
```

gap 属性曾经有一个 grid-前缀，不过后来的标准进行了修改，目的是让他们能够在不同的布局方法中都能起作用。尽管现在这个前缀不会影响语义，但为了代码的健壮性，你可以把两个属性都写上：

```css
grid-gap: 20px;
gap: 20px;
```

### 显式网格与隐式网格

显式网格是我们用 grid-template-columns 或 grid-template-rows 属性创建的。而隐式网格则是当有内容被放到网格外时才会生成的（可以理解为每一行的高度/每一列的宽度）。显式网格与隐式网格的关系与弹性盒子的 main 和 cross 轴的关系有些类似。

隐式网格中生成的 行/列 大小是参数默认是 auto ，大小会根据放入的内容自动调整。比如，你只设置 grid-template-columns 而不设置 grid-template-rows，浏览器会自动按照内容高度设置每一行的高度。当然，你也可以使用 grid-auto-rows 和 grid-auto-columns 属性手动设定隐式网格轨道的高度。

#### minmax() 函数

可以设置行/列隐式网格的最小高/宽度，如下，行尺寸就至少为 100 像素，并且如果内容尺寸大于 100 像素则会根据内容自动调整

```css
grid-auto-rows: minmax(100px, auto);
```

特殊取值：

- max-content，表示网格的轨道长度自适应内容最大的那个单元格。
- min-content，表示网格的轨道长度自适应内容最小的那个单元格。
- auto，作为最大值时，等价于 max-content。作为最小值时，它表示轨道中单元格最小长宽 (由 min-width/min-height) 的最大值。

如果 最大值 < 最小值，则最大值被忽略并且 minmax(最小值, 最大值) 被看成最小值。\<flex>（fr 值） 作为最大值时设置网格轨道的弹性系数；作为最小值时无效。

#### 应用：真正的响应式布局网格

```css
grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
```

代码逻辑：

- 代码做了什么？为容器设置了 n 列网格
- n 如何确定？通过 repeat() 函数决定列数
- 列数如何确定？auto-fill 属性值会根据第二个参数（网格项的宽度），尽可能在每一行内放入更多的网格项
- 网格项的宽度如何确定？minmax() 函数定义了网格项宽度的最小值和最大值，\<flex>（fr 值）作为最大值时设置网格轨道的弹性系数，而最小值由 min() 函数决定
- min() 函数如何确定网格项的最小值？如果网格项的宽度大于父容器的 100%，min() 函数会选取较小的值：100%，如果网格项的宽度小于父容器的 100%，min() 函数会选取较小的值：200px。这样避免了当网格项太宽时的溢出问题

效果：

- body 中放置了许多 div
- 每个 div 的宽度必须至少为 200px。如果右侧有额外空间（小于 200 像素），div 会展开以填充空间。
- 如果我们拓宽窗口宽度，一旦又有 200 像素的空间，就会在行中添加另一个 div。
- 当我们缩小窗口宽度时，一旦没有至少 200px 的空间可以容纳，行中的最后一个 div 就会进入下一行。一旦该 div 掉下去，其余的 div 就会展开以填满该行。
- 当我们继续缩小窗口宽度，直到小于 200px，这时 min() 函数起到作用，列的宽度会继续缩小，不会产生溢出

### 根据网格线放入元素

在定义完了网格之后，我们要把元素放入网格中。我们的网格中有许多分隔线，第一条线的起始点与文档书写模式相关。

在英文中，第一条列分隔线在网格的最左边而第一条行分隔线在网格的最上面。而对于阿拉伯语，第一条列分隔线在网格的最右边，因为阿拉伯文是从右往左书写的。

我们根据这些分隔线来放置元素，通过以下属性来指定从那条线开始到哪条线结束。

- grid-column-start
- grid-column-end
- grid-row-start
- grid-row-end

这些属性的值均为分隔线序号，你也可以用以下缩写形式来同时指定开始与结束的线。

- grid-column
- grid-row

元素从第一条网格线开始，到第三条网格线结束：

```css
grid-column: 1 / 3;
```

元素在第二个网格项上（等同于 `grid-column: 2 / 3;` ）：

```css
grid-column: 2;
```

元素从第一条网格线开始，跨越 2 个网格项：

```css
grid-column: 1 / span 2;
```

### 根据区域放入元素

给父容器设置属性：

```css
grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
```

给元素添加属性，放到定义的 header 区域：

```css
header {
  grid-area: header;
}
```

grid-template-areas 属性的使用规则如下：

- 你需要填满网格的每个格子
- 对于某个横跨多个格子的元素，重复写上那个元素 grid-area 属性定义的区域名字
- 所有名字只能出现在一个连续的区域，不能在不同的位置出现
- 一个连续的区域必须是一个矩形
- 使用.符号，让一个格子留空

## 多列布局

多列布局声明提供了一种多列组织内容的方式，正如你在一些报纸中看到的那样

### 定义一个多列布局

如下，定义了一个三列布局，创建的这些列具有弹性的宽度，由浏览器计算出每一列分配多少空间

```css
.container {
  column-count: 3;
}
```

如下，设置列宽方式创建多列，浏览器将按照你指定的宽度尽可能多的创建列；任何剩余的空间之后会被现有的列平分。这意味着你可能无法期望得到你指定宽度，除非容器的宽度刚好可以被你指定的宽度除尽

```css
.container {
  column-width: 200px;
}
```

### 添加样式

使用 column-gap 改变列间间隙

```css
.container {
  column-gap: 20px;
}
```

用 column-rule 在列间加入一条分割线，这条分割线本身并不占用宽度，它置于用 column-gap 创建的间隙内

```css
.container {
  column-rule: 4px dotted rgb(79, 185, 227);
}
```

### 打印页面时的内容折断

当你 ctrl+p 打印页面时，由于打印分页，可能会折断一列上的内容，可以给列中的某一项设置以下属性：

```css
break-inside: avoid;
page-break-inside: avoid;
```

这样如果此元素在一页上显示不全（会被页面分割），会自动移动到下一页上

旧属性 page-break-inside: avoid 能够获得更好的浏览器支持

## 传统的布局方法

### 响应式两列布局

html 结构：

```
html - body - div
            - div
```

css 代码：

```css
body {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
}

div:nth-of-type(1) {
  width: 48%;
  float: left;
}

div:nth-of-type(2) {
  width: 48%;
  float: right;
}
```

在上面的代码中，实现了响应式的两列布局：

- 我们给 body 设置了最大宽度 900px，并且宽度为其父元素 html 的 90%，这样，无论怎么缩小窗口范围，body 的宽度一直是窗口的 90%，且无论窗口有多大，宽度不会超过 900px。
- 两个 div 的宽度也是百分数，所以也实现了响应式，并且为两列之间留下了 4% 的间隙

### 传统响应式网格

我们会使用浮动，构建一个有 12 列的表格，且有 13 个列间间隙（flex 中的 space-around 布局）。我们选择了 12 这个常见的数字，来看它对不同情景的适应情况，因为 12 可以被 6，4，3，和 2 完全整除

html 代码：

```html
<div class="wrapper">
  <div class="row">
    <div class="col">1</div>
    <div class="col">2</div>
    <div class="col">3</div>
    <div class="col">4</div>
    <div class="col">5</div>
    <div class="col">6</div>
    <div class="col">7</div>
    <div class="col">8</div>
    <div class="col">9</div>
    <div class="col">10</div>
    <div class="col">11</div>
    <div class="col">12</div>
  </div>
  <div class="row">
    <div class="col span1">13</div>
    <div class="col span6">14</div>
    <div class="col span3">15</div>
    <div class="col span2">16</div>
  </div>
</div>
```

以上代码构建 2 行 12 列的网格，第一行中有 12 个元素，每个元素占 1 列格子，第二行中有 4 个元素，分别占：1、6、3、2 列格子（总共占满 12 列格子）

css 代码：

```css
* {
  box-sizing: border-box;
}

body {
  width: 90%;
  max-width: 980px;
  margin: 0 auto;
}

.wrapper {
  padding-right: 2.08333333%;
}

.row {
  clear: both;
}

.col {
  float: left;
  margin-left: 2.08333333%;
  width: 6.25%;
  background: rgb(255, 150, 150);
}
```

代码分析：

- 这里使用替代盒子模型（box-sizing: border-box;），使元素的宽度包含边框、内外边距，这样为的是可以通过设置边距，挤压内容区域的宽度
- body 设置了响应式的宽度，并且最大宽度为 980 px，为什么是 980px ？将每列的最大宽度设置为 60（共有 12 列），且将最大列间间隙设置为 20（共有 13 个间隙），加起来正好为 980，即 980 = 12 _ 60 + 13 _ 20，这样做是使用整数，方便计算
- 给父容器 wrapper 设置右边的内边距，这样做是为了补上最后的间隙，并且，每个列元素都有一个左外边距（共 12 个），这样一共有 13 个间隙。为什么是 2.08333333% ？为了响应式，需要计算每个间隙在上下文宽度中的占比，即 20 / 960 = 0.02083333333，960 是上下文宽度（980 的总宽度减去 20 的右内边距）
- 给每一行设置了清除浮动，这样我们不用在每行上都填充 12 列元素。行与行之间不会互相干扰，并保持分隔（哪怕上一行有空间，下一行的内容也不会移动到上一行）
- 给每一列设置浮动、间隙、宽度、背景。宽度如何计算的？60 / 960 = 0.0625

到此为止，已经完成了网格的初步搭建，如何将元素放置到网格中呢？

```css
.col.span2 {
  width: calc((6.25% * 2) + 2.08333333%);
}
.col.span3 {
  width: calc((6.25% * 3) + (2.08333333% * 2));
}
.col.span4 {
  width: calc((6.25% * 4) + (2.08333333% * 3));
}
.col.span5 {
  width: calc((6.25% * 5) + (2.08333333% * 4));
}
.col.span6 {
  width: calc((6.25% * 6) + (2.08333333% * 5));
}
.col.span7 {
  width: calc((6.25% * 7) + (2.08333333% * 6));
}
.col.span8 {
  width: calc((6.25% * 8) + (2.08333333% * 7));
}
.col.span9 {
  width: calc((6.25% * 9) + (2.08333333% * 8));
}
.col.span10 {
  width: calc((6.25% * 10) + (2.08333333% * 9));
}
.col.span11 {
  width: calc((6.25% * 11) + (2.08333333% * 10));
}
.col.span12 {
  width: calc((6.25% * 12) + (2.08333333% * 11));
}
```

这里通过给元素设置以上定义的样式类（span2、span3......），实现元素的跨列。可以根据跨越的列数，计算得到元素宽度：(列宽度 _ n) + (间隙宽度 _ (n-1))

在标记中添加类以定义布局，意味着你的内容和标记与你的可视化表示相关联。你将会偶尔听到，这种使用 CSS 类的方式，被描绘成“无语义”：**_描述了内容的外观，而不是描述内容的语义性的类的使用。_** 这是我们的 span2、span3 等类所面临的情况。

如何让元素向右偏移一列？

```css
.offset-by-one {
  margin-left: calc(6.25% + (2.08333333% * 2));
}
```

通过给元素设置以上定义的样式类实现，当一个元素设置了这个类，此元素会向右偏移 1 列

#### 浮动网格的限制

- 使用时需要注意，元素跨越的列数不能超过网格定义的列数，如果一行中跨越的总列数大于定义的列数，那么后面的元素会被挤到下一行
- 如果元素内容比行宽，它会溢出
- 如果不设置一个确定的高度，很难自动控制元素高。这个方法很不灵活，它只有在你确定你的内容有个明确的高的情况下有用。

### 弹性盒实现网格？

弹性盒设计上是一维。它处理单个维度，行的或者列的。我们不能创建一个对行列严格要求的网格，意即如果我们要在我们的网格上使用弹性盒的话，我们仍然需要计算浮动布局的百分比。

在你的工程中，由于弹性盒相比浮动能提供附加的对齐和空间分布能力，你可能仍然选择使用弹性盒“网格”。但是你应该清楚，你仍然是在使用一个被设计用来做其他事情的工具。所以你可能觉得，这就像是在你抵达你想要的结果之前，让你跳过额外的坑。

### 第三方网格系统

- [Bootstrap](https://getbootstrap.com/)
- [Foundation](https://get.foundation/)
- [Skeleton](http://getskeleton.com/)