//题目：给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
/* 
例子：
    示例 1:
        输入: [2, 2, 1]
        输出: 1

    示例 2:
        输入: [4, 1, 2, 1, 2]
        输出: 4
*/

//方法一：暴力法
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber1 = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums.lastIndexOf(nums[i]) === nums.indexOf(nums[i])){
            return nums[i];
        } 
    }
};

//测试
console.log(singleNumber1([1, 2, 3, 2, 1])); //3



//方法二：哈希
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber2 = function (nums) {
    let numsObj = {};
    for (let i = 0; i < nums.length; i++) {
        if(numsObj[nums[i]]){
            delete numsObj[nums[i]];
        }else{
            numsObj[nums[i]] = 1;
        } 
    }
    return Object.keys(numsObj)[0];
};

//测试
console.log(singleNumber2([1, 2, 3, 2, 1])); //3



//方法三：位运算异或
//时间复杂度：O(n)O(n)，空间复杂度：O(1)O(1)
/* 
一个数和 0 做 XOR 运算等于本身： a⊕ 0 = a
一个数和其本身做 XOR 运算等于 0： a⊕ a = 0
XOR 运算满足交换律和结合律： a⊕ b⊕ a = (a⊕ a)⊕ b = 0⊕ b = b
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber3 = function (nums) {
    let ans = 0;
    for (const num of nums) {
        ans ^= num;
    }
    return ans;
};

//测试
console.log(singleNumber3([1,2,3,2,1])); //3