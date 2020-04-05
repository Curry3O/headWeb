//桶排序是计数排序的升级版,它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定
//桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序(有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排)

/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
    if (array.length <= 1) {
        return array;
    }
    var len = array.length,
        buckets = [],
        result = [],
        min = max = array[0],
        regex = '/^[1-9]+[0-9]*$/',
        space, n = 0;
    num = num || ((num > 1 && regex.test(num)) ? num : 10);
    for (var i = 1; i < len; i++) {
        // 也可以这样求最小值：min = Math.min(...array);
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
    }
    // (最大值-最小值)/桶数，得到每个桶最小最大值的差，即区间
    // 比如 space 为10, 0号桶区间为0-10，1号桶10-20，...
    space = (max - min + 1) / num;
    for (var j = 0; j < len; j++) {
        // (元素-最小值)/区间，取整数部分，就是应该放入的桶的索引
        var index = Math.floor((array[j] - min) / space);
        if (buckets[index]) { //  非空桶，插入排序
            var k = buckets[index].length - 1;
            while (k >= 0 && buckets[index][k] > array[j]) {
                buckets[index][k + 1] = buckets[index][k];
                k--;
            }
            buckets[index][k + 1] = array[j];
        } else { //空桶，初始化
            buckets[index] = [];
            buckets[index].push(array[j]);
        }
    }
    // 合并所有桶
    while (n < num) {
        result = result.concat(buckets[n]);
        n++;
    }
    return result;
}

//测试
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bucketSort(arr, 4));