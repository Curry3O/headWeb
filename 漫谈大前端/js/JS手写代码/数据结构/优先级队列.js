//优先级队列
function Proqueue() {
    //重新创建一个类(内部类,两个参数分别是:数据和权重)
    function Elequeue(e, w) {
        this.e = e;
        this.w = w;
    }
    //封装属性
    this.item = [];
    //队列末尾添加元素(数字越小优先级越高)
    Proqueue.prototype.enqueue = function (e, w) {
        let elequeue = new Elequeue(e, w);
        //判断队列是否为空
        if (this.item.length == 0) {
            this.item.push(elequeue);
        } else {
            //将需要插入的元素放在权重刚好比它大的前面
            let flag = false;
            for (let i = 0; i < this.item.length; i++) {
                if (elequeue.w < this.item[i].w) {
                    this.item.splice(i, 0, elequeue);
                    flag = true;
                    break;
                }
            }
            //如果需要插入元素的权重最大,直接将它插入到队列末尾
            if (!flag) {
                this.item.push(elequeue);
            }
        }
    }
    //队列头部删除元素并返回删除元素
    Proqueue.prototype.dequeue = function () {
        return this.item.shift();
    }
    //返回队列第一个元素
    Proqueue.prototype.front = function () {
        return this.item[0];
    }
    //判断队列是否为空
    Proqueue.prototype.isEmpty = function () {
        return this.item.length == 0;
    }
    //返回队列长度
    Proqueue.prototype.size = function () {
        return this.item.length;
    }
    //将队列内元素以字符串形式输出
    Proqueue.prototype.toString = function () {
        var res = '';
        for (let i = 0; i < this.item.length; i++) {
            res += this.item[i].e + '-' + this.item[i].w + ' ';
        }
        return res;
    }
}

//测试
let pq = new Proqueue();
pq.enqueue('b', 2);
pq.enqueue('d', 4);
pq.enqueue('c', 3);
pq.enqueue('a', 1);
console.log(pq);