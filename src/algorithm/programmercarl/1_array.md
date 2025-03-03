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

```
