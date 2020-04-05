let arr = [1, 2, 3]
let newArr = [];
for (let i in arr) {
    newArr[i] = arr[i];
}

newArr.push(4);
console.log(arr);
console.log(newArr);