//选择排序,先找合适的元素，然后直接放到已排序部分
//工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
function selectSort(arr){
    let length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < length; j++) {
            //寻找最小的数
            if (arr[min] > arr[j]) {
                //将最小数的索引保存
                min = j;
            }
        }
        let temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

//测试
let arr = [30,11,35,23,9];
console.log(selectSort(arr));