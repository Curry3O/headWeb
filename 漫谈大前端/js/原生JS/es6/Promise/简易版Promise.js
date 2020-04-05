//最简实现Promise，支持异步链式调用
function Promise(excutor) {
    var self = this
    self.onResolvedCallback = [] // Promise resolve时的回调函数集
    // 传递给Promise处理函数的resolve
    // 这里直接往实例上挂个data  
    // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
    function resolve(value) {
        // 注意promise的then函数需要异步执行 
        setTimeout(() => {
            self.data = value
            self.onResolvedCallback.forEach(callback => callback(value))
        })
    }
    // 执行用户传入的函数
    excutor(resolve.bind(self))
}
Promise.prototype.then = function (onResolved) {
    // 保存上下文，哪个promise调用的then，就指向哪个promise。
    var self = this

    // 一定要返回一个新的promise
    // promise2
    return new Promise(resolve => {
        self.onResolvedCallback.push(function () {
            // onResolved就对应then传入的函数
            var result = onResolved(self.data)
            // 例子中的情况 返回了一个promise3
            if (result instanceof Promise) {
                // 那么直接把promise2的resolve决定权交给了user promise
                result.then(resolve)
            } else {
                resolve(result)
            }
        })
    })
}