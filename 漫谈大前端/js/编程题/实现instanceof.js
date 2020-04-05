//instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
function myInstanceof(left,right){  //left为instanceof左表达式，right为右表达式
    let proto = left.__proto__; //隐式原型
    let prototype = right.prototype; //原型
    while(true){
        if (proto === null){ //当到达left原型链顶端还未匹配，返回false
            return false;
        }
        if (proto === prototype){  //全等时,返回true 
            return true;
        }
        proto = proto.__proto__;
    }
}

//测试
//在继承关系中用来判断一个实例是否属于它的父类型
function Foo() {}
function Bar() {}
Bar.prototype = new Foo()
let obj = new Bar()
console.log(myInstanceof(obj, Bar));  //true
console.log(myInstanceof(obj, Foo));  //true
