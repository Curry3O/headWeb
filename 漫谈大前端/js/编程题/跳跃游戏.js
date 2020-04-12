//题目：给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个位置。

/* 例子：

    示例 1:
        输入: [2,3,1,1,4]
        输出: true
        解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。

    示例 2:
        输入: [3,2,1,0,4]
        输出: false
        解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ，
        所以你永远不可能到达最后一个位置。
*/


//贪心算法
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    //换一种思路，计算出该路线能到的最远距离，判断最远的距离是否超过了该路径或者刚好到达终点
    //每一次都计算当前位置以及以前能走到的最远距离（贪心）
    let maxDistance = 0;
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        if (nums[i] === 0 && maxDistance <= i) break;//如果当前位置值为0，且当前能到达的最远距离还小于等于这个位置，那么它已经走不到后面了，直接退出循环就好了
        if (i + nums[i] > maxDistance) maxDistance = i + nums[i];
    }
    return maxDistance >= len - 1;
};

//测试
console.log(canJump([3,2,2,0,4]));