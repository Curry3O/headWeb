//myForEach    数组每个元素都执行一次回调函数
Array.prototype.myForEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        callback(element, i, this);
    }
}

let arr = [1, 2, 3, 4];
arr.myForEach((item)=>{
    console.log(item);
})