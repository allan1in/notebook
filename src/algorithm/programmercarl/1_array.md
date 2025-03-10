# 数组

## 二分查找

[leetcode.cn/problems/binary-search/](https://leetcode.cn/problems/binary-search/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;

  // 注意边界，当左右指针相等时才能确定 mid 的值
  while (left <= right) {
    // 计算中间值
    mid = left + ((right - left) >> 1);
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};
```

### 时间复杂度

O(log n)

时间复杂度为什么是 O(log n) ？

```
假设数组长度为 n，二分查找的步骤如下：

初始范围：n 个元素
第一次查找：缩小到 n/2 个元素
第二次查找：缩小到 n/4 个元素
第三次查找：缩小到 n/8 个元素
......

进行 k 次后，搜索范围缩小到 1，即 n / 2^k = 1

所以，时间复杂度是 O(log n)。
```

### 问题

为什么是 mid = left + ((right - left) >> 1)？

- 采用右移位运算 >> 效率高：

```js
int a = 10;
int b = a >> 1;  // 生成的汇编指令：SAR  eax, 1（立即右移）
int c = a / 2;   // 可能会生成 IDIV 指令（除法指令，开销更大）
```

- 用差值除以 2，防止溢出

```js
int left = 1500000000;
int right = 2000000000;
int mid

mid = (left + right) / 2;  // 可能溢出！
mid = left + (right - left) / 2; // 不容易溢出
```

## 搜索插入位置

[leetcode.cn/problems/search-insert-position/](https://leetcode.cn/problems/search-insert-position/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return left;
};
```

### 时间复杂度

O(log n)

### 问题

为什么 left 是插入位置？

```
考虑当数组只剩两个元素时的情况，二分查找会按以下步骤操作：

示例：
数组：[1, 3]
目标值：2

过程：
第一次循环：

mid = 0（对应元素是 1）。
1 < 2，所以将 left 更新为 1。
第二次循环：

mid = 1（对应元素是 3）。
3 > 2，所以将 right 更新为 0。

结束：
left = 1，right = 0，循环结束。
目标值 2 不在数组中，返回 left = 1，表示 2 应该插入到索引 1。
最终插入后的数组为 [1, 2, 3]。
```

## 在排序数组中查找元素的第一个和最后一个位置

[leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  function findLeftBorder() {
    let result = -1;
    let left = 0;
    let right = nums.length - 1;
    let mid;

    while (left <= right) {
      mid = left + ((right - left) >> 1);
      if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        result = mid;
        right = mid - 1;
      }
    }

    return result;
  }

  function findRightBorder() {
    let result = -1;
    let left = 0;
    let right = nums.length - 1;
    let mid;

    while (left <= right) {
      mid = left + ((right - left) >> 1);
      if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        result = mid;
        left = mid + 1;
      }
    }

    return result;
  }

  let result = [-1, -1];
  let left = findLeftBorder();
  if (left == -1) {
    return result;
  } else {
    return [left, findRightBorder()];
  }
};
```

### 时间复杂度

O(log n)

### 问题

findLeftBorder() 中为什么要在找到 result 后进行 `right = mid - 1;` 操作？

```
找到 target 时，不能确保这就是最左边的 target，所以需要缩小右边界

在剩下的范围中，再次搜寻 target，如果找到了，这个新的 target 必然在旧 target 的左边

这样重复多次，直到在剩下的范围中找不到下一个 target，最后记录的 result 值就是左边界
```

## x 的平方根

[leetcode.cn/problems/sqrtx/](https://leetcode.cn/problems/sqrtx/)

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x <= 1) return x;

  let left = 0;
  let right = x >> 1;
  let mid;
  let sqrt;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    sqrt = mid * mid;
    if (sqrt > x) {
      right = mid - 1;
    } else if (sqrt < x) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return right;
};
```

### 时间复杂度

O(log n)

### 问题

为什么返回 right ？

```
考虑当范围内只剩两个元素时的情况，二分查找会按以下步骤操作：

示例：
范围：[2, 3]
x：5

过程：
第一次循环：

mid = 2
2 * 2 < 5，所以将 left 更新为 3
第二次循环：

mid = 3
3 * 3 > 5，所以将 right 更新为 2

结束：
left = 3，right = 2，循环结束
5 的平方根在 [2, 3] 范围内，不存在整数结果时向下取整，即 right
```

### 优化

```js
// 排除特殊情况
if (x <= 1) return x;
```

```js
// 一个数的平方根必定小于这个数的一半
let right = x >> 1;
```

```js
// 定义变量存储平方值，减少重复计算
let sqrt;
```

## 有效的完全平方数

[leetcode.cn/problems/valid-perfect-square/](https://leetcode.cn/problems/valid-perfect-square/)

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  if (num <= 1) return true;

  let left = 0;
  let right = num >> 1;
  let mid;
  let sqrt;

  while (left <= right) {
    mid = left + ((right - left) >> 1);
    sqrt = mid * mid;
    if (sqrt > num) {
      right = mid - 1;
    } else if (sqrt < num) {
      left = mid + 1;
    } else {
      return true;
    }
  }

  return false;
};
```

## 移除元素

[leetcode.cn/problems/remove-element/](https://leetcode.cn/problems/remove-element/)

快慢指针

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let slow = 0;
  let fast = 0;

  // 快指针对数组进行扫描
  while (fast < nums.length) {
    // 当遇到与目标值不同的元素时，将其移到数组的前面（慢指针的位置），然后慢指针后移一位
    if (nums[fast] != val) {
      nums[slow++] = nums[fast];
    }
    fast++;
  }

  // 慢指针最后的位置就是数组剩余元素的个数
  return slow;
};
```

### 时间复杂度

O(n)

## 删除有序数组中的重复项

[leetcode.cn/problems/remove-duplicates-from-sorted-array/](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    // 只有当当前元素不等于前一个元素时，才更新 slow
    // fast === 0 是为了防止数组越界
    if (fast === 0 || nums[fast] != nums[fast - 1]) {
      nums[slow++] = nums[fast];
    }
    fast++;
  }

  return slow;
};
```

### 时间复杂度

O(n)

## 移动零

[leetcode.cn/problems/move-zeroes/](https://leetcode.cn/problems/move-zeroes/)

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] != 0) {
      nums[slow] = nums[fast];
      if (fast > slow) {
        nums[fast] = 0;
      }
      slow++;
    }
    fast++;
  }
};
```

### 时间复杂度

O(log n)

### 优化

每次对慢指针位置赋值时，当快慢指针不在一个位置时，将快指针的值置为 0

这样循环结束后，不用再通过额外的循环来对慢指针之后的元素置 0

```js
if (fast > slow) {
  nums[fast] = 0;
}
```

## 比较含退格的字符串

[leetcode.cn/problems/backspace-string-compare/](https://leetcode.cn/problems/backspace-string-compare/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  // 为两个字符串分别设置指针，从末尾开始扫描
  let pointS = s.length - 1;
  let pointT = t.length - 1;
  let skipS = 0;
  let skipT = 0;

  // 直到两个字符串都扫描完才停止
  while (pointS >= 0 || pointT >= 0) {
    // 进行退格操作，将 pointS 移动到 s 中的下一个有效元素
    // 越界时停止
    while (pointS >= 0) {
      if (s[pointS] === "#") {
        skipS++;
        pointS--;
      } else if (skipS > 0) {
        skipS--;
        pointS--;
      } else {
        // 没有退格符，并且已经退格完毕，则退出
        break;
      }
    }

    // 进行退格操作，将 pointT 移动到 t 中的下一个元素
    while (pointT >= 0) {
      if (t[pointT] === "#") {
        skipT++;
        pointT--;
      } else if (skipT > 0) {
        skipT--;
        pointT--;
      } else {
        break;
      }
    }

    // 现在，指针均已指向有效字符上，接下来进行分类讨论

    // 指针均未越界
    if (pointS >= 0 && pointT >= 0) {
      // 如果有效字符不相等，说明不一致
      if (s[pointS] !== t[pointT]) {
        return false;
      }
    } else {
      // 有一个指针没越界，说明长度不一样
      if (pointS >= 0 || pointT >= 0) {
        return false;
      }
    }

    // 每次对比完一个有效字符，移动指针
    pointS--;
    pointT--;
  }

  return true;
};
```

## 有序数组的平方

[leetcode.cn/problems/squares-of-a-sorted-array/](https://leetcode.cn/problems/squares-of-a-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  let sqrtStart;
  let sqrtEnd;
  const result = new Array(nums.length);
  let index = nums.length - 1;

  while (start <= end) {
    sqrtStart = nums[start] * nums[start];
    sqrtEnd = nums[end] * nums[end];
    if (sqrtStart > sqrtEnd) {
      result[index--] = sqrtStart;
      start++;
    } else {
      result[index--] = sqrtEnd;
      end--;
    }
  }

  return result;
};
```

### 时间复杂度

O(n)

### 优化

数组的 push() 会动态扩展数组，效率较低

采用固定长度的数组进行优化

```js
// 创建定长数组
const result = new Array(nums.length);

let index = nums.length - 1;
// 通过下标赋值
result[index--] = sqrtStart;
```

## 长度最小的子数组

[leetcode.cn/problems/minimum-size-subarray-sum/](https://leetcode.cn/problems/minimum-size-subarray-sum/)

滑动窗口

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let result = Infinity;
  let left = 0;
  let right = 0;
  let sum = 0;

  // 扩大窗口
  while (right < nums.length) {
    sum += nums[right];

    // 缩小窗口
    while (sum >= target) {
      // 更新结果
      result = Math.min(result, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }

  return result == Infinity ? 0 : result;
};
```

### 时间复杂度

O(n)

为什么不是 O(n²)？

```
O(n²) 发生的典型情况是嵌套循环中，每个元素都可能执行 O(n) 次。

在滑动窗口中：

left 指针收缩窗口，最多移动 n 次
right 指针扩大窗口，最多移动 n 次
因此每一个元素最多被访问 2n 次，所以是 O(2n) ≈ O(n)
```

## 水果成篮

[leetcode.cn/problems/fruit-into-baskets/](https://leetcode.cn/problems/fruit-into-baskets/)

```js
var totalFruit = function (fruits) {
  let result = 0;
  let left = 0;
  let window = new Map();

  // 扩大窗口
  for (let right = 0; right < fruits.length; right++) {
    window.set(fruits[right], (window.get(fruits[right]) || 0) + 1);

    // 当窗口中水果种类超过两种时，收缩窗口
    while (window.size > 2) {
      const leftFruit = fruits[left];
      window.set(leftFruit, window.get(leftFruit) - 1);
      if (window.get(leftFruit) === 0) {
        window.delete(leftFruit);
      }
      left++;
    }

    // 更新结果
    result = Math.max(result, right - left + 1);
  }

  return result;
};
```

### 时间复杂度

O(n)

## 最小覆盖子串

[leetcode.cn/problems/minimum-window-substring/](https://leetcode.cn/problems/minimum-window-substring/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let left = 0;
  let minLength = Infinity;
  let start = 0;
  let matchCount = 0;
  const need = new Map();
  const window = new Map();

  // 获取需要的字符数
  for (let char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  // 扩大窗口
  for (let right = 0; right < s.length; right++) {
    window.set(s[right], (window.get(s[right]) || 0) + 1);

    // 记录字符匹配的数目
    if (window.get(s[right]) <= need.get(s[right])) {
      matchCount++;
    }

    // 字符数目相等时缩小窗口
    while (matchCount == t.length) {
      // 更新最小长度
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        start = left;
      }

      // 缩小窗口
      window.set(s[left], window.get(s[left]) - 1);
      // 如果删去的是需要的字符，更新匹配个数
      if (window.get(s[left]) < need.get(s[left])) {
        matchCount--;
      }
      left++;
    }
  }

  return minLength === Infinity ? "" : s.substr(start, minLength);
};
```

### 时间复杂度

O(n)

### js 截取字符串

1. slice(start, end)
2. substring(start, end)
3. substr(start, length)

## 螺旋矩阵 II

[leetcode.cn/problems/spiral-matrix-ii/](https://leetcode.cn/problems/spiral-matrix-ii/)

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const result = Array.from({ length: n }, () => new Array(n).fill(0));
  let left = 0;
  let right = n - 1;
  let top = 0;
  let bottom = n - 1;
  let num = 1;

  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      result[top][i] = num;
      num++;
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result[i][right] = num;
      num++;
    }
    right--;

    for (let i = right; i >= left; i--) {
      result[bottom][i] = num;
      num++;
    }
    bottom--;

    for (let i = bottom; i >= top; i--) {
      result[i][left] = num;
      num++;
    }
    left++;
  }

  return result;
};
```

### 时间复杂度

O(n²)

### js 初始化二维数组

```js
Array.from({ length: n }, () => new Array(n).fill(0));
```

## 螺旋矩阵

[leetcode.cn/problems/spiral-matrix/](https://leetcode.cn/problems/spiral-matrix/)

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let width = matrix[0].length;
  let height = matrix.length;
  const result = new Array(width * height).fill(0);
  let left = 0;
  let right = width - 1;
  let top = 0;
  let bottom = height - 1;
  let index = 0;

  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      result[index] = matrix[top][i];
      index++;
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result[index] = matrix[i][right];
      index++;
    }
    right--;

    // 矩阵不一定是正方形，之前进行了 top++ 操作，所以需要额外判断防止越界
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result[index] = matrix[bottom][i];
        index++;
      }
      bottom--;
    }

    // 矩阵不一定是正方形，之前进行了 right-- 操作，所以需要额外判断防止越界
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result[index] = matrix[i][left];
        index++;
      }
      left++;
    }
  }

  return result;
};
```

### 时间复杂度

O(m \* n)

## 前缀和

[kamacoder.com/problempage.php?pid=1070](https://kamacoder.com/problempage.php?pid=1070)

```js
// 解决方法
const solution = (arr, range) => {
  let sum = 0;
  const sumArr = [];

  // 计算前缀和
  arr.forEach((num) => {
    sum += num;
    sumArr.push(sum);
  });

  // 根据每个范围输出结果
  range.forEach(([start, end]) => {
    const startNum = start === 0 ? 0 : sumArr[start - 1];
    console.log(sumArr[end] - startNum);
  });
};

// node 输入输出
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const inputs = [];

// 每当输入流收到行尾输入（\n、\r 或 \r\n）时，就会发出 line 事件
rl.on("line", (line) => inputs.push(line));

// 监听输入完毕事件
rl.on("close", () => {
  // 获取数组长度，+ 将 string 转换为 number
  const n = +inputs[0];
  // 根据数组长度获取数组元素，并转换为 number
  const arr = inputs.slice(1, n + 1).map((num) => +num);
  // 以二维数组的形式记录所有查询区间
  const range = inputs
    .slice(n + 1)
    .map((str) => str.split(" ").map((num) => +num));
  // 调用解决方法
  solution(arr, range);
});
```

### 时间复杂度

n 是数组长度，q 是查询的区间数

O(n + q)

### node 的输入输出

[nodejs.org/api/readline.html](https://nodejs.org/api/readline.html)

```js
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const inputs = [];

rl.on("line", (line) => inputs.push(line));
rl.on("close", () => {
  // 对输入进行处理
  // 调用解决方法
});
```

### js 中 string 转 number

```js
let s = "1";

+s;

parseInt(s);
Number.parseInt(s);

parseFloat(s);
Number.parseFloat(s);
```
