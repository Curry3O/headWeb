//ES6 Class extends

// 下面是核心代码
class AA{}
class BB extends AA {
    constructor(){
        super();
    }
}

class A {}
class B {}
Object.setPrototypeOf = function (obj,proto){
    obj.__proto__ = proto;
    return obj;
}
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype,A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B,A);


//e.g
class Student {
    constructor(name){
        this.name = name;
    }
    getName(){
        console.log(this.name);
    }
}

class HighStudent extends Student{
    constructor(name,grade) {
        super(name);
        this.grade = grade;
    }
    getName() {
        super.getName();
        console.log("Student Function");
    }
    getGrade() {
        console.log(this.grade);
    }
}
var s1 = new Student('Henry');
var h1 = new HighStudent('Lily','grade one');
console.log(s1);
s1.getName();

console.log(h1);
h1.getName();
h1.getGrade();

