//1.如果是基本数据类型，直接返回
//2.如果是 RegExp 或者 Date 类型，返回对应类型
//3.如果是复杂数据类型，递归。
//4.考虑循环引用的问题

//实现一个 deepClone 函数
function deepClone(obj, hash = new WeakMap()){
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj == null || typeof obj !== 'object'){
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    //如果obj是数组，那么 obj.constructor 是 [function:Array]
    //如果obj是对象，那么 obj.constructor 是 [function:Object]
    let t = new obj.constructor();
    hash.set(obj,t);
    for(let key in obj){
        //递归
        if (obj.hasOwnProperty(key)) {
            t[key] = deepClone(obj[key],hash);
        }
    }
    return t;
}

//测试深拷贝
let arr1 = [1,2,3,[4,5]];
let arr2 = deepClone(arr1);
arr1.push(6);
arr2[3].push(6);
console.log(arr1); //[ 1, 2, 3, [ 4, 5 ], 6 ]
console.log(arr2); //[ 1, 2, 3, [ 4, 5, 6 ] ]