# 基本引用类型

引用类型：又称为对象定义，描述了对象应有的属性和方法，引用值（对象）是某个特定引用类型的实例

ECMAscript 中的引用类型经常被人们和 Java 中的类混淆。ECMAscript 虽然上是一种面向对象语言，但是缺少传统面向对象编程语言的某些基本结构，比如类和接口

使用 new 关键字，在跟上一个构造函数，可以创建引用类型的实例：

```js
let now = new Date();
```

ECMAscript 提供了许多像 Date 这样的原生引用类型，帮助开发者实现常见任务

## Date

ECMAscript 参考了 Java 早期的 java.util.Date，因此 Date 将日期保存为自协调世界时（UTC，Universal Time Coordinated）时间 1970.01.01 00:00:00 至今所经历的毫秒数，这样 Date 类型可以表示从 1970 年 1 月 1 日 前后 285616 年的日期

### 构造函数

以下代码创建了一个 Date 对象，不传参的情况下，创建的是当前的时间

```js
let now = new Date();
```

如果要创建特定的时间，需要方法的协助：Date.parse() 和 Date.UTC()

#### Date.parse()

接受一个符合要求格式的字符串，尝试将其转换为毫秒数（不符合规则返回 NaN），以下是其支持的日期格式：

- "5/23/2019"
- "May 23, 2019"
- "Tue May 23 2019 00:00:00 GMT-0700" (GMT，GreenwichMeanTime，格林威治标准时间，-0700 表示是西七区的时间)
- "2019-05-23T00:00:00Z"（Z 表示零时区，如果是+8 表示东八区）

```js
// 以下两种方式是等价的
let now = new Date("5/23/2019");
let now = new Date(Date.parse("5/23/2019"));
```

#### Date.UTC()

可以接受多个参数：年，月（0-11），日（1-31），时（0-23），分，秒，毫秒，其中年月是必须的，其他可选

```js
Date.UTC(Date.UTC(2000, 0)); // 2000-01
Date.UTC(Date.UTC(2005, 3, 4, 14, 33, 44)); // 2005-04-04 14:33:44
```

当使用 Date() 构造函数隐式调用 Date.UTC() 时，创建的是当地时区的时间，而直接调用 Date.UTC() 创建的是 GMT 时间

#### Date.now()

返回当前时间的毫秒值，可以用于在代码中计时：

```js
let start = Date.now();

doSomething();

let finish = Date.now();

duration = finish - start;
```

### 继承的方法

- toLocaleString()，会返回浏览器环境的时间，格式通常包含 AM PM，而不包含时区，具体格式因浏览器而不同
- toString()，通常返回带时区的时间格式，时间也是 24 小时制的
- valueOf()，返回毫秒值，可以通过这个方法比较时间先后

### 日期格式化

以下格式化方法的具体格式因浏览器而异

- toDateString()，周几，年月日
- toTimeString()，时分秒，时区
- toLocaleDateString()，本地的时区，时分秒
- toLocaleTimeString()，时分秒
- toUTCString()，UTC 时间（自协调世界时）

### get/set 方法

这类方法用于获取（get）或设置（set）具体的时间，每个 set 方法都有对应的 get 方法，故以下对 get 方法省略，并且每个 set 方法都有对应的 setUTC 方法，比如 `setHours(0-23)` 对应的 setUTC 方法 `setUTCHours(0-23)` ，以下也对 setUTC 方法省略

- setFullYear(四位数)
- setMonth(0-11)，大于 11 则加年
- setDate(1-31)，大于 31 则加月
- setHours(0-23)，大于 23 则加天
- setMinutes(0-59)，大于 59 则加时
- setSeconds(0-59)，大于 59 则加分
- setMilliseconds(0-59)，大于 59 则加秒

特殊的方法：

- getDay()，周几（返回 0-6），有对应的 getUTC 方法，没有对应 set 方法
- setTime(毫秒值)，设置日期毫秒值，有对应的 get 方法，没有 getUTC 方法
- getTimezoneOffset()，返回本地时区与 UTC 时间的偏移量（分钟）

## RegExp (TODO)

正则表达式：

```js
let expression = /pattern/flags;
```

pattern 是正则表达式，flags 标记用于控制表达式的模式（可以一次使用多个标记），flags 包括以下标记：

- g：全局模式，不是找到第一个匹配内容就结束
- i：不区分大小写
- m：多行模式，查找到一行末尾时会继续查找
- y：粘附模式，表示只查找从 lastIndex 开始之后的字符串
- u：Unicode 模式，启用 Unicode 匹配
- s：dotAll 模式，元字符 . 匹配任何字符（包括 \n \r）

## 原始值包装类

ECMAscript 提供了 3 种特殊的引用类型：Boolean、Number、String

### 包装类的创建

#### 自动创建

每当使用某个原始值的方法或属性时，会自动创建一个相应类型的对象，从而暴露原始值的各种方法：

```js
let s1 = "text";
let s2 = s1.substring(2);
```

执行到第二行时包含以下操作：

1. 创建 String 类型的实例
2. 调用其 substring() 方法
3. 销毁实例

这三步相当于以下代码：

```js
let ob = new String("text");
let s2 = ob.substring(2);
ob = null;
```

值得注意的是，这个自动创建的对象实例，不能直接给原始数据类型添加属性，因为自动创建的包装类实例会在执行完毕后被销毁：

```js
let s1 = "text";
s1.color = "red";
console.log(s1.color); // undefined
```

可以显示地创建包装对象，但是不建议这么做，因为这样无法区分原始值和引用值，对包装对象实例使用 typeof 返回的都是 object

#### Object() 创建包装类

```js
let obj = new Object("text");
console.log(obj instanceof String); // true
```

#### Number() 与 new Number()

```js
let val = "25";
let number = Number(val);
console.log(typeof number); // number
let obj = new Number(val);
console.log(typeof obj); // object
```

### Boolean

创建一个 Boolean 对象，使用构造函数并传入 true 或 false ：

```js
let booleanObject = new Boolean(true);
```

重写方法：

- valueOf()，返回原始值 true 或 false
- toString()，返回字符串 "true" 或 "false"

强烈建议 **_永远不要使用 Boolean 包装类_** ，而是使用原始值，因为包装类容易和原始值混淆：

```js
let falseObj = new Boolean(false);
let result = falseObj && true; // true

let falseVal = new Boolean(false);
let result = falseVal && true; // false
```

### Number

创建一个 Number 对象，使用构造函数传入数字：

```js
let numberObject = new Number(10);
```

重写方法：

- valueOf()，返回原始数值
- toString()，返回数值字符串，并且可以传入数字参数，将返回转换成相应的进制数：

```js
let num = 10;
num.toString(2); // "1010"
num.toString(8); // "12"
num.toString(10); // "10"
num.toString(16); // "a"
```

**格式化方法**：

toFixed()，参数是数值，返回值根据传入的参数决定返回的小数位数，如果指定的小数位数小于原本的小数位数，那么进行四舍五入

toExponential()，返回科学计数法格式（1.0e+1 表示 10），参数是数值，表示小数的位数

toPrecision()，参数是数值，表示希望返回结果的总位数（正数位和小数位的总和），方法会根据参数情况选择调用 toFixed() 还是 toExponential()，返回合适的结果：

```js
let num = 99;
num.toPrecision(1); // "1e+2"
num.toPrecision(2); // "99"
num.toPrecision(3); // "99.0"
```

和 Boolean 一样，也不建议使用 Number 包装类

**其他方法**：

isInteger()，判断一个数值是否是整数

```js
Number.isInteger(1); // true
Number.isInteger(1.0); // true
Number.isInteger(1.01); // false
```

isSafeInteger()，判断一个整数是否在保存范围之内（Number.MIN_SAFE_INTEGER: -2^53+1, Number.MAX_SAFE_INTEGER: 2^53+1）

### String

创建一个 String 对象，使用构造函数传入字符串：

```js
let stringObject = new String("hello");
```

重写方法：

- valueOf()，返回字符串
- toString()，返回字符串

String 类型提供了很多方法来解析或操作字符串：

#### 字符方法

##### 编码

字符：一个字符由 16 位（4 位 16 进制数）码元（code unit）组成

JS 字符串的编码：采用 UCS-2 和 UTF-16 混合，不过对于采用 16 位编码的字符（U+0000~U+FFFF），这两种编码实际上一样。[关于编码的文章](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

##### length

表示字符串包含多少个 16 位码元（字符）

##### charAt()

参数为索引值，根据索引值返回字符

##### charCodeAt()

查看某个字符的编码值，返回十进制编码

```js
let str = "abcdef";
// 字符 c 的编码是 U+0063（ 16 进制 ）
console.log(str.charCodeAt(2)); // 99
console.log(99 === 0x63); // true
```

##### String.fromCharCode()

可以接收多个参数，每个参数是字符的 UTF-16 码元（十进制或十六进制），返回拼接好的字符串

```js
console.log(String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65));
// "abcde"
console.log(String.fromCharCode(97, 98, 99, 100, 101));
// "abcde"
```

##### Unicode 代理对

Unicode 中的基本多语言平面（BMP）：使用 16 位表示基本字符

Unicode 中的增补平面：给每个字符使用两个 16 位码元，这种策略也成为代理对

```js
// 笑脸字符采用代理对策略，即一个字符占用两个 16 位码元
let str = "ab😊d";

console.log(str.length); // 5（因为 length 表示的是 16 位码元的个数）
console.log(str.charAt(3)); // �（对于代理对，需要两个码元才能解析出字符，故显示乱码）

// fromCharCode 方法可以识别出 55357, 56842 表示的是一个字符
console.log(String.fromCharCode(97, 98, 55357, 56842, 100));
// "ab😊d"
```

##### codePointAt()

码点可能是 16 位，也可能是 32 位，是一个字符的完整标识

和 charCodeAt() 类似，可以接收 index 参数，返回这个字符的码点（code point）

```js
let str = "ab😊d";

for (let i = 0; i < 5; i++) {
  console.log(str.charCodeAt(i));
}
// 97
// 98
// 55357
// 56842
// 100

for (let i = 0; i < 5; i++) {
  console.log(str.codePointAt(i));
}
// 97
// 98
// 128522
// 56842 （如果传入的索引不是字符的开头，会返回错误的码点）
// 100
```

##### String.fromCodePoint()

String.fromCharCode() 也有对应的方法 String.fromCodePoint()

```js
console.log(String.fromCharCode(97, 98, 55357, 56842, 100));
// "ab😊d"
console.log(String.fromCodePoint(97, 98, 128522, 100));
// "ab😊d"
```

#### normalize()（TODO）

规范化字符

#### 字符串操作方法

concat()，连接字符串，可接受多个字符串参数按顺序进行拼接（拼接多个字符串使用 + 更方便）

```js
let str = "hello";
let result = str.concat(" world", "!"); // "hello world!"
```

slice()，提取子字符串，一个参数左闭，两个参数左闭右开，参数为负数则转换为长度加上此负数

```js
let str = "hello world";

str.slice(3); // lo world
str.slice(3, 7); // lo w
str.slice(-3); // rld
str.slice(3, -4); // lo w
```

substr()，提取子字符串，一个参数左闭，两个参数：第一个参数左闭、另一个参数是区间大小，第一个参数为负数则转换为长度加上此负数，第二个参数为负数则转换为 0 （区间长度为 0）

```js
let str = "hello world";

str.substr(3); // lo world
str.substr(3, 7); // lo worl
str.substr(-3); // rld
str.substr(3, -4); // ""
```

substring()，提取子字符串，一个参数左闭，两个参数左闭右开，参数若是负数都转换为 0，特性：两个参数的情况，第二个参数若小于第一个参数，那么以第二个参数为开始位置，第一个参数为结束位置

```js
let str = "hello world";

str.substring(3);     // lo world
str.substring(3, 7);  // lo w
str.substring(-3);    // hello world
str.substring(3, -4); // hel
```

replace()，替换字符串中指定的字符，第一个参数是要被替换的字符，第二个参数是要替换为的字符

#### 字符串位置方法

indexOf()，传入字符串，从头开始，找到字符串第一次出现的位置，返回下标，没有则返回 -1。第二参数可选，表示从此下标位置开始寻找

```js
let str = "hello world";

str.indexOf("o"); // 4
str.indexOf("o", 6); // 7
```

lastIndexOf()，传入字符串，从尾部开始，找到字符串第一次出现的位置，返回下标，没有则返回 -1。第二参数可选，表示从此下标位置开始寻找

```js
let str = "hello world";

str.lastIndexOf("o"); // 7
str.lastIndexOf("o", 6); // 4
```

找到所有的目标子字符串：

```js
let str = "3213217894392693847252";
let postitions = new Array();
let pos = str.indexOf("3");

while(pos > -1) {
  positions.push(pos);
  pos = str.indexOf("3", pos + 1);
}
```

#### 字符串包含方法

startsWith()，判断字符串开头是否有指定的子字符串，接受一个字符串，返回布尔值，表示是否包含

```js
let str = "foobarbaz";

str.startsWith("foo"); // true
```

endsWith()，判断字符串结尾是否有指定的子字符串，接受一个字符串，返回布尔值，表示是否包含

```js
let str = "foobarbaz";

str.endsWith("baz"); // true
```

includes()，判断字符串中是否有指定的子字符串，接受一个字符串，返回布尔值，表示是否包含

```js
let str = "foobarbaz";

str.includes("bar"); // true
```

#### 字符串去除空格

trim()，清除字符串开始和末尾的空格

trimLeft()，清除字符串开始的空格

trimRight()，清除字符串末尾的空格

#### 字符串填充方法

repeat()，接受数值参数，表示复制多少次

```js
let str = "na ";
str.repeat(4);    // "na na na na "
```

padStart()，将字符串以指定内容填充到指定长度（填充在开头），第一个参数是填充到的长度，第二个参数是要填充的内容（默认填充空格），如果填充长度小于原本长度，返回原字符串

```js
let str = "hi";
str.padStart(8);        // "      hi"
str.padStart(8, ".");   // "......hi"
str.padStart(8, "abc"); // "abcabchi"
```

padEnd()，填充在末尾，其他和 padStart() 一样

```js
let str = "hi";
str.padEnd(8);        // "hi      "
str.padEnd(8, ".");   // "hi......"
str.padEnd(8, "abc"); // "hiabcabc"
```

#### 字符串迭代与解构（TODO）

#### 字符串大小写转换

toLowerCase()，将字符串转换为小写

toUpperCase()，将字符串转换为大写

toLocaleLowerCase()，将字符串以当地语言的规则转换为小写

toLocaleUpperCase()，将字符串以当地语言的规则转换为大写

#### 字符串模式匹配方法（TODO）

#### 比较字母顺序

localeCompare() 可以根据所在地区语言（不一定是英文字母）比较字母顺序，靠前返回 1，相同返回 0，靠后返回 -1

```js
let str = "yellow";

str.localeCompare("brick");   // 1
str.localeCompare("yellow");   // 0
str.localeCompare("zoo");   // -1
```

#### HTML 方法

早期浏览器提供了辅助生成 HTML 标签的方法，现在基本上已经没人使用了

## 单例内置对象

内置对象：由 ECMAscript 实现，与宿主环境无关，并在程序开始执行时就存在的对象

开发者不需要显示地实例化内置对象，比如：Object Array String

### Global

全局函数和全局变量都会成为 Global 对象的属性，isFinite() parseInt() parseFloat() 都属于 Global 对象

#### URL 编码方法

URL 编码将字符转换成可以通过 Internet 传输的格式，URL 只能使用 ASCII 字符集通过 Internet 发送

URI(Uniform Resource Identifier)：统一资源标识符

URL(Uniform Resource Locator)：统一资源定位器

[ASCII 百分比编码](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%88%86%E5%8F%B7%E7%BC%96%E7%A0%81)

编码方法：

- encodeURI() 用于对整个 URI 编码，不会编码特殊字符
- encodeURIComponent() 用于编码 URI 种单独的组件，会对所有特殊字符也进行编码

```js
let uri = "http://www.wrox.com/illegal value.js#start";

encodeURI(uri);
// http://www.wrox.com/illegal%20value.js#start

encodeURIComponent(uri);
// http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start
```

解码方法：

- decodeURI()，对 encodeURI() 的结果解码
- decodeURIComponent()，对 encodeURIComponent() 的结果解码

#### eval()

这个方法是一个代码解释器，参数是一个 ECMAscript 字符串

```js
eval("console.log('hi')");
// 以上代码等价于：
console.log("hi");
```

eval() 内部可以正常访问外部定义的变量，在 eval() 内部定义的函数外部也可以访问，但 eval() 内部定义的变量外部访问会报错。

eval() 解析字符串的能力很强大，可以动态创建函数，可以将 JSON 字符串直接解析成 JS 对象，但是它很危险，容易受到 XSS 攻击，让恶意用户插入代码。**_不要使用 eval()_**

#### 属性

Global 还包含了许多属性，包括一些特殊值：undefined NaN Infinity，以及包装类和一些引用类型的构造函数，还有各种 Erorr 对象的构造函数

#### window 对象

ECMAscript 没有提供直接访问 Global 对象的方式，但浏览器将 Global 对象进行实现，即 window 对象，因此全局变量和函数都成为了 window 的属性

当一个函数没有明确指定 this 时，this 值等于 Global 对象：

```js
// 创建函数并立即调用
let global = function() {
  return this;
}();
```

### Math

Math 用于数学计算

#### 属性

- PI，圆周率
- E，自然对数的基数 e
- LN10，LN2，LOG2E，LOG10E 等对数
- SQRT1_2，SQRT2 等平方根

#### 最大值最小值

min() 和 max() 接受多个数值，返回其中最大或最小值

```js
let max = Math.max(1,3,4,2,5);  // 5
let vals = [4,2,3,5,1];
let min = Math.min(...vals);    // 1
```

#### 舍入方法

- ceil() 向上舍入取整
- floor() 向下舍入取整
- round() 四舍五入取整
- fround() 返回数值最接近的单精度（32 位）浮点值表示

#### 随机数

random() 返回 0-1 之间的一个随机数，区间左闭右开

随机选取一个整数，区间从 first_possible_value 开始，区间长度为 total_number_of_choice，左闭右开：

```js
number = Math.floor(Math.random() * total_number_of_choice + first_possible_value)
```

一般情况，给定的参数是可选区间的左右边界，所以可以封装为函数：

```js
function selectFrom(low, up) {
  let choice = up - low + 1;
  return Math.floor(Math.random() * choice + low);
}

// 使用 selectFrom() 方法，在数组中随机选择一个值

let colors = ["red", "green" ,"blue"];
let color = colors[selectFrom(0, colors.length - 1)];
```

#### 其他方法

- abs() 绝对值
- pow(x, n) 返回 x 的 n 次方
- sqrt() 平方根
- cbrt() 立方根
- exp(x, n) 返回 x 的 n 次幂
- 各种三角函数...
