//数组、对象都可以for in,同时针对对象必须需要判断hasOwnProperty属性，以防克隆原型链上的属性
function deepCopy(obj) {
    if (!obj || typeof (obj) != 'object') return obj;
    let newObj = Array.prototype.splice === obj.splice ? [] : {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            newObj[i] = deepCopy(obj[i]);
        }
    }
    return newObj;
}

let obj = {
    name: 'Jack',
    age: '32',
    job: 'developer',
    add:{
        key:1
    }
};

let obj2 = deepCopy(obj);
obj.age = 39;
obj.name = 'Tom';
obj2.add.key = 2;
console.log(obj);
console.log(obj2);