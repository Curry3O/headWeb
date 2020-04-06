//题目：判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
/* 
例子：
    示例 1:
        输入: 121
        输出: true

    示例 2:
        输入: -121
        输出: false
        解释: 从左向右读, 为 - 121。 从右向左读, 为 121 - 。因此它不是一个回文数。

    示例 3:
        输入: 10
        输出: false
        解释: 从右向左读, 为 01。 因此它不是一个回文数。

    toString() 
        可以将所有的的数据都转换为字符串， 但是要排除null 和 undefined
        .toString() 括号中的可以写一个数字代表进制，对应进制字符串:
            二进制：.toString(2);
            八进制：.toString(8);
            十进制：.toString(10);
            十六进制：.toString(16);
    
    String() 
        可以将null和undefined转换为字符串， 但是没法转进制字符串
        String(undefined) -- > undefined
        String(null) -- > null

*/

//利用两个指针对碰的方法
const isPalindrome = (x) => {
    if (x < 0) {
        return false;
    }
    const str = x.toString();
    let i = 0;
    let j = str.length - 1;
    let flag = true;
    while (i < j) {
        if (str[i] !== str[j]) {
            flag = false;
            break;
        }
        i++;
        j--;
    }
    return flag;
}

//测试
console.log(isPalindrome(123454321));