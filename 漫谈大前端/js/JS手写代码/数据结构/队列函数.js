//队列函数
function Queue() {
    //队列容器
    this.item = [];
    //队列末尾添加元素
    Queue.prototype.enqueue = function(e){
        this.item.push(e);
    }
    //队列头部删除元素并返回删除元素
    Queue.prototype.dequeue = function () {
        return this.item.shift();
    }
    //返回队列第一个元素
    Queue.prototype.front = function () {
        return this.item[0];
    }
    //判断队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.item.length == 0;
    }
    //返回队列长度
    Queue.prototype.size = function () {
        return this.item.length;
    }
    //将队列内元素以字符串形式输出
    Queue.prototype.toString = function () {
        var res = '';
        for(let i=0;i<this.item.length;i++){
            res += this.item[i] + '';
        }
        return res;
    }
}

//测试
var queue = new Queue();
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');
queue.enqueue('d');
queue.dequeue();
console.log(queue.front());

//队列实例
//击鼓传花游戏
function game(list,num){
    let queue = new Queue();
    for(let i=0;i<list.length;i++){
        queue.enqueue(list[i]);
    }
    while (queue.size() > 1) {
        for(let j=0;j<num-1;j++){
            queue.enqueue(queue.dequeue());
        }
        queue.dequeue();
    }
    let res = queue.front();
    // let resIndex = list.indexOf(res);
    return res;
}
let names = ['liky','jobs','walk','tom','step'];
console.log(game(names,3));