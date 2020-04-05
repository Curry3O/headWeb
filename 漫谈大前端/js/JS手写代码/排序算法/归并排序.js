//归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法的一个非常典型的应用。
//思路：把长度为n的输入序列分成两个长度为n/2的子序列,对这两个子序列分别采用归并排序,将两个排序好的子序列合并成一个最终的排序序列。

// 分割
function mergeSort(arr){
    let len = arr.length;
    // 如果只剩一个元素，分割结束
    if (len < 2) {
       return arr; 
    }
    // 否则继续分成两部分
    let middle = Math.floor(len / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

// 合并
function merge(left, right){
    let res = [];
    // 当左右两个数组都还没有取完的时候，比较大小然后合并
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            res.push(left.shift());
        }else{
            res.push(right.shift());
        }
    }
    // 其中一个数组空了，另一个还剩下一些元素
    while (left.length) {
        res.push(left.shift());
    }
    while (right.length) {
        res.push(right.shift());
    }
    return res;
}

//测试
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(arr));