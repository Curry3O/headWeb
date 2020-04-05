//Array.concat()
let arr = ['one', 'two', 'three'];
let newArr = arr.concat();
newArr.push('four');

console.log(arr);
console.log(newArr);


//数组嵌套了对象或者数组的话
var arrs = [{old: 'old'},['old']];
var new_arr = arrs.concat();
console.log(new_arr); //[ { old: 'old' }, [ 'old' ] ]

arrs[0].old = 'new';
arrs[1][0] = 'new';
console.log(arrs); // [{old: 'new'}, ['new']]
console.log(new_arr); // [{old: 'new'}, ['new']]