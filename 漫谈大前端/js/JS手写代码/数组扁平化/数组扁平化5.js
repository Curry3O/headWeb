//reduce
function flatten(arr) {
    return arr.reduce(function (prev, cur) {
        return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));