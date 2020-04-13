//题目：给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。你可以假设数组中无重复元素。
/* 
例子：
    示例 1:
        输入: [1, 3, 5, 6], 5
        输出: 2

    示例 2:

        输入: [1, 3, 5, 6], 2
        输出: 1

    示例 3:

        输入: [1, 3, 5, 6], 7
        输出: 4

    示例 4:
        输入: [1, 3, 5, 6], 0
        输出: 0
*/


//方法一(暴力解法):
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (nums[0] > target) {
        return 0;
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) {
            return i;
        }
    }
    return nums.length;
};



//方法二(二分法):
var searchInsert2 = function (nums, target) {
    var left = 0;
    var right = nums.length - 1;
    if (target > nums[right]) return right + 1;
    while (left < right) {
        var index = parseInt((left + right) >>> 1); //取左中位数
        if (nums[index] < target) left = index + 1; //中位数小于目标值，削去区间左侧
        else right = index; //中位数大于等于目标值，削去区间右侧
    }
    return left;
};