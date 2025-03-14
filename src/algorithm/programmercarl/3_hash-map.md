# 哈希表

## 有效的字母异位词

[leetcode.cn/problems/valid-anagram/](https://leetcode.cn/problems/valid-anagram/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  // 保证两个字符串等长
  if (s.length !== t.length) return false;
  const hash = new Map();

  // 记录 s 中字母出现的次数
  for (let char of s) {
    hash.set(char, (hash.get(char) || 0) + 1);
  }

  // 减去 t 中出现的次数，如果不存在字母，或次数小于 0，说明字母出现次数不相等
  for (let char of t) {
    if (!hash.has(char) || hash.get(char) === 0) return false;
    hash.set(char, hash.get(char) - 1);
  }

  return true;
};
```

### 时间复杂度

O(n)

### 其他写法：Array 代替 Map

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  // 一共 26 个字母，可以用定长数组记录
  let arr = new Array(26).fill(0);

  // 同时遍历 s 和 t
  for (let i = 0; i < s.length; i++) {
    // a 的 Unicode 编码是 97
    arr[s.charCodeAt(i) - 97]++;
    arr[t.charCodeAt(i) - 97]--;
  }

  return arr.every((i) => i === 0);
};
```

array.every(callback(element, index, array), thisArg)

- callback：回调函数，测试数组的每个元素是否符合条件。
- element：当前元素
- index（可选）：当前索引
- array（可选）：调用 every() 的数组本身
- thisArg（可选）：执行回调函数时 this 的值。

返回值

- 如果所有元素都使 callback 返回 true，则返回 true。
- 如果任意一个元素返回 false，则立即返回 false，不再检查后续元素。

## 赎金信

[leetcode.cn/problems/ransom-note/](https://leetcode.cn/problems/ransom-note/)

```js
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const hash = new Array(26).fill(0);

  for (let char of magazine) {
    hash[char.charCodeAt(0) - 97]++;
  }

  for (let char of ransomNote) {
    // magazine 中的字符已经被用尽
    if (hash[char.charCodeAt(0) - 97] === 0) return false;
    // 使用了字符，减少字符数
    hash[char.charCodeAt(0) - 97]--;
  }

  return true;
};
```

### 时间复杂度

O(n)

## 字母异位词分组

[leetcode.cn/problems/group-anagrams/](https://leetcode.cn/problems/group-anagrams/)

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const hash = new Map();

  // 遍历每个字符串
  for (let str of strs) {
    // 排序字符串
    let sortedStr = str.split("").sort().join("");
    // 用 map 记录异位词
    if (!hash.has(sortedStr)) {
      hash.set(sortedStr, []);
    }
    let arr = hash.get(sortedStr);
    arr.push(str);
  }

  // map 转换为数组
  return Array.from(hash.values());
};
```

### 时间复杂度

O(n)

## 找到字符串中所有字母异位词

滑动窗口 + 哈希表

[leetcode.cn/problems/find-all-anagrams-in-a-string/](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const need = new Array(26).fill(0);
  let left = 0;
  const answer = new Array();

  // 记录 p 中每个字母出现的次数
  for (let char of p) {
    need[char.charCodeAt(0) - 97]++;
  }

  // 扩大窗口
  for (let right = 0; right < s.length; right++) {
    // 扩大窗口时，减少字母出现次数
    let char = s[right];
    need[char.charCodeAt(0) - 97]--;

    // 字母出现次数小于 0，说明窗口内有不需要的字符，因此不断向右移动左指针，直到窗口中不再包含这个字符
    while (need[char.charCodeAt(0) - 97] < 0) {
      need[s[left].charCodeAt(0) - 97]++;
      left++;
    }

    // 如果此时窗口长度与 p 的长度相等，说明得到了异位词
    if (right - left + 1 === p.length) {
      answer.push(left);
    }
  }

  return answer;
};
```

### 时间复杂度

O(m + n)

## 两个数组的交集

[leetcode.cn/problems/intersection-of-two-arrays/](https://leetcode.cn/problems/intersection-of-two-arrays/)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const hash = new Map();
  const answer = new Array();

  for (let num of nums1) {
    // 不用记录次数，因为返回的是交集，集合中不能有重复的元素
    hash.set(num, 1);
  }

  for (let num of nums2) {
    if (hash.has(num)) {
      answer.push(num);
      hash.delete(num);
    }
  }

  return answer;
};
```

### 时间复杂度

O(m + n)

## 两个数组的交集 II

[leetcode.cn/problems/intersection-of-two-arrays-ii/](https://leetcode.cn/problems/intersection-of-two-arrays-ii/)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const hash = new Map();
  const answer = new Array();

  // 需要记录出现次数，因为结果中出现的元素，应与元素在两个数组中都出现的次数一致
  for (let num of nums1) {
    hash.set(num, (hash.get(num) || 0) + 1);
  }

  for (let num of nums2) {
    if (hash.has(num) && hash.get(num) > 0) {
      answer.push(num);
      hash.set(num, hash.get(num) - 1);
    }
  }

  return answer;
};
```

### 时间复杂度

O(m + n)

## 快乐数

[leetcode.cn/problems/happy-number/](https://leetcode.cn/problems/happy-number/)

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = n
      .toString()
      .split("")
      .reduce((sum, digit) => sum + digit * digit, 0);
  }

  return n === 1;
};
```

### 时间复杂度

O(log n)

### reduce()

array.reduce(callback(accumulator, currentValue, index, array), initialValue);

- callback：累加器函数，对数组中的每个元素执行。
- accumulator：累加器的值，初始值为 initialValue，或者是数组的第一个元素（如果没有提供 initialValue）。
- currentValue：当前处理的数组元素。
- index（可选）：当前元素的索引。
- array（可选）：调用 reduce 的数组。
- initialValue（可选）：累加器的初始值。如果未提供，则使用数组的第一个元素作为初始值。

## 两数之和

[leetcode.cn/problems/two-sum/](https://leetcode.cn/problems/two-sum/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const hash = new Map();

  for (let i = 0; i < nums.length; i++) {
    let need = target - nums[i];
    // 查询是否有需要的数字
    if (hash.has(need)) {
      return [hash.get(need), i];
    }
    // 将当前数字存入，保证在查询后存入，这样不会有重复的结果
    hash.set(nums[i], i);
  }
};
```

### 时间复杂度

O(n)
