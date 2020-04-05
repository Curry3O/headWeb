//寄生式继承
function createPerson(o) {
    var clone = Object.create(o);
    clone.sayHi = function () {
        console.log('Hi');
    }
    return clone;
}
var person = {
    name: 'Tom',
    age: [1, 2, 3]
};
var p1 = createPerson(person);
p1.sayHi();
p1.name = 'Jack';
console.log(p1.name);
console.log(person.name);
p1.age.push(4);
console.log(person.age);
