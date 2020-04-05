//原型式继承

// 下面是核心代码
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}


var person = {
    name:'Tom',
    age:[1,2,3]
};
//原来写法
// var p1 = object(person);  

//ES5写法
var p1 = Object.create(person);
p1.name = 'Jery';
p1.age.push(4);
console.log(person.name);
console.log(p1.name);
var p2 = Object.create(person,{
    name:{value:'Helln'},
});
p2.age.push(5);
console.log(p2.name);
console.log(person.age);
delete p2.name;
console.log(p2.name);