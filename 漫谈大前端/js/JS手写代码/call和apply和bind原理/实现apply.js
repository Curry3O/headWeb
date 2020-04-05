Function.prototype.myApply = function(thisArg,rest){
    let res;
    if (!thisArg) {
        //context为null或undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }
    //this的指向是当前函数 func (func.call)
    thisArg.func = this;
    if (!rest) {
        //第二个参数为 null / undefined
        res = thisArg.func();
    }else{
        res = thisArg.func(...rest);
    }
    //thisArg上没有func属性，因此需要移除
    delete thisArg.func;
    return res;
}

//测试
var array1 = [1, 2, 3, 5];
var array2 = ["xie", "li", "qun", "tsrot"];
Array.prototype.push.myApply(array1, array2);
console.log(array1); //[1, 2, 3, 5, "xie", "li", "qun", "tsrot"]