//计数排序(Counting sort)是一种稳定的排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。它只能对整数进行排序。(只能用于由确定范围的整数所构成的数组)
//思路:遍历数组，找出每个元素出现的次数，放入统计数组,遍历统计数组，放入结果数组

//计数排序
function countingSort(arr){
    let len = arr.length;
    //计数数组
    let countArr = [];
    //结果数组
    let resArr = [];
    let min = arr[0];
    let max = arr[0];
    //遍历原数组中的元素
    for(let i = 0; i < len; i++){
        //求原数组中最小值min
        min = min <= arr[i] ? min : arr[i];
        //求原数组中最大值max
        max = max >= arr[i] ? max : arr[i];
        //以原数组中的元素作为count数组的索引,以原数组中的元素出现次数作为count数组的元素值
        countArr[arr[i]] = countArr[arr[i]] ? countArr[arr[i]] + 1 : 1;
    }
    //计数数组变形:
    //新元素的值是前面元素累加之和的值,即count[j+1] = count[j+1] + count[j];
    for(let j = min; j < max; j++){
        countArr[j + 1] = (countArr[j + 1] || 0) + (countArr[j] || 0);
    }
    //1.遍历原始数组中的元素,当前元素arr[k]作为索引
    //2.在计数数组中找到对应的元素值countArr[arr[k]]
    //3.再将countArr[arr[k]]的值减去1，就是arr[k]在结果数组resArr中的位置
    //4.做完上述这些操作,countArr[arr[k]]自减1
    for(let k =0; k < len; k++){
        resArr[countArr[arr[k]] - 1] = arr[k];
        countArr[arr[k]]--;
    }
    return resArr;
}

//测试
let arr = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
console.log(countingSort(arr));