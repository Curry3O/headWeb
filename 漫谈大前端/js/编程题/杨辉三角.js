//题目：给定一个非负整数 numRows，生成杨辉三角的前 numRows 行（在杨辉三角中，每个数是它左上方和右上方的数的和）。
/* 
例子：
    输入: 5
    输出: [
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1]
          ]
*/

//思路：判断如果不是该列数组的首位或者最后一位，则值为a[i-1][j-1] + a[i-1][j] ，否则值为1

var generate = function (numRows) {
    const result = [];
    if (numRows <= 0) {
        return result;
    }
    for (let i = 0; i < numRows; i++) {
        const subArr = [];
        for (let j = 0; j <= i; j++) {
            if (j > 0 && j < i) {
                subArr.push(result[i - 1][j - 1] + result[i - 1][j]);
            } else {
                subArr.push(1);
            }
        }
        result.push(subArr);
    }
    return result;
};

//测试
console.log(generate(6));
/* 
[
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
    [1, 5, 10, 10, 5, 1]
]
*/