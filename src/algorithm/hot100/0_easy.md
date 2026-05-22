# 简单

## 两数之和

[https://leetcode.cn/problems/two-sum](https://leetcode.cn/problems/two-sum)

```js

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let hash = new Map()
    // 一次遍历，同时完成存 need 和查 need 的操作，查到则返回
    for(let i = 0;i< nums.length;i++){
        let need = target - nums[i]

        if(hash.has(need)){
            return [hash.get(need), i]
        }

        hash.set(nums[i],i)
    }
};
```

时间复杂度 O(n)

## 移动零

[https://leetcode.cn/problems/move-zeroes](https://leetcode.cn/problems/move-zeroes)

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let slow = 0
    let fast = 0

    // 快指针找非零元素，慢指针找零元素，不断置换，向后推进
    // 三种情况：
    // 如果是非零元素，快慢指针同步推进
    // 遇到单个不连续的零元素，慢指针停止移动，快指针移动到下一个非零元素，然后快慢指针互换其指向的元素，并且慢指针向前移动，快指针向前移动（距离仍为1），不断将零元素换到后面
    // 遇到多个连续的零元素，慢指针停止移动，快指针不断移动，直到下一个非零元素（此时快慢指针之间都是零元素），然后快慢指针互换其指向的元素，并且慢指针向前移动到下一个零元素，快指针会移动到下一个非零元素
    while (fast < nums.length) {
        if (nums[fast] !== 0) {
            // 这里如果出现快慢指针重合情况，交换也不会影响结果
            let temp = nums[slow]
            nums[slow] = nums[fast]
            nums[fast] = temp
            slow++
        }
        fast++
    }
};
```

时间复杂度 O(n)

## 爬楼梯

[https://leetcode.cn/problems/climbing-stairs](https://leetcode.cn/problems/climbing-stairs)

### 递归（超时）

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n<=2) return n
    return climbStairs(n-1)+climbStairs(n-2)
};
```

### 动态规划

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // 从 1 开始迭代，保存每次的迭代结果到数组，直到迭代到 n
    let arr = new Array()

    arr[1] = 1
    arr[2] = 2

    for(let i = 3;i<=n;i++){
        arr[i] = arr[i-1] + arr[i-2]
    }

    return arr[n]
};
```

### 动态规划（滚动变量）

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (n <= 2) return n
    // 不再用数组保存之前所有的值，只保存每轮 f(n-1) 和 f(n-2) 的值
    el2 = 1
    el1 = 2
    for (let i = 3; i <= n; i++) {
        let temp = el1
        // 新的 f(n-1) 是之前的 f(n-1) + f(n-2)
        el1 = el1 + el2
        // 新的 f(n-1) 是之前的 f(n-2)
        el2 = temp
    }

    return el1
};
```

## 杨辉三角

[https://leetcode.cn/problems/pascals-triangle](https://leetcode.cn/problems/pascals-triangle)

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    const result = []
    // 遍历每一行
    for (let i = 0; i < numRows; i++) {
        const line = new Array(i)
        // 遍历每行的每个元素
        for (let j = 0; j <= i; j++) {
            // 对于首尾元素必然是1
            if (j == 0 || j == i) {
                line[j] = 1
            } else {
                line[j] = result[i - 1][j - 1] + result[i - 1][j]
            }
        }
        result.push(line)
    }
    return result
};
```

### 优化

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    const result = []
    for (let i = 0; i < numRows; i++) {
        // 将每行初始化为 1，不用遍历首尾元素
        const line = new Array(i+1).fill(1)
        for (let j = 1; j < i; j++) {
                line[j] = result[i - 1][j - 1] + result[i - 1][j]
        }
        result.push(line)
    }
    return result
};
```

## 买卖股票的最佳时机

[https://leetcode.cn/problems/best-time-to-buy-and-sell-stock](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 记录最大利润
    let result = 0
    // 记录已知的最低价格
    let minPrice = Infinity

    for(let i = 0;i<prices.length;i++){
        // 用当前的价格 - 已知最低价格，如果比当前最大利润还大，记录
        result = Math.max(result, prices[i] - minPrice)
        // 记录新的最低价格
        minPrice = Math.min(minPrice, prices[i])
    }

    return result
};
```

## 有效的括号

[https://leetcode.cn/problems/valid-parentheses](https://leetcode.cn/problems/valid-parentheses)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = []
    let map = {
        "(" : ")",
        "[" : "]",
        "{" : "}"
    }

    for(let i =0;i<s.length;i++){
        // map 里存在，说明是左括号，入栈
        if(map[s[i]] !== undefined){
            stack.push(s[i])
        }else{
            // 否则是右括号，取出栈顶元素
            let top = stack.pop()
            // 若栈顶元素不存在，当前元素必然是单独的右括号，直接 false
            // 比较栈顶元素和当前元素是否匹配，如果不匹配，false
            if (top === undefined || map[top] !== s[i]) return false;
        }
    }

    // 遍历一遍，如果都匹配，则没有问题，返回 true
    // 注意栈里可能残留左括号，这种情况说明没有对应的右括号，返回 false
    return stack.length == 0
};
```

## 搜索插入位置

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0
    let right = nums.length -1 

    // 注意边界条件，最后 left 和 right 重合，mid 必然是 target，否则不存在
    while(left<=right){
        let mid = Math.floor((right + left) / 2)
        if(target<nums[mid]){
            right = mid-1
        }else if(target>nums[mid]){
            left = mid+1
        }else{
            return mid
        }
    }

    return left
};
```

## 只出现一次的数字

[https://leetcode.cn/problems/single-number/submissions](https://leetcode.cn/problems/single-number/submissions)

用哈希表存数字出现次数的方法不行，题目要求空间复杂度只使用常量额外空间

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // 对数组中每个数字累计进行异或运算，根据异或运算的交换律，最终的结果回事单独的数字
    return nums.reduce((acc,curr)=> acc ^ curr)
};
```

## 多数元素

[https://leetcode.cn/problems/majority-element](https://leetcode.cn/problems/majority-element)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // 记录结果数字
    let best = null
    // 记录 best 的投票数
    let count = 0

    for(let i = 0;i<nums.length;i++){
        // 如果投票为 0，更换最多数字
        if(count === 0){
            best = nums[i]
        }
        // 当前数字等于最多数字，计数器加一，否则减一
        count += (nums[i] === best) ? 1:-1
    }

    // 最终得票最多的数字会留下来
    return best
};
```

## 相交链表

[https://leetcode.cn/problems/intersection-of-two-linked-lists](https://leetcode.cn/problems/intersection-of-two-linked-lists)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if(!headA || !headB) return null
    let pointA = headA
    let pointB = headB

    // 指针A 从头开始遍历 链表A，遇到 null 后转移到链表B 开头开始遍历
    // 指针B 从头开始遍历 链表B，遇到 null 后转移到链表A 开头开始遍历
    // 如果有交点，链表A 独有部分+公共部分+链表 B 独有部分===链表B 独有部分+公共部分+链表 A 独有部分，则指针 AB 必然会同时指向 交点
    // 如果没有交点，链表A 独有部分+链表 B 独有部分===链表B 独有部分+链表B 独有部分，指针 AB 会同时指向 null
    while(pointA != pointB){
        pointA = pointA ? pointA.next : headB
        pointB = pointB ? pointB.next : headA
    }

    return pointA
};
```

## 反转链表

[https://leetcode.cn/problems/reverse-linked-list](https://leetcode.cn/problems/reverse-linked-list)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let pre = null
    let curr = head

    while(curr){
        // 暂存下一个节点
        let next = curr.next
        // 反转
        curr.next = pre
        // 后移
        pre = curr
        // 后移
        curr = next

    }

    return pre
};
```

## 回文链表

[https://leetcode.cn/problems/palindrome-linked-list](https://leetcode.cn/problems/palindrome-linked-list)

数组双指针，空间复杂度 O(n)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // 将链表存入数组
    let p = head
    let arr = []
    while(p){
        arr.push(p.val)
        p = p.next
    }

    // 双指针从首尾同步向中间移动，逐元素对比
    let left = 0
    let right = arr.length - 1
    while(left < right){
        if(arr[left] !== arr[right]) return false
        left++
        right--
    }

    return true
};
```

反转后半部分链表，空间复杂度 O(1)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // 快慢指针找链表中点
    let slow = head
    let fast = head

    // 同时考虑奇偶数的边界条件
    while(fast.next && fast.next.next){
        slow = slow.next
        fast = fast.next.next
    }
    // 此时 slow 停在中点（奇数长度链表）或中点前的位置（偶数长度链表）

    // 反转后半部分链表
    let pre = null
    // 注意 slow.next 才是后半部分反转后的最后一个元素
    let curr = slow.next
    while(curr){
        let next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    // 截断前半部分（可选）
    slow.next = null

    // 同时遍历对比两个链表的元素
    let p1 = head
    let p2 = pre
    // 这里用后半部分的指针作为边界条件，因为考虑到奇数情况下，后半部分比前半部分较短，所以会提前到达尾部的 null
    while(p2){
        if(p1.val !== p2.val) return false
        p1 = p1.next
        p2 = p2.next
    }

    return true
};
```