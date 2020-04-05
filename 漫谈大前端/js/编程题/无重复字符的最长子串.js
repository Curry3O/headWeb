//原题：给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

//例如：输入: "abcabcbb"。输出: 3 。解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
//输入: "bbbbb"。输出: 1。 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

/**
 * @param {string} s
 * @return {number}
*/
function lengthOfLongestSubstring(s){
    // 使用双指针解决 + hash
    let len = s.length;
    let hashMap = new Map();
    let start = 0;
    let end = 0;
    let maxLen = 0;
    while (end < len) {
        if (!hashMap.has(s[end])) {
            hashMap.set(s[end],1);
            maxLen = Math.max(maxLen,[...hashMap.keys()].length);
            end ++;
        }else{
            hashMap.delete(s[start]);
            start++;
        }
    }
    return maxLen;
}

//测试
console.log(lengthOfLongestSubstring('abcdaio'));