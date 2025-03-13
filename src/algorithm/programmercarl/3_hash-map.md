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

[leetcode.cn/problems/find-all-anagrams-in-a-string/](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

```js

```
