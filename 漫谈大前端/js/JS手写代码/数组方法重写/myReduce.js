//myReduce    将数组元素计算为一个值（从左到右）
Array.prototype.myReduce = function (callback, initialValue) {
    var num = 0;
    if (initialValue != undefined) {
        total = initialValue;
    } else {
        total = this[0];
        num = 1;
    }
    for (i = num; i < this.length; i++) {
        var item = this[i];
        total = callback(total, item, i, this);
    }
    return total;
}

let arr = [1, 2, 3, 4];
let res = arr.myReduce((pre,item)=>{
    return pre + item
},0);
console.log(res);