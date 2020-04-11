//题目：给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。你可以假设除了整数 0 之外， 这个整数不会以零开头。

/* 
例子：
    示例 1:
        输入: [1, 2, 3]
        输出: [1, 2, 4]
        解释: 输入数组表示数字 123。

    示例 2:
        输入: [4, 9, 9, 9]
        输出: [5, 0, 0, 0]
        解释: 输入数组表示数字 4321。

    示例 3:
        输入: [9, 9]
        输出: [1, 0, 0]
        解释: 输入数组表示数字 99。
*/

//方法一：
/* 思路：
    末位无进位，则末位加一即可， 因为末位无进位， 前面也不可能产生进位， 比如 45 => 46

    末位有进位，在中间位置进位停止，则需要找到进位的典型标志，即为当前位 % 10 后为 0， 则前一位加 1， 直到不为 0 为止， 比如 499 => 500

    末位有进位，并且一直进位到最前方导致结果多出一位，对于这种情况，需要在第 2 种情况遍历结束的基础上，进行单独处理，比如 999 => 1000
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    const len = digits.length;
    for (let i = len - 1; i >= 0; i--) {
        digits[i]++;
        digits[i] %= 10;
        if (digits[i] != 0)
            return digits;
    }
    digits = [...Array(len + 1)].map(_ => 0);
    digits[0] = 1;
    return digits;
};

//测试
console.log(plusOne([1, 9, 9]));




//方法二(利用ES10基本类型BigInt来解题)
/* 思路：
现在来阐述下主要解题思路：
    已知传入参数必定为数值型数组
    将参数转换为字符型（ Array.prototype.join()）
    由字符型变为整型（ Number构造函数)）
    整型可以进行普通的数学计算
    计算结果再次变为字符型（ String构造函数）
    将字符型数值变更为数组（ String.prototype.split()）

这是最开始的解题思路， 不过着进行测试时， 发现了一个问题：
Number基本类型的存储范围在 - (2 ^ 53 - 1) 到(2 ^ 53 - 1) 之间。 而测试用例[6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 4] 超出了这个范围。 而在ES10中， 规范新引入了一种基本数据类型BigInt。 它可以完美地兼容大数。


对BigInt类型的数值进行操作时，要特别注意，该类型不可与Number实例进行操作。
    BigInt(123) + 1 // Error，数值1是Nuber基本类型
    BigInt(123) + 1n // Success, 1n是BigInt基本类型，就是Number类型中的1，输出：124n
    

所以需要部分纠正下之前的解题思路：
    已知传入参数必定为数值型数组
    将参数转换为字符型（ Array.prototype.join()）
    由字符型变为BigInt型（ BigInt构造函数)）
    进行专属于BigInt类型的数学计算
    计算结果再次变为字符型（ String构造函数）
    将字符型数值变更为数组（ String.prototype.split()）
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne2 = function (digits) {
    // 数值6145390195186705544超出Number基本类型的容纳范围，改用BigInt基本类型
    let num = BigInt(digits.join(''));
    // BigInt基本类型进行数学操作时，需要在数字字面量后加个n
    let string = String(num + 1n);
    let ary = string.split('');

    return ary.map(str => Number(str));
};

//测试
console.log(plusOne2([9, 9, 9]));