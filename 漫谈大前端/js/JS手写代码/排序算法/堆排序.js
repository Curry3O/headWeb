//堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
//思路：
//建最大堆:把数组整理为最大堆的顺序，那么堆的根节点，或者说数组的第一个元素，就是最大的值。
//排序:把最大值与未排序部分的最后一个元素交换，剩余的部分继续调整为最大堆。每次建堆都能找到剩余元素中最大的一个。

//排序
function heapSort(arr){
    let len = arr.length;
    if (len <= 1) {
        return arr;
    }
    //1.建最大堆
    //遍历一半元素就够了
    //必须从中点开始向左遍历，这样才能保证把最大的元素移动到根节点
    for(let middle = Math.floor(len / 2); middle >= 0; middle--){
        maxHeapify(arr, middle, len);
    }
    //2.排序，遍历所有元素
    for(let j = len; j >= 1; j--){
        //2.1.把最大的根元素与最后一个元素交换
        swap(arr, 0, j - 1);
        //2.2.剩余的元素继续建最大堆
        maxHeapify(arr, 0, j - 2);
    }
    return arr;
}

//建最大堆
function maxHeapify(arr, middle, len){
    //1.假设父节点位置的值最大
    let largest = middle;
    //2.计算左右节点位置
    let left = 2 * middle + 1;
    let right = 2 * middle + 2;
    //3.判断父节点是否最大
    //如果没有超出数组长度，并且子节点比父节点大，那么修改最大节点的索引
    //左边更大
    if (left <= len && arr[left] > arr[largest]) {
        largest = left;
    }
    //右边更大
    if (right <= len && arr[right] > arr[largest]) {
        largest = right;
    }
    //4.如果 largest_index 发生了更新，那么交换父子位置，递归计算
    if (largest != middle) {
        swap(arr, middle, largest);
        //因为这时一个较大的元素提到了前面，一个较小的元素移到了后面
        //小元素的新位置之后可能还有比它更大的，需要递归
        maxHeapify(arr, largest, len);
    }
}

//交换位置
function swap(arr, n, m) {
    [arr[n], arr[m]] = [arr[m], arr[n]];
}

//测试
let arr = [91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22];
console.log(heapSort(arr));