//Object.assign()方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝。
let arr = {
    a: 'one',
    b: 'two',
    c: 'three'
};

let newArr = Object.assign({}, arr);
newArr.d = 'four';
console.log(arr);
console.log(newArr);