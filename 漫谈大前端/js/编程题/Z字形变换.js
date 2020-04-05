//题目：将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列
/* 
    比如输入字符串为 "ABCDEFGHIJK" 行数为 3 时，排列如下:

            A       E       I
            B   D   F   H   J
            C       G       K

    之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："AEIBDFHJCGK"

*/

//方法一
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if (numRows === 1) return s
    let result = []
    let matrix = []
    let rowCounter = 0
    let prevRowCounter = 0
    let colCounter = 0
    for (let i = 0; i < numRows; i++) {
        matrix.push([])
    }
    // 填充二维数组
    for (let i = 0; i < s.length; i++) {
        matrix[rowCounter][colCounter] = s[i]
        if (prevRowCounter <= rowCounter) {
            prevRowCounter = rowCounter
            if (rowCounter >= numRows - 1) {
                rowCounter -= 1
                colCounter += 1
            } else {
                rowCounter += 1
            }
        } else {
            prevRowCounter = rowCounter
            if (rowCounter <= 0) {
                rowCounter += 1
            } else {
                rowCounter -= 1
                colCounter += 1
            }
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== undefined) {
                result.push(matrix[i][j])
            }
        }
    }
    return result.join('')
};

//测试
console.log(convert("ABCDEFGHIJ", 4));


//方法二
function getZstr(str, line){
    //获取字符串长度
    let len = str.length;
    //重组字符串数组
    let arr = [];
    //重组数组下标
    let index = 0;
    //循环行数
    for(let i = 0; i < line; i++){
        //每行的列数
        let count = 0;
        while(true){
            //第一行和最后一行的算法一致，中间行数每次循环需要多添加一列
            if (i > 0 && i < line - 1) {
                let num = (2 * line - 2) * count - i;
                //判断下标是否超出原字符串长度
                if (num >= len) {
                    break;
                }
                //中间行第一次只能算加  相减下标为负数（去除）
                if (num > 0) {
                    arr[index] = str[num];
                    index ++;
                }
            }
            let num = (2 * line - 2) * count + i;
            if (num >= len) {
                break;
            }
            arr[index] = str[num];
            count ++;
            index ++;
        }
    }
    return arr.join('');
}

//测试
console.log(getZstr("ABCDEFGHIJ", 4));