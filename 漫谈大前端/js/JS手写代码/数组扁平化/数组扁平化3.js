// toString()

//ES6
const flatten = (arr) => arr.toString().split(',').map((item) => +item);

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));


//ES5
function flatten2(arr) {
    return arr.toString().split(',').map(function (item) {
        return +item;
    });
}

const arr2 = [1, [2, [3, 4]]];
console.log(flatten2(arr2));