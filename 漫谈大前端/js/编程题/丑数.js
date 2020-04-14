//题目：编写一个程序判断给定的数是否为丑数。丑数就是只包含质因数 2, 3, 5 的正整数。
/* 
例子：
    示例 1:
        输入: 6
        输出: true
        解释: 6 = 2× 3

    示例 2:
        输入: 8
        输出: true
        解释: 8 = 2× 2× 2;

    示例 3:
        输入: 14
        输出: false
        解释: 14 不是丑数， 因为它包含了另外一个质因数 7。
*/

/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function (num) {
    // 排除负数
    if (num < 1) return false;
    [2, 3, 5].map(item => {
        while (num % item === 0){
            num = num / item;
        }
    })
    return num === 1
};

//测试
console.log(isUgly(19));