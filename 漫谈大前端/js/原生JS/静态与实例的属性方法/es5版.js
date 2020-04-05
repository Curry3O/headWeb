const Person = function(name,age){
    // 实例属性，可以通过对象'.'属性访问的属性叫实例属性
    this.name = name;
    this.age = age;
}

// 静态属性，挂载在构造函数
Person.color = 'yellow';

// 实例方法，挂载在原型链，生成的对象可直接'.'方法的方式调用
Person.prototype.sayName = function() {
    console.log(this.name);
}

// 静态方法
Person.sayHi = function() {
    console.log('Hi');
}

const p = new Person('Curry',32);

// 实例属性获取方式
console.log(p.name);
console.log(p.age);

// 实例方法调用方式
p.sayName();

// 静态属性调用方式
console.log(Person.color);

// 静态方法调用方式
Person.sayHi();