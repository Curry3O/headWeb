//非严格模式
let a = {
    [Symbol.toPrimitive]: (function (hint) {
        let i = 1;
        //闭包特性：i不会被回收
        return function () {
            return i++;
        }
    })()
}
console.log(a == 1 && a == 2 && a == 3);


//严格模式(在浏览器中执行)
var value = 0;  //window.value
Object.defineProperty(window, 'a', {
    get: function () {
        return this.value += 1;
    }
});
console.log(a === 1 && a === 2 && a === 3) // true