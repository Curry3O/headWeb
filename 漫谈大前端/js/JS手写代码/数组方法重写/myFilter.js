//myFilter    检测数值元素，并返回符合条件所有元素的数组
Array.prototype.myFilter = function (fn) {
    //fn作为判断元素的条件，所以返回值为boolean
    var newArray = [];
    var len = this.length;
    for (var i = 0; i < len; i++) {
        //判断是否满足函数条件
        if (fn(this[i], i)) {
            //过滤出满足条件的元素并深度克隆下来。
            if (typeof this[i] == 'object') {
                var obj = {};
                newArray.push(deepClone(obj, this[i]));
            } else {
                newArray.push(this[i]);
            }
        }
    }
    return newArray;
}

let arr = [1, 2, 3, 4];
let res = arr.myFilter((item) => {
    return item > 1;
});
console.log(res);