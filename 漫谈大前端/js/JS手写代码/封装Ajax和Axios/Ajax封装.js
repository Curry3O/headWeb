// 创建 构造函数
function Ajax(obj) {
    this.url = obj.url || '';
    this.type = obj.type || 'get';
    this.data = obj.data || {};
    this.success = obj.success || null;
    this.error = obj.error || null;
}
// 再原型上创建方法
Ajax.prototype.send = function () {
    var self = this;
    var toStr = Object.prototype.toString;
    if (self.data === null && typeof self.data !== 'object' && Array.isArray(obj)) return;
    return (function () {
        // 实例化 XML对象
        var xhr = new XMLHttpRequest();
        var data = '';
        // 序列化参数
        for (var k in self.data) {
            data += k + '=' + self.data[k] + '&';
        }
        data = data.substr(0, data.length - 1);
        // 接收回调函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    isFunction(self.success) && self.success(xhr.responseText)
                } else {
                    isFunction(self.error) && self.error(xhr)
                }
            }
        }
        // 初始化请求
        if (self.type.toLocaleLowerCase() === 'post') {
            xhr.open('post', self.url, true)
            // 设置请求头
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //发送请求
            xhr.send(data)
        } else {
            xhr.open('get', self.url + "?" + data, true)
            xhr.send(null)
        }
    }());
};

function isFunction(obj) {
    return toStr.call(obj) === "[object Function]"
}

var ajax = new Ajax({
    type: 'post',
    url: "/login",
    data: {
        loginname: "admin",
        password: "admin"
    },
    success: function (e) {
        console.log(e)
    },
    error: function (err) {
        console.log(err)
    },
}).send();