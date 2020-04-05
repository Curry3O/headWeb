//ES6 中的解构运算符 ...
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));