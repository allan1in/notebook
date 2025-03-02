# 期约和异步函数

## 异步编程

### 同步与异步

同步行为，代码按顺序执行

异步行为，系统中断，不会一直等待异步的结果（比如网络请求的结果），而是执行之后的同步行为

如果某些代码需要用到异步行为的结果，异步行为执行的函数需要在获取结果后通知这些代码

### 以往的异步编程

以往，采用回调函数来通知等待异步结果的代码，但是如果串联多个异步操作，会形成回调地狱

异步函数示例：

```js
function double(val) {
  setTimeout(() => setTimeout(console.log, 0, val * 2), 1000);
}

double(2);
// 4 (1秒之后)
```

以上代码定义了一个 double 函数，1 秒之后执行内部的 setTimeout 函数，0 秒之后调用 console.log 方法，并传入参数 val \* 2

#### 异步返回值

如果需要将异步函数的返回值传给一个需要它的函数，可以提供一个回调函数，用于操作异步函数返回的结果：

```js
function double(val, callback) {
  setTimeout(() => callback(val * 2), 1000);
}

double(2, console.log);
```

#### 失败处理

异步操作如果失败，怎么处理？这时候需要考虑失败回调、成功回调：

```js
function double(val, success, failure) {
  setTimeout(() => {
    try {
      if (typeof val !== "number") {
        throw "Must provide number!";
      }
      success(val * 2);
    } catch (e) {
      failure(e);
    }
  }, 1000);
}

double(
  2,
  (x) => console.log(`Success: ${x}`),
  (x) => console.log(`Failure: ${x}`)
);
```

#### 嵌套异步回调

如果在回调函数中再嵌套一个异步函数，那情况会更为复杂（回调地狱），非常不利于维护

## 期约

期约（Promise），是对尚不存在的结果的一个替身

### Promise/A+ 规范

ES6 实现了 Promise/A+ 规范

### 期约基础

创建期约：

```js
let p = new Promise(() => {});
setTimeout(console.log, 0, p);
// Promise <pending>
```

打印出一个 Promise 对象，并且携带它当前的状态

#### 期约状态机

期约是一个有状态的对象，有以下 3 种状态：

- 待定（pending）
- 解决（resolved）或兑现（fulfilled）
- 拒绝（rejected）

待定，是期约的初始状态，此时它正在等待状态的变化。解决，代表成功。拒绝，代表失败

注意：期约的状态是私有的，不能通过 JS 检测到

#### 解决值、拒绝理由

- 解决值：期约为解决状态时，接受到的返回值
- 拒绝理由：期约为拒绝状态时，接受到的产生错误的原因信息

上述两种属于期约用例，都是可选的，没有默认为 undefined

#### 执行函数

期约初始化时，会给其构造函数传入一个执行函数，这是必须的，否则会报错

执行函数的职责：

- 初始化期约的异步行为
- 执行期约的状态转换（resolve 和 reject 方法）

```js
// 传入执行函数，并调用 resolve 方法改变期约的状态
let p1 = new Promise((resolve, reject) => resolve());

// 传入执行函数，并调用 reject 方法改变期约的状态
let p2 = new Promise((resolve, reject) => reject());
// Uncaught (in promise)
```

注意：

- 执行函数是同步执行的，因为执行器是期约的初始化程序
- 执行函数中只能调用一次 resolve() 或 reject()，如果第二次执行会无效

#### Promise.resolve()

Promise.resolve() 方法可以实例化一个解决状态的期约：

```js
// 两者等价
let p1 = new Promise((resolve, reject) => resolve());
let p2 = Promise.resolve();
```

Promise.resolve() 方法也可以传参，参数是解决值，可以将参数包装为一个解决状态的 Promise 对象

Promise.resolve() 具有幂等性，即如果将一个解决状态的 Promise 作为参数传入这个方法，返回的仍然是这个 Promise（同时保留期约的状态）

#### Promise.reject()

Promise.resolve() 方法可以实例化一个拒绝状态的期约，并抛出错误（这个错误不能被 try/catch 捕获，可以通过拒绝处理程序捕获）

参数是拒绝的理由，这个参数也会被传给拒绝处理程序（then()）

Promise.reject() 没有幂等性，传入一个拒绝状态的期约会被当作拒绝的理由

#### 同步/异步执行的二元性

Promise 的设计导致了不同于 JS 的模式，如以下示例：

```js
try{
  throw new Error('foo');
} catch (e) {
  console.log(e); // Error: foo
}

try{
  Promise.reject(new Error('bar'))
} catch (e) {
  console.log(e);
}
// Uncaught (in promise) Error: bar
```

可以发现，第一个 try/catch 捕获了错误，但是第二个 try/catch 并没有捕获 Promise 的错误，这是因为它没有通过异步的方式（期约提供的拒绝处理程序方法）来捕获错误，通过同步方式（try/catch）无法捕捉到异步错误

同步/异步执行的二元性：同步执行和异步执行是完全分开的

**_期约是同步执行的，但它也是异步执行的媒介_**

### 期约的实例方法

期约的实例方法是连接外部同步代码和内部异步代码的桥梁

#### 实现 Thenable 接口

ES 暴露的异步解构中，任何对象都有 then() 方法，这个方法实现了 Thenable 接口

#### Promise.prototype.then()

这个方法可以为期约添加处理程序，接受两个方法参数：onResolved 和 onRejected，这两个方法分别会在 Promnise 落定为解决状态后执行 onResolved 方法，落定为拒绝状态后执行 onRejected 方法

```js
// 解决处理方法
function onResolved(id){
  setTimeout(console.log, 0, id, 'resolved');
}

// 拒绝处理方法
function onRejected(id){
  setTimeout(console.log, 0, id, 'rejected');
}

// 3秒后解决
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000))
// 3秒后拒绝
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000))

// 为 p1 p2 设置处理方法
p1.then(() => onResolved('p1'), () => onRejected('p1'));
p2.then(() => onResolved('p1'), () => onRejected('p2'));

// 3 秒后，期约状态落定，执行处理方法，打印输出
// p1 resolved
// p2 rejected
```

注意：

- then() 的两个处理方法参数是可选的，如省略解决处理方法：`p1.then(null, () => onRejected('p1'))`
- 任何传给 then() 的非函数类型参数都会被忽略

then() 使用 onResolved() 的一些特殊情况：

```
let p1 = Promise.resolve('foo');

// then() 不传方法参数，会对期约使用 Promise.reslove() 进行包装，返回原状态的 Promise
let p2 = p1.then();
setTimeout(console.log, 0, p2);
// Promise {<fulfilled>: 'foo'}

// 如果传入的处理方法没有显示的返回值，那么会对期约使用 Promise.reslove() 进行包装，返回原状态的 Promise，其值为 undefined
let p3 = p1.then(() => {})
setTimeout(console.log, 0, p3);
// Promise {<pending>: undefined}

// 如果有返回值，会使用 Promise.resolve() 包装，如下返回了一个拒绝状态的 Promise，使用 Promise.resolve() 包装后，返回拒绝状态的 Promise
let p4 = p1.then(() => Promise.reject())
// Uncaught (in promise) undefined
setTimeout(console.log, 0, p4);
// Promise {<rejected>: undefined}

// 在处理方法中抛出异常会返回拒绝状态的期约
let p5 = p1.then(() => {throw 'bar'});
// Uncaught (in promise) bar
setTimeout(console.log, 0, p5);
// Promise {<rejected>: 'bar'}

// 返回错误值并不会改变期约状态，而是将错误对象作为返回值用 Promise.reslove() 包装，返回原状态的 Promise
let p6 = p1.then(() => Error('baz'))
setTimeout(console.log, 0, p6);
// Promise {<fulfilled>: Error: baz}
```

then() 使用 onReject() 的情况类似，总结如下：

- then() 不传方法参数，会对期约使用 Promise.reslove() 进行包装，返回原状态的 Promise
- 如果传入的处理函数没有显示的返回值，会对期约使用 Promise.reslove() 进行包装，默认值 undefined
- 如果传入的处理函数有返回值，会对期约使用 Promise.reslove() 进行包装
- 如果在传入的处理函数中抛出错误，那么会返回一个拒绝的期约

#### Promise.prototype.catch()

用于给期约添加拒绝处理程序，只有一个参数：onReject()

catch() 是一个语法糖：

```js
// 两者等价
p.then(null, onRejected);
p.catch(onRejected);
```

catch() 和 then() 一样，也会根据处理函数的返回值，使用 Promise.reslove() 进行包装

#### Promise.prototype.finally()

用于给期约添加 onFinally() 处理程序，期约状态转换为解决或拒绝时都会执行：

```js
let p1 = Promise.resolve();
let p2 = Promise.reject();

let onFinally = function(){
  setTimeout(console.log, 0, 'finally');
}

p1.finally(onFinally);
// finally
p2.finally(onFinally);
// finally
```

finally() 不同于 then() 或 catch()，它与期约的状态无关，大多数情况返回的只是父期约（对于拒绝和解决状态的期约都一样）：

```js
// 如果 onFinally() 返回了一个待定的期约或者一个拒绝的期约，那么返回值会用 Promise.resolve() 包装，保留待定或拒绝状态
let p1 = Promise.resolve('foo');
let p2 = p1.finally(() => new Promise(() => {}));
let p3 = p1.finally(() => Promise.reject());
// Uncaught (in promise) undefined

setTimeout(console.log, 0, p2);
// Promise {<pending>}
setTimeout(console.log, 0, p3);
// Promise {<rejected>: undefined}
```

#### 期约方法的非重入

then()、catch()、finally() 方法会在期约状态落定后调用，传入的处理函数不会立即执行，而仅仅被排期，等待同步代码执行完毕后再按顺序执行：

```js
let p = Promise.resolve();

p.then(() => {
  console.log('onResolve handler')
})

console.log('then() returns')

// then() returns
// onResolve handler
```

由于这些处理程序都是异步执行的，所以之前的打印都采用异步方式 `setTimeout(console.log, 0, p1);`，目的就是为了让打印能输出正确的顺序或结果

#### 邻近处理程序的执行顺序

如果一个期约有多个处理程序，期约状态落定时，处理程序会按照添加顺序执行

#### 传递解决值和拒绝理由

onResolve 和 onReject 处理程序的第一个参数会分别接收解决值和拒绝理由：

```js
let p1 = Promise.reject('foo');
let p2 = Promise.resolve('bar');

p1.catch((reason) => {
  console.log(reason)
})
// foo
p2.then((value) => {
  console.log(value)
})
// bar
```

#### 拒绝期约与错误处理

拒绝期约类似与 throw()，它们都表示错误出现，需要中断程序的执行。在期约中，在期约的处理函数中返回 Erorr 对象或在执行函数中抛出 Error 都会导致拒绝状态，这个 Erorr 对象就是拒绝理由：

```js
let p1 = new Promise((resolve, reject) => reject(Error('foo')));
let p2 = new Promise((resolve, reject) => {throw Error('foo')});
let p3 = Promise.resolve().then(() => {throw Error('foo')});
let p4 = Promise.reject(Error('foo'));

setTimeout(console.log, 0, p1);
setTimeout(console.log, 0, p2);
setTimeout(console.log, 0, p3);
setTimeout(console.log, 0, p4);

// Uncaught (in promise) Error: foo
    at <anonymous>:1:50
    at new Promise (<anonymous>)
    at <anonymous>:1:10
// Uncaught (in promise) Error: foo
    at <anonymous>:2:50
    at new Promise (<anonymous>)
    at <anonymous>:2:10
// Uncaught (in promise) Error: foo
    at <anonymous>:4:25
// Uncaught (in promise) Error: foo
    at <anonymous>:3:46
```

可以使用任何理由拒绝，最好使用 Erorr 对象，这样可以通过控制台捕获错误信息，更容易调试

异步错误的副作用：通常，错误抛出后，之后的同步代码将不再执行，但是期约中的错误是在消息队列中抛出的，所以不会阻止同步代码的运行：

```js
Promise.reject(Error('foo'));
console.log('bar')
// bar
// Uncaught (in promise) Error: foo
```

如果想捕获期约错误，只能通过 onRejected() 处理函数捕获：

```js
Promise.reject(Error('foo')).catch((e) => {
  console.log(e)
})
// Error: foo
```

以下是对同步错误处理和异步错误处理的对比：

```js
// 同步
console.log('begin');
try{
  throw Error('foo')
}catch(e){
  console.log(e)
}
console.log('end')
// begin
// Error: foo
// end

// 异步
new Promise((resolve, reject) => {
  console.log('begin');
  reject(Error('foo'))
}).catch((e) => {
  console.log(e)
}).then(() => {
  console.log('end')
})
// begin
// Error: foo
// end
```

### 期约连锁与期约合成

#### 期约连锁

期约连锁是将多个期约操作串联，能这样做是因为期约的实例方法都会返回一个新的期约。通过期约连锁可以实现同步处理一连串的异步任务：

```js
let p1 = new Promise((resolve, reject) => {
  console.log('p1');
  setTimeout(resolve, 1000);
})

p1.then(() => new Promise((resolve, reject) => {
  console.log('p2');
  setTimeout(resolve, 1000);
})).then(() => new Promise((resolve, reject) => {
  console.log('p3');
  setTimeout(resolve, 1000);
})).then(() => new Promise((resolve, reject) => {
  console.log('p4');
  setTimeout(resolve, 1000);
}))

// 每隔1秒打印出以下结果：
// p1
// p2
// p3
// p4
```

这种串联方式，解决了回调地狱的问题，大大增强了代码的可维护性

#### 期约图

期约连锁可以看作一种有向非循环图的解构，也就是树：

```js
let A = new Promise((resolve, reject) => {
  console.log('A');
  resolve();
})

let B = A.then(() => {console.log('B')});
let C = A.then(() => {console.log('C')});

B.then(() => {console.log('D')});
B.then(() => {console.log('E')});
C.then(() => {console.log('F')});
C.then(() => {console.log('G')});

// A
// B
// C
// D
// E
// F
// G
```

#### 合并期约

##### Promise.all()

这个方法接受一个可迭代对象，返回一个新期约，这个新期约的状态由可迭代对象中所有期约的状态共同决定：

- 如果其中有一个期约待定，那么合成的期约也处于待定状态
- 如果其中有一个期约拒绝，那么合成的期约也处于拒绝状态
- 当所有期约都解决，合成的期约会处于解决状态

关于合成期约的解决值和拒绝理由：

- 可迭代对象中的每个期约的解决值会按照迭代顺序，组成一个数组，作为合成期约的解决值
- 可迭代对象中第一个拒绝的期约会将其拒绝理由作为合成对象的拒绝理由，之后再拒绝的期约不会影响合成期约的拒绝理由，但之后的这些拒绝操作也会被静默处理，不会有错误被抛出

##### Promise.race()

这个方法接受一个可迭代的对象，返回一个包装期约，是传入的所有期约中最先落定（解决或拒绝）状态期约的镜像，之后落定的期约会被忽略，但也会对错误静默处理，错误不会被抛出

#### 串行期约合成

有一种常见的场景：后续期约需要之前期约的返回值进行下一步操作。这很像函数合成：

```js
function addTwo(x) {
  return x + 2;
}
function addThree(x) {
  return x + 3;
}
function addFive(x) {
  return x + 5;
}

// 函数合成
let result = addTwo(addThree(addFive(1)));
console.log(result);
// 11
```

使用期约将函数合成：

```js
let result = Promise.resolve(1)
  .then(addTwo)
  .then(addThree)
  .then(addFive);

result.then(console.log);
// 11
```

使用数组归并方法简化：

```js
let result = [addTwo, addThree, addFive].reduce((promise, func) => promise.then(func), Promise.resolve(1));
result.then(console.log);
// 11
```

将函数合并操作提炼为一个函数，进一步简化：

```js
// 参数是要合并的函数，返回合并之后的函数
function compose(...funcs) {
  return (x) => funcs.reduce((promise, func) => promise.then(func), Promise.resolve(x));
}

let addTen = compose(addTwo, addThree, addFive)
addTen(1).then(console.log)
// 11
```

### 期约拓展（TODO）

ES6 规范并没有实现期约取消和期约进度通知，但是可以其他第三方库实现

#### 期约取消

期约正在处理中，这时如果不再需要期约，如果可以取消期约就不用再等待结果

#### 期约进度通知

期约执行过程中会有许多离散的阶段，可以通过期约进度通知来监控进度

## async/await

async/await，也称为异步函数，ES8 新增规范，让同步代码可以异步执行

### 异步函数
