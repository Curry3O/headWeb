//题目：给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。例如：输入: [-2,1,-3,4,-1,2,1,-5,4],输出: 6。解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

//思路：从数组中的第一位开始循环求和,如果sum(和) < 0。接下来的一位next无论大于0还是小于0, 都应当取代当前的负数sum。因为如果next < 0, sum + next 将会更小, 所以应当舍弃之前的sum。如果next大于0, sum更应当从next开始重新计算。如果sum(和) > 0。如果接下来的一位next与当前的sum的和大于MAX, next与当前sum的和将成为新的MAX。否则继续向下迭代。

/**
 * @param {number[]} nums
 * @return {number}
 */

var maxSubArray = function (nums) {
    if (nums.length <= 1) return nums[0]
    let sum = nums[0]
    let MAX = sum
    for (let i = 1; i < nums.length; i++) {
        if (sum >= 0) {
            if (sum + nums[i] >= MAX) {
                MAX = sum + nums[i]
            }
            sum = sum + nums[i]
        } else {
            if (nums[i] >= MAX) {
                MAX = nums[i]
            }
            sum = nums[i]
        }
    }
    return MAX
}

//测试
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));