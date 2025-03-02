# 函数

函数本质是对象，每个函数都是 Function 对象的实例，所以函数名是指向函数对象的指针

函数声明（末尾不需要分号）：

```js
function f(a, b){
  return a+b;
}
```

函数表达式：

```js
let f = function(a, b) {
  return a+b;
};
```

箭头函数：

```js
let f = () => {
  return a+b;
}
```

构造函数（不推荐，性能差）：

```js
let f = new Function("a", "b", "return a+b");
```

## 箭头函数

箭头函数相比函数声明，更简洁，任何函数声明都可以用箭头函数表示

如果只有一个参数，括号可以省略：

```js
let double = x => {return x * 2};
```

如果函数体只返回一个表达式或者一句赋值语句，可以省略 return 和大括号，会隐式地返回这行代码的值：

```js
let sum = (a, b) => a + b;
```

## 函数名

函数名就是指向函数的指针，所以函数可以有多个函数名：

```js
function f() {
  cnosole.log("hi");
}

let f2 = f;
f();    // hi
f2();   // hi
```

所有函数对象都有一个只读的属性 name，用于表示函数名，如果是匿名函数，那么 name 的值为空字符串，如果是使用 Function() 创建的，name 值为 "anonymous"

对于 get set 函数，需要加上 get set 前缀：

```js
let dog = {
  age: 1,
  get age() {
    return this.age;
  },
  set age(newAge) {
    this.age = newAge;
  }
}

let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, "age");
console.log(propertyDescriptor.get.name);   // get age
console.log(propertyDescriptor.set.name);   // set age
```

## 理解参数

ES 中没有验证命名参数（形参）的机制，形参的作用仅在于方便理解和操作，所以在定义函数时，可以不写形参，而是通过 arguments 对象接收参数。arguments 是一个类数组对象，用于存储所有的参数

通过 arguments 打印所有参数和参数个数：

```js
function f() {
  for(let i = 0;i<arguments.length;i++){
    console.log(arguments[i]);
  }
  // 参数个数
  console.log(arguments.length)
}
```

注意：

- 虽然 ES 没有提供参数的重载，但是可以通过 arguments 判断参数个数，从而实现重载
- arguments 可以和命名参数在函数中同时使用
- 如果通过 arguments 改变参数的值，这个该改变会自动同步到命名参数上（但是 arguments 和命名参数并不指向同一个内存地址）
- arguments 的长度由传入的参数决定，而不是命名参数的个数决定。因此假设有两个命名参数，但是你只传了一个参数，尝试通过 arguments[1] 修改第二个参数的值并不会同步到第二个命名参数，因为 arguments[1] 并不存在

### 箭头函数中的参数

箭头函数中无法使用 arguments，会报错。

可以在箭头函数外包一层普通函数，这样就可以使用 arguments 了

## 没有重载

ES 中不像 Java 一样，没有重载，因为 ES 的函数参数没有签名

如果像 Java 中一样尝试重载（两个同名函数，参数个数不一样），第二个函数的定义会覆盖第一个函数的定义，这是由于函数名就是指向函数体的指针，重复定义会修改指针的指向

## 默认参数值

ES5 之前，只能通过在函数中判断命名参数是否是 undefined，如果是（说明没有传入这个参数），则为这个命名参数设置默认值：

```js
function f(name){
  name = (typeof name !== 'undefined') ? name : 'Lin'
  ...
}
```

ES6 支持了显示定义参数默认值：

```js
function f(name = 'Lin'){
  ...
}
```

如果没有传入参数，那么 name 取默认值 Lin

注意：

- 可以故意传入 undeified，以取默认值
- 命名参数取默认值并不会改变 arguments 的值，修改命名参数也不会影响 arguments，arguments 始终以传入的参数为准
- 默认参数可以是引用类型（比如函数、数组、对象），只有在函数被调用时，才会执行默认参数（如果默认参数是函数类型）

### 默认参数作用域

默认参数调用的顺序：

```js
function f(name = 'Lin', nick = 'allan'){
  ...
}
```

以上函数使用默认参数时，可以理解为：

```js
function f(){
  let name = 'Lin',
  let nick = 'allan'
  ...
}
```

因此参数默认值可以调用之前的命名参数：

```js
function f(name = 'Lin', nick = name){
  ...
}
```

但是顺序相反就不可以，参数的初始化遵循暂时性死区，即前面定义的参数不能引用后面的参数，会报错

命名参数只能存在自己的作用域中，无法引用函数内部的变量作为默认值：

```js
function f(name = nick){
  let nick = 'allan'
  ...
}
```

不传参调用这个函数会报错

## 参数扩展与收集

扩展运算符，可以简洁地操作集合数据

### 参数扩展

可以通过扩展运算符，简洁地传入参数：

```js
let arg = [1, 2, 3, 4];
function f(){
  for(let i = 0;i < arguments.length; i++){
    console.log(arguments[i])
  }
}

// 相当于传入 1, 2, 3, 4
f(...arg);
// 1
// 2
// 3
// 4
```

扩展运算符可以将可迭代对象进行拆分，并将每一个拆分结果作为一个单独的参数传入，也可以调用 apply() 方法实现同样效果（第一个参数是 this 的值，第二个参数是数组或类数组参数）：

```js
f.apply(null, arg);
```

### 收集参数

扩展操作符也可以用在函数的命名参数上，用于将多个参数合并为一个数组：

```js
function f(...args){
  console.log(args)
}
f(1, 2, 3, 4)
// [1, 2, 3, 4]
```

扩展操作符参数只能作为最后一个命名参数，它之后不可以有其他命名参数

箭头参数也可以通过收集参数来实现类似于 arguments 的功能

## 函数声明与函数表达式

函数声明提升：函数声明会被先读取，并在执行上下文中生成函数定义，所以之前的代码可以调用函数

函数表达式不会提升，所以如果在函数表达式之前调用函数，那么会报错，无论是 var 还是 let 声明的函数调用都会报错（var 变量声明的函数表达式可以被打印，但是不能被调用）

## 函数作为值

函数名是一个变量，所以函数可以作为值在任何地方，可以作为参数，或返回值

应用：根据某一个属性排序对象数组

```js
let data = [
  {name: 'Lin', age: 23},
  {name: 'Zhang', age: 22}
]

function comparation(prop, order) {
  return function(obj1, obj2){
    let val1 = obj1[prop]
    let val2 = obj2[prop]

    if(val1 < val2){
      return -1
    } else if (val1 > val2){
      return 1
    } else {
      return 0
    }
  }
}

// 根据年龄属性升序排序对象数组
console.log(data.sort(comparation("age")))
```

## 函数内部

### arguments

arguments 有一个属性 callee，是一个指针，指向 arguments 所在函数，在递归中可以解耦函数名和函数逻辑，如下示例：

```js
// 阶乘的递归函数
function factorial(num) {
  if(num == 1) return 1;
  return num * factorial(num - 1);
}
```

等同于：

```js
function factorial(num) {
  if(num == 1) return 1;
  return num * arguments.callee(num - 1);
}
```

通过 arguments.callee() 等同于调用了函数，通过这个属性实现函数名和函数逻辑的解耦：

```js
let newFuncName = factorial

factorial = function() {
  return 0
}

console.log(newFuncName(3))
// 6
```

以上代码将变量 newFuncName 指向 factorial 函数，然后又将 factorial 指向了一个新函数，最后通过 newFuncName 调用原来的阶乘函数，正是因为 callee 的存在，递归函数可以正确执行（如果没有使用 callee，那么执行结果会是 0 ）

### this

this 是一个指针

#### 标准函数

this 引用的是把函数作为方法调用的上下文对象，this 的指向在函数执行时才能被确定：

```js
window.color = "red"
let o = {
  color: 'blue'
}

function sayColor() {
  console.log(this.color)
}

// 调用方法的上下文对象是 window
sayColor()
// red

o.sayColor = sayColor
// 调用方法的上下文对象是 o
o.sayColor()
// blue
```

#### 箭头函数

this 函数指向箭头函数所在的上下文，将上面的例子改为箭头函数，执行结果输出的均为 red，因为 this 始终指向箭头函数所在的上下文（window）

因此事件的回调函数使用箭头函数，可以得到当前函数所在的上下文，而如果回调函数采用普通函数，那么 this 会指向 window 对象的上下文：

```js
function f() {
  let name = 'Lin'
  setTimeout(()=> console.log(this.name), 1000)
}

f()
// Lin

function f() {
  let name = 'Lin'
  setTimeout(function(){console.log(this.name)}, 1000)
}

f()
// undefined
```

### caller

caller 是函数的一个属性，caller 指向调用当前函数的函数：

```js
function outer(){
  inner()
}

function inner(){
  console.log(arguments.callee.caller)
}

outer()
/*
  ƒ outer(){
    inner()
  }
**/
```

### new.target

ES6 新增了 new.target 来判断一个函数是被当作构造函数调用，还是被当作普通函数调用

普通调用：new.target 的值为 undefined

new 调用：new.target 的值为被调用的构造函数

```js
function f(){
  // 必须通过 new 调用这个函数
  if(!new.target){
    throw 'f must be instantiated using "new"!'
  }
}
```

## 函数属性和方法

函数是一种特殊的对象

### 属性

#### length

保存函数定义的命名参数的个数

#### prototype

引用类型的所有实例都可以共享 prototype 上保存的方法

### 方法

#### apply()

用指定的作用域调用函数

两个参数：this 的值，一个参数数组（数组实例或 arguments 对象）

#### call()

作用和 apply() 一样

多个参数，this 的值，其他参数是要传入函数的所有参数

call() 和 apply() 的优势在于可以将任意对象设置为任意函数的作用域，这样可以让一个对象调用一个一个它当中并未定义的方法

#### bind()

bind() 的参数是一个对象，可以将函数的 this 指向这个对象的作用域，然后返回这个绑定完成的新函数

bind() 不同于 apply() 和 call()，它并不会立即调用函数，而是返回一个指定 this 的新函数

```js
window.color = 'red'
let o = {
  color: 'blue'
}

function sayColor() {
  console.log(this.color)
}

let oSayColor = sayColor.bind(o)
oSayColor()
// blue
```

#### 继承的方法

toString() 和 tolocaleString() 返回函数的代码，具体格式因浏览器而异，valueOf() 返回函数本身，浏览器解释器可能会修改代码，因此应该只在调试时使用这些方法

## 函数表达式

函数表达式不会提升，这是它和函数声明最大的区别。

条件语句中使用函数声明会产生非预期的结果：

```js
if(condition){
  function a(){
    ...
  }
}else {
  function a(){
    ...
  }
}
```

这段代码意图通过 condition 的值，来创建不同的函数，但是 JS 引擎会将函数声明提升，多数浏览器会忽略 condition 直接返回第二个声明，fixfox 相反。但是将函数声明换成函数表达式就不会有这样的问题了。

函数表达式，将一个普通变量指向一个 **匿名函数**（也叫 Lambda 函数），匿名函数也可以作为一个函数的返回值：

```js
function f(){
  return function(){
    ...
  }
}
```

这种情况，只要匿名函数被当作一个值使用，就是一个函数表达式

## 递归

在介绍 callee 的时候，举了一个例子，例子中的阶乘函数就是一个递归函数，并且通过 arguments.callee 也可以解决递归函数被重命名后产生的问题，但是在严格模式下，不能使用 arguments.callee，可以使用 **_命名函数表达式_** 解决这个问题：

```js
const factorial = (function f(num){
  if(num == 1) return 1
  return num * f(num - 1)
});
```

将一个函数声明用括号包裹（表示这是一个表达式），再将其赋值给 factorail，这种做法可以随意改变函数名 factorial，因为最终递归调用的函数名总是 f

## 尾调用优化

ES6 新增的内存优化机制

以这段代码为例：

```js
function outer() {
  return inner()
}
```

优化前：

1. 执行 outer() 函数体，将其推入栈帧
2. 执行 inner() 函数体，将其推入栈帧
3. 计算 inner() 的返回值，inner() 函数体出栈
4. 计算 outer() 的返回值（就是 inner() 的返回值），返回结果
5. outer() 出栈

优化后：

1. 执行 outer() 函数体，将其推入栈帧
2. 引擎发现由于 outer() 返回值就是 inner() 的返回值，所以 outer() 出栈
3. inner() 入栈
4. 计算出 inner() 的返回值，返回结果
5. inner() 出栈

优化之后，对于尾调用的情况，减少了大量占用的栈内存，上面的例子只是嵌套了一层，如果是递归函数，无论嵌套多少次，优化后的栈内存中永远只有一个栈帧

### 优化条件

条件如下：

- 严格模式
- 外部函数的返回值是对内部函数的调用
- 尾部调用函数返回后不需要执行额外的逻辑
- 尾调函数不是引用外部函数作用域中自由变量的闭包

外部函数的返回值是对内部函数的调用：

```js
// 不优化，没有返回
function outer(){
  inner()
}
// 不优化，没有直接返回函数
function outer(){
  let innerResult = inner()
  return innerResult
}
```

尾部调用函数返回后不需要执行额外的逻辑：

```js
// 不优化，执行额外的逻辑
function outer(){
  return inner().toString()
}
```

尾调函数不是引用外部函数作用域中自由变量的闭包：

```js
// 不优化，尾调是一个闭包
function outer(){
  let foo = 'bar';
  function inner(){return foo;}
  return inner();
}
```

### 利用尾调用优化进行代码优化

斐波那契数列：

```js
function fib(n){
  if(n<2) return n
  return fib(n-1) + fib(n-2)
}
```

以上代码返回的函数执行了额外的逻辑（相加），不能进行尾调用优化

优化后：

```js
"use strict";

function fib(n){
  return fibImpl(0, 1, n)
}

// 可以尾调用优化的递归，第一个参数是 n-2 的值，第二个参数是 n-1 的值，第三个参数是剩余循环的次数
function fibImpl(a, b, n){
  if(n === 0) return a;
  return fibImpl(b, a + b, n - 1)
}

// 尾调用优化后的递归可以看作是迭代
function fib(n){
  // fib(n-2) 的初始值，即 fib(0)
  let n2 = 0
  // fib(n-1) 的初始值，即 fib(1)
  let n1 = 1
  // 从 fib(2) 开始计算每个 fib(x) 的结果，循环 n 次，计算到 fib(n+2)
  for(let i = 0;i < n;i++){
    // 利用递推关系更新 fib(n-1) 和 fib(n-2)
    let temp = n1 + n2
    n2 = n1
    n1 = temp
  }

  // 返回 fib(n-2) 的值，即 n2
  return n2
}
```

## 闭包

闭包（closure）是指引用了另一个函数作用域中变量的函数

实例：构造一个比较对象指定属性大小的函数

```js
function createComparationFunction(property){
  return function(obj1, obj2){
    let val1 = obj1[property];
    let val2 = obj2[property];

    if(val1 > val2){
      return val1;
    }else{
      retrurn val2;
    }
  }
}
```

概念：

- 变量对象：全局上下文中包含其变量的对象，在代码执行期间一直存在
- 活动对象：函数局部上下文中包含其变量的对象，在函数执行期间存在

回顾：作用域链，函数对象的 [[scope]] 会指向作用域链（一个包含指针的列表），而每个指针又会指向活动对象（函数的局部上下文）。在上例中有三个活动对象：全局对象、createComparationFunction 对象，匿名函数对象

闭包：上例中，匿名函数就是一个闭包，它的作用域链从头到尾分别是：闭包的活动对象、createComparationFunction 的活动对象、全局变量对象。由于闭包需要用到 createComparationFunction 函数中的 property 变量，所以 createComparationFunction 函数执行完毕后，它的活动对象不会被销毁，因此会占用内存

创建并销毁闭包：

```js
// 创建闭包
let compare = createComparationFunction('name');

// 使用闭包
let result = compare({name: '1'}, {name: '2'});

// 销毁
compare = null;
```

**_减少闭包的使用，尽管 V8 已经尽量优化，这样可以减少内存占用_**

### this 对象

匿名函数的 this 不会绑定到某个对象，而是指向 window 对象

实例：

```js
window.identify = 'window';

let obj = {
  identify: 'obj',
  getIdentifyFunc(){
    return function(){
      console.log(this.identify);
    }
  }
}

obj.getIdentifyFunc()();
// window
```

根据结果可看出，因为调用的是匿名函数，this 指向了 window 对象

如果想打印 obj 中的 identify，可以利用变量 that 保存 obj 上下文的 this 对象，并使用闭包：

```js
window.identify = 'window';

let obj = {
  identify: 'obj',
  getIdentifyFunc(){
    let that = this;
    return function(){
      console.log(that.identify);
    }
  }
}

obj.getIdentifyFunc()();
// obj
```

特殊情况下的 this 指向不同：

```js
window.identify = 'window';

let obj = {
  identify: 'obj',
  getIdentifyFunc(){
    console.log(this.identify);
  }
}

obj.getIdentifyFunc();
// obj
(obj.getIdentifyFunc)();
// obj
(obj.getIdentifyFunc = obj.getIdentifyFunc)();
// window
// 因为对函数进行了赋值，解除了函数 this 对于 obj 的绑定
```

### 内存泄漏

在 IE9 之前，因为采用了引用计数的垃圾回收方式，如果使用了闭包，引用的外部变量一直不会被销毁：

```js
function handler(){
  let element = document.getElementById('someElement');
  element.onclick = () => {console.log(element.id)};
}
```

这个例子中，箭头函数中引用了 element 变量，这阻止了 element 的引用计数值的清零，因此可能会导致内存泄漏

```js
function handler(){
  let element = document.getElementById('someElement');
  let id = element.id;
  element.onclick = () => {console.log(id)};
  element = null;
}
```

如上修改后，可以解除箭头函数内部对 element 的直接引用，并在打印执行结束后，通过 element = null 解除对对象的引用，这样 element 的引用计数才得以被清零

## 立即调用的函数表达式

IIFE (Immediately Invoked Function Expression)

示例：

```js
(function(){
  // 模拟块级作用域
})();
```

ES6 之前没有块级作用域，通过 IIFE 来模拟块级作用域，ES6 中就没有必要了：

```js
{
  // 块级作用域
}
```

关于 for 循环中使用 var 声明产生的问题：

```js
for(var i = 0; i < divs.length; ++i){
  divs[i].addEventListener('click', funcition(){
    console.log(i)
  })
}
```

以上代码给每个 div 添加了点击事件，并且点击时会打印 i 的值，预期结果是点击第 i 个 div 会打印 i ，但结果是点击任何 div 都会打印 divs.length。这是因为循环的变量 i 是用 var 声明的，所以 i 是一个全局变量，当点击事件触发匿名函数时，这个匿名函数会查找当前的变量 i 的值，因为此时循环已经结束，i 的值是 divs.length，所以点击任何 div 都会打印 divs.length。

为了让每个 div 点击事件触发的匿名函数都有独立的 i，可以使用 IIFE 来锁定 i 的值：

```js
for(var i = 0; i < divs.length; ++i){
  divs[i].addEventListener('click', (funcition(count){
    return function(){
      console.log(count)
    }
  })(i));
}
```

ES6 之后，可以通过 let 实现：

```js
for(let i = 0; i < divs.length; ++i){
  divs[i].addEventListener('click', funcition(){
    console.log(i)
  })
}
```

let 声明的变量作为 for 循环的索引，会在每次循环时创建独立的变量，这样就可以使每一个匿名函数的 i 都是独立的，但如果在循环块作用域外声明，则会失效：

```js
// 在循环外声明就和 var 声明一样了
let i;
for(i = 0; i < divs.length; ++i){
  divs[i].addEventListener('click', funcition(){
    console.log(i)
  })
}
```

## 私有变量

私有变量：定义在函数或块中的变量，包括函数参数、局部变量、函数内定义的函数

严格来说，JS 没有私有变量，但是可以通过某些方法来实现类似的功能。

特权方法（privileged method）是能够访问私有变量的方法，可理解为 Java 中的 get/set 方法

```js
function Person(name){
  this.getName = function(){
    return name;
  }
  this.setName = function(value){
    name = value;
  }
}

let person = new Person('lin');
person.getName();
// lin
```

缺点是每个实例都会重新创建方法，这一点在对象章节中提到过

### 静态私有变量

为了避免上述问题，可以使用静态私有变量

```js
(function(){
  let name = '';

  Person = function(value) {
    name = value;
  }

  Person.prototype.getName = function(){
    return name;
  }

  Person.prototype.setName = function(value){
    name = value;
  }
})();

let person1 = new Person('lin');
person1.getName();
// lin
let person2 = new Person('wang');
person2.getName();
// wang
person1.getName();
// wang
```

静态，表示每个实例的私有变量都有指向统一个值

这里使用 IIFE 将私有变量 name 隔离，并且将特权方法定义在构造函数的原型上，这样可以让每个实例都共享原型上的特权方法，并且私有变量也是共享的，这是因为构造函数和特权方法都是闭包，所有的实例都引用了同一个私有变量 name。因此，只要通过一个实例修改其私有变量，那么所有其他的实例的私有变量也会被修改。

### 模块模式

单例对象（singleton），只有一个实例的对象：

```js
let singleton = {
  name: value,
  method() {
    // 方法
  }
}
```

模块模式在单例对象的基础上拓展：

```js
// 这是一个采用模块模式模拟管理组件的函数
let app = function() {
  let components = new Array();

  // 初始化组件数组
  components.push(new BaseComponent());

  // 返回对象
  return {
    // 获取组件数量
    getComponentCount(){
      return components.length;
    }

    // 注册新组件
    registerComponent(component) {
      if(typeof component == 'object') {
        components.push(component);
      }
    }
  }
}
```

这个函数返回的是一个对象，这个对象通过作用域链关联了私有变量，包含了初始化之后的私有变量，并提供公有方法对私有变量进行操作

### 模块增强模式

增强，是指对象在返回之前需要是某个特定类型的实例

```js
// 这是一个采用模块模式模拟管理组件的函数
let app = function() {
  let components = new Array();

  // 初始化组件数组
  components.push(new BaseComponent());

  // 创建增强对象
  let comp = new BaseComponent();

  // 获取组件数量
  comp.getComponentCount = function(){
    return components.length;
  }

  // 注册新组件
  comp.registerComponent = function(component) {
    if(typeof component == 'object') {
      components.push(component);
    }
  }

  // 返回对象
  return comp;
}
```