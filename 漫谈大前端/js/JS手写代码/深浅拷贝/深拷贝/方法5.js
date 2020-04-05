//基本类型和引用类型的拷贝
function deepCopy(obj) {
    if (obj && typeof obj == 'object') {
        var result = obj.constructor == Array ? [] : {};
        for (var i in obj) {
            result[i] = typeof obj[i] == 'object' ? deepCopy(obj[i]) : obj[i];
        }
    } else {
        var result = obj;
    }
    return result;
}

//测试基本类型拷贝
let cat = 'cat';
let dog = deepCopy(cat);
console.log(dog === cat);  //true
dog = 'dog';
console.log(dog === cat);  //false

//测试引用类型拷贝
let man = {
    a: 1,
    b: 2,
    c: [3, 4, 5],
    d: {
        e: 6
    }
};
let woman = deepCopy(man);
woman.a = '0';
woman.c.push(6);
woman.d.e = 7;
console.log(woman); //{ a: '0', b: 2, c: [ 3, 4, 5, 6 ], d: { e: 7 } }
console.log(man === woman);  //false
console.log(man); //{ a: 1, b: 2, c: [ 3, 4, 5 ], d: { e: 6 } }
