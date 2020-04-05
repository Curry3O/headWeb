//封装字典 Map
function Dictionary(){
    this.item = {};
    //字典中添加键值对
    Dictionary.prototype.set = function(key,value){
        this.item[key] = value;
    }
    //判断字典中是否有某个key
    Dictionary.prototype.has = function (key) {
        return this.item.hasOwnProperty(key);
    }
    //从字典中移除元素
    Dictionary.prototype.remove = function (key) {
        if (!this.has(key)) {
            return false;
        }
        delete this.item[key];
        return true;
    }
    //根据key获取value
    Dictionary.prototype.get = function(key) {
        return this.has(key) ? this.item[key] : undefined;
    }
    //获取所有key
    Dictionary.prototype.keys = function() {
        return Object.keys(this.item);
    }
    //获取所有的value
    Dictionary.prototype.values = function() {
        return Object.values(this.item);
    }
    //获取字典key长度
    Dictionary.prototype.size = function() {
        return this.keys().length;
    }
    //清除字典
    Dictionary.prototype.clear = function() {
        this.item = {};
    }
}

//测试
let dic = new Dictionary();
dic.set('name','Tom');
dic.set('age',20);
console.log(dic.keys());