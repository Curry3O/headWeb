//[].concat.apply + some

//ES6
const flatten = (arr) => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat.apply([], arr);
        //等同于 arr = Array.prototype.concat.apply([], arr);
    }
    return arr;
}

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));

//apply和call还有bind都是用来改变this指向的 他们的第一个参数就是用来改变this的，之后的参数才是用来传参的，那么问题就来了，这里不用apply用call可以不？答案是不行！因为apply的特殊性，它是apply（this，[arr1,arrr2,arr3]）这样来传参的，它的第二个参数就是以一个数组形式进行传参，所以很明显很符合我们之前的题目设定，所以[[12,21],[1,2,3],[2,3,4]]=>[arr1,arrr2,arr3] ，arr1=>[12,21]; arr2=>[1,2,3]; arr3=>[2,3,4]; apply会分别依次把参数传过去，之后运用concat来把这些单独的数组相连接变成了一个数组。



//ES5
/**
 * 封装Array.some
 * @param {function} callback    - 回调函数
 * @param {any}      currentThis - 回调函数中this指向
 */
Array.prototype.some = function (callback, currentThis) {
    let context = this;
    let flag = false;
    currentThis = currentThis || this;
    for (var i = 0, len = context.length; i < len; i++) {
        const res = callback.call(currentThis, context[i], i, context);
        if (res) {
            flag = true;
        } else if (!flag) {
            flag = false;
        }
    }
    return flag;
}

function flatten2(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat.apply([], arr);
    }
    return arr;
}

const arr2 = [1, [2, [3, 4]]];
console.log(flatten2(arr2));
