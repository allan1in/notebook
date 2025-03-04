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
  let pointS = s.length - 1;
  let pointT = t.length - 1;
  let skipS = 0;
  let skipT = 0;

  while (pointS >= 0 || pointT >= 0) {
    // 进行退格操作，将 pointS 移动到 s 中的下一个元素
    while (pointS >= 0) {
      if (s[pointS] === "#") {
        skipS++;
        pointS--;
      } else if (skipS > 0) {
        skipS--;
        pointS--;
      } else {
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

    if (pointS >= 0 && pointT >= 0) {
      //
      if (s[pointS] !== t[pointT]) {
        return false;
      }
    } else {
      // 两个数组的指针有一个到头，有一个没到头，说明长度不一样
      if (pointS >= 0 || pointT >= 0) {
        return false;
      }
    }

    pointS--;
    pointT--;
  }

  return true;
};
```
