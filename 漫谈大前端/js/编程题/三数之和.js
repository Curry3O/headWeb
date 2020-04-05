//题目：给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。(注意：答案中不可以包含重复的三元组。)

//例如：给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为：[ [-1, 0, 1], [-1, -1, 2] ]

/**
 * @param {number[]} nums
 * @return {number[][]}
*/

var threeSum = function (nums) {
    let result = []
    let hashMap = new Map()
    // 容错处理
    if (nums.length < 3) return []
    // 容错处理
    if (nums.length === 3) {
        if (nums[0] + nums[1] + nums[2] === 0) return [nums]
        return []
    }
    nums = nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; i++) {
        let start = i + 1
        let end = nums.length - 1
        let target = 0 - nums[i]
        while (start < end) {
            if (nums[start] + nums[end] === target) {
                let arr = [nums[i], nums[start], nums[end]]
                let key = arr.join('')
                if (!hashMap.has(key)) {
                    hashMap.set(key, true)
                    result.push(arr)
                }
                end -= 1
                start += 1
            } else if (nums[start] + nums[end] > target) {
                end -= 1
            } else {
                start += 1
            }
        }
    }
    return result
}

//测试
console.log(threeSum([-1, 0, 1, 2, -1, -4]));