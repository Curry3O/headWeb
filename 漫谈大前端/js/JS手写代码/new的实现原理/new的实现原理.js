function _new(){
    //创建新对象
    let target = {};
    //第一个参数是构造函数
    let [constructor, ...args] = [...arguments];
    //执行[[原型]]连接，target 是 constructor 的实例
    target.__proto__ = constructor.prototype;
    //执行构造函数，将属性或方法添加到创建的空对象上
    let result = constructor.apply(target, args);    
    if (result && (typeof (result) == 'object' || typeof (result) == 'function')) {
        //如果构造函数执行的结构返回的是一个对象，那么返回这个对象
        return result;
    }
    //如果构造函数返回的不是一个对象，那么返回创建的新对象
    return target;
}

//测试：构造函数执行的结构返回的是一个对象
function Super(age){
    this.age = age;
    let obj = {a : 1};
    return obj;
}
let instance = _new(Super, '26');
console.log(instance); //{ a: 1 }
console.log(instance.age); //undefined


//测试：构造函数返回的不是一个对象
function People(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log("我的名字是：" + this.name + "，我今年" + this.age + "岁。");
    }
}
var p1 = _new(People, 'Jack', 20);
var p2 = new People('Tom', 16);
console.log(p1); //People { name: 'Jack', age: 20 }
console.log(p2); //People { name: 'Tom', age: 16 }
p1.say(); //我的名字是：Jack，我今年20岁。