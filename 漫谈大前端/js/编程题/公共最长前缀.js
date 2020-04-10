//题目：编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
/* 
例子：
示例 1:
    输入: ["flower","flow","flight"]
    输出: "fl"

示例 2:
    输入: ["dog","racecar","car"]
    输出: ""
    解释: 输入不存在公共前缀。

说明:
    所有输入只包含小写字母 a-z 。
*/

/* 
思路：
    链表
    当字符串数组长度为 0 时则公共前缀为空，直接返回
    令最长公共前缀 ans 的值为第一个字符串，进行初始化
    遍历后面的字符串，依次将其与 ans 进行比较，两两找出公共前缀，最终结果即为最长公共前缀
    如果查找过程中出现了 ans 为空的情况，则公共前缀不存在直接返回
    时间复杂度：O(s)，s 为所有字符串的长度之和
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length == 0)
        return "";
    let ans = strs[0];
    for (let i = 1; i < strs.length; i++) {
        let j = 0
        for (; j < ans.length && j < strs[i].length; j++) {
            if (ans[j] != strs[i][j]){
                break;
            }
        }
        ans = ans.substr(0, j);
        if (ans === ""){
            return ans;
        }
    }
    return ans;
};

//测试
let strs = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strs));  //fl