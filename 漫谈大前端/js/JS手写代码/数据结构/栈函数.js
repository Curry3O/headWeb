//栈函数
function Stack(){
    //栈函数容器
    this.item = [];
    //入栈并返回总长度
    Stack.prototype.push = function(e){
        this.item.push(e);
        return this.item.length;
    }
    //出栈并返回出栈的元素
    Stack.prototype.pop = function(){
        return this.item.pop();
    }
    //栈顶元素出栈并返回出栈的元素
    Stack.prototype.peek = function () {
        return this.item[this.item.length-1]
    }
    //判断栈内是否为空
    Stack.prototype.isEmpty = function () {
        return this.item.length == 0;
    }
    //返回栈的长度
    Stack.prototype.size = function () {
        return this.item.length;
    }
    //将栈内元素以字符串形式输出
    Stack.prototype.toString = function () {
        let res = '';
        for (let i = 0; i < this.item.length; i++){
            res += this.item[i] + '';
        }
        return res;
    }
}

//测试
let s = new Stack();
s.push(1);
s.push(2);
s.push(3);
s.push(4);
console.log(s.peek());


//栈函数实例
//十进制转二进制函数
function calc(num){
    let stack = new Stack();
    while(num>0){
        stack.push(num%2);
        num = Math.floor(num/2);
    }
    let str = '';
    while(!stack.isEmpty()){
        str += stack.pop(); 
    }
    return str;
}
console.log(calc(1000));