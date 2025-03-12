# 链表

## 移除链表元素

[leetcode.cn/problems/remove-linked-list-elements/](https://leetcode.cn/problems/remove-linked-list-elements/)

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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let dommy = new ListNode();
  dommy.next = head;
  let curr = dommy;

  while (curr != null && curr.next != null) {
    if (curr.next.val == val) {
      curr.next = curr.next.next;
      // 注意删除节点后不能将指针后移
      continue;
    }
    curr = curr.next;
  }

  return dommy.next;
};
```

### 时间复杂度

O(n)

## 设计链表

[leetcode.cn/problems/design-linked-list/](https://leetcode.cn/problems/design-linked-list/)

```js
// 节点构造函数
function ListNode(val = 0, next = null) {
  this.val = val;
  this.next = next;
}

var MyLinkedList = function () {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) return -1;
  let curr = this.head;
  while (index-- > 0) {
    curr = curr.next;
  }
  return curr.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  let node = new ListNode(val, this.head);
  this.head = node;
  // 空链表情况
  if (this.size === 0) {
    this.tail = node;
  }
  this.size++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let node = new ListNode(val, null);
  // 空链表情况
  if (this.size === 0) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.size++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || index > this.size) return;
  // 添加的是头节点
  if (index === 0) {
    this.addAtHead(val);
    // 添加的是尾节点
  } else if (index === this.size) {
    this.addAtTail(val);
  } else {
    let curr = this.head;
    // 这里没有使用虚拟节点，因此 > 1
    while (index-- > 1) {
      curr = curr.next;
    }
    curr.next = new ListNode(val, curr.next);
    this.size++;
  }
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) return;

  // 删除的是第一个节点
  if (index === 0) {
    this.head = this.head.next;
    // 删除的节点同时是尾节点
    if (index === this.size - 1) {
      this.tail = this.head;
    }
  } else {
    let curr = this.head;
    // 这里没有使用虚拟节点，因此 > 1
    while (index-- > 1) {
      curr = curr.next;
    }
    curr.next = curr.next.next;
    // 删除的是尾节点
    if (curr.next === null) {
      this.tail = curr;
    }
  }
  this.size--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

## 反转链表

[leetcode.cn/problems/reverse-linked-list/](https://leetcode.cn/problems/reverse-linked-list/)

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
var reverseList = function (head) {
  let pre = null;
  let curr = head;

  while (curr) {
    // 记录下一个节点，用于后移指针
    let next = curr.next;
    curr.next = pre;
    // 指针后移
    pre = curr;
    curr = next;
  }

  // 退出循环时，curr == null，pre 是最后一个节点
  return pre;
};
```

### 时间复杂度

O(n)

## 两两交换链表中的节点

[leetcode.cn/problems/swap-nodes-in-pairs/](https://leetcode.cn/problems/swap-nodes-in-pairs/)

[]()

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
var swapPairs = function (head) {
  let dummy = new ListNode(0, head);
  let curr = dummy;

  while (curr.next && curr.next.next) {
    let first = curr.next;
    let second = curr.next.next;

    // 交换
    first.next = second.next;
    second.next = first;
    // 注意：因为已经完成了交换，需要更新 curr.next，否则指针后移会出错
    curr.next = second;

    // 指针后移
    curr = curr.next.next;
  }

  return dummy.next;
};
```

### 时间复杂度

O(n)

### 为什么不让 curr = dummy.next ？

错误示例：

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
var swapPairs = function (head) {
  let dummy = new ListNode(0, head);
  // 相当于 let curr = head
  let curr = dummy.next;

  while (curr && curr.next) {
    let first = curr;
    let second = curr.next;

    first.next = second.next;
    second.next = first;
    // 相当于
    curr.next = second;

    curr = curr.next.next;
  }

  return dummy.next;
};
```

这样在交换过后，会让 dummy 指向链表中原先的头节点，丢失对新头节点的引用
