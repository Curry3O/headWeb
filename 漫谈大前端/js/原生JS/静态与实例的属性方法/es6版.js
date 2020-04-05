class Animal {
    // 类构造器 默认为空
    // 构造器的作用：每当new一个类，会优先执行构造器中代码
    constructor(name,age){
        // 实例属性
        this.name = name;
        this.age = age;
    }

    // 静态属性写法一:
    // static sex = 'man';

    // 挂载原型对象上的实例方法
    sayName(){
        console.log(this.name);
    }

    //静态方法(不会被实例继承)
    static sayHi(){
        console.log('Hi');
    }
}

//静态属性写法二:
Animal.sex = 'man';

const a = new Animal('Tom',28);

// 实例属性调用
console.log(a.name);
console.log(a.age);

// 实例方法调用
a.sayName();

// 静态属性调用
console.log(Animal.sex);

// 静态方法调用
Animal.sayHi();