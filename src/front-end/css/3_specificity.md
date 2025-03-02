# CSS 优先权

## CSS 层叠（级联）

当多个 css 规则同时运用在一个元素上时，会产生样式表的 **_层叠_** （Cascade），这是一个合并冲突样式的过程，如何判断哪个样式规则生效呢？主要从以下几个方面判断：

判断顺序：从上到下，上一级一样则判断下一级，直到某一个规则优先级胜出

1. 重要程度：属性值后有 !important ，属性优先级最高
2. 样式来源
3. 层叠层
4. 选择器优先级
5. 出现顺序：后面的规则会覆盖前面的规则

## 样式来源

CSS 可根据来源分为 3 种类型：用户代理样式表（浏览器默认的）、用户样式表（用户写的）、作者样式表（开发人员写的）

用户样式表有什么用？假如用户有视力障碍，需要将文字放大 200%，这时候可以通过设置用户样式表覆盖原有的 CSS

优先级 **_由低到高_** 如下：

1. 用户代理样式表中的声明（例如，浏览器的默认样式，在没有设置其他样式时使用）
2. 用户样式表中的常规声明（由用户设置的自定义样式）
3. 作者样式表中的常规声明（这些是我们 web 开发人员设置的样式）
4. 正在动画的样式
5. 作者样式表中的 !important 声明
6. 用户样式表中的 !important 声明
7. 用户代理样式表中的 !important 声明
8. 正在过渡的样式

为什么 !important 的优先级相反？为了保证用户样式表能够有足够的优先级去覆盖其他样式表

## 层叠层（级联层）

### 创建层叠层

#### @layer 声明方式

使用 @layer 声明规则，这将创建一个或多个没有分配任何样式的具名层

```css
@layer theme，layout，utilities;
```

- 越靠后声明的层优先级越高
- 通常，你需要在 CSS 的第一行声明这个 @layer，以便完全控制层的顺序。
- 如果上述声明是站点 CSS 的第一行，那么层的顺序将是 theme、layout 和 utilities。
- 如果在上述语句之前已经创建了一些层，例如，如果 layout 已经存在，只会创建 theme 和 utilities，层顺序将是 layout、theme 和 utilities

#### @layer 块方式

可以使用块 @layer 来创建匿名层或具名层

```css
/* 创建第一个层：具名层 `layout` */
@layer layout {
  main {
    display: grid;
  }
}

/* 创建第二个层：匿名层 */
@layer {
  body {
    margin: 0;
  }
}
```

- 越靠后创建的层优先级越高
- 没有办法重新排序已声明的层。如果在创建层之后，使用 @layout 声明，并且声明的是已经创建的层，声明将无法改变优先级顺序，仍然是 @layout 块的创建顺序决定优先级顺序
- 未命名的层，没有办法引用它们或向它们添加额外的样式
- 在层之外声明的所有样式都会加入到一个隐含的层中，这个隐含层会被排到声明列表的最后面，即拥有最高的优先级

关于层创建与媒体或特性查询

如果你使用媒体或特性查询来定义层，且媒体不匹配或特征不被支持，则不会创建该层（这有些反直觉，通常哪怕没有声明，使用 @layout 块仍可创建层）

```css
/* 表示最小宽度不小于 50em 时创建 site 层，否则不建立 site 层 */

@media (min-width: 50em) {
  @layer site;
}

@layer page {
  h1 {
    text-decoration: overline;
    color: red;
  }
}

@layer site {
  h1 {
    text-decoration: underline;
    color: green;
  }
}
```

#### 使用 @import 将样式表导入层

导入时，@import 语句必须出现在 \<style> 代码块的最前面

以下层分别将样式表导入 components 层、components 层中的嵌套 dialog 层和一个未命名层

```css
@import url("components-lib.css") layer(components);
@import url("dialog.css") layer(components.dialog);
@import url("marketing.css") layer();
```

将多个 CSS 文件导入到单个层中

```css
@import url(comments.css) layer(social);
@import url(sm-icons.css) layer(social);
```

使用媒体查询和特性查询根据特定条件导入样式并创建层，以下将样式表导入到 international 层，但前提是浏览器支持 display: ruby，而且被导入的文件取决于屏幕的宽度

```css
@import url("ruby-narrow.css") layer(international) supports(display: ruby) and
  (width < 32rem);
@import url("ruby-wide.css") layer(international) supports(display: ruby) and
  (width >= 32rem);
```

### 嵌套层

嵌套层是具名层或匿名层中的子层。每个层叠层（即使是匿名的）都可以包含嵌套层。导入到另一个层中的层会成为该层中的嵌套层。

#### 创建嵌套层

嵌套层和普通层叠层一样，也可以通过三种方式创建：声明、块、@import，只不过声明、@import 用点表示法（ dad-layer.son-layer ）表示嵌套关系，块使用块中嵌套块的方式表示

```css
@import url("components-lib.css") layer(components);
@import url("narrowtheme.css") layer(components.narrow);
```

- 在第一行中，我们将 components-lib.css 导入 components 层。如果该文件包含任何层，无论命名与否，这些层都会成为 components 层中的嵌套层。
- 第二行将 narrowtheme.css 导入 narrow 层，narrow 是 components 的子层。嵌套的 components.narrow 会作为 components 层中的最后一个层创建，除非 components-lib.css 已经包含一个 narrow 层，在这种情况下，narrowtheme.css 的内容会被附加到 components.narrow 嵌套层。

```css
/* 向 components.narrow 嵌套层添加样式 */

@layer components.narrow {
  main {
    width: 50vw;
  }
}
```

### 如何确定优先权

#### 常规层叠层的优先权顺序

```css
@import url(A.css) layer(firstLayer);
@import url(B.css) layer(secondLayer);
@import url(C.css);
```

上面的例子优先权如下（从低到高）：

1. firstLayer 普通样式（A.css）
2. secondLayer 普通样式（B.css）
3. 未分层普通样式（C.css）
4. 内联普通样式
5. 动画样式
6. 未分层重要样式（C.css）
7. secondLayer 重要样式（B.css）
8. firstLayer 重要样式（A.css）
9. 内联重要样式
10. 过渡样式

如果样式有冲突，后面的样式会覆盖前面的样式

#### 嵌套层叠层的优先权顺序

- 非嵌套样式优先于普通嵌套样式
- 晚创建或声明的嵌套层样式优先于先创建的
- 对于重要样式，前面规则的优先级反转

## 选择器优先级

- 基本思想：选择器越具体，css 优先级越高
- 巧妙利用优先级，通过样式的覆盖，可以减少代码量
- 浏览器如何计算优先级呢？计算方法：ID-类（属性选择器、伪类选择器）-元素（伪元素），分别对应，百位-十位-个位

```css
/* 有0个ID选择器，有2个类选择器，有2个元素选择器，因此优先级为 0-2-2 */
li > a[href*="en-US"] > .inline-warning{
  ...
}
```

- 如何比较优先级？先比较 ID，ID 如果一样则比较类，类如果一样则比较标签
- 特殊伪类的优先级：:where() 的优先级永远为 0，:is() :not() 的优先级由括号中优先级最高的选择器决定
- 通用选择器（\*）、组合符（+、>、~、' '）优先级都为 0
