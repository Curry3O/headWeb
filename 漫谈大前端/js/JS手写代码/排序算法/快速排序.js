//快速排序
//思想：先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
//特点：快速，常用。缺点是需要另外声明两个数组，浪费了内存空间资源。

//快速排序
function quickSort(arr, left, right){
    if (left < right) {
        let x = arr[right];
        let i = left - 1;
        let temp;
        for(let j = left; j <= right; j++){
            if (arr[j] <= x) {
                i++;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        quickSort(arr, left, i - 1);
        quickSort(arr, i + 1, right);
    }
    return arr;
}

//测试
let arr = [30,11,35,23,9];
console.log(quickSort(arr, 0, arr.length - 1));


//快速排序2
function quickSort2(arr){
    // 只剩1个元素，不能再分割了
    if (arr.length <= 1) {
        return arr;
    }
    // 取中间元素为基准值
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            // 如果小于基准值就放入左边数组
            left.push(arr[i]);
        }else{
            //否则放入右边数组
            right.push(arr[i]);
        }
    }
    // 递归并连接
    return quickSort2(left).concat([pivot], quickSort2(right));
}

//测试2
let arr2 = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort2(arr2));