//寄生组合式继承
function inheritPrototype(subType,superType){
    var prototype = Object.create(superType.prototype); //创建了父类原型的浅复制
    prototype.constructor = subType; //修正原型的构造函数
    subType.prototype = prototype; //将子类的原型替换为这个原型
}
function Animal(name){
    this.name = name;
    this.arr = [1,2,3];
}
Animal.prototype.sayName = function(){
    console.log(this.name);
}
function Cat(name,age){
    Animal.call(this,name);
    this.age = age;
}
inheritPrototype(Cat, Animal); 
// 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
Cat.prototype.sayAge = function(){
    console.log(this.age);
}
Cat.prototype.sayName = function(){
    console.log('---');
}
var cats = new Cat('Tom',3);
var animals = new Animal('Boss');
console.log(typeof animals.sayName); //function
console.log(typeof animals.sayAge); //undefined,Cat独有的方法
animals.sayName();
cats.sayName();
cats.sayAge();
console.log(cats.__proto__.prototype); //undefined