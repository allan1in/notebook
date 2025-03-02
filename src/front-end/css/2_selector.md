# CSS 选择器

## 选择器列表（选择器并集）

```css
h1,
.special {
  color: blue;
}
```

- 多个选择器用逗号分隔，为多个标签赋予相同的属性
- 如果其中任何一个选择器无效 (存在语法错误)，那么整条规则都会被忽略

## 选择器交集

```css
/* 选择元素类型为 a，class 为 title 的元素 */

a.title {
  color: red;
}
```

## 基础选择器

### 类型选择器

也叫做标签名选择器或者是元素选择器，根据标签名称选择

```css
span {
  background-color: yellow;
}
```

### 全局选择器

选中了文档中的所有内容（或者是父元素中的所有内容，比如，它紧随在其他元素以及邻代运算符之后的时候）

```css
* {
  margin: 0;
}
```

使用全局选择器，让选择器更易读，如下面的例子，选取 \<article> 下所有标签中的第一个元素（其实 \* 是可以省略掉的，为了可读性最好写上）

```css
article *:first-child {
  ......;
}
```

### class 选择器

根据标签的 class 属性值选择标签

```css
.highlight {
  background-color: yellow;
}
```

多个 class 指向同一个元素时，两个选择器直接相连（不需要空格），如下面的例子，表示选择同时有 notebox 和 warning 两个 class 的元素

```css
.notebox.warning {
  border-color: orange;
  font-weight: bold;
}
```

### id 选择器

根据标签的 id 属性值选择标签

```css
#one {
  background-color: yellow;
}
```

ID 所指特定，会优先于大多数其他选择器，所以很难处理它们。大多数情况下，给一个元素加个 class，而不是使用 ID，会更好

## 属性选择器

### 根据存在和值选择

#### [attr]

匹配带有指定属性（方括号中的值）的元素，如下，表示选择类型为 li 且带有 class 属性的元素

```html
<li class="anyvalue">Item 2</li>
```

```css
li[class] {
  font-size: 200%;
}
```

#### [attr=value]

匹配带有指定属性（方括号中的值）的元素，且属性值为指定值（引号中的值），如下，表示选择类型为 li 、有 class 属性、属性值为 a 的元素

```html
<li class="a">Item 2</li>
```

```css
li[class="a"] {
  background-color: yellow;
}
```

#### [attr~=value]

匹配带有指定属性（方括号中的值）的元素，且属性值中 **_至少有一个_** 为指定值（引号中的不同属性值用空格分隔），如下，表示选择类型为 li 、有 class 属性、属性值中 **_至少有一个_** 为 a 的元素

```html
<li class="bc a d">Item 2</li>
```

```css
li[class~="a"] {
  color: red;
}
```

#### [attr|=value]

匹配带有指定属性（方括号中的值）的元素，且属性值中 **_第一个值_** 为指定值（引号中的不同值用连字符分隔），如下，表示选择类型为 li 、有 class 属性、属性值中 **_第一个值_** 为 a 的元素 **_（第一个值后必须紧接着一个连字符 - ，或者只有这一个值）_**

```html
<li class="a-b-c">Item 2</li>
<li class="a">Item 2</li>
```

```css
li[class|="a"] {
  color: red;
}
```

### 根据子字符串匹配选择

#### [attr^=value]

匹配带有指定属性（方括号中的值）的元素，且属性值的 **_开头_** 为指定值（引号中的值），如下，表示选择类型为 li 、有 class 属性、属性值的 **_开头_** 为 a 的元素

```html
<li class="abc">Item 1</li>
```

```css
li[class^="a"] {
  font-size: 200%;
}
```

#### [attr$=value]

匹配带有指定属性（方括号中的值）的元素，且属性值的 **_结尾_** 为指定值（引号中的值），如下，表示选择类型为 li 、有 class 属性、属性值的 **_结尾_** 为 a 的元素

```html
<li class="cba">Item 1</li>
```

```css
li[class$="a"] {
  background-color: yellow;
}
```

#### [attr*=value]

匹配带有指定属性（方括号中的值）的元素，且属性值中 **_至少有一处_** 为指定值（引号中的值），如下，表示选择类型为 li 、有 class 属性、属性值中 **_至少有一处_** 为 a 的元素

```html
<li class="bac">Item 1</li>
```

```css
li[class*="a"] {
  color: red;
}
```

#### 属性值大小写敏感

设置要匹配的属性值大小写不敏感，i 标记

```html
<li class="Abc">Item 1</li>
```

```css
li[class^="a" i] {
  color: red;
}
```

## 伪类和伪元素

伪类是选择器的一种，它用于选择处于特定状态的元素

伪元素表现得像往标记文本中加入全新的 HTML 元素一样，而不是向现有的元素上应用类

### 简单伪类

#### :first-child

选择一组兄弟元素中的第一个，如下，选择类型为 article 元素之下、既是父元素的第一个子元素也是 p 类型的元素

```css
article p:first-child {
  font-size: 120%;
  font-weight: bold;
}
```

#### :last-child

选择一组兄弟元素中的最后一个，如下，选择类型为 article 元素之下、既是父元素的最后一个元素也是 p 类型的元素

```css
article p:last-child {
  font-size: 120%;
  font-weight: bold;
}
```

#### :nth-child()

根据元素在父元素的子元素列表中的索引 **_（从 1 开始）_** 来选择元素

- 关键字值：even（偶数）或 odd（奇数）

```css
li:nth-child(even) {
  background-color: lightyellow;
}
```

- 函数符号：An+B ，其中 A B 为自定义的常数值，n 是从 0 开始不断递增的整数

```css
/* 选取前 3个 class 为 important 且类型为 li 的元素 */

li.important:nth-child(-n + 3)

/* 兄弟元素列表中的第 8 到第 15 个，且为 p 元素的元素 */

p:nth-child(n+8):nth-child(-n+15)
```

- of \<selector> 语法

```css
/* 匹配前三个设置了 class="important" 的列表项 */

:nth-child(-n + 3 of li.important) {
  ...;
}
```

#### :only-child

没有兄弟元素

```html
<ol>
  <li>Robert Downey, Jr.</li>
</ol>
```

```css
li:only-child {
  color: fuchsia;
}
```

#### :nth-of-type

将所有满足选择器要求的元素排序，按照这个排序，根据参数选取元素。

比如下面的第一个例子，找到所有的 p 元素，并选取它们中序号为 2n+1 的元素（序号从 1 开始，且 n 为从零开始递增的整数）

```css
/* 奇数段 */
p:nth-of-type(2n + 1) {
}
p:nth-of-type(odd) {
}

/* 偶数段 */
p:nth-of-type(2n) {
}
p:nth-of-type(even) {
}

/* 第一段 */
p:nth-of-type(1) {
}
```

#### :is()

以容错选择器列表作为参数，选择参数中的所有选择器

**_容错选择器列表_** 意味着哪怕选择器列表中有一个选择器是无效的，其他选择器仍然可以正常执行。而对于使用逗号分隔的选择器列表来说，只要有一个选择器无效，其他选择器也会失效

```css
section h1,
article h1,
aside h1,
nav h1 {
  font-size: 25px;
}

/* 下面是使用 :is() 伪类简化后的选择器 */

:is(section, article, aside, nav) h1 {
  font-size: 25px;
}
```

#### :where()

和 :is() 的用法一样，唯一不同之处在于，:is() 的选择器优先级 由 选择器列表中 优先级最高的选择器 决定，而 :where() 的优先级始终为 0

#### :not()

反选伪类（negation pseudo-class），参数是选择器列表（没有容错了），表示除了这些选择器，其他元素都会被选中

- 可以使用此伪类编写无用的选择器。例如，:not(\*) 匹配任何不是元素的元素，这显然是荒谬的，所以这个附加的规则将永远不被应用。
- 可以利用这个伪类提高规则的优先级。例如，#foo:not(#bar) 和 #foo 都将匹配相同的元素，但是具有两个 id 的选择器具有更高的优先级。
- :not() 伪类的优先级将由其逗号分割的参数中优先级最高的选择器指定；提供与 :not(:is(argument)) 相同的优先级。
- :not(.foo) 将匹配任何非 .foo 的元素，包括 \<html> 和 \<body>，因此，最好和关系选择器搭配使用。
- 这个选择器将匹配任意“不是一个 X”的元素。当与后代选择器一起使用，这可能令人惊讶，因为有多种路径可以选择一个目标元素。
- 你可以同时否定多个选择器。例如：:not(.foo, .bar) 等同于 :not(.foo):not(.bar)。
- 如果传递给 :not() 伪类的选择器无效或者浏览器不支持，则整个规则都将是无效的。克服这种行为的有效方式是使用 :is 伪类（例如 :not(:is()) ），它接受一个可容错选择器列表。

### 用户行为伪类

一些伪类只会在用户以某种方式和文档交互的时候应用，也叫动态伪类

#### :hover

鼠标悬浮时触发

#### :focus

鼠标获取焦点时触发

#### :invalid

选择未通过验证的表单元素（\<form>、\<fieldset>、\<input> 等）

```html
<input id="secret" name="secret" type="text" value="test" pattern="[a-z]+" />
```

```css
input:invalid {
  background-color: ivory;
  border: none;
  outline: 2px solid red;
  border-radius: 5px;
}
```

### 伪元素

#### ::first-line

只选中元素中文字的第一行

```html
<!-- 无论屏幕宽度或者字体大小如何改变，总是选中 p 元素中的第一行 -->

<article>
  <p>
    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
  </p>
  <p>Gumbo beet greens corn soko endive gumbo gourd.</p>
</article>
```

```css
article p::first-line {
  font-size: 120%;
  font-weight: bold;
}

<!-- 伪类和伪元素的组合使用 -- > article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```

#### ::before

在元素的前方插入伪元素，必须有 content 属性

content 中不建议输入内容，因为屏幕阅读器无法识别

```html
<!-- 应用：在文字后插入图标 -->

<p class="box">Content in the box in my HTML page.</p>
```

```css
.box::after {
  content: " ➥";
}
```

应用：利用 CSS 实现三角形，伪元素，[带箭头的盒子](https://cssarrowplease.com/)

#### ::after

在元素的前方插入伪元素，和 ::before 用法一样

## 关系选择器

### 后代选择器

空格，选择所有的后代元素，包括儿子、孙子。。。

```css
.box p {
  color: red;
}
```

### 子代选择器

> ，选择儿子元素

```css
ul > li {
  border-top: 5px solid red;
}
```

### 临接兄弟选择器

+，选择同一级的兄弟元素（必须紧邻在其之后）

```html
<h1>A heading</h1>
<p>Gumbo beet greens corn soko endive gumbo gourd.</p>
```

```css
/* 选择和 \<h1> 同级且紧邻的 \<p> 标签（同级、紧邻之后必须都要满足，缺一不可）*/

h1 + p {
  font-weight: bold;
}
```

### 通用兄弟选择器

~，选择元素之后的所有兄弟元素，即使不相邻

```css
h1 ~ p {
  font-weight: bold;
}
```
