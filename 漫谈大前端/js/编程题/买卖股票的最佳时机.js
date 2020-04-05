//原题:给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

//例如：输入: [7,1,5,3,6,4]，输出: 5。解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。

//思路：最大利润即(最高卖出价格 - 最小买入价格)。我们只需要找到最小买入价格后, 计算每一天的利润，取最大值即可

/**
 * @param {number[]} prices
 * @return {number}
*/

function maxProfit(arr){
    if (arr.length === 0) {
       return 0; 
    }
    // 利润
    let res = 0;
    let min = arr[0];
    // 找到最小的谷之后的最大的峰
    for(let i = 0; i < arr.length; i++){
        if (arr[i] < min) {
            min = arr[i];
        }
        res = Math.max(arr[i] - min, res);
    }
    return res;
}

//测试
console.log(maxProfit([7, 1, 5, 3, 6, 4]));