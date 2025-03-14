# 变量、作用域与内存

## 原始值与引用值

原始值：6 种原始数据类型（undefined，null，string，number，boolean，symbol）

引用值：对象（object）

### 动态属性

ECMAscript 中，引用值（对象）可以有动态的属性，即可以随时为对象创建新的属性、或修改属性值

而对于原始值，不可以添加属性：

```js
let str = "name";
str.age = 9;
console.log(str.age); //undefined
```

但是可以通过 new 关键字，创建一个 object 类型的实例，这个实例行为类似于对应的原始值：

```js
let str = new String("name");
str.age = 9;
console.log(str.age); // 9
```

### 复制值

#### 原始值的复制

```js
let num1 = 1;
let num2 = num1;
```

- 以上代码，创建了一个原始值 num1，之后创建了 num2，并将 num1 的值复制给 num2，复制的操作实际上为 num2 创建了一个独立的值，即 num1 和 num2 的值互相独立
- 在内存中，num1 和 num2 在栈内存中，它们拥有相同的值 1，但是它们相互独立
- 可以说原始值是按值访问的

#### 引用值的复制

```js
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "lin";
console.log(obj2.name); // "lin"
```

- 以上代码，对引用值进行了复制操作，可以看到，引用值的复制不同于原始值的复制，复制的操作不会为 obj2 创建一个新的独立的值，而是让 obj2 直接去引用 obj1 的值
- 在内存中，obj1 和 obj2 在栈内存中，它们的值指向堆内存中的同一个值
- 可以说引用值是按引用访问的

### 传递参数

**_ECMAscript 中所有函数的参数都是按值传递的_**

按值传递（函数内对参数的操作不会影响函数外的变量）：

```js
function addTen(num) {
  num += 10;
  return num;
}
let count = 10;
// 10，没有变化，说明是按值传递
// 如果是按引用传递，那么 count 的值应该为 20
let result = addTen(count); // 20
```

参数为引用值的情况：

```js
function setName(obj) {
  obj.name = "Nick";
  obj = new Object();
  obj.name = "Bob";
}

let person = new Object();
setName(person);
console.log(person.name); // "Nick"
```

- 以上代码证明了参数是按值引用的
- 为什么`obj = new Object();`不起作用？当在函数内给 obj 重新赋值时，他变成了一个指向本地对象的指针，而这个本地对象在函数执行结束时就被销毁了
- 为什么函数没有返回值，`obj.name = "Nick";`却影响到了外部的 person 变量？因为虽然函数的参数不是按引用传递的，但是引用值（object）是按引用访问的，虽然函数内的 obj 和函数外的 person 不是一个变量，但是它们指向堆内存中同一个值

### instanceof

typeof 可以区分所有的原始值，但是无法区分 null 和 object（都返回 Object），为了区分所有引用类型，使用 instanceof

判断变量（实例）是否属于某种引用类型，返回 boolean

如果实例的原型链上有这个引用类型的构造函数，那么就会返回 true，换句话说，只要实例所继承的父类型中有这个引用类型，就会返回 true

```js
console.log(person instanceof Object);
console.log(person instanceof Array);
console.log(person instanceof RegExp);
```

语法：`variable instanceof constructor`

## 执行上下文与作用域

一些定义：

- 上下文：即字面意思，代码中函数或变量的上下文，大括号内都是一处上下文
- 全局上下文：最外层的上下文，浏览器中的 window 对象
- 上下文栈：每个函数都有自己的上下文，当代码执行进入函数时，函数的上下文会入栈，当此上下文所有代码执行完毕后会被销毁，栈顶的上下文弹出，然后再执行栈顶新的上下文
- 变量对象：每个上下文都有一个变量对象，用于存储所有在这个上下文中定义的变量和函数
- 活动对象：如果上下文是函数，活动对象用作变量对象，活动对象最初只有一个定义变量：arguments
- 作用域链：一个包含指针的列表，指针指向每个作用域对象。代码执行时，会创建变量对象组成的作用域链，根据作用域链决定查找变量的顺序。最前端永远是当前正在执行的上下文的变量对象，下一个是外面一层上下文的变量对象，直到末尾（末尾一定是全局上下文的变量对象）

举例：

```js
var color1 = "blue";
function changeColor() {
  let color2 = "red";
  function swapColor() {
    let temp = color2;
    color2 = color1;
    color1 = temp;
  }
}
```

再以上代码中，函数内部可以访问外部的变量，而外部无法访问函数内部的变量（temp），正是作用域链的顺序查找实现了这种规则

以上代码的作用域链：

```js
window
  |__color1
  |__changeColor()
          |__color2
          |__swapColor()
                  |__temp
```

分析：

- 有哪几个变量对象？window 的变量对象、changeColor() 的变量对象、swapColor() 的变量对象，它们一级套一级，属于嵌套关系
- 代码执行时，如何解析标识符（查找需要的变量）？代码执行时，会先从当前变量对象查询，如果没有，再到上一级变量对象查询，直到找到变量（不能查询下一级）
- 代码执行到 `color2 = color1;`， 按什么顺序查找变量 color1？变量对象 1（temp）===> 变量对象 2（swapColor()）===> 变量对象 2（color2）===> 变量对象 3（changeColor()）===> 变量对象 3（color1）===> 全局上下文的变量对象（window）

### 作用域链增强

作用域链增强：某些语句会导致作用域前端临时添加一个上下文

#### with 语句

会向作用域链前端插入 with 指定的对象

#### try/catch 中的 catch 块

会向作用域链前端插入新的变量对象，包含要抛出错误的对象的声明

### 变量声明

#### 函数作用域声明（var）

```js
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}

let result = add(10, 20);
console.log(sum); // 报错
```

如以上代码，函数内部 var 声明的变量在外部无法访问，这是因为 var 声明的变量会添加到最近的上下文（add() 内的上下文）

```js
function add(num1, num2) {
  sum = num1 + num2;
  return sum;
}

let result = add(10, 20);
console.log(sum); // 30
```

如果不使用 var 声明变量，sum 会被添加到全局上下文，函数外面可以访问到，因为变量提升了

声明提升：作用域中的代码不必考虑变量是否已经声明就可以直接使用，因为变量会以 window.sum 的形式提升到全局上下文中

#### 块级作用域声明（let）

let 的作用域是块级的，块级作用域由一对大括号界定，也就是说，只要在大括号内使用 let 声明变量，外界是无法访问的，强行访问会报错

let 也不能进行重复声明，会报错，var 却可以

严格来说，let 也可以进行提升，但是由于 “暂时性死区” 的缘故，在声明前使用变量会报错

#### 常量声明（const）

const 的声明和初始化必须同时进行，不然会报错，并且一经声明，不能再重新赋值

const 被赋值为引用值时，仍然可以对引用值内部的属性进行修改，因为修改引用值属性，并没有修改变量的引用值（引用值可以看作指向对象的指针）。如果想让整个对象都无法被修改，可以使用 `Object.freeze()`（参数中传入对象），这样修改属性时虽然不会报错，但是会静默失败

#### 标识符查找

代码执行到需要某个变量时，会按作用域链的顺序查找变量，如果不同作用域中有多个重名的变量，会优先使用最近上下文中的变量：

```js
var color = "red";
function getColor() {
  let color = "green";
  {
    let color = "blue";
    console.log(color); // "blue"
  }
}
```

## 垃圾回收

JS 使用了垃圾回收，即执行环境负责管理代码执行时的内存，垃圾回收是周期性的，会每隔一定时间（或者说在代码执行过程中的某个预定回收时间），对于某块内的内存是否应该进行回收，需要使用到标记策略：

### 标记清理

标记清理是 JS 最常用的垃圾回收策略。当变量进入上下文（比如函数内部声明一个变量）时，会被加上存在于上下文中的标记，当变量离开上下文时，也会被加上离开上下文的标记。

垃圾回收程序运行过程：会标记内存中所有的变量，然后对于所有在上下文当中的变量，以及被这些变量引用的变量，会去除它们的标记，剩余有标记的变量则是需要回收的变量，因为上下文中的任何变量都与它们无关了。然后会进行一次内存清理，销毁所有带有标记的变量值以及内存

### 引用计数

引用计数不大常用。堆内存中，当一个引用值被变量引用时，引用数加 1，如果一个变量不再引用这个引用值时，引用数减 1，当引用数为 0 时，表示没有变量再需要这个引用值了，垃圾回收程序下次执行时会释放引用数为 0 的值的内存。

#### 问题：循环引用

```js
function problem() {
  let ob1 = new Object();
  let ob2 = new Object();
  ob1.someObject = ob2;
  ob2.anotherObject = ob1;
}
```

以上代码，ob1 的属性引用了 ob2，而 ob2 的属性引用了 ob1，如果采用标记清理策略，完全没有问题，因为当函数执行完毕，跳出当前作用域后，垃圾回收程序会将 problem() 上下文中所有的变量清除。如果采用引用计数策略，ob1 和 ob2 的引用数永远是 2，并且永远不会变为 0，内存永远不会被释放

问题不止于此。在 IE8 时期，BOM DOM 中的对象是 C++ 实现的（COM 对象），而这些 COM 对象采用引用计数的垃圾回收策略，因此即使 JS 使用标记清理策略，如果 JS 中的对象和 DOM 对象产生了循环调用，DOM 对象永远不会被回收，除非在代码中将对象的属性设为 null，手动将引用数重置为 0。好在 IE9 已经将 DOM BOM 对象改为了 JS 对象，避免了问题

### 性能

如果垃圾回收频率过低，那么内存中会有太多变量，造成性能损失。如果垃圾回收频率过高，那么对于重度依赖 JS 的网页，可能需要多次加载变量，造成性能损失

IE 曾饱受诟病。它的策略如下，分配 256 个变量、4096 个对象/数组字面量和数组 slot、64KB 字符串，只要满足其中一个条件，就会执行垃圾回收。问题在于，可能一次真的需要用到那么多的变量，这样会导致垃圾回收频繁执行，影响性能

IE7 更新了垃圾回收程序，之前固定的阈值被改良为动态阈值，阈值初始值和之前相同，如果本次回收的内存不到已分配的 15%，这些阈值就会翻倍，如果本次回收的内存超过了已分配的 85%，那么阈值会重置为初始值。极大提高了性能

### 内存管理（TODO）

JS 提供了垃圾回收程序，开发者通常无需关心内存管理，不过仍然有一些方法可以进行内存优化。优化内存的最佳手段就是保证执行代码时只保存必要的数据，如果不再需要数据，将其设为 null，这种方法叫做 **_解除引用_**

还有一些内存管理的方法：

#### 通过 const 和 let 声明提升性能

let 与 const 都以块为作用域，所以相比域 var (函数作用域)，使用这两个关键字可能会更早地让垃圾回收程序介入，从而减少不必要的内存占用

#### 隐藏类和删除操作
