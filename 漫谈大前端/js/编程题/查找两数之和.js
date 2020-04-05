//题目:给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
//例如：给定 nums = [2, 7, 11, 15], target = 9。 因为 nums[0] + nums[1] = 2 + 7 = 9。 所以返回[0, 1]

//思路：最简单的方法是通过两层for循环进行遍历, 使用暴力的查找两个子元素。但是这种方法的时间复杂度为O(n^2)。在大数据量的测试用例的情况下执行时间超时。那么我们有什么办法可以将时间复杂度降下来吗?这时我们可以用到HashMap。通过HashMap我们可以将时间复杂度降为O(2n)。如果是有序数组的情况下, 时间复杂度可以是O(n), 详见下题。


//方法一

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let hashMap = new Map();
    // 初始化hashMap
    for (let i = 0; i < nums.length; i++) {
        if (!hashMap.has(nums[i])) {
            hashMap.set(nums[i], i)
        }
    }
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i]
        if (hashMap.has(diff) && hashMap.get(diff) !== i) {
            return [i, hashMap.get(diff)]
        }
    }
    return null;
};

//测试
console.log(twoSum([2, 7, 11, 15], 9));


//方法二(数组有序)
function twoSum2(nums, target){
    let len = nums.length;
    let start = 0;
    let end = len - 1;
    while (start < end) {
        if (nums[start] + nums[end] === target) {
            return [start, end];
        }else if (nums[start] + nums[end] < target) {
            start += 1;
        }else{
            end -= 1;
        }
    }
    return null;
}

//测试
console.log(twoSum2([2,9,12,30,58], 42));