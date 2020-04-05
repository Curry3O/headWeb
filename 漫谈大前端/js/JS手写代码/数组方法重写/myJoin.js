//myJoin    把数组的所有元素放入一个字符串
Array.prototype.myJoin = function (separator) {
    if (this.length == 0) {
        return "";
    }
    if (separator == undefined) {
        separator = ",";
    }
    var str = "" + this[0];
    for (var i = 1; i < this.length; i++) {
        str = str + separator + this[i];
    }
    return str;
}

let arr = [1, 2, 3, 4];
let res = arr.myJoin();
console.log(res);