// 父类：
function People(name, age) {
    this.name = name;
    this.age = age;
    this.arr = [1];
    this.say = function () {
        console.log("我的名字是：" + this.name + "，我今年" + this.age + "岁。");
    }
}

People.prototype.sayName = function () {
    console.log(this.name);
}


//构造函数继承(经典继承)：
function Child(name,age){
    People.call(this,name,age);
    // this.name = name;
    // this.age = age;
}

var child = new Child('Rainy',20);
child.say(); 
// child.sayName();  用不了构造函数外定义的方法
child.arr.push(2);
console.log(child.arr);
var child1 = new Child('Jack', 23);
child1.say();
console.log(child1.arr);