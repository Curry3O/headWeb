//普通递归

//ES6
const flatten = (arr) => {
    let result = [];
    arr.forEach((item, i, arr) => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result.push(arr[i])
        }
    })
    return result;
};

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));


//ES5
/* ES5 */
function flatten2(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten2(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result;
}

const arr2 = [1, [2, [3, 4]]];
console.log(flatten2(arr2));

