//题目: -->去img的编程题文件中找
//思路：本题的思路依然是使用对撞指针。我们在这里首先需要明确一个概念, 水的面积和高度和宽度有关。高度的取决于两条边框中最小的一边

/**
 * @param {number[]} arr
 * @return {number}
*/

function maxArea(arr) {
    if (arr.length == 1 || arr.length == 0) {
        return 0;
    }
    let len = arr.length;
    let start = 0;
    let end = len - 1;
    let maxArea = 0;
    while (start < end) {
        maxArea = Math.max(maxArea,(Math.min(arr[start],arr[end])*(end - start)));
        if (arr[start] <= arr[end]) {
            start += 1;
        }else{
            end -= 1;
        }
    }
    return maxArea;
}

//测试
console.log(maxArea([1,8,6,8,4,3,7,9,2]));