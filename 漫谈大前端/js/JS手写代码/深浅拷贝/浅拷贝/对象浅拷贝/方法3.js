//原理：遍历对象，然后把属性和属性值都放在一个新的对象
let shallowCopy = function (obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    let newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

let obj1 = {
    a: '1',
    b: '2',
    c: {
        name: 'Tom'
    }
}
let obj2 = shallowCopy(obj1);
obj1.a = '0';
obj2.c.name = 'Jack';
console.log(obj1); //{ a: '0', b: '2', c: { name: 'Jack' } }
console.log(obj2); //{ a: '1', b: '2', c: { name: 'Jack' } }