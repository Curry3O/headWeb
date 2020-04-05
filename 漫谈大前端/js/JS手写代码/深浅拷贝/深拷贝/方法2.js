// 深拷贝函数封装
function deepCopy(obj) {
    // 根据obj的类型判断是新建一个数组还是对象
    let newObj = Array.isArray(obj) ? [] : {};
    // 判断传入的obj存在，且类型为对象
    if (obj && typeof obj === 'object') {
        for (key in obj) {
            // 如果obj的子元素是对象，则进行递归操作
            if (obj[key] && typeof obj[key] === 'object') {
                newObj[key] = deepCopy(obj[key])
            } else {
                // // 如果obj的子元素不是对象，则直接赋值
                newObj[key] = obj[key]
            }
        }
    }
    return newObj // 返回新对象
}

// 对象的深拷贝
let obj1 = {
    a: '1',
    b: '2',
    c: {
        name: 'Demi'
    }
}
let obj2 = deepCopy(obj1); //将obj1的数据拷贝到obj2
obj1.a = '0';
obj2.c.name = 'dingFY';
console.log(obj1); // {a: "0", b: "2", c: {name: 'Demi'}}
console.log(obj2); // {a: "1", b: "2", c: {name: 'dingFY'}}