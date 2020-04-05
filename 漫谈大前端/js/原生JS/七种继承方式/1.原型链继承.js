// 创建子类Child，使用原型和构造函数的方式继承父类People的方法，并调用say函数说出姓名和年龄。

// 父类：
function People(name, age) {
    this.name = name;
    this.age = age;
    this.arr = [1];
    this.say = function () {
        console.log("我的名字是：" + this.name + "，我今年" + this.age + "岁。");
    }
}
People.prototype.sayHi = function(){
    console.log('Hi');
}

//原型链继承：
function Child(name,age){
    this.name = name;
    this.age = age;
}

Child.prototype = new People();
var child = new Child('Rainy',20);
child.say();
child.arr.push(2);
console.log(child.arr);
var child1 = new Child('Jack',23);
child1.say();
console.log(child1.arr);
child1.sayHi(); //Hi

//instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
//instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型
console.log(child instanceof Child);  //true
console.log(child instanceof People); //true
