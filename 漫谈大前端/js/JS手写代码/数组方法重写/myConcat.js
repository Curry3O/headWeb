//myConcat    连接两个或更多的数组，并返回结果
Array.prototype.myConcat = function () {
    var arr2 = [];
    for (var i = 0; i < this.length; i++) {
        arr2[i] = this[i];
    }
    for (var i = 0; i < arguments.length; i++) {
        if (Array.isArray(arguments[i])) {
            for (var j = 0; j < arguments[i].length; j++) {
                arr2.push(arguments[i][j]);
            }
        } else {
            arr2.push(arguments[i]);
        }
    }

    return arr2;

}

let arr = [1, 2, 3, 4];
let res = arr.myConcat([5,6,7]);
console.log(res);