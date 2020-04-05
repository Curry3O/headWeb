//思想：每一次对比相邻两个数据的大小，小的排在前面，如果前面的数据比后面的大就交换这两个数的位置
//特点：排序算法的基础。简单实用易于理解，缺点是比较次数多，效率较低。

//冒泡排序(普通版)
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

//测试
let arr = [30,11,35,23,9];
console.log(bubbleSort(arr));


//冒泡排序(改进版)
function bubbleSort2(arr){
    let low = 0;
    let high = arr.length - 1;
    while (low < high) {
        // 正向遍历找最大
        for(let i = low; i < high; i++){
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }
        //修改high值, 前移一位
        high --;
        // 反向遍历找最小
        for(let j = high; j > low; j--){
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j - 1);
            }
        }
        //修改low值,后移一位
        low ++;
    }
    return arr;
}

//交换位置
function swap(arr, n, m) {
    [arr[n], arr[m]] = [arr[m], arr[n]]
}

//测试2
let arr2 = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort2(arr2));
