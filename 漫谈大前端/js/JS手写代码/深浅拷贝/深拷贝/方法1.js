//该方法只能深拷贝数组或者对象，但不能拷贝函数
let arr = {
    a: 'one',
    b: 'two',
    c: {
        name: 'Demi'
    }
};

let newArr = JSON.parse(JSON.stringify(arr));
newArr.c.name = 'dingFY';
console.log(arr); // {a: "one", b: "two", c: {name: 'Demi'}}
console.log(newArr); // {a: "one", b: "two", c: {name: 'dingFY'}}


// 测试函数能否复制
let arrs = {
    a: 'one',
    b: () => {
        console.log('test')
    }
};

let newArrs = JSON.parse(JSON.stringify(arrs));
console.log(arrs); // {a: "one", b: ()=>{console.log('test')}}
console.log(newArrs); // {a: "one"} // 函数没有复制成功

/* 
JSON.parse(JSON.stringify(obj))的缺陷：
1.对象的属性值是函数时，无法拷贝。
2.原型链上的属性无法拷贝
3.不能正确的处理 Date 类型的数据
4.不能处理 RegExp
5.会忽略 symbol
6.会忽略 undefined
 */