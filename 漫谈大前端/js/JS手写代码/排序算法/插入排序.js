//插入排序,先按顺序取元素，再去已排序部分里找合适的位置
//思路:取未排序部分的第一个元素。第一次遍历时，将第一个元素作为已排序元素，从第二个元素开始取,遍历前面的已排序元素，并与这个未排序元素比较大小，找到合适的位置插入,继续执行上述步骤直至排序完成

//插入排序(普通版)
function insertSort(arr){
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let temp = arr[i];
        let j = i;
        while (arr[j - 1] > temp && j > 0) {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = temp;
    }
    return arr;
}

//测试
let arr = [30,11,35,23,9];
console.log(insertSort(arr));


//插入排序2(改进版,查找插入位置时使用二分查找的方式)
function insertSort2(arr){
    for(let i = 1; i < arr.length; i++){
        // 未排序部分的第1个
        let key = arr[i];
         // 已排序部分的第1个
        let left = 0;
        // 已排序部分的最后1个
        let right = i - 1;
        // 先找位置
        while (left <= right) {
            // 不再是从最后一个位置开始向前每个都比较，而是比较中间的元素
            let middle = parseInt((left + right) / 2);
            if (key < arr[middle]) {
                right = middle - 1;
            }else{
                left = middle + 1;
            }
        }
        // while结束，已经找到了一个大于或等于当前元素的位置 left
        // 再修改数组：把 left 到 i 之间的元素向后移动一个位置
        for(let j = i - 1; j >= left; j--){
            arr[j + 1] = arr[j];
        }
         // 插入当前元素
        arr[left] = key;
    }
    return arr;
}

//测试2
let arr2 = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(insertSort2(arr2));