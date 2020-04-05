Function.prototype.myCall = function(){
    let [thisArg,...args] = [...arguments];
    if (!thisArg) {
        //context为null或undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }
    //this的指向是当前函数 func (func.call)
    thisArg.func = this;
    //执行函数
    let res = thisArg.func(...args);
    //thisArg上没有func属性，因此需要移除
    delete thisArg.func;
    return res;
}

//测试
function class1(args1, args2) {
    this.name = function () {
        console.log(args1, args2);
    }
}

function class2() {
    var args1 = "1";
    var args2 = "2";
    class1.myCall(this, args1, args2);
}

var c = new class2();
c.name(); // 1 2