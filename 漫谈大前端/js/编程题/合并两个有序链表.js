//题目：将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
/* 
例子
    示例：
        输入： 1 - > 2 - > 4, 1 - > 3 - > 4
        输出： 1 - > 1 - > 2 - > 3 - > 4 - > 4
*/

//解法一：双指针法
/* 
时间复杂度： O(a + b) 循环比较两个子问题的次数为 a + b a, b为两个子问题的长度
空间复杂度： O(1) 双指针， 常数级别复杂度
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    var prevHead = new ListNode(-1);
    var prevNode = prevHead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prevNode.next = l1;
            l1 = l1.next
        } else {
            prevNode.next = l2;
            l2 = l2.next;
        }
        prevNode = prevNode.next;
    }
    prevNode.next = l1 ? l1 : l2;
    return prevHead.next;
};


//方法二：递归
/* 
时间复杂度： O(n)(n为l1和l2的每个元素的遍历次数和)
空间复杂度： O(n)(n为l1和l2的空间和)
终止条件： 两条链表分别名为 l1 和 l2， 当 l1 为空或 l2 为空时结束
返回值： 每一层调用都返回排序好的链表头
本级递归内容： 如果 l1 的 val 值更小， 则将 l1.next 与排序好的链表头相接， l2 同理
O(m + n) O(m + n)， mm 为 l1的长度， nn 为 l2 的长度

编程技巧：递归 + 原地斩链相连
    递归比较查看两个链表哪个元素先小 就斩断此元素位置链条⛓️ 连接到另一链表上 如此也不需要另外开辟存储空间
    斩断后 重连铁链的动作因为要自动非人工 所以需要程序自己调用自己 即为递归
    斩断后需要连的结点 通过
    return 最小结点 即动态更新 斩断结点位置
    随时连接下一个符合要求的位置（ x.next = 求下一个需要连接的结点位置(即程序自动搜索即递归) && x = 下一个需要连接的结点位置）
    返回修改后的 l1头结点的链表 或 l2头结点的链表
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists2 = function (l1, l2) {
    if (l1 == null) {
        return l2;
    }
    if (l2 == null) {
        return l1;
    }
    if (l1.val <= l2.val) {
        l1.next = mergeTwoLists2(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists2(l1, l2.next);
        return l2;
    }
}