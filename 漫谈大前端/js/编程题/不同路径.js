//题目：-->去img的编程题里找

//思路:所谓的不同路径, 其实就是求排列组合。比如 3 * 7 的网格中。机器人从起点到终点所需要的步骤可以抽象为一个数组。[bottom, bottom, right, right, right, right, right, right]，所有的路径，即是这个数组的所有排列组合。

//另外一种思路, 第一行所有网格的可能路径数均为1。 第一列所有网格的数可能的路径均为1。 通过推导可以得到如下的表格。 终点可能的路径为28。

//方法一
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
*/
function uniquePaths(m, n){
    let matrix = [];
    for(let i = 0; i < n; i++){
        let arr = new Array(m).fill(1);
        matrix.push(arr);
    }
    for(let i = 1; i < n; i++){
        for(let j = 1; j < m; j++){
            matrix[i][j] = matrix[i - 1][j] + matrix[i][j - 1];
        }
    }
    return matrix[n - 1][m - 1];
}

//测试
console.log(uniquePaths(3,3));



//方法二(可行, 但是会超出时间限制)
function uniquePaths2(m, n){
    let arr = [];
    let hashMap = new Map();
    for (let i = 0; i < m - 1; i++) {
        arr.push('m');
    }
    for (let i = 0; i < n - 1; i++) {
        arr.push('n');
    }
    if (arr.length <= 1){
        return 1;
    }
    function exchange(title, arr) {
        for (let i = 0; i < arr.length; i++) {
            let cloneArr = [...arr]
            let newFirst = [...title, ...cloneArr.splice(i, 1)]
            if (cloneArr && cloneArr.length) {
                exchange(newFirst, cloneArr)
            } else {
                let key = newFirst.join('')
                if (!hashMap.has(key)) {
                    hashMap.set(key, true)
                }
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        let cloneArr = [...arr];
        let first = cloneArr.splice(i, 1);
        exchange(first, cloneArr);
    }
    return hashMap.size;
}


//测试
console.log(uniquePaths2(7,3));