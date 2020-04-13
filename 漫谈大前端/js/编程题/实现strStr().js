//题目：实现 strStr() 函数。给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置(从0开始) 。如果不存在，则返回 - 1。
/* 
例子：
    示例 1:
        输入: haystack = "hello", needle = "ll"
        输出: 2

    示例 2:
        输入: haystack = "aaaaa", needle = "bba"
        输出: -1
*/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    // '' 边界判断
    const needleLen = needle.length
    if (needleLen === 0) return 0

    // 边界判断
    const haystackLen = haystack.length
    if (needleLen > haystackLen) return -1

    // 初始化偏移量
    function initailOffsetMap() {
        const offsetMap = {}
        for (let i = 0; i < needleLen; i++) {
            offsetMap[needle[i]] = needleLen - i
        }
        return s => offsetMap[s] || needleLen
    }
    const getOffset = initailOffsetMap()

    // 从右开始匹配
    let i = 0
    while (i <= haystackLen - needleLen) {
        // 模式串匹配
        let temp = 0
        for (let j = 0; j < needleLen; j++) {
            if (haystack[i + j] === needle[j]) temp++
            else break
        }

        if (temp === needleLen) return i
        // 按偏移量跳过
        else i += getOffset(haystack[i + needleLen])
    }
    return -1
};

//测试
console.log(strStr("helloworld","owo"));
