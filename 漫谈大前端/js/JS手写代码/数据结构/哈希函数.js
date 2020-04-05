//处理冲突：链地址法和开发地址法
//链地址法的链条可以是数组或链表
//开发地址法探索位置三种方法:线性探测、二次探测、再哈希法

//设计哈希函数
function hashFunc(str,size){
    let hashCode = 0;
    for(let i=0;i<str.length;i++){
        hashCode = hashCode * 37 + str.charCodeAt(i);
    }
    let index = hashCode % size;
    return index;
}
console.log(hashFunc('nba',7));

//封装哈希表类
function hashTable(){
    this.store = [];
    this.count = 0;
    this.limit = 7;
    hashTable.prototype.hashFunc = function(str, size) {
        let hashCode = 0;
        for (let i = 0; i < str.length; i++) {
            hashCode = hashCode * 37 + str.charCodeAt(i);
        }
        let index = hashCode % size;
        return index;
    }
    //插入&修改操作
    hashTable.prototype.put = function(key,value){
        let index = this.hashFunc(key,this.limit);
        let bucket = this.store[index];
        if (bucket == null) {
            bucket = [];
            this.store[index] = bucket;
        }
        for(let i=0;i<bucket.length;i++){
            let temp = bucket[i];
            if (temp[0] == key) {
               temp[1] = value;
               return 
            }
        }
        bucket.push([key,value]);
        this.count += 1;
        //判断是否需要进行扩容操作
        if (this.count > this.limit * 0.75) {
            let newPrime = this.getPrime(this.limit * 2);
            this.resize(newPrime);
        }
    }
    //获取操作
    hashTable.prototype.get = function(key){
        let index = this.hashFunc(key,this.limit);
        let bucket = this.store[index];
        if (bucket == null) {
            return null;
        }
        for(let i=0;i<bucket.length;i++){
            let temp = bucket[i];
            if (temp[0] == key) {
                return temp[1]
            }
        }
        return null;
    }
    //删除操作
    hashTable.prototype.remove = function(key){
        let index = this.hashFunc(key,this.limit);
        let bucket = this.store[index];
        if (bucket == null) {
            return null;
        }
        for(let i=0;i<bucket.length;i++){
            let temp = bucket[i];
            if (temp[0] == key) {
                bucket.splice(i,1);
                this.count -= 1;
                return temp[1];
            }
        }
        //缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
            let newPrime = this.getPrime(Math.floor(this.limit / 2));
            this.resize(newPrime);
        }
        return null;
    }
    //判断哈希表是否为空
    hashTable.prototype.isEmpty = function(){
        return this.count == 0;
    }
    //获取哈希表元素的个数
    hashTable.prototype.size = function(){
        return this.count;
    }
    //哈希表扩容&缩容
    hashTable.prototype.resize = function(newL){
        let oldStore = this.store;
        this.store = [];
        this.count = 0;
        this.limit = newL;
        for(let i=0;i<oldStore.length;i++){
            let bucket = oldStore[i];
            if (bucket == null) {
                continue;
            }
            for(let j=0;j<bucket.length;j++){
                let tuple = bucket[j];
                this.put(tuple[0],tuple[1]);
            }
        }
    }
    //判断是否为质数
    hashTable.prototype.isPrime = function(num){
        let temp = parseInt(Math.sqrt(num));
        for(let i=2;i<=temp;i++){
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
    //获取质数
    hashTable.prototype.getPrime = function(num){
        while(!this.isPrime(num)){
            num += 1;
        }
        return num;
    }
}

//测试
let ht = new hashTable();
ht.put('abc', 123);
ht.put('def', 456);
ht.put('ghi', 789);
console.log(ht.get('def'));
ht.put('abc',111);
console.log(ht.get('abc'));
console.log(ht.remove('ghi'));
console.log(ht.isEmpty());
console.log(ht.size());