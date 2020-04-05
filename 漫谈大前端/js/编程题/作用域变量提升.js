//优先级
//变量->普通函数->参数->提升

//例子1:
fn(5);
function fn(bar) {
    var bar = 1;
    function bar() {
        console.log('函数1');
    }
    console.log(bar);
    function bar() {
        console.log('函数2');
    }
}
//输出：1



//例子2：
var foo = function () {
    console.log(111);
}
function foo(){
    console.log(222);
}
foo(); 
//输出：111



//例子3(可以在html文件中正常运行)：
function Foo() {
    getName = function(){
        console.log('a');
    }
    return this; //代表window
}
Foo.getName = function(){
    console.log('b');
}
Foo.prototype.getName = function(){
    console.log('c');
}
var getName = function(){
    console.log('d');
}
function getName() {
    console.log('e');
}
Foo.getName(); //b
getName(); //d 函数声明提升
Foo().getName(); //a
getName(); //a
new Foo().getName(); //c  原型上