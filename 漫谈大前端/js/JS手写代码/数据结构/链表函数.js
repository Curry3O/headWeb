//链表封装
function Link(){
    //创建内部类
    function Node(data){
        this.data = data;
        this.next = null;
    }
    //head指向链表第一个元素(默认为空)
    this.head = null;
    this.length = 0;
    //向列表尾部添加一个新项
    Link.prototype.append = function(data){
        let newNode = new Node(data);
        if (this.length == 0) {
            this.head = newNode;
        }else{
            let cur = this.head;
            while(cur.next){
                cur = cur.next;
            }
            cur.next = newNode;
        }
        this.length += 1;
    }
    //转成字符串
    Link.prototype.toString = function(){
        let cur = this.head;
        let res = '';
        while(cur){
            res += cur.data + '';
            cur = cur.next;
        }
        return res;
    }
    //向列表特定位置插入一个新项
    Link.prototype.insert = function(p,data){
        if(p < 0 || p > this.length){
            return false;
        }
        let newNode = new Node(data); 
        if (p == 0) {
            newNode.next = this.head;
            this.head = newNode;
        }else{
            let prev = null;
            let cur = this.head;
            for(let i=0;i<p;i++){
                prev = cur;
                cur = cur.next;
            }
            prev.next = newNode;
            newNode.next = cur;
        }
        this.length += 1;
        return true;
    }
    //获取对应位置的元素
    Link.prototype.get = function(p){
        if (p < 0 || p >= this.length) {
            return null;
        }
        let cur = this.head;
        for(let i=0;i<p;i++){
            cur = cur.next;
        }
        return cur.data;
    }
    //返回元素在列表中的索引(没有返回-1)
    Link.prototype.indexOf = function(data){
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
    Link.prototype.update = function(p,newData){
        if (p < 0 || p >= this.length) {
            return false;
        }
        let cur = this.head;
        for(let i=0;i<p;i++){
            cur = cur.next;
        }
        cur.data = newData;
        return true;
    }
    //从列表特定位置移除一项
    Link.prototype.removeAt = function(p){
        if (p < 0 || p >= this.length) {
            return null;
        }
        let cur = this.head;
        if (this.length == 1) {
            this.head = null;
        }else{
            if (p == 0) {
                this.head = this.head.next;
            } else {
                let prev = null;
                for (let i = 0; i < p; i++) {
                    prev = cur;
                    cur = cur.next;
                }
                prev.next = cur.next;
            }
        }
        this.length -= 1;
        return cur.data;
    }
    //从列表中移除一项
    Link.prototype.remove = function(data){
        let cur = this.head;
        let index = 0;
        let prev = null;
        while(cur){
            if (cur.data == data) {
                if (index == 0) {
                    this.head = this.head.next;
                }else{
                    prev.next = cur.next;
                }
                this.length -= 1;
                return cur.data;
            }
            prev = cur;
            cur = cur.next;
            index += 1;
        }
        return null;
    }
    //链表中是否包含任何元素(true/false)
    Link.prototype.isEmpty = function(){
        return this.length == 0;
    }
    //链表包含元素的个数
    Link.prototype.size = function () {
        return this.length;
    }
}

//测试
let link = new Link();
link.append('a');
link.append('b');
link.append('c');
link.append('d');
link.insert(0, '000');
link.insert(3, '333');
link.insert(5, '555');
console.log(link);
console.log(link.remove('000'));
console.log(link.isEmpty());
console.log(link.size());