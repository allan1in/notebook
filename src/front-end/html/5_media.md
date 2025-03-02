# 媒体标签

## \<img>

图片，属于替换元素（replaced elements），即元素的内容和大小由外部资源（如图像或视频文件）定义，而不是由元素本身的内容定义。

```html
<img
  src="https://www.example.com/images/dinosaur.jpg"
  alt="恐龙"
  width="300"
  height="270"
/>
```

- 文件名要有意义，这样有利于 SEO
- 最好不要把链接指向别人的网站资源（热链接），这样不道德，不稳定
- 属性 alt，备选文字，图片加载失败时的显示文字，可用于无障碍，内容一般是对图片内容的描述。如果只是为了装饰，或者文字内容已经介绍了图片内容，写 alt="" 即可
- width 和 height 属性，设置图片宽高。由于图片资源和 html 文档分别由相互独立的 http 请求获取，当图片加载较慢时，会只渲染 html，等待图片传输完毕后在渲染图片，这样会导致布局的改变，因此可以通过设置宽高，先对图片区域进行占位，以固定布局。[图片渲染后布局的改变](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML/no-size.png)
- title 属性，鼠标悬停时显示文字，不利于无障碍，不推荐
- 图片资源网站，[https://pixabay.com/](https://pixabay.com/)
- 为什么不用 css 背景图片？css 没有备选文本，并且不支持无障碍阅读，更适合以装饰为目的的图片

### 响应式图片

#### 不同尺寸

```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px, 800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

- srcset 参数：文件名 图片的固有宽度 w
- sizes 参数：(媒体查询条件) 条件为真时图片要填充的插槽宽度，默认宽度
- src 的作用：支持旧浏览器

浏览器的动作：识别视口宽度，依次检查 sizes 中的媒体条件是否为真（没有条件算真），如例子中的 max-width: 600px 表示视口宽度最大为 600px ，如果为真，加载 srcset 中第一个固有宽度等于插槽宽度的图片，若没有，则加载第一个固有宽度大于插槽宽度的图片

要指定在某个宽度下使用特定图像候选代表的图像资源，使用 w 宽度描述符，包含表示该宽度的数字（以像素为单位）+ 小写字母 w。例如，渲染一个 450 像素宽的图像对应的描述符字符串： 450w。指定的宽度必须是正数、非零整数，并且必须与引用图像的固有宽度相匹配。

#### 相同尺寸不同分辨率

```html
<img
  srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
  src="elva-fairy-640w.jpg"
  alt="Elva dressed as a fairy"
/>`
```

srcset 中 1.5x 代表设备像素比（DPR, device pixel ratio），计算方式：逻辑像素/物理像素，1.5x 表示 1 个逻辑像素用 1.5 个物理像素表示，DPR 越大，图像越细腻。此例中，浏览器会根据 DRP 选取合适的图片，不需要使用 sizes 属性，这样可以实现在高分辨率下的屏幕上，图片拥有更高的像素密度（它们的宽度都是一样的，因为宽度的单位 px 是固定的（1/96 英尺））。

可以使用像素密度描述符，它指定了在什么样的显示器像素密度下应用相应的图像资源。它是通过将像素密度声明为正的非零浮点值，后跟小写字母 x 来编写的。例如，要指定在像素密度是标准密度的两倍时使用相应的图像，你可以提供像素密度描述符 2x 或 2.0x

## \<picture>

### 响应式加载图片（不同美术风格）

下面的例子可以根据视口宽度的不同加载不同尺寸的图片，与 img 响应式的不同：img 侧重于不同分辨率，picture 侧重于图片尺寸的裁剪（美术风格），目的是让图片的主题内容在小屏设备上更加突出。

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```

- media 属性，媒体查询条件，满足条件则使用此图片源

- srcset 属性，图片文件路径

- img 标签是必须的

- 为什么不用 js css 实现响应式？浏览器在执行 js css 之前，会根据 html 对图片进行预加载

## \<figure>

figure（数值），代表一段内容（图片、表达式、表格、音视频），一般和 \<figcaption> 配合使用

```html
<figure>
  <img
    src="images/dinosaur.jpg"
    alt="The head and torso of a dinosaur skeleton; it has a large head with long sharp teeth"
  />
  <figcaption>
    A T-Rex on display in the Manchester University Museum.
  </figcaption>
</figure>
```

alt 的内容不要和 figcaption 的内容一样，因为它们有可能同时出现

## \<figcaption>

figure caption(标题)，一般在 \<figure> 标签内，用于描述 \<figure> 的内容

## \<video>

视频

```html
<video
  controls
  width="400"
  height="400"
  autoplay
  loop
  muted
  preload="auto"
  poster="poster.png"
>
  <source src="rabbit320.mp4" type="video/mp4" />
  <source src="rabbit320.webm" type="video/webm" />
  <p>你的浏览器不支持此视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

- controls 属性，视频控件，无具体值，属性出现就生效

- \<p> 标签中的内容，后备内容，\<video> 标签无法加载时出现

- 关于文件格式，mp4 和 webM 可覆盖绝大多数的浏览器

- width 和 height ，设置宽高，原视频尺寸不会随宽高改变，空白会填充背景的颜色（默认 #000）

- source 标签，之后单独介绍

- autoplay 属性，音频和视频内容立即播放，即使页面的其他部分还没有加载完全。建议不要轻易使用，用户可能会反感

- loop 属性，循环播放，不建议使用

- muted 属性，默认静音

- poster 属性，内容为视频预览图片的路径，在视频播放前展示

- preload 属性，有三个值可选，"none"：不缓冲文件，"auto"：页面加载后缓存媒体文件，"metadata"：仅缓冲文件的元数据，即视频的文件名、时长、音轨、视频轨等（详见[视频容器结构](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content/containersandtracks.png)）

## \<audio>

音频，主流格式 mp3 和 ogg

```html
<audio controls>
  <source src="viper.mp3" type="audio/mp3" />
  <source src="viper.ogg" type="audio/ogg" />
  <p>你的浏览器不支持该音频，可点击<a href="viper.mp3">此链接</a>收听。</p>
</audio>
```

属性与 \<video> 的基本一致，除了不支持 width 和 height 属性，不支持 poster 属性

## \<source>

文件源，单标签，放在 \<video> 标签或 \<audio> 标签内。浏览器会根据其 type 属性，判断是否支持该文件格式，选取第一个支持的文件源进行播放

## \<track>

字幕，cc (Closed Caption) 可关闭字幕

```html
<video controls>
  <source src="example.mp4" type="video/mp4" />
  <source src="example.webm" type="video/webm" />
  <track kind="subtitles" src="subtitles_es.vtt" srclang="es" label="Spanish" />
</video>
```

- kind 属性，有以下可选属性值，subtitles（字幕，包括翻译、额外信息，针对**_听不懂_**的人）、captions（字幕，包括音效文字，针对**_听不见_**的人）、~~descriptions（描述，视频内容的文本描述，针对**_看不见_**的人）~~

- src 属性，指向字幕文件，vtt 格式，webVTT 文件的一般格式如下，包含多个时间提示性内容（cue）

```
WEBVTT

1
00:00:22.230 --> 00:00:24.606
第一段字幕

2
00:00:30.739 --> 00:00:34.074
第二段
```

- srclang 属性，表示字幕语言类型，如果 kind="subtitles" ，则为必填项

- label 属性，给出的字幕标题，会展示给用户，以供用户选择适合自己的字幕

- 示例，对默认视频播放器的封装，[展示](https://iandevlin.github.io/mdn/video-player-with-captions/)，[源码](https://github.com/iandevlin/iandevlin.github.io/tree/master/mdn/video-player-with-captions)

## \<iframe>

嵌入其他网页

```html
<iframe
  src="https://developer.mozilla.org/zh-CN/docs/Glossary"
  width="100%"
  height="500"
  allowfullscreen
  sandbox
>
  <p>
    <a href="/zh-CN/docs/Glossary"> 为不支持 iframe 的浏览器预留的后备链接 </a>
  </p>
</iframe>
```

- border 属性，默认附带边框，border: none 可去除边框

- allowfullscreen 属性，允许将 iframe 设置为全屏模式

- sandbox 属性，为嵌入内容设置严格的限制，若想开放权限，可添加参数，[详见](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#sandbox)

4. 内容安全策略（ Content-Security-Policy ），提供一组标头，以提高 iframe 的安全性，服务器添加标头 X-Frame-Options: DENY，可使得此页面被 frame 嵌入时会无法加载

## \<object>

嵌入外部资源，例如 pdf

```html
<object data="mypdf.pdf" type="application/pdf" width="800" height="1200">
  <p>
    You don't have a PDF plugin, but you can
    <a href="mypdf.pdf">download the PDF file. </a>
  </p>
</object>
```

## \<embed>

嵌入外部资源或插件，例如 flash，现已基本弃用

## \<svg>

SVG 是用于描述矢量图像的标记语言，它基于 XML。

```html
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

- 优点：矢量图像中的文本仍然可访问（这也有利于 SEO）。SVG 图像的每个组件都可以通过 CSS 或通过 JavaScript 设置样式的元素。

- 缺点：SVG 容易变得复杂，复杂的 SVG 也会占用浏览器很长的处理时间。SVG 可能比位图更难创建。

- 位图制作软件：Adobe Illustrator、Inkscape

- img 引入方式，无法使用 js 修改

```html
<img src="equilateral.svg" alt="等边三角形" height="87px" width="100px" />
```

    对于不支持svg引入的浏览器兼容

```html
<img src="equilateral.png" alt="等边三角形" srcset="equilateral.svg" />
```

- svg 引入方式，方便 js 、 css 修改

```html
<svg width="300" height="200">
  <rect width="100%" height="100%" fill="green" />
</svg>
```

- iframe 引入方式，不建议

```html
<iframe src="triangle.svg" width="500" height="500" sandbox>
  <img src="triangle.png" alt="Triangle with three unequal sides" />
</iframe>
```
