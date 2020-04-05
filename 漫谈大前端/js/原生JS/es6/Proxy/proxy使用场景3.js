//访问日志

//对于那些调用频繁、运行缓慢或占用执行环境资源较多的属性或接口，开发者会希望记录它们的使用情况或性能表现，这个时候就可以使用 Proxy 充当中间件的角色，轻而易举实现日志功能：
let api = {
    _apiKey: '123abc456def',
    getUsers: function () { /* ... */ },
    getUser: function (userId) { /* ... */ },
    setUser: function (userId, config) { /* ... */ }
};

function logMethodAsync(timestamp, method) {
    setTimeout(function () {
        console.log(`${timestamp} - Logging ${method} request asynchronously.`);
    }, 0);
}
api = new Proxy(api, {
    get: function (target, key, proxy) {
        var value = target[key];
        return function (...arguments) {
            logMethodAsync(new Date(), key);
            return Reflect.apply(value, target, arguments);
        };
    }
});

api.getUsers();
//Wed Mar 25 2020 22:14:08 GMT+0800 (GMT+08:00) - Logging getUsers request asynchronously.