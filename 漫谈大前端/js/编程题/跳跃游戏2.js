//题目：给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。你的目标是使用最少的跳跃次数到达数组的最后一个位置。
/* 
例子：
    示例:
        输入: [2, 3, 1, 1, 4]
        输出: 2
        解释: 跳到最后一个位置的最小跳跃数是 2。
        从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
*/


//贪心算法
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    var steps = 0;
    var canJumpMax = 0;
    var last_canJumpMax = 0;
    var len = nums.length;
    for (var i = 0; i < len - 1; i++) {
        canJumpMax = Math.max(canJumpMax, i + nums[i]);
        if (last_canJumpMax == i) {
            last_canJumpMax = canJumpMax;
            steps++;
        }
        if (last_canJumpMax >= len - 1) {
            break;
        }
    }
    return steps;
};

//测试
console.log(jump([2, 3, 1, 1, 4]));