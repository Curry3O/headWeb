// 浅拷贝函数封装
function shallowCopy(obj1, obj2) {
    for (var key in obj1) {
        obj2[key] = obj1[key];
    }
}

// 对象的浅拷贝
let obj1 = {
    a: '1',
    b: '2',
    c: {
        name: 'Tom'
    }
}
let obj2 = {};
shallowCopy(obj1, obj2);
obj1.a = '0';
obj2.c.name = 'Jack';
console.log(obj1); //{ a: '0', b: '2', c: { name: 'Jack' } }
console.log(obj2); //{ a: '1', b: '2', c: { name: 'Jack' } }