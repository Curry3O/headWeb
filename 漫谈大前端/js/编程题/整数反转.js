//题目：给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
/* 
例如：
    示例 1:
        输入: 123
        输出: 321

    示例 2:
        输入: -123
        输出: -321

    示例 3:
        输入: -120
        输出: -21
*/

var reverseNum = function(x){
    const border = 2 ** 31;
    const max = border - 1;
    const min = -border;
    const res = (x > 0 ? 1 : -1) * String(x).split('').filter( x => x !== '-').reverse().join('');
    return res > max || res < min ? 0 : res;
}

//测试
console.log(reverseNum(-1200));