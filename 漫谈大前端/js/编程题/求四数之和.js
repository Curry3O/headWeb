//题目：给定一个包含n个整数的数组nums和一个目标值target，判断nums中是否存在四个元素a，b，c和d，使得a+b+c+d的值与target相等？找出所有满足条件且不重复的四元组。例如输入：  [5, 0, -6, 0, 6, -5], 0 ，输出：[ [ -6, -5, 5, 6 ], [ -6, 0, 0, 6 ], [ -5, 0, 0, 5 ] ]

//方法1：
function findNumber(nums, target) {
    nums = nums.sort((a, b) => a - b);
    var arr = [];
    var arrs = [];
    var len = nums.length;
    for (var i = 0; i < len - 3; i++) {
        //过滤重复元素
        if (i > 0 && nums[i - 1] == nums[i]) {
            continue;
        }
        for (var j = i + 1; j < len - 2; j++) {
            if (j > i + 1 && nums[j - 1] == nums[j]) {
                continue;
            }
            var k = len - 1;
            var c = j + 1;
            while (c < k && c != k) {
                var sum = nums[i] + nums[j] + nums[c] + nums[k]
                if (c > j + 1 && nums[c] == nums[c - 1]) {
                    c++;
                    continue;
                }
                if (k < len - 1 && nums[k] == nums[k + 1]) {
                    k--;
                    continue;
                }
                if (sum == target) {
                    arr.push(nums[i], nums[j], nums[c], nums[k]);
                    arrs.push(arr);
                    arr = [];
                    c++;
                    k = len - 1;
                } else if (sum < target) {
                    c++;
                } else {
                    k--;
                }
            }
        }
    }
    return arrs;
}
console.log(findNumber([5, 0, -6, 0, 6, -5], 0));



//方法2：
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    if (nums.length < 4) {
        return []
    }
    // 拆解成三数之和的问题，多一层循环

    const result = []
    const hash = {}
    let hi = -1
    let ti = -1

    nums = nums.sort((a, b) => a - b)

    for1: for (let i = 0; i < nums.length - 3; i++) {
        if (nums[i] === nums[i - 1]) {
            continue for1
        }
        let tw = target - nums[i]
        for2: for (let j = i + 1; j < nums.length - 2; j++) {
            let tv = tw - nums[j]
            hi = j + 1
            ti = nums.length - 1
            while (hi < ti) {
                if (nums[hi] + nums[ti] > tv) {
                    ti -= 1
                } else if (nums[hi] + nums[ti] < tv) {
                    hi += 1
                } else {
                    const k = [nums[i], nums[j], nums[hi], nums[ti]].join('')
                    if (!hash[k]) {
                        hash[k] = true
                        result.push([nums[i], nums[j], nums[hi], nums[ti]])
                    }
                    ti -= 1
                    hi += 1
                }
            }
        }
    }

    return result
};

//测试
console.log(fourSum([1, 0, -1, 0, -2, 2], 0));