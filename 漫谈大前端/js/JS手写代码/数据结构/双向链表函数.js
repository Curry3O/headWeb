//封装双向链表
function DbLink() {
    function Node(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    this.head = null;
    this.tail = null;
    this.length = 0;
    //向列表尾部添加一个新项
    DbLink.prototype.append = function (data) {
        let newNode = new Node(data);
        if (this.length == 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
    }
    //链表转成字符串
    DbLink.prototype.toString = function () {
        return this.backwardString();
    }
    //返回从尾向前遍历的节点字符串
    DbLink.prototype.forwardString = function () {
        let cur = this.tail;
        let res = '';
        while (cur) {
            res += cur.data + ' ';
            cur = cur.prev;
        }
        return res;
    }
    //返回从头向后遍历的节点字符串
    DbLink.prototype.backwardString = function () {
        let cur = this.head;
        let res = '';
        while (cur) {
            res += cur.data + ' ';
            cur = cur.next;
        }
        return res;
    }
    //向列表特定位置插入一个新项
    DbLink.prototype.insert = function (p, data) {
        if (p < 0 || p > this.length) {
            return false;
        }
        let newNode = new Node(data);
        if (this.length == 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (p == 0) {
                this.head.prev = newNode;
                newNode.next = this.head;
                this.head = newNode;
            } else if (p == this.length) {
                newNode.prev = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            } else {
                let cur = this.head;
                for (let i = 0; i < p; i++) {
                    cur = cur.next
                }
                newNode.next = cur;
                newNode.prev = cur.prev;
                cur.prev.next = newNode;
                cur.prev = newNode;
            }
        }
        this.length += 1;
        return true;
    }
    //获取对应位置的元素
    DbLink.prototype.get = function(p){
        if (p < 0 || p >= this.length) {
            return null;
        }
        if (p < Math.floor(this.length / 2)) {
            let cur = this.head;
            for (let i = 0; i < p; i++) {
                cur = cur.next;
            }
            return cur.data;
        }else{
            let cur = this.tail;
            for (let i = this.length-1; i > p; i--) {
                cur = cur.prev;
            }
            return cur.data;
        }
    }
    //返回元素在列表中的索引(没有返回 - 1)
    DbLink.prototype.indexOf = function(data){
        let cur = this.head;
        let index = 0;
        while(cur){
            if (cur.data == data) {
                return index;
            }
            cur = cur.next;
            index += 1;
        }
        return -1;
    }
    //修改某个位置的元素
    DbLink.prototype.update = function (p, newData) {
        if (p < 0 || p >= this.length) {
            return false;
        }
        if (p < Math.floor(this.length / 2)) {
            let cur = this.head;
            for (let i = 0; i < p; i++) {
                cur = cur.next;
            }
            cur.data = newData;
        } else {
            let cur = this.tail;
            for (let i = this.length - 1; i > p; i--) {
                cur = cur.prev;
            }
            cur.data = newData;
        }
        return true;
    }
    //从列表特定位置移除一项
    DbLink.prototype.removeAt = function(p){
        if (p < 0 || p >= this.length) {
            return null;
        }
        let cur = this.head;
        if (this.length == 1) {
            this.head = null;
            this.tail = null;
        }else{
            if (p == 0) {
                cur.next.prev = null;
                this.head = cur.next;
            }else if(p == this.length-1){
                cur = this.tail;
                cur.prev.next = null;
                this.tail = cur.prev;
            }else{
                for(let i=0;i<p;i++){
                    cur = cur.next;
                }
                cur.prev.next = cur.next;
                cur.next.prev = cur.prev;
            }
        }
        this.length -= 1;
        return cur.data;
    }
    //从列表中移除一项
    DbLink.prototype.remove = function(data){
        let index = this.indexOf(data);
        return this.removeAt(index);
    }
    //链表中是否包含任何元素(true/false)
    DbLink.prototype.isEmpty = function () {
        return this.length == 0;
    }
    //链表包含元素的个数
    DbLink.prototype.size = function () {
        return this.length;
    }
    //获取链表第一个元素
    DbLink.prototype.getHead = function () {
        return this.head.data;
    }
    //获取链表最后一个元素
    DbLink.prototype.getTail = function () {
        return this.tail.data;
    }
}

//测试
let dlink = new DbLink();
dlink.append('111');
dlink.append('333');
dlink.append('444');
dlink.append('555');
dlink.insert(0, '000');
dlink.insert(2, '222');
dlink.insert(6, '666');
console.log(dlink.get(4));