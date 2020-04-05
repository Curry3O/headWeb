//希尔排序
//1959年Shell发明;第一个突破O(n^2)的排序算法;是'简单插入排序'的改进版;它与插入排序的不同之处在于,它会优先比较距离较远的元素,希尔排序又叫缩小增量排序
//希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。
function shellSort(arr) {
    let length = arr.length;
    //初始化间隙gap
    let gap = Math.floor(length / 2);
    while (gap >= 1) {
        for (let i = gap; i < length; i++) {
            let temp = arr[i];
            let j = i;
            while (arr[j - gap] > temp && j > gap - 1) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

//测试
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(shellSort(arr));