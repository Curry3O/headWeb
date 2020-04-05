function Set(arr = []) {
    let items = {};
    this.size = 0;
    // has方法
    this.has = function (val) {
        // 对象都有hasOwnProperty方法，判断是否拥有特定属性
        return items.hasOwnProperty(val);
    };
    // add方法
    this.add = function (val) {
        // 如果没有存在items里面就可以直接写入
        if (!this.has(val)) {
            items[val] = val;
            // 累加集合成员数量
            this.size++;
            return true;
        }
        return false;
    };
    // 遍历传入的数组
    arr.forEach((val, i) => {
        // 将数组里每一项值添加到集合中
        this.add(val);
    });
    // delete方法
    this.delete = function (val) {
        if (this.has(val)) {
            delete items[val]; 
            // 将items对象上的属性删掉
            this.size--;
            return true;
        }
        return false;
    };
    // clear方法
    this.clear = function () {
        // 直接将集合赋一个空对象即可
        items = {};
        this.size = 0;
    };
    // keys方法
    this.keys = function () {
        // 返回遍历集合的所有键名的数组
        return Object.keys(items);
    };
    // values方法
    this.values = function () {
        // 返回遍历集合的所有键值的数组
        return Object.values(items);
    }
    // forEach方法
    //ES6中Set结构的实例上带的forEach方法，其实和数组的forEach方法很相似，只不过Set结构的键名就是键值，所以第一个参数与第二个参数的值永远都是一样的
    this.forEach = function (fn, context = this) {
        for (let i = 0; i < this.size; i++) {
            let item = Object.keys(items)[i];
            fn.call(context, item, item, items);
        }
    }

    // 并集
    this.union = function (other) {
        let union = new Set();
        let values = this.values();

        for (let i = 0; i < values.length; i++) {
            union.add(values[i]);
        }
        values = other.values(); // 将values重新赋值为新的集合
        for (let i = 0; i < values.length; i++) {
            union.add(values[i]);
        }

        return union;
    };
    // 交集
    this.intersect = function (other) {
        let intersect = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (other.has(values[i])) {
                intersect.add(values[i]);
            }
        }
        return intersect;
    };
    // 差集
    this.difference = function (other) {
        let difference = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!other.has(values[i])) {
                difference.add(values[i]);
            }
        }
        return difference;
    };
    // 子集
    this.subset = function (other) {
        if (this.size > other.size) {
            return false;
        } else {
            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                console.log(values[i])
                console.log(other.values())
                if (!other.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    };
}
//导出Set方法:
// module.exports = Set;

//在别的文件下导入Set方法
// const Set = require('./Set.js');


//测试
let set = new Set([2, 1, 3]);
console.log(set.keys()); // [ '1', '2', '3' ]
console.log(set.values()); // [ 1, 2, 3 ]
console.log(set.size); // 3
set.delete(1);
console.log(set.values()); // [ 2, 3 ]
set.clear();
console.log(set.size); // 0

// 并集
let a = [1, 2, 3];
let b = new Set([4, 3, 2]);
let union = new Set(a).union(b).values();
console.log(union); // [ 1, 2, 3, 4 ]

// 交集
let c = new Set([4, 3, 2]);
let intersect = new Set([1, 2, 3]).intersect(c).values();
console.log(intersect); // [ 2, 3 ]

// 差集
let d = new Set([4, 3, 2]);
let difference = new Set([1, 2, 3]).difference(d).values();
// [1,2,3]和[4,3,2]的差集是1
console.log(difference); // [ 1 ]
