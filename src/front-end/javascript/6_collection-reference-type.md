# 集合引用类型

## Object

Object 没有多少功能，但是很适合用于临时存储交换数据

构造函数创建方式:

```js
let person = new Object();
person.name = "lin";
person.age = "23";
```

字面量对象创建方式（这种方式不会调用 Object() 构造函数）：

```js
let person = {
  name: "lin",
  age: 23,
};
// 或者：
let person = {};
person.name = "lin";
person.age = 23;
```

也可以通过 [] 设置动态属性名：

```js
let key = "name";
let person = {
  [key]: "lin",
  age: 23,
};
console.log(person.name); // lin
```

对象字面量的应用：给函数传入可选参数，即给函数传入一个对象，函数内部判断对象中是否有某个属性，如果有则可以将这个属性当作一个参数使用。一般对于必选的参数采用命名参数，对可选的参数采用对象字面量封装多个参数。

属性的获取，两种方式：

```js
person.name;
person["name"];
// 中括号一般用于属性名不适合使用点方法的时候：
person["first name"];
```

详见第 7 章

## Array

ECMAscript 的数组可以存储任何类型。比如，数组中第一个是对象，第二个是 Number，第三个是 String。并且数组长度是动态的

### 创建数组

#### 构造函数方式

可以省略 new 操作符

```js
// 创建空数组
let colors = new Array();
// 创建时规定数组长度
let colors = new Array(20);
// 创建时传入元素
let colors = new Array("red", "blue", "green");
```

#### 数组字面量方式

这种方式不会调用 Array() 构造函数

```js
// 创建空数组
let colors = [];
// 创建时传入元素
let colors = ["red", "blue", "green"];
// 多一个逗号也是可以的，等价于 [1, 2]
let colors = [1, 2];
```

#### from()

将其他类数组结构转换为数组（ES6）：

String 转数组

```js
Array.from("abcd");
// ["a", "b", "c", "d"]
```

Map 转数组

```js
Array.from(new Map().set(1, 2).set(3, 4));
// [[1, 2], [3, 4]]
```

Set 转数组

```js
Array.from(new Set().add(1).add(2).add(3).add(4));
// [1, 2, 3, 4]
```

对现有数组浅拷贝

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1); // [1, 2, 3, 4]
alert(a1 === a2); // false
```

可迭代对象转数组

```js
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};
Array.from(iter); // [1, 2, 3, 4]
```

arguments 对象转数组

```js
function getArgs() {
  return Array.from(arguments);
}
getArgs(1, 2, 3, 4); // [1, 2, 3, 4]
```

带有必要属性的对象转数组

```js
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4
}
Array.from(arrayLikeObject);    // [1, 2, 3, 4]
```

from() 还可以接受第二个参数，这是一个函数参数，可以对原数组的所有值进行增强，`Array.from(ary, function)` 等价于 `Array.from(ary).map(function)`，第二种方法需要通过 from() 创建一个中间数组，在使用 map() 进行数组处理，比较麻烦，因此推荐第一种

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x**2);
// [1, 4, 9, 16]
```

from() 还可以接收第三个参数，用于指定第二个函数参数中 this 中的属性值

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2});
// [1, 4, 9, 16]
```

#### of()（TODO）

将传入的参数转换为数组，代替 ES6 之前的方法 `Array.prototype.slice.call(arguments)`

```js
Array.of(1, 2, 3, 4);   // [1, 2, 3, 4]
Array.of(undefined);    // [undefined]
```

### 数组空位

ECMAscript 中的数组允许有空值

```js
let ary = [,,,,,];
console.log(ary.length);  // 5
console.log(ary);         // [,,,,,]
```

ES6 新增方法（比如 for-of、数组展开）将这些空位当成存在的元素，值为 undefined

ES6 之前的方法（比如 map() join()）会有其他的行为（比如忽略空位，将空位视为空字符串）

由于方法对空位的行为不一致，避免使用空位数组，如果非要使用，可以显示地用 undefined 来代替

### 数组索引

索引从 0 开始，可以通过索引获取数组某一项的值，也可以通过索引对某一项赋值

```js
let colors = ["res", "blue", "green"];
// 将 green 修改为 black
colors[2] = "black";
// 为数组增添新的一项
colors[3] = "brown"
```

length 属性：

- 保存数组的长度
- 不是只读的，可以修改数值，如果新长度小于原长度，会删除末尾多余的项，如果新长度大于原长度，会使用 undefined 来填充
- 数组添加新元素时，会自动修改 length 的值

```js
let colors = ["res", "blue", "green"];
// 可以将 length 作为索引值，这样表示在数组末尾添加一个新元素
let colors[colors.length] = "brown"
// 以下操作将数组扩展到 99 长度，但是其中索引值为 4-98 的元素值为 undefined
let colors[99] = "brown"
```

### 检测数组

使用 instanceof，只判断 Array 是否在 ary 的原型链上，如果网页中有多个框架，可能有两个全局上下文，此时就会有两个 Array 构造函数，这种情况下 instanceof 会失效

```js
ary instanceof Array
```

#### isArray()

只判断是不是数组，不管它的原型链在哪个框架上（不同的全局上下文会导致不同的原型链）

```js
Array.isArray(ary);
```

### 迭代器方法（TODO）

### 复制和填充方法

#### fill()

fill() 可以向一个已有的数组插入全部或部分相同的值

一个参数，填充所有项为指定参数值

```js
const ary = [0, 0, 0, 0, 0, 0];
ary.fill(5);  // [5, 5, 5, 5, 5, 5]
```

两个参数，用第一个参数填充数组中索引大于等于第二个参数的元素

```js
const ary = [0, 0, 0, 0, 0, 0];
ary.fill(5, 3);   // [0, 0, 0, 5, 5, 5]
```

三个参数，用第一个参数填充索引大于等于第一个参数，小于第三个参数的元素

```js
const ary = [0, 0, 0, 0, 0, 0];
ary.fill(5, 1, 3);   // [0, 5, 5, 0, 0, 0]
```

如果区间值为负数，转换为 ary.length + 负值

如果区间值过小或过大，不进行填充

如果区间值前大后小，无效区间，不进行填充

如果只有右区间值过大，视为一直填充到末尾

#### copyWithin()

copyWithin() 会按指定范围复制数组内的部分内容

一个参数 n，将数组从头开始到索引 n-1 的内容复制到 n 的位置，直到达到数组边界

```js
let ints = [0, 1, 2, 3, 4, 5];
ints.copyWithin(4);   // [0, 1, 2, 3, 0, 1]
```

两个参数 a b，从索引为 b 的元素开始，将之后的元素复制到 a 的位置

```js
let ints = [0, 1, 2, 3, 4, 5];
ints.copyWithin(1, 4);    // [0, 4, 5, 3, 4, 5]

let ints = [0, 1, 2, 3, 4, 5];
ints.copyWithin(3, 4);    // [0, 1, 2, 4, 4, 5]
```

三个参数 a b c，将索引 b 到索引 c 之间的元素（左闭右开）复制到 a 的位置

```js
let ints = [0, 1, 2, 3, 4, 5];
ints.copyWithin(0, 3, 5);   // [3, 4, 2, 3, 4, 5]
```

如果区间值为负值，转换为 ints.length + 负值

如果区间值过小或过大，不进行填充

如果区间值前大后小，无效区间，不进行填充

如果只有右区间值过大，视为一直填充到末尾

### 转换方法

#### toString() 和 valueOf()

数组的 toString() 方法返回值：将每个元素的 toString() 方法结果采用逗号拼接的字符串

```js
let colors = ["res", "blue", "green"];
colors.toString();  // "res,blue,green"
colors.valueOf();   // "res,blue,green"
colors;             // "res,blue,green"
```

#### toLocaleString()

数组的 toLocaleString() 方法返回值：将每个元素的 toLocaleString() 方法结果采用逗号拼接的字符串。所以一个数组的 toString() 和 toLocaleString() 返回值可能不同，依据于每个元素的具体方法

#### join()

如果不想以逗号作为打印结果的分隔符，可以使用 join()

```js
let colors = ["res", "blue", "green"];
alert(colors.join("||"));   // "res||blue||green"
```

如果参数为空或者 undefined，那么仍然使用逗号为分隔符

#### 数组空位的特殊情况

对于数组空位，toString()、valueOf()、toLocaleString()、join() 会将其视为空字符串

```js
let colors = ["res", "blue", "green",,,];
alert(colors.join("||"));   // "res||blue||green||||"
```

### 栈方法

ECMAscript 提供了几个方法，数组可以像栈一样进行操作（LIFO，Last-In-First-Out，后进先出），比如推入操作（push），弹出操作（pop）

#### push()

方法一次向数组中推入多个元素，返回数组长度

```js
let colors = new Array();
colors.push("red", "blue"); // 2
```

#### pop()

方法删除数组中最后一个元素，并返回删除的元素值

接上例：

```js
alert(colors);  // "red,blue"
colors.pop();   // "blue"
```

### 队列方法

数组也可以像队列一样进行操作（FIFO, First-In-First-Out, 先进先出）

#### shift()

方法删除数组第一个元素，并返回删除的元素值

#### unshift()

在数组开头添加多个值

### 排序方法

#### reverse()

将数组倒序排列

#### sort()

升序排序，通过 String() 将数组中每个元素转换为字符串，然后按照字符串大小排列。在对数值排序时，会产生问题，比如 10 会排到 5 的前面，因为 "10" 的第一个字符 "1" 小于 "5"，因此 sort() 还可以接受一个比较函数

```js
function compare(a, b) {
  if(a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
let vals = [2, 1, 4, 3, 5];
vals.sort(compare);
alert(vals);    // [1, 2, 3, 4, 5]
```

可以将比较函数简化为箭头函数：

```js
vals.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
```

可以进一步简化：

```js
vals.sort((a, b) => a - b);
```

### 操作方法

#### concat()

连接数组

```js
let ary = ["a", "b", "c"];
let ary2 = ary.concat("d", ["e", "f"]);
alert(ary2);  // ["a", "b", "c", "d", "e", "f"]
```

可以注意到，concat() 的参数一个是字符串，一个是字符串数组，默认会打平数组参数，即将 `["e", "f"]` 视为 `"e", "f"` ，当然也可以通过一个配置来阻止打平数组的行为:

```js
let ary = ["a", "b", "c"];
let letters = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: "d",
  1: "e"
};
let newletters = ["d", "e"];
newletters[Symbol.isConcatSpreadable] = false;
ary.concat(letters);      // ["a", "b", "c", "d", "e"]
ary.concat(newletters);   // ["a", "b", "c", ["d", "e"]]
```

#### slice()

截取一部分数组

一个参数 n，从 n 开始截取到末尾

```js
let letters = ["a", "b", "c", "d", "e"];
letters.slice(1);     // ["b", "c", "d", "e"]
```

两个参数 a b，截取索引 a 到索引 b 之间的元素（左闭右开）

```js
let letters = ["a", "b", "c", "d", "e"];
letters.slice(1, 4);  // ["b", "c", "d"];
```

#### splice()

两个参数 a b，删除操作，从 a 开始，删除 b 个元素，返回删除的元素

```js
let ary = ["a", "b", "c", "d", "e"];
ary.splice(0, 2);
alert(ary);   // ["c", "d", "e"]
```

多个参数 a b c d，从 a 开始，删除 b 个元素，然后在 a 处插入 c d，返回删除的元素

当第二个参数为 0 时，不会删除元素，等价于插入操作

```js
let ary = ["a", "b", "c", "d", "e"];
ary.splice(1, 1, "f", "g");
alert(ary);   // ["a", "f", "g", "c", "d", "e"]
```

### 搜索和位置方法

#### 严格相等

参数和数组中的匹配项必须满足全等（===）

##### indexOf()

从头开始找，返回索引值

##### lastIndexOf()

从尾部开始找，返回索引值

##### includes()

从头开始找，返回布尔值

#### 断言函数

##### find()

接收一个断言函数，当断言函数返回 true 时，方法 find() 返回找到的对象

断言函数参数：元素、索引值、数组

```js
const people = [
  {
    name: "lin",
    age: 27
  },
  {
    name: "wang",
    age: 29
  }
]

people.find((element, index, array) => element.age < 28);
// {name: 'lin', age: 27}
```

##### findIndex()

接收一个断言函数，当断言函数返回 true 时，方法 findIndex() 返回索引值

接上例：

```js
people.findIndex((element, index, array) => element.age < 28);
// 0
```

### 迭代方法

迭代方法参数：一个函数，一个对象（用于指定函参中 this 的值）。这个函数的参数：元素、索引值、数组

#### every()

数组中每一项作为参数传入函数，如果所有项返回的结果均为 true，那么 every() 返回 true

```js
let num = [1, 2, 3, 4, 5, 6];
num.every((item, index, array) => item > 2);
// false
```

#### some()

数组中每一项作为参数传入函数，如果有一项返回的结果为 true，那么 some() 返回 true

```js
let num = [1, 2, 3, 4, 5, 6];
num.some((item, index, array) => item > 2);
// true
```

#### filter()

过滤器，数组中每一项作为参数传入函数，所有结果为 true 的项，会组成一个数组成为 some() 的返回值

```js
let num = [1, 2, 3, 4, 5, 6];
num.filter((item, index, array) => item > 2);
// [3, 4, 5, 6]
```

#### forEach()

相当于 for 循环遍历数组，在函数中对数组中的每一项进行操作，没有返回值

```js
let num = [1, 2, 3, 4];
num.forEach((item, index, array) => array[index] = 0);
alert(num);
// [0, 0, 0, 0]
```

#### map()

在函数中对数组中的每一项进行操作，每次函数对 item 操作的结果会组成一个数组，作为 map() 的返回值

```js
let num = [1, 2, 3, 4];
num.map((item, index, array) => item = 0);
// [0, 0, 0, 0]
```

### 归并方法

归并方法的参数：一个函数。函数的参数：上一个元素，当前元素，当前索引值，数组

#### reduce()

从头开始归并，如下进行数组的累加操作：

```js
let vals = [1, 2, 3, 4];
vals.reduce((accumulator, curr, index, array) => accumulator + curr, 0);
// 10
```

第二个参数 initialValue：

第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。

#### reduceRight()

从末尾开始归并，和 reduce() 的区别只在于归并方向相反

## 定型数组（TODO）

## Map

Map，映射

Map 用于存储键值对：`[["key", "value"], ["key", "value"]... ]`

ES6 之前，使用 Object 存储键值对，所以 Map 的大多数特性都可以通过 Object 实现

### 创建

new Map() 构造函数创建 Map：

```js
// 创建空 Map
const m = new Map();

// 使用嵌套数组初始化映射
const m = new Map([
  ["k1", "v1"],
  ["k2", "v2"],
  ["k3", "v3"]
]);

// 使用自定义迭代器初始化映射
const m = new Map({
  [Symbol.iterator]: function*(){
    yield ["k1", "v1"],
    yield ["k2", "v2"],
    yield ["k3", "v3"]
  }
});

// 映射期待的键值对，无论是否提供
const m = new Map([[]]);
alert(m.has(undefined));  // true
alert(m.get(undefined));  // undefined
```

### 增删改查

#### set()

接收两个字符串参数，作为新的键值对，返回值是新的 Map 对象，因此可以连续多个 set 操作

```js
const m = new Map();
m.set("key1", "val1").set("key2", "val2");
```

#### has()

传入 key 参数，查询 Map 中是否有某个键值对，返回布尔值

#### get()

传入 key 参数，返回 Map 中 key 相匹配的 value

#### delete()

传入 key 参数，删除匹配的键值对，删除成功返回 true，删除失败返回 false

#### clear()

删除 Map 中所有键值对

#### size

Map 的属性，返回 Map 中键值对的个数

### 关于 key 的匹配性

Map 的键可以使用任何数据类型，Map 内部会使用 SameValueZero 比较（内部定义，语言中无法使用），基本相当于严格对象相等来检查键的匹配性，Map 的值也可以是任何数据类型

```js
const functionKey = function() {};
const m = new Map();
m.set(functionKey, "val1");
m.get(function(){});
// undefined
// 意味着使用 SameValueZero 比较 key，独立的对象实例不会冲突
```

如果 key 是集合或数组等引用类型，假如修改集合或数组内容，key 值不会改变，仍然可以访问到

SameValueZero 比较也会出现一些冲突：

```js
const m = new Map();
const a = 0/"",
      b = 0/"",
      pz = +0,
      nz = -0;

alert(a === b);     // false
alert(pz === nz);   // true

m.set(a, "vala");
m.set(pz, "valpz");

alert(m.get(b));    // vala
alert(m.get(nz));   // valpz
```

关于 JS 中[相等性介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### 顺序与迭代

Map 会维护键值对的插入顺序

Map 实例会提供一个迭代器，能以插入顺序生成 [key, value] 形式的数组，有两种方式获取这个迭代器：

#### entries()

```js
const m = new Map([
  ["k1", "v1"],
  ["k2", "v2"],
  ["k3", "v3"]
]);

for(let pair of m.entries()){
  alert(pair);
}
// k1, v1
// k2, v2
// k3, v3
```

#### [Symbol.iterator]

```js
for(let pair of m[Symbol.iterator]){
  alert(pair);
}
// k1, v1
// k2, v2
// k3, v3
```

#### keys()

并且 Map 实例还提供了 key 的迭代器：

```js
for(let key of m.keys()){
  alert(key);
}
// k1
// k2
// k3
```

在对 m.keys() 的遍历中，无法修改 key 的值，但是，如果 key 时对象，那么可以修改对象内部的属性值

#### values()

以及 value 的迭代器：

```js
for(let value of m.values()){
  alert(value);
}
// v1
// v2
// v3
```

#### forEach()

不使用迭代器？回调方式：

```js
m.forEach((val, key) => alert(`${key} -> ${val}`));
// k1 -> v1
// k2 -> v2
// k3 -> v3
```

forEach() 接收两个参数，第一个参数是函数，第二个参数可选，是一个指定 this 值的对象

### Object VS. Map

1. 内存占用，Map WIN!
2. 插入性能，Map WIN!
3. 查找速度，Object WIN!
4. 删除性能，Map WIN!

## WeakMap（TODO）

弱映射，API 是 Map 的子集

### 与 Map 的区别

增删改查的方法和 Map() 一致

WeakMap 的 key，只允许是 Object 类型，或者继承自 Object，否则会抛出错误 TypeError

### 弱键（TODO）

WeakMap 的 key 的引用不属于正式的引用，这意味着 key 的引用不会阻止垃圾回收。但是 value 的引用是正式的引用。只要 key 存在，键值对就会存在于 WeakMap 中，因此就不会被当作垃圾回收

## Set

Set，集合，像是增强的 Map，并且大部分 API 是共有的

### 与 Map 的区别

Set 存储的不再是键值对，而是一个值（值就是键，键就是值）

增添方法不同于 Map 中的 set()，而是 add()，其他特性一致

Set 的迭代器没有 keys()，也有 entries()，不过 entries() 返回的是两个重复的值：`[value, value]`，其他迭代方式都一致

### 定义正式集合操作（TODO）

可以自定义关于 Set 的操作

## WeakSet（TODO）
