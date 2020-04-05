//正则表达式
let arr = [1, [2, [3, [4, 5]]], 6];
//JSON.stringify()的作用是将 JavaScript 对象转换为 JSON 字符串
let str = JSON.stringify(arr);
str = str.replace(/(\[|\])/g, '');
str = '[' + str + ']';
//JSON.parse()可以将JSON字符串转为一个对象
arr = JSON.parse(str);
console.log(arr);