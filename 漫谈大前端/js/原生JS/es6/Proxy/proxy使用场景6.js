//中断代理

//Proxy 支持随时取消对 target 的代理，这一操作常用于完全封闭对数据或接口的访问。在下面的示例中，我们使用了 Proxy.revocable 方法创建了可撤销代理的代理对象,返回一个包含了代理对象本身和它的撤销方法的可撤销 Proxy 对象。

let target = {foo:123};
let handler = {};
let {proxy,revoke} = Proxy.revocable(target, handler);
proxy.foo = 456;
console.log(proxy.foo); // 456

//Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例， revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。
revoke(); //撤销 Proxy 实例
console.log(proxy.foo); // TypeError: Revoked