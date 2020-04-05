//基数排序:通过比较每个元素对应位置上数字的大小进行排序：个位与个位，十位与十位 ...
//要求元素必须是0或正整数。

//根据比较顺序不同，分为两类：
//Least Significant Digit，从个位开始比较
//Most Significant Digit，从最高位开始比较

//两种方法的共同点是：先要找到最大的元素。因为每个元素的每一位都要对应比较，所以要看最大的元素有几位,当其中一个元素某一位上没有值时，以0代替

//LSD
function radixSortLSD(arr){
    // 找出最大元素
    let max = Math.max(...arr);
    // 获取其位数
    maxLen = getLengthOfNum(max);
    // 外层遍历位数，内层遍历数组
    // 外层循环以最大元素的位数作为遍历次数
    for(let digit = 1; digit <= maxLen; digit++){
        // 初始化0-9 10个数组，这里暂且叫做桶
        let buckets = [];
        for(let i = 0; i < 10; i++){
            buckets[i] = [];
        }
        // 遍历数组
        for(let i = 0; i < arr.length; i++){
            // 取出一个元素
            let e = arr[i];
            // 获取当前元素该位上的值
            let value = getSpecifiedValue(e, digit);
            buckets[value].push(e);
        }
        // 每次内层遍历结束，把所有桶里的元素依次取出来，覆盖原数组
        let res = [];
        buckets.toString().split(',').forEach((val)=>{
            if (val) {
                res.push(parseInt(val));
            }
        });
        // 得到了一个排过序的新数组，继续下一轮外层循环，比较下一位
        arr = res;
    }
    return arr;
}

//求数字位数
function getLengthOfNum(num){
    return (num += '').length;
}

//num:获取一个数字指定位数上的值，超长时返回0
//position:个位的位数是1，十位的位数是2 ...
function getSpecifiedValue(num, position){
    return (num += '').split('').reverse().join('')[position - 1] || 0
}

//测试LSD
let arrLSD = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(radixSortLSD(arrLSD));



//MSD
function radixSortMSD(arr) {
    // 最大元素
    let max_num = Math.max(...arr);
    // 获取其位数作为初始值，最小值为1，也就是个位
    let digit = getLengthOfNum(max_num);
    return msd(arr, digit);
}

function msd(arr, digit) {
    // 建10个桶
    let buckets = [];
    for (let i = 0; i < 10; i++){
        buckets[i] = [];
    }
    // 遍历数组,入桶(这里跟 LSD 一样)
    for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        let value_of_this_digit = getSpecifiedValue(ele, digit);
        buckets[value_of_this_digit].push(ele);
    }
    // 结果数组
    let result = [];
    // 遍历每个桶
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length === 1){
            // 只剩一个元素，直接加入结果数组
            result = result.concat(buckets[i]);
        }else if (buckets[i].length && digit === 1){
            // 还有多个元素，但是已经比较到个位了
            // 说明是重复元素的情况，也直接加入结果数组
            result = result.concat(buckets[i]);
        }else if (buckets[i].length && digit !== 1){
            // 还有多个元素，并且还没有比较结束，递归比较下一位
            result = result.concat(msd(buckets[i], digit - 1));
        } 
        // 空桶就不作处理了
    }
    return result;
}

//测试MSD
let arrMSD = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(radixSortMSD(arrMSD));