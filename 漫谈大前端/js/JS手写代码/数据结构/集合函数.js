//封装集合类(集合是由一组无序、不重复的元素组成)Set
function Set(){
    //使用一个对象来保存集合元素
    this.item = {};
    //添加一个元素
    Set.prototype.add = function(value){
        //判断被添加的元素是否在集合中存在
        if (this.has(value)) {
            return false;           
        }
        this.item[value] = value;
        return true;
    }
    //判断集合是否存在改元素
    Set.prototype.has = function(value){
        return this.item.hasOwnProperty(value);
    }
    //删除元素
    Set.prototype.remove = function (value) {
        if (!this.has(value)) {
            return false;
        }
        delete this.item[value];
        return true;
    }
    //清空集合
    Set.prototype.clear = function(){
        this.item = {};
    }
    //返回集合长度
    Set.prototype.size = function(){
        return Object.keys(this.item).length;
    }
    //返回集合中所有的值
    Set.prototype.values = function(){
        return Object.values(this.item);
    }
    //并集操作
    Set.prototype.union = function (O) {
        let unionSet = new Set();
        let values = this.values();
        for(let i=0;i<values.length;i++){
            unionSet.add(values[i]);
        }
        values = O.values();
        for(let j=0;j<values.length;j++){
            if (!this.has(values[j])) {
                unionSet.add(values[j]);
            }
        }
        return unionSet;
    }
    //交集操作
    Set.prototype.intersection = function(O){
        let interSet = new Set();
        let values = this.values();
        for(let i=0;i<values.length;i++){
            if (O.has(values[i])) {
                interSet.add(values[i]);
            }
        }
        return interSet;
    }
    //差集操作
    Set.prototype.difference = function (O) {
        let diffSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!O.has(values[i])) {
                diffSet.add(values[i]);
            }
        }
        return diffSet;
    }
    //子集操作
    Set.prototype.subset = function (O) {
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!O.has(values[i])) {
                return false;
            }
        }
        return true;
    }
}

//测试
let set1 = new Set();
set1.add('a');
set1.add('b');
set1.add('c');
let set2 = new Set();
set2.add('1');
set2.add('2');
set2.add('3');
let unionSet = set1.union(set2);
console.log(unionSet.values());