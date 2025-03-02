# 面向对象

## 理解对象

可以将对象想象成一个列表，列表中的内容都是键值对，值可以是属性或函数

可以通过 new Object() 创建新的对象实例，也可以使用对象字面量（大括号）创建实例

### 属性的类型

ECMA-262 规定了一些 **_内部特性_** 来描述属性的特征，这些特性不能被开发者访问到，为了标识内部特性，采用 `[[Value]]` 的方式表示内部特性

属性可以分两类：数据属性、访问器属性

#### 数据属性

##### 内部特性

- [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改这个属性的特性，是否可以把属性改为访问器属性，默认情况，直接定义在对象上的属性的这个特性值都为 true
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回，默认情况，直接定义在对象上的属性的这个特性值都为 true
- [[Writable]]：表示属性的值是否可以被修改，默认情况，直接定义在对象上的属性的这个特性值都为 true
- [[Value]]：包含属性的值，默认是 undefined

例如：

```js
let person = {
  name: "lin";
}
```

以上代码所创建的 name 属性，他的 [[Configurable]]、[[Enumerable]]、[[Writable]] 都为 true，而 [[Value]] 的值是 lin

##### delete 操作符

delete 运算符用于删除对象的一个属性；如果该属性的值是一个对象，并且没有更多对该对象的引用，该属性所持有的对象最终会自动释放。

```js
const Employee = {
  firstname: "Maria",
  lastname: "Sanchez",
};

console.log(Employee.firstname);
// Expected output: "Maria"

delete Employee.firstname;

console.log(Employee.firstname);
// Expected output: undefined
```

##### 修改特性

使用 Object.defineProperty(obj, prop, define-obj)，包含三个参数：第一个 obj，是要修改的对象，第二个 prop 是对象中要修改的属性，第三个 define-obj 是一个对象，可以指定所有特性的值，对于没有指定的特性，默认为 false

```js
let person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "lin",
});
console.log(person.name);
// lin
person.name = "Grey";
console.log(person.name);
// lin
```

#### 访问器属性

##### 内部特性

- [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改这个属性的特性，是否可以把属性改为访问器属性，默认情况，直接定义在对象上的属性的这个特性值都为 true
- [[Enumerable]]：表示属性是否可以通过 for-in 循环返回，默认情况，直接定义在对象上的属性的这个特性值都为 true
- [[Get]]：获取函数，读取属性时使用，默认 undefined
- [[Set]]：设置函数，写入属性时使用，默认 undefined

直接定义访问器属性:

```js
const book = {
  // 下划线表示这个属性不想被外界访问，属于私有属性，有的约定在属性前加入下划线，有的在属性前加入双下划线，这些方式都可以
  year_: 2017,
  edition: 1,

  get year() {
    return this.year_;
  },
  set year(newVal) {
    if (newVal > 2017) {
      this.year_ = newVal;
      this.edition += newVal - 2017;
    }
  },
};

book.year = 2018;
alert(book.edition); // 2
```

通过 Object.defineProperty() 定义：

```js
let book = {
  // 下划线表示这个属性不想被外界访问，属于私有属性
  year_: 2017,
  edition: 1,
};

// 添加一个新属性 year，用于外界操作私有属性 year_
Object.defineProperty(book, "year", {
  // 设置 get 方法来访问私有属性
  get() {
    return this.year_;
  },
  // 设置给 year 赋值时的操作
  set(newVal) {
    if (newVal > 2017) {
      this.year_ = newVal;
      this.edition += newVal - 2017;
    }
  },
});

book.year = 2018;
alert(book.edition); // 2
```

可以看出，访问器的使用场景，即设置一个属性时同时发生其他的变化

只定义 get 函数，则属性无法被修改，只定义 set 方法，非严格模式访问属性会返回 undefined，严格模式会报错

### 定义多个属性

Object.defineProperties()

```js
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017,
  },

  edition: {
    value: 1,
  },

  year: {
    get() {
      return this.year_;
    },
    set(newVal) {
      if (newVal > 2017) {
        this.year_ = newVal;
        this.edition += newVal - 2017;
      }
    },
  },
});
```

这段代码和上一段示例是一样的

### 读取属性的特性

Object.getOwnPropertyDescriptor()

接上面的代码：

```js
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
alert(descriptor.value); // 2017
alert(typeof descriptor.get); // undefined
alert(descriptor.configurable); // false

let descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(typeof descriptor.get); // function
```

Object.getOwnPropertyDescriptors()

```js
let descriptor = Object.getOwnPropertyDescriptors(book);
console.log(descriptor);

/**
返回值：
{
  edition: {
    configurable: false,
    enumerable: false,
    value: 1,
    writable: false
  },
  year: {
    configurable: false,
    enumerable: false,
    get: f(),
    set: f(newVal)
  },
  year_: {
    configurable: false,
    enumerable: false,
    value: 2017,
    writable: false
  }
}
 */
```

### 合并对象

合并（merge）操作有时也被称为混入（mixin）

Object.assign()，第一个参数是目标对象，之后可以有一个或多个对象参数，作为要合并的源对象。会将每个源对象中的所有 **_可枚举_**（可以 for-in 遍历） 和 **_自有_**（非继承属性） 属性复制到目标对象。这个方法会使用源对象的 [[Get]] 获取属性的值，使用目标对象的 [[Set]] 设置属性的值

```js
let dest, src, result;

dest = {};
src = { id: "src" };

result = Object.assign(dest, src);

alert(dest === result); // true
alert(dest !== src); // true
```

特点：

- 如果多个源对象有重复的属性，那么会使用最后一个对象的属性值
- Object.assign() 采用的是浅拷贝，即拷贝的属性值如果是引用值（对象），那么源对象和目标对象的这个属性会同时共用这个属性值
- 两个对象之间不能转移 [[Get]] 和 [[Set]] 函数
- 对于多个源对象合并，如果合并期间某一个对象的某个属性报错，会终止赋值，并且不会回滚，即已经合并的内容会保留

### is()

ES6 之前，特殊情况下，=== 的结果很混乱：比如，`+0 === -0` 的结果是 true，或者判断 `NaN === NaN` 的结果是 false

因此 ES6 新增 Object.is()，这个方法解决了上述的问题：

```js
Object.is(-0, +0); // false
Object.is(0, +0); // true
Object.is(-0, 0); // false

Object.is(NaN, NaN); // true
```

检查多个值是否相等（递归）：

```js
function checkEqual(x, ...rest) {
  return Object.is(x, rest[0]) && (rest.length < 2 || checkEqual(...rest));
}
```

### 语法糖

#### 属性值简写

```js
function a(name) {
  return {
    name: name,
  };
}
```

语法糖：

```js
function a(name) {
  return {
    name,
  };
}
```

#### 可计算属性

以下代码尝试将变量作为属性的名称，然后给这个属性赋值：

```js
const nameKey = "name";
let person = {};
person[nameKey] = "lin";
```

语法糖：

```js
const nameKey = "name";
let person = {
  [nameKey]: "lin",
};
```

值得注意的是，如果在变量赋值过程中报错（由于属性名是变量，导致这种情况可能会发生），无法回滚

#### 简写方法名

给对象添加一个属性，并且它的值是一个匿名函数：

```js
let person = {
  printName: function (name) {
    console.log(name);
  },
};
```

语法糖：

```js
let person = {
  printName(name) {
    console.log(name);
  },
};
```

### 对象解构

```js
let person = {
  name: "lin",
  age: 23,
};
let pName = person.name;
let pAge = person.age;
```

使用结构：

```js
let person = {
  name: "lin",
  age: 23,
};
let { name: pName, age: pAge } = person;
```

简写：

```js
let { name, age } = person;
console.log(name); // lin
console.log(age); // 23
```

如果解构时某个属性不存在，那么其值为 undefined，当然，也可以给可能不存在的属性设置一个默认值：

```js
let { name, job = "Student" } = person;
console.log(job); // Student
```

解构时，会使用内部函数 ToObject() （不能再运行时环境访问）把源数据转换为对象，因此 null 和 undefined 不能被解构，会报错

```js
// ToObject() 会将字符串字面量转换成 String 对象类型
let { length } = "lin";
console.log(length); // 3

// ToObject() 会将数值转换成 Number 对象类型
let { constructor } = 5;
console.log(constructor === Number); // true
```

如果解构的变量已经事先定义了，那么要用括号包裹表达式：

```js
let name, age;
let person = {
  name: "lin",
  age: 23,
};

({ name, age } = person);
```

#### 复制对象

```js
let person = {
  name: "lin",
  job: {
    title: "Student",
  },
};
let copy = {};
({ name: copy.name, job: copy.job } = person);
```

以上代码通过解构对对象进行复制，但是这种复制属于浅拷贝，即如果修改 person.job.title，那么 copy.job.title 会同时被修改，因为它们指向同一个引用值

#### 嵌套解构

```js
let person = {
  name: "lin",
  job: {
    title: "Student",
  },
};
// 先对 person 解构，然后再对 job 解构，最终获取 title 的值
let {
  job: { title },
} = person;
// 等价于：
let {
  job: { title: title },
} = person;

console.log(title); // Student
```

#### 部分解构

如果解构的属性没有定义，那么不能在这个属性上使用嵌套解构，会报错

当报错时，终止解构，并且不会回滚，所以只会有部分解构成功

#### 参数解构

在函数的参数中也可以进行解构，并且不会影响 arguments 对象

```js
let person = {
  name: "lin",
  age: 23,
};

function print(a, { name, age }, b) {
  console.log(arguments);
  console.log(name, age);
}

print(1, person, 2);
// [1, { name: lin, age: 23 }, 2]
// lin 23
```

## 创建对象

### 工厂模式

一种设计模式，是用于抽象创建特定对象的过程

```js
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  return o;
}

let person = createPerson("lin", 23, "Student");
```

这种模式解决了创建多个类似对象的问题，但是无法判断创建的对象是什么类型，因为所有的对象都是 Object 类型

### 构造函数模式

几种用构造函数创建对象的方式：

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

let person = new Person("lin", 23, "Student");
```

等价于：

```js
let Person = function (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
};

let person = new Person("lin", 23, "Student");
```

无参构造函数：

```js
function Person() {
  this.name = "lin";
  this.age = 23;
  this.job = "Student";
}

let person = new Person();
```

#### 构造函数模式与工厂模式的区别

- 没有显示创建对象
- 属性和方法赋值给 this（this 是方法的调用者，即 person 实例）
- 没有 return

#### 使用 new 操作符调用构造函数流程

1. 在内存中创建一个新对象
2. 将构造函数的 prototype 属性赋值给这个新对象的 [[prototype]] 特性
3. 构造函数中的 this 被值为这个新对象
4. 执行构造函数中的代码
5. 如果构造函数返回非空对象，则返回该对象，否则返回这个新对象

#### 构造函数可以区别对象类型

如果再执行 `console.log(person.constructor)` 可以发现 person 继承了 Object 的 constructor 属性，并且打印的内容正是 Person 的构造函数，并且无论创建多少个 Person 实例，它们的 constructor 都指向同一个构造函数

```js
alert(person instanceof Object); // true
alert(person instanceof Person); // true
```

根据以上代码可以看出，person 既是 Object 的实例，又是 Person 的实例，因为自定义对象都继承自 Object

#### 构造函数也是函数

构造函数和普通函数的区别仅在于调用方式：构造函数通过 new 操作符创建，普通函数直接创建

```js
function Person() {
  this.name = "lin";
  this.age = 23;
  this.job = "Student";
  this.sayName = function () {
    alert(this.name);
  };
}

let person = new Person("lin", 23, "Student");
person.sayName();

Person("lin", 23, "Student");
window.sayName();

let o = new Object();
Person.call(o, "lin", 23, "Student");
o.sayName();
```

以上代码有三种调用方式：

- new 操作符调用构造函数，这时的调用者（this 指向）是 person 实例
- 直接调用构造函数，并且没有指定 this，这时 this 始终指向 Global（window）对象实例
- 使用 call 指定 this 的值为实例 o

#### 构造函数的问题

构造函数中的 function 会重复创建，即不同的实例虽然都有构造函数中定义的方法（如上文中的 sayName()），但是这些 function 不属于同一个 Function 实例

上文的 Person 构造函数等价于：

```js
function Person() {
  this.name = "lin";
  this.age = 23;
  this.job = "Student";
  // 这里相当于创建一个新的 Function 实例
  this.sayName = new Function("alert(this.name)");
}

let person1 = new Person("lin", 23, "Student");
let person2 = new Person("wang", 22, "Student");

alert(person1.sayName == person2.sayName); // false
```

没有必要为每一个 Person 实例定义不同的 Function 实例，因此可以把函数转移到构造函数外：

```js
function Person() {
  this.name = "lin";
  this.age = 23;
  this.job = "Student";
  // 这里的 sayName 是一个指向外部方法的指针
  this.sayName = sayName;
}

function sayName() {
  alert(this.name);
}
```

这样，可以让每个 Person 实例都公用一个方法，因为这个方法是定义在 window 上的，但这样会导致自定义类型引用的函数不能很好的聚集再一起，所有自定义类型的方法都会创建在 window 对象上，十分混乱，这个问题可以通过原型模式解决

### 原型模式

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含当前引用类型的实例共享的属性和方法，可以将属性和方法赋值到 构造函数的 prototype 上：

```js
function Person() {}

Person.prototype.name = "lin";
Person.prototype.age = 23;
Person.prototype.job = "Student";
Person.prototype.sayName = function () {
  alert(this.name);
};

let person1 = new Person("lin", 23, "Student");
let person2 = new Person("wang", 22, "Student");

alert(person1.sayName == person2.sayName); // true
```

可以看出，person1 和 person2 的 sayName 函数是同一个实例

#### 理解原型

定义构造函数时，会自动创建一个 prototype 属性，指向这个函数的原型对象，原型对象有一个 constructor 属性，又指向构造函数，在之前的例子中，Person.prototype.constructor 指回 Person，即构造函数和原型对象是循环调用的关系：

```js
alert(Person.prototype.constructor); // Person
```

原型对象：自定义构造函数时自动创建，只默认获取 constructor 属性，其他属性继承自 Object

实例创建时，实例内部特性 [[Prototype]] 指针指向构造函数的原型对象，但是内部特性开发者无法访问，可以通过浏览器供应商实现的 `__proto__` 属性访问原型对象：

```js
// Person 的原型对象的原型对象就是 Object 的原型对象
alert(Person.prototype.__proto__ === Object.prototype); // true
```

`__proto__` 和 prototype 区别：

- 构造函数通过 prototype 链接到原型对象
- 实例通过 `__proto__` （ [[Prototype]] ）链接到原型对象

Object 的原型对象为 null，因为 Object 位于原型链的最顶层：

```js
// Person 的原型链最后终止于 Object 的原型对象
alert(Person.prototype.__proto__.__proto__ === null); // true
```

关键：构造函数、原型对象、实例是 3 个完全不同的对象，实例和其构造函数中都有相应的属性（ `__proto__` 和 prototype ）指向构造函数的原型对象，而实例和构造函数之间没有关系，但是实例仍然可以以 `person1.sayName()` 的方式调用构造函数原型对象的函数，这是由于对象属性查找机制的原因

#### 原型方法

##### isPrototypeOf()

判断对象的原型类型（如果参数对象的原型对象是调用者时返回 true）：

```js
console.log(Person.prototype.isPrototypeOf(person1)); // true
```

##### Object.getPrototypeOf()

返回参数内部特性 [[Prototype]] 的值，即原型对象

##### Object.setPrototypeOf()

给参数对象的原型对象增加属性

```js
// 给 Person 的原型对象新增一个 numLeges: 2 属性
Object.setPrototype(person, { numLegs: 2 });
```

这种方式有很大的隐患，因为这样会修改所有访问这个对象的代码，十分影响性能，可以通过 Object.create() 创建新对象，同时指定其原型对象：

```js
let person = Object.create({ numLegs: 2 });
```

#### 原型层级

通过对象访问属性时，会先从实例本身开始搜索这个属性，如果没有，再从对象的原型对象中搜索这个属性

```js
function Person() {}

Person.prototype.name = "lin";
Person.prototype.age = 23;
Person.prototype.job = "Student";
Person.prototype.sayName = function () {
  alert(this.name);
};

let person1 = new Person();
let person2 = new Person();

person1.name = "li";
alert(person1.name); // li 属性值来自实例
alert(person1.name); // lin 属性值来自于原型
```

属性遮蔽（shadow）：给对象添加一个属性，这个属性会覆盖原型对象中的同名属性，注意不会修改原型的属性，只是屏蔽对它的访问

如何解除属性遮蔽？即使将对象属性的值设为 null，原型属性也会被遮蔽，可以使用 delete 删除对象属性，这样便可以解除对原型属性的屏蔽

接上文代码：

```js
delete person1.name;
alert(person1.name); // lin
```

##### hasOwnProperty()

用于确定属性是在实例上还是在原型对象上，如果参数中的属性在调用它的实例上，返回 true

接上文代码：

```js
alert(person1.hasOwnProperty("name")); // false

person1.name = "wang";
alert(person1.hasOwnProperty("name")); // true
```

可以看出，只有实例属性遮蔽原型属性时会返回 true

#### 原型和 in

单独使用 in 操作符可以判断某个属性是否在对象上，无论在实例上还是在原型对象上都返回 true

接上文代码：

```js
alert("name" in person1); // true
```

如果要判断某个属性是否是原型对象的属性，可以将 in 和 hasOwnProperty() 配合使用：

接上文代码：

```js
// 如果属性不是实例属性且这个属性存在，那么它就是原型对象的属性
alert(!person1.hasOwnProperty("name") && "name" in person1); // false
```

#### 属性枚举

for-in 循环可以返回可枚举的所有属性，包括实例属性和原型属性

```js
function Person() {}

Person.prototype.name = "lin";
Person.prototype.age = 23;
Person.prototype.job = "Student";
Person.prototype.sayName = function () {
  alert(this.name);
};

let person1 = new Person();
person1.gender = "male";
person1.name = "wang";
for (let prop in person1) {
  console.log(prop);
}
// gender
// name
// age
// job
// sayName
```

Object.keys() 可以返回所有可枚举的实例属性

```js
console.log(Object.keys(person1)); // ['gender', 'name']
```

Object.getOwnPropertyNames() 可以返回所有实例属性，无论是否可以枚举

```js
console.log(Object.getOwnPropertyNames(person1.__proto__));
// ['constructor', 'name', 'age', 'job', 'sayName']
```

Object.getOwnPropertySymbols() 可以返回所有以 Symbol 类型为属性名的属性

```js
let k1 = Symbol("k1");
let k2 = Symbol("k2");

let obj = {
  [k1]: "k1",
  [k2]: "k2",
};

console.log(Object.getOwnPropertySymbols(obj));
// [Symbol(k1), Symbol(k2)]
```

##### 属性枚举顺序

for-in 和 Object.keys() 枚举顺序不确定，取决于浏览器

Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols() 以及 Object.assign() 的枚举顺序确定：先升序枚举所有 Number 类型的属性名，再以插入顺序枚举 String 和 Symbol 属性名

### 对象迭代

#### Object.entries()

参数是一个对象，方法会以键值对的形式返回所有的属性和属性值，不包括 Symbol 属性，执行的是浅拷贝

```js
let o = {
  name: "lin",
  gender: "male",
};

console.log(Object.entries(o));
// [['name', 'lin'], ['gender', 'male']]
```

#### Object.values()

和 Object.keys() 是兄弟方法，返回所有的属性值，不包括 Symbol 属性，执行的是浅拷贝

```js
console.log(Object.values(o));
// ['lin', 'male']
```

### 补充

#### 创建原型对象

在之前的方式中，定义原型是这样的：

```js
function Person() {}

Person.prototype.name = "lin";
Person.prototype.age = 23;
Person.prototype.job = "Student";
Person.prototype.sayName = function () {
  alert(this.name);
};
```

可以进行简化：

```js
function Person() {}

Person.prototype = {
  name = "lin",
  age = 23,
  job = "Student",
  sayName = function(){
    alert(this.name);
  }
}
```

这样重写之后，Person.prototype.constructor 不再指向 Person，而是指向 Object 构造函数，虽然仍然可以通过 instanceof 判断实例是否属于 Person 对象，但是无法使用 constructor 判断实例的对象类型了，如果 constructor 很重要可以这样重写：

```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name = "lin",
  age = 23,
  job = "Student",
  sayName = function(){
    alert(this.name);
  }
}
```

但是，这样还有缺陷，由于开发者创建的属性默认是可枚举的，这个手动添加 constructor 会被认为是可枚举类型的属性，为了让这个 constructor 是默认的不可枚举类型属性，可以这样重写：

```js
function Person() {}

Person.prototype = {
  name = "lin",
  age = 23,
  job = "Student",
  sayName = function(){
    alert(this.name);
  }
}

Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})
```

#### 原型的动态性

即使修改原型对象时，实例已经存在，这时对原型对象的修改也会反映在实例上：

```js
let man = new Person();

Person.prototype.sayHi = function () {
  console.log("hi");
};

man.sayHi(); // hi
```

这是因为实例与原型之间的联系：实例中的 [[Prototype]] (即 `__proto__`) 的值是一个指针，指向原型对象，因此，当尝试通过实例调用 sayHi() 方法时，实例会先尝试在实例中搜寻 sayHi()，没有找到，会按照 [[Prototype]] 的指针值找到原型对象，再从原型对象中搜索 sayHi()，找到之后进行调用

但是，如果重写整个原型对象，会切断实例与原型对象的联系，这样无法通过实例调用新创建的方法：

```js
let man = new Person();

Person.prototype = {
  constructor: Person,
  sayHi() {
    console.log("hi");
  },
};

man.sayHi(); // Error
```

这是因为当给 Person.prototype 赋一个新值后，Person 构造函数会的 prototype 属性会指向新原型对象，但是已经创建的实例 man 的 `__proto__` 仍然指向旧原型对象，因此实例搜索不到要调用的 sayHi() 方法

要想调用 sayHi() 方法，需要再重写原型对象后新建一个实例，再通过这个实例调用方法

#### 原生对象原型

原生对象的构造函数（String、Array、Object 等）都在其原型对象上定义了方法，比如 String 对象的 substring()，所有字符串实例都可以调用这个方法，这也是采用原型模式的优势

开发者可以在原生对象的原型上添加新的方法，这种方式添加的方法可以在当前环境中所有的实例使用。但是不推荐这种做法，因为可能引发命名冲突，也有可能意外重写原生方法。推荐做法是创建一个自定义类，继承原生类型

#### 原型的问题

因为原型可以为属性设置默认值，它弱化了向构造函数传递初始化参数的能力

当原型对象属性的属性值是一个引用值时，如果一个实例对这个引用值进行修改，会导致其他所有实例的属性值也会被修改，一般来说，不同实例应该有属于自己的属性副本，所以实际开发中不单独使用原型模式

## 继承

其他面向对象语言支持两种继承：implements 和 extends，即接口继承和实施继承，前者是继承一个标签，后者是继承一个方法（类）

在 ECMAscript 中只有实施继承，通过原型链实现

### 原型链

ES 通过原型链实现实施继承：

```js
// 新建父构造函数，创建一个实例属性，一个原型方法
function Father() {
  this.color = "yellow";
}
Father.prototype.sayHi = function () {
  console.log("Hi");
};

// 新建子构造函数
function Son() {
  this.name = "son";
}
// 让子构造函数继承父实例
Son.prototype = new Father();
// 为子构造函数添加新的原型方法
Son.prototype.sayBye = function () {
  console.log("bye");
};

let son = new Son();
// 子实例可以直接调用父构造函数的所有属性和方法
console.log(son.color); // yellow
son.sayHi(); // Hi
```

继承的关键在于：`Son.prototype = new Father()`，这句代码将 Son 原本的原型对象替换为 Father 的实例，这样会使得 Son.prototype 中包含 color 属性（因为 this 就指向 Son.prototype），而 sayHi() 在 Father 的原型对象中

属性搜索机制的拓展：读取实例属性时，会首先在实例上搜索，没有则到原型对象中搜索，如果没有，则可以顺着原型链，不断搜索原型的原型

```js
// 读取 sayHi() 方法要搜索两个原型对象
console.log(son.__proto__.__proto__); // sayHi()
```

#### 默认的原型

任何函数的默认原型都是 Object，而 Object 的原型是 null

因此，所有原生引用类型都继承了 valueOf()、toString() 等方法

#### 原型与继承的关系

instanceof 判断实例的原型链上是否有相应的构造函数

isPrototypeof() 判断实例的原型链上是否有调用者

#### 方法覆写

继承之后，子类可以覆写父类的方法

```js
function Father() {
  this.color = "yellow";
}
Father.prototype.sayHi = function () {
  console.log("Hi");
};

function Son() {
  this.property = true;
}

Son.prototype = new Father();

// 覆写
Son.prototype.sayHi = function () {
  console.log("Hello");
};

let son = new Son();
son.sayHi(); // Hello

let father = new Father();
father.sayHi(); // Hi
```

覆写并不会删除父类原本的方法，可以通过创建父类实例来调用，这里的覆写就是之前在原型层级中提到的遮蔽

#### 原型链的问题

如果父类的属性采用引用值，那么这个引用值会在所有实例之间共享：

```js
function Father() {
  this.color = ["red", "blue"];
}

function Son() {
  this.property = true;
}

Son.prototype = new Father();

let son = new Son();
son.color.push("green");
console.log(son.color); // ['red', 'blue', 'green']

let son2 = new Son();
console.log(son2.color); // ['red', 'blue', 'green']
```

并且，子类在实例化时不能给父类的构造函数传参，这样做可能会影响父类所有对象实例

正因为这些问题，原型链不可能被单独使用

### 盗用构造函数

盗用构造函数（constructor stealing）又称 对象伪装 或 经典继承，用于解决原型链继承的问题：

```js
function Father() {
  this.color = ["red", "blue"];
}

function Son() {
  // 调用父类构造函数，this 指向 Son 的调用者，实现继承
  Father.call(this);
}

let son = new Son();
son.color.push("green");
console.log(son.color); // ['red', 'blue', 'green']

// 引用值属性不在实例之间共享了
let son2 = new Father();
console.log(son2.color); // ['red', 'blue']
```

`Father.call(this);` 在 Son 的函数作用域中调用了 Father 构造函数，一旦进行实例化，函数的调用者确定，Son 构造函数中的 this 会指向实例 son，Father 构造函数中的 this 也会指向实例 son，因此这个实例会继承父类的属性

由于每个 Father 实例都创建在 Son 实例的上下文中，因此每创建一个 Son 实例，都会创建一个新的 Father 实例，因此父类的引用值属性不会在所有实例之间共享

这种继承方式还允许对父类构造函数进行传参：

```js
function Father(name) {
  this.name = name;
}
function Son() {
  Father.call(this, "lin");
  this.age = 23;
}

let son = new Son();
console.log(son.name); // lin
```

因为每个 Father 实例都是独立的，因此不用担心会因为传参而影响其他实例

#### 问题

子类不能访问父类原型对象上的方法，所有属性和方法只能定义在构造函数上

方法必须定义在构造函数中，因此每创建一个实例，都会创建一个新的方法，方法无法重用

### 组合继承

又称伪经典继承，这种方式结合了盗用构造函数和原型链，通过盗用构造函数继承父类的属性，通过原型链继承父类的方法。

```js
function Father(name) {
  this.name = name;
}
Father.prototype.sayHi = function () {
  console.log("Hi");
};
function Son(name) {
  Father.call(this, name);
  this.age = 23;
}

// 可以通过父类构造函数传参了
Son.prototype = new Father("lin");
```

这样，可以将方法定义在父类的原型对象上，方法得到了重用，并且由于属性是通过盗用构造函数继承的，因此，引用值属性不会共享

组合继承保留了 instanceof 和 isPropertyOf() 识别的能力，是使用最多的继承方式

#### 问题

效率较低，父类构造函数始终会被调用两次，导致父类的属性即存在于子类原型对象中，又存在于子类实例中，实际上，子类实例的属性会遮蔽子类原型对象上的同名属性

### 原型式继承（无构造函数）

这种继承的目的是为了：即使不创建构造函数，也可以通过原型进行对象之间的信息共享

使用场景：你有一个对象，想在它的基础上创建一个新对象，且不创建构造函数

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

object 方法实际上接收一个对象，然后返回这个对象的复制，通过原型让返回的 new F() 也拥有 o 对象的所有属性和方法，并且这种复制属于浅拷贝，这意味着引用值属性在复制的对象之间是共享的

#### Object.create()

ES5 添加了 Object.create() 方法，规范化了这个功能，接收两个参数：作为新对象原型的对象，以及给新对象额外属性的对象（可选）。因此，当只有一个函数时，Object.create() 和上文代码中的函数是一样的

第二个参数和 Object.defineProperty() 中的对象参数一样，可以定义属性的内部特性，并且新添加的属性会遮蔽原对象中的同名属性：

```js
let person = {
  name: "lin",
  friends: ["wang", "zhang", "li"],
};

let copyPerson = Object.create(person, {
  name: {
    value: "allan",
  },
});
```

### 寄生式继承（无构造函数）

寄生式继承，在原型式继承的基础上，结合工厂模式，通过一个函数来创建新的继承对象，而不用创建构造函数

```js
function createSon(father) {
  let son = object(father);
  son.sayHello = function () {
    console.log("hello");
  };
  return son;
}
```

这种继承方式和原型式继承一样，适合不在乎构造函数和类型的场景，但是会导致函数难以重用的问题（每返回一个 son 实例，就会创建一个新的 sayHello 方法）

### 寄生式组合继承

为了解决组合继承的问题，可以使用寄生式组合继承，解决重复调用父类构造函数的问题

```js
function inheritPrototype(son, father) {
  // 复制父类的原型对象
  let prototype = object(father.prototype);
  // 将父类原型对象作为子类的原型对象
  prototype.constructor = son;
  son.prototype = prototype;
}
```

这个函数是寄生式组合继承的一部分，首先通过寄生式继承的方法复制父类原型对象，然后给 constructor 赋值，解决重写子类原型对象导致 constructor 丢失的问题，最后重写子类的原型对象

寄生式组合继承：

```js
function Father(name) {
  this.name = name;
  this.colors = ["red", "yellow"];
}
Father.prototype.sayHi = function () {
  console.log("Hi");
};

function Son(name, age) {
  // 盗用构造函数，解决引用值共享问题
  Father.call(this, name);
  this.age = age;
}

// 继承函数，解决重复调用构造函数，而产生的属性重复问题
inheritPrototype(Son, Father);

Son.prototype.sayHello = function () {
  console.log("Hello");
};
```

和组合继承相同的是，这两种方法都通过盗用构造函数来继承父类构造函数的属性（解决引用值属性在实例间共享的问题）

不同的是，组合继承方法通过调用父类构造函数来继承原型方法，因为盗用构造函数已经对父类构造函数进行调用了，重复的调用会导致父类构造函数中的属性既存在于子类实例中，又存在于子类原型对象中。而寄生式组合继承这种方法通过一个继承函数，对父类原型对象进行复制，并没有调用构造函数，相比组合继承提高了效率，不会在子类实例和子类原型对象中产生同名属性

**_寄生式组合继承可以算是引用类型继承的最佳模式_**

## 类

上文的创建对象，继承，模拟了类似于类（class-like）的行为，虽然可以实现，但是代码冗长混乱，ES6 提供了 class 关键字，属于一种语法糖解构，本质上仍然是原型和构造函数

### 类定义

类声明：

```js
class Person {}
```

类表达式：

```js
const Person = class {};
```

#### 类声明和函数声明的区别

可以注意到，类声明方式和函数声明方式相似，但是函数声明可以进行提升，而类声明不可以：

```js
console.log(f); // f() {}
function f() {}

console.log(c); // 报错
class c {}
```

函数声明被函数作用域限制，类声明被块作用域限制：

```js
{
  function f() {}
  class c {}
}

console.log(f); // f() {}
console.log(c); // 报错
```

#### 类的构成

构造函数：

```js
class Person {
  constructor() {}
}
```

获取函数：

```js
class Person() {
  get myPerson() {}
}
```

静态方法：

```js
class Person() {
  static myPerson() {}
}
```

#### 类表达式的名称

类表达式的名称可选，可以通过 name 属性获取类表达式名，但不能在类作用域外部访问这个类名，只能通过变量名访问：

```js
let Person = class PersonName {
  getClassName() {
    console.log(PersonName.name, Person.name);
  }
};

let p = new Person();

p.getClassName(); // PersonName PersonName

console.log(PersonName.name); // ReferenceError: PersonName is not defined
console.log(Person.name); // PersonName
```

### 类构造函数

当使用 new 关键字创建一个类的实例时，会调用 constructor 函数，如果没有定义，相当于执行一个空的构造函数

#### 实例化

使用 new 调用类构造函数：

1. 创建新对象
2. 将新对象的 [[Prototype]] 指向构造函数的 prototype 属性
3. 将构造函数中的 this 指向新对象
4. 给新对象赋值
5. 如果构造函数没有返回非空对象，则返回这个新对象

类构造函数定义时可以设置形参，在创建实例时，可以传入相应的实参

如果返回的对象不是 this 指向的新对象，那么创建的实例和类没有关联

类构造函数和普通构造函数的区别：普通构造函数可以不通过 new 调用，这样 this 会指向全局对象，但类构造函数不使用 new 调用会报错

类构造函数在类被实例化后，仍然是一个方法，它可以通过实例来调用，不过仍然需要 new，不然会报错：

```js
let instance = new Person();
let instance2 = new instance.constructor();
```

#### 把类当作特殊函数

使用 typeof 可以发现，class 在 JS 中是一种函数

也可以使用 instanceof 检测一个对象是否是某个类的实例，但是不同于普通构造函数，如果对类构造函数使用 instanceof，会返回相反的布尔值

类可以定义在任何地方，比如数组，也可以被当作参数传递

和自执行函数一样，类也可以立即实例化：

```js
let p = new (class Person {
  constructor(a) {
    console.log(a);
  }
})("hello");
// hello
```

### 实例、原型和类成员

#### 实例成员

成员：即属性

类构造函数会给每一个实例添加自有属性，对于同一个类，每个实例都有各自的属性（引用值也相互独立），即实例之间不会共享成员

#### 原型方法与访问器

为了在实例之间共享方法，可以通过在类块中定义方法，这种方法会被定义在类的原型上：

```js
class Person {
  constructor() {
    this.locate = () => console.log("instance");
  }
  // 定义原型上的方法
  locate() {
    console.log("prototype");
  }
}

let p = new Person();

// 实例自有方法
p.locate(); // instance
// 原型共享方法
p.__proto__.locate(); // prototype
Person.prototype.locate(); // prototype
```

方法可以定义在类块中共享，但是不能直接在类块中定义属性

类方法等同于对象属性，因此可以将 Symbol、字符串、计算值作为方法名：

```js
let symbolKey = new Symbol("symbolKey");

class Person {
  stringKey() {}
  [symbolKey]() {}
  ["compute" + "Key"]() {}
}
```

和普通对象一样，类也可以定义访问器（get set 方法）

#### 静态类方法

每个类只能有一个静态方法，静态方法不用创建实例，可以通过类直接调用，非常适合作为实例工厂：

```js
class Person {
  static create() {
    return new Person();
  }
}

Person.create();
```

#### 非函数原型和类成员

类块中不能直接定义属性，但是可以手动在类块外创建原型上的属性：

```js
class Person {
  sayName() {
    console.log(Person.greeting, this.name);
  }
}

Person.greeting = "My name is";
Person.prototype.name = "Lin";

let p = new Person();
p.sayName(); // My name is Lin
```

类定义中没有提供显示支持添加属性的方法，因为在共享目标（类和原型）上添加可修改的数据成员是一种反模式

#### 迭代器与生成器方法（TODO）

### 继承

类的继承依然通过原型链实现

#### 继承基础

ES6 支持单继承，通过 extends 可以继承拥有 [[constructor]] 和原型的对象。这意味着不仅可以继承类，也可以继承构造函数

```js
class Person {}
class Chinsese extends Person {
  ...
}

function Person() {}
class Chinsese extends Person {
  ...
}
```

通过 instanceof 可以判断实例是否属于某个类或者其子类

子类可以直接访问父类的方法，但 this 指向会反应实例的创建者

继承可以在类表达式中使用：

```js
let Chinese = class extends Person {};
```

#### 构造函数、HomeObject、super()

在类构造函数中可以通过 `super()` 或 `super.constructor()` 调用父类的类构造方法

在静态方法中也可以通过 `super.funcName()` 调用父类中名为 funcName() 的静态方法

super 注意事项：

- 只能在类构造函数或静态方法中使用
- 不能单独调用 super 会报错
- 调用父类方法会将返回的实例赋值给子类的 this
- 如果父类构造方法有形参，super() 方法可以传参
- 如果子类没有类构造方法，实例化时会调用 super()
- 类构造函数中，不能在 super() 之前调用 this
- 子类中如果显示定义构造函数，在构造函数中，要么必须调用 super()，要么必须返回一个对象

#### 抽象基类

JS 没有提供类似于 java 中接口的抽象基类，但可以通过 new.target 实现，new.target 保存了 new 调用的类或构造函数：

```js
class Person {
  constructor() {
    // 接口不能被实例化
    if (new.target === Person) {
      throw new Error("Person cannot be directly instantiated");
    }
    // 实现类必须实现 foo 方法
    if (!this.foo) {
      throw new Error("Inheriting class must define foo()");
    }
  }
}
```

#### 继承内置类型

Array、String 等内置类型也支持继承，可以通过继承给内置类型添加原型方法

有些内置类型的方法会返回这个内置类型的实例，一般情况，返回实例的类型和调用方法的实例类型是一样的：

```js
class SuperArray extends Array {}

let a1 = new SuperArray(1, 2, 3);
// 调用 filter 过滤数组，!! 作用是将 number 转为 boolean
let a2 = a1.filter((i) => !!(i % 2));

console.log(a1 instanceof SuperArray); // true
// a2 是 a1 调用 filter 返回的实例，可以发现 a2 的类型和 a1 保持一致
console.log(a2 instanceof SuperArray); // true
```

也可以覆盖这种行为：

```js
class SuperArray extends Array {
  // [Symbol.species] 的 get 访问器负责返回类型
  static get [Symbol.species]() {
    return Array;
  }
}
```

#### 类混入

Object.assign() 方法可以合并对象，对于类没有提供特定方法，但是也可以实现混入：

```js
// 定义基类
class Base {}

// 定义三个混入类
let PartOne = (SuperClass) =>
  class extends SuperClass {
    one() {
      console.log("one");
    }
  };
let PartTwo = (SuperClass) =>
  class extends SuperClass {
    two() {
      console.log("two");
    }
  };
let PartThree = (SuperClass) =>
  class extends SuperClass {
    three() {
      console.log("three");
    }
  };

// 混入方法
function mix(BaseClass, ...Mixins) {
  // 对每个参数进行累加操作
  return Mixins.reduce(
    (accumulator, current) => current(accumulator),
    BaseClass
  );
}

// 这里通过继承一个构造函数，在实例化时会自动调用 mix 构造函数
class Countries extends mix(Base, PartOne, PartTwo, PartThree) {}

let c = new Countries();
c.one(); // one
c.two(); // two
c.three(); // three
```

虽然可以通过继承方法实现混入，但是在设计模式中：组合胜于继承（Composition over inheritance），因此 JS 框架中大多抛弃了混入模式，使用组合模式
