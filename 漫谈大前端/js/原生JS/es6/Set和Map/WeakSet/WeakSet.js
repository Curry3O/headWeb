//下面内容全会报错:
/* 
let weakset = new WeakSet();
(function () {
    let a = {};
    weakset.add(1); //TypeError: Invalid value used in weak set
    weakset.add(a);
})(); //here 'a' is garbage collected from weakset
console.log(weakset.size); //output "undefined"
console.log(...weakset); //Exception is thrown
weakset.clear(); //Exception, no such function
 */

const weakset=new WeakSet();
let foo={bar:1};
let boo = [5,6];
weakset.add(foo);
weakset.add(boo);
console.log(weakset.has(foo)); //true
console.log(weakset.has(boo)); //true
foo = null;
weakset.delete(boo);
console.log(weakset.has(foo)); //false
console.log(weakset.has(boo)); //false