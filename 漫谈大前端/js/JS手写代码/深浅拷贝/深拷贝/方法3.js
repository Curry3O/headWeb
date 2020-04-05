//原理：我们在拷贝的时候判断一下属性值的类型，如果是基本数据类型直接返回，如果是对象，我们递归调用深拷贝函数就好了，如果是 RegExp 或者 Date 类型，返回对应类型
let deepCopy = function (obj) {
    // 只拷贝对象
    if (!obj || typeof (obj) != 'object') return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    // 根据obj的类型判断是新建一个数组还是对象
    let newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 如果obj的子属性是对象，则进行递归操作,否则直接赋值
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}


// 数组(对象)的深拷贝
let arr = [1,2,3,{value:4}];
let newArr = deepCopy(arr);
arr.push(4);
newArr[3].value = 2;
console.log(arr);
console.log(newArr);