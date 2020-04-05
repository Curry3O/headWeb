//私有属性
//在 JavaScript 或其他语言中，大家会约定俗成地在变量名之前添加下划线 _ 来表明这是一个私有属性（并不是真正的私有），但我们无法保证真的没人会去访问或修改它。在下面的代码中，我们声明了一个私有的 apiKey，便于 api 这个对象内部的方法调用，但不希望从外部也能够访问 api._apiKey:

//很显然，约定俗成是没有束缚力的。
var apis = {
    _apiKey: '123abc456def',
    /* mock methods that use this._apiKey */ 
    getUsers: function () {},
    getUser: function (userId) {},
    setUser: function (userId, config) {}
}; 
// logs '123abc456def'; 
console.log("An apiKey we want to keep private", apis._apiKey);
//An apiKey we want to keep private 123abc456def

// get and mutate _apiKeys as desired 
var apiKey = apis._apiKey;
apis._apiKey = '987654321';


//第一种方法是使用 set / get 拦截读写请求并返回 undefined
let api = {
    _apiKey: '123abc456def',
    getUsers: function () {},
    getUser: function (userId) {},
    setUser: function (userId, config) {}
};
const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {
    get(target, key, proxy) {
        if (RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if (RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} is restricted. Please see api documentation for further info.`);
        }
        return Reflect.get(target, key, value, proxy);
    }
}); 
// 以下操作都会抛出错误 
//console.log(api._apiKey); 
//api._apiKey = '987654321'; 



//第二种方法是使用 has 拦截 in 操作：
var api2 = {
    _apiKey: '123abc456def',
    getUsers: function () {},
    getUser: function (userId) {},
    setUser: function (userId, config) {}
};
const RESTRICTED2 = ['_apiKey'];
api2 = new Proxy(api2, {
    has(target, key) {
        return (RESTRICTED2.indexOf(key) > -1) ? false : Reflect.has(target, key);
    }
}); 

// these log false, and `for in` iterators will ignore _apiKey 
console.log("_apiKey" in api2); //false

for (var key in api2) {
    if (api2.hasOwnProperty(key) && key === "_apiKey") {
        console.log("This will never be logged because the proxy obscures _apiKey...");
    } 
}
//This will never be logged because the proxy obscures _apiKey...
