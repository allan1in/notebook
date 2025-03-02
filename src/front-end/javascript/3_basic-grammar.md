# 基础语法

## 语法

### 区分大小写

变量名、关键字等一切都区分大小写

### 标识符

标识符，是函数、变量、属性、参数的名称，必须满足以下规则：

- 第一个字符必须是下划线（\_）、字母或 $
- 剩下的字符可以是数字、下划线（\_）、字母或 $

最佳实践：

```js
myNewName;
```

推荐驼峰命名法，因为内置函数和对象的命名也是如此

### 严格模式

ES5 增加了严格模式，开启严格模式，需要在开头加一行：

```js
"use strict";
```

这是一个预处理指令，任何支持 JS 的引擎都会切换到严格模式，严格模式会有更多的保留字

### 语句

最佳实践：

```js
// 不省略大括号
if (test) {
  //语句末尾加分号
  console.log(test);
}
```

## 关键字与保留字

关键字，有特殊用途，比如 if、else、break

保留字，给未来保留，这些保留字可能在将来成为关键字

## 变量

JS 变量是弱类型（松散类型）的，变量可以保存任何数据类型，有以下三种变量

### var

最佳实践：

```js
// 不省略 var，哪怕省略也是可以的
var message = "hi";

// 定义多个变量，用逗号分隔
var message = "hi",
  age = 29;
```

声明作用域：函数作用域

- 在函数内声明是局部变量，函数调用结束后被销毁
- 如果使用 `message = "hi";` 的定义方式，会声明一个全局变量，可以被外部访问

声明提升：

如下定义一个变量：

```js
function foo() {
  console.log(age);
  var age = 29;
}
```

这样不会报错，结果是 undefined，因为会被等价为以下代码：

```js
function foo() {
  var age;
  console.log(age);
  age = 29;
}
```

这就是变量提升（hoist），并且这样也没有问题：

```js
function foo() {
  var age = 16;
  var age = 32;
  var age = 76;
  console.log(age); // 76
}
```

输出 76

### let

ES6 新增

let 与 var 的区别：

- let 作用域较小
- 没有变量提升
- let 在全局作用域声明的变量不会成为 window 对象的属性（var 全局变量会）

声明作用域：块作用域，例如，以下代码输出结果会报错： ReferenceError: age not defined

```js
function test() {
  if (true) {
    let age = 26;
  }
  console.log(age);
}
```

没有变量提升：导致暂时性死区（temporal dead zone）

由于不会自动提升变量，let 声明之前，执行瞬间叫暂时性死区，此阶段任何对未声明变量引用都会有报错：ReferenceError

### const

const 与 let 区别：

- 声明时必须初始化
- 修改变量时会报错（如果变量引用的是一个对象，那么修改对象内的属性是可以的）

### 最佳实践

- 不使用 var
- const 优先，let 次之（只有提前知道需要修改时才使用 let）

## 数据类型

一共有 6 种简单数据类型（原始类型）：

- undefined
- null
- boolean
- string
- number
- symbol

以及 1 种复杂类型：

- object

### typeof 操作符

由于 JS 的数据类型是松散的，所以需要一个方法来判断数据类型：

```js
let message = 66;

//传入变量
console.log(typeof message); // number

//传入字符串
console.log(typeof message); // string
```

typeof 不是一个函数，它不需要传入参数（也可以传入），会返回以下 7 种类型：

- undefined
- boolean
- string
- number
- object
- function
- symbol

typeof null 返回结果是 object，因为 null 被认为是空对象的引用

严格来说，在 JS 中，function 是一种特殊 object，但是 function 有特殊的属性，所以需要进行区分

### undefined

声明变量，但是没有进行初始化时，变量的值就是 undefined

- 设置这个数据类型，是为了区分未初始化变量和空对象指针（null）的区别
- 没有声明变量，或者声明了未初始化，结果都是 undefined，所以建议声明时就进行初始化，这样一旦出现 undefined ，你就知道是变量没有声明
- undefined 在逻辑判断中被当作假值

### null

表示空对象指针

- 在定义一个用于保存对象的变量时，建议用 null 初始化，这样之后判断如果变量的值不为 null ，那么它的引用是一个对象
- undefined == null，这是 ECMAScript 定义的
- null 的逻辑值为假

### boolean

有两个字面值：true 和 false

Boolean() 函数可以将其他类型的值转换为布尔值，满足以下规则：

- string，非空字符串为 true，空字符串 "" 为 false
- number，非零数（无穷）为 true，0、NaN 为 false
- object，对象为 true，null 为 false
- undefined，都为 false

### number

表示整数或浮点数

#### 进制数

JS 中可以有 +0 和 -0，但是这两种都等同于 0

十进制：

```js
let int = 55;
```

八进制（以 0 开头）：

```js
let octal = 070; //八进制的52
let octal = 079; //无效的八进制，当作 79
```

十六进制（以 0x 开头）：

```js
let hex = 0xa; //十六进制 10
```

#### 浮点值

```js
let float = 1.1;
let float = 0.1; //不推荐
let int = 1.0; //为了节省空间，1.0 会被转换为整数 1
```

#### 科学计数法

```js
let float = 3.123e5; //等于 312300
let float = 3 - e4; //等于 0.0003
```

#### 精度问题

```js
let a = 0.1;
let b = 0.2;
console.log(a + b == 0.3); // 结果为 false
```

因为 JS 采用的 IEEE 754 数值规则：

单精度浮点数（32 位）包括：1 位符号位 8 位指数位 23 位符号位

如何存贮浮点数？

- 0.1 被转为二进制 0.000110011...（无限循环）
- 二进制转换为科学计数法：1.100110011... \* 2^-4
- 因此符号位： 0（正数），指数位：0111 1111（127+（-4）= 123，再将 123 转换成二进制），数值位：1001 1001 1001 1001 1001 100（超过了 23 位，多余的省略）

在对 0.1 进行存贮的过程中，精度丢失，因此 0.1 会有细微的偏差，可以讨论以下它在丢失精度后的值是多少：

- 符号位：0，正数
- 指数位：0111 1111，转为十进制是 123，123 - 127 = -4
- 数值位：1001 1001 1001 1001 1001 100，结合指数位得到：1.1001 1001 1001 1001 1001 100 \* 2^-4，即 0.0001 1001 1001 1001 1001 1001 100
- 转为十进制：0.0999999940395355

可见，虽然存储的是 0.1，但是一旦参与运算，0.1 实际上是 0.0999999940395355

#### 无限值

JS 可表示的最小数保存在 Number.MIN_VALUE 中，最大值保存在 Number.MAX_VALUE 中，如果计算结果超过最大值，或者小于最小值，就会被自动转换为无穷值：Infinity 或 -Infinity，并且该值不能再参与计算

```js
console.log(5 / 0); //Infinity
console.log(5 / -0); //-nfinity
```

isFinite() 函数，判断一个变量是否是无限值

#### NaN

Not a Number，表示不是数值

```js
console.log(0 / 0); //NaN
console.log(-0 / +0); //NaN
```

- 任何有 NaN 的运算结果都为 NaN
- NaN 不等于任何值，也不等于它自身

isNaN() 函数，会先尝试将参数内容转化为 Number 类型（比如 数字字符串会被转换成数字，true 会被转换成 1），如果可以返回 true，否则返回 false

#### 数值转换

Number()，可以转换任何类型，规则复杂

parseInt()，转换为整数，可以接受两个参数：转换对象，进制

parseFloat()，转换为浮点数，只能解析十进制数，如果参数为整数，则会返回整数

### string

#### 字符串字面量

\n 换行，\t 制表，\r 回车，\' 单引号，\" 双引号，\\\ 反斜杠

#### 不可变

字符串是不可变的（immutable），要修改其值，必须销毁之前的字符串，再创建新的字符串

#### 字符串转换

```js
let age = 10;
let string = age.toString(); //"10"
let string = age.toString(2); //转换为二进制字符串 "1010"
```

由于 null 和 undefined 没有 toString() 方法，可以通过 String() 创建字符串：

```js
String(10); //"10"
String(null); //"null"
String(undefined); //"undefined"
```

#### 字符串模板

##### 字面量

模板字面量会保存反引号之间的所有空格、换行

```js
//以下两个字符串是等价的
let string = "first line\nsecond line";

//使用字符串模板
let template = `first line
second line`;
```

##### 插值

可以在模板字面量中通过插值的方式，使用变量，变量会被 toString() 转换为字符串

- 插值中，可以使用变量对象的函数
- 插值中，可以对多个变量进行运算

```js
let val = 5;
let template = `value is ${val}`;
```

##### 标签函数

标签函数是自定义的函数：

```js
function template(strings, ...expressions) {
  console.log(strings);
  for (const expression of expressions) {
    console.log(expression);
  }
  return "result";
}

let a = 6;
let b = 9;

let result = template`${a} + $ {b} = ${a + b}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15

console.log(result); // "result"
```

函数参数 strings 接受的是原始字符串数组，...expressions（数组）接受了其他插值的结果

可以自定义插值的行为

#### 模板-原始字符串

可以获取模板字面量的原始内容：

```js
String.raw`first line\nsecond line`;
//first line\nsecond line
```

### symbol（TODO）

确保对象的属性使用唯一标识符，不会发生冲突

### Object

对象类型 Object，一组功能和数据的集合

开发者可以通过 new 关键字创建 Object 对象，然后再给对象添加方法或属性

```js
let o = new Object();
```

Object 作为所有对象的基类，其他对象都继承以下的属性或方法，但是 BOM 和 DOM 的对象可以不遵守 ECMAscript 规则，所以有些对象可能不会继承这些方法

#### 属性和方法

- constructor：创建当前对象的构造函数，上面例子中就是 Object()
- hasOwnProperty(proptypeName)：用于判断当前对象实例（不是原型）上是否存在名为 proptypeName（字符串或符号） 的属性
- isProptypeOf(object)：判断当前对象是否为另一个对象的原型
- propertyIsEnumerable(proptypeName)：判断给定属性是否可以使用 for-in 枚举，参数必须是字符串
- toLocaleString()：返回对象的字符串表示，该字符串反应对象所在的本地化执行环境
- toString()：返回对象的字符串表示
- valueOf()：返回对象的字符串、数值或布尔值，通常与 toString() 返回值相同，用于操作符比较大小或运算时，会调用这个方法，用于自动转换

## 操作符

### 一元操作符

#### 递增与递减

```js
let age = 10;
++age;
```

操作符 ++ ，等同于 age = age + 1 ，++age 与 age++ 有以下区别：

- 前缀，先计算操作符结果，再进行其他计算
- 后缀，先进行其他计算，再进行操作符计算

对于 number 之外的数据类型，也可以使用，只不过需要先转换为 number（尽可能）再运算

#### 一元加减

```js
let num = 2;
num = +num; // 2
num = -num; // -2
```

负号取相反数

### 位操作符

ECMAscript 采用 IEEE 754 64 位格式存储数值，但位操作只采用 32 位，之后再把结果转换为 64 位。对于开发者，只有 32 位整数。

#### 按位非

```js
let num1 = 25;
let num2 = ~num1; // -26
```

num2 转换为十进制是 -26，按位非等效于：-num1 -1 ，不过位运算更高效

#### 按位与

```js
let result = 25 & 3; // 1
```

与运算：全是 1 结果才为 1

#### 按位或

```js
let result = 25 | 3; // 27
```

或运算：有一个 1 结果就是 1

#### 按位异或

```js
let result = 25 ^ 3; // 26
```

异或运算：一个是 1 一个是 0 结果才为 1

#### 左移

```js
let old = 2;
let val = 2 << 5; // 64
```

左移会保留正负号

数值 m 左移 n 位 = m \* 2^n

#### 右移

```js
let old = 64;
let val = 64 >>> 5; // 2
```

正数 m 右移 n 位 = m / 2^n

对于正数，右移没有影响。对于负数，右移影响很大（负数符号位位 1 ，右移左边补 0 ，会变正数）

### 布尔操作符

#### 逻辑非

`!val`，将操作数 val 转换为布尔值后，取反

`!!val`，效果等同于 Boolean(val) ，表示取布尔值

#### 逻辑与

```js
&&
```

短路特性：第一个操作数位 false ，则不会对第二个操作数求值

#### 逻辑或

```js
||
```

短路特性：第一个操作数位 true ，则不会对第二个操作数求值

短路特性的应用：

```js
let ob = preob || backob;
```

preob 包含首选的值，backob 包含备用的值

### 乘性操作符

#### 乘法

```js
*
```

#### 除法

```js
/
```

#### 取模

```js
%
```

### 指数操作符

ES7 新增 \*\*

```js
3 ** 2; // 9
Math.pow(3, 2); // 9
```

### 加性操作符

#### 加法操作符

```js
+
```

注意：字符串之间 + 表示连接字符串，数值之间 + 表示加法运算

#### 减法操作符

```js
-
```

### 关系操作符

- `>`
- `<`
- `>=`
- `<=`

注意：

- 如果有一个操作数位 NaN，结果都是 false
- 字符串之间比较，如果都可以转换为数值，那么会从左到右依次比较两个操作数每一位的字符编码大小
- 字符串之间比较，如果有操作数不可以转换为数值，那么视作 NaN

### 相等操作符

#### 等于和不等于

```js
==
!=
```

比较时会通过 valueOf() 自动转换操作数，即 3 == "3" 结果为 true

#### 全等和不全等

```js
===
!==
```

比较时不转换操作数，即 3 === "3" 结果为 false

### 条件操作符（三元运算）

```js
let max = num1 > num2 ? num1 : num2;
```

如果 num1 > num2 为 true ，那么取值为 num1 ，否则取值 num2

### 赋值运算符

```js
=
```

与其他操作符的结合（简写，并不提升性能）：a -= b，表示 a = a - b，其他数学运算符同理

### 逗号操作符

```js
let num1 = 1,
  num2 = 2,
  num3 = 3;
```

逗号赋值（赋值最后一项 0 ）：

```js
let num = (5, 1, 2, 0); // 0
```

## 语句

### if

ECMAscript 会调用 Boolean() 函数将 condition 转换成布尔值

最佳实践：

```js
if (condition1) {
  statement1
} else if (condition2){
  statement2
} else {
  statement3
}
```

不要省略大括号，这样可以避免错误

### do-while

最佳实践：

```js
do {
  statement
} while (expression);
```

### while

最佳实践：

```js
while(expression) {
  statement
}
```

### for

最佳实践：

```js
for(let i = 0; i < 10; i++) {
  console.log(i);
}
```

使用 let 可以将作用域固定在循环中，因为循环外用不到这个变量了

无穷循环：

```js
for(;;) {
  console.log(1);
}
```

while 循环：

```js
for(;i < 10;) {
  console.log(1);
}
```

### for-in

最佳实践：

```js
for (const propName in window) {
  console.log(propName);
}
```

如上，遍历了一个 window 对象的所有属性，遍历的顺序因浏览器而异

为了保证遍历的变量 propName 不被修改，推荐使用 const

如果遍历的变量是 null 或 undefined，不会执行循环

### for-of

最佳实践：

```js
for (const element of [2,4,6,8]) {
  console.log(element);
}
```

for-of 会按照可迭代对象的 next() 方法产生值的顺序迭代元素

如果尝试迭代的元素不支持迭代，会抛出错误

### 标签、break 和 continue

- break：退出当前这一层的循环
- continue：跳过当前这一层的本次循环

label 和 break 的配合使用：

```js
outermost:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outermost;
    }
  }
}
```

如上，创建了一个名为 outermost 的 label，当最内层的循环执行到 break outermost; 时，会退出到标签 outermost 的位置（即直接退出到最外层的循环）

标签可以和 break 或 continue 配合，退出或者跳过到标签所指定的位置

### with

示例如下：

```js
let qs = location.search;
let hostName = location.hostname;
let url = location.href;
```

这段代码每一次赋值都有重复的 location 对象，可以使用 with 简化代码：

```js
with(location) {
  let qs = search;
  let hostName = hostname;
  let url = href;
}
```

严格模式不允许 with

### switch

基本用法：

```js
switch(i) {
  case 25:
    console.log(25);
    break;
  case 35:
    console.log(25);
    break;
  default:
    console.log("other");
}
```

一个结果有多个条件（最好写明注释是故意忽略 break）：

```js
switch(i) {
  case 25:
    /* skip */
  case 35:
    console.log(25);
    break;
  default:
    console.log("other");
}
```

ECMAscript 中 switch 的特点：

- 可以接收任何数据类型
- 在 case 比较时会使用全等操作符（===），因此不会强制转换数据类型

## 函数

基本写法：

```js
function functionName(arg0,arg1,...,argN) {
  statements
}
```

只要遇到 return 语句，函数会立即停止执行

最佳实践：要么有返回值，要不没有返回值（默认返回 undefined），只在某个条件下返回值的函数，在调试时会很麻烦
