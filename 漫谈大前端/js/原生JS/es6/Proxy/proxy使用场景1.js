//抽离校验模块
let numericDataStore = {
    count: 0,
    amount: 1234,
    total: 14
};

numericDataStore = new Proxy(numericDataStore, {
    set(target, key, value, proxy) {
        if (typeof value !== 'number') {
            throw Error("Properties in numericDataStore can only be numbers");
        }
        return Reflect.set(target, key, value, proxy);
    }
});

// numericDataStore.count = "foo"; 
// 抛出错误，因为 "foo" 不是数值

numericDataStore.count = 111;


//如果要直接为对象的所有属性开发一个校验器可能很快就会让代码结构变得臃肿，使用 Proxy 则可以将校验器从核心逻辑分离出来自成一体：

function createValidator(target, validator) {
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                let validator = this._validator[key];
                if (!!validator(value)) {
                    return Reflect.set(target, key, value, proxy);
                } else {
                    throw Error(`Cannot set ${key} to ${value}. Invalid.`);
                }
            } else {
                throw Error(`${key} is not a valid property`)
            }
        }
    });
}
const personValidators = {
    name(val) {
        return typeof val === 'string';
    },
    age(age) {
        return typeof age === 'number' && age > 18;
    }
}
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        return createValidator(this, personValidators);
    }
}
const bill = new Person('Bill', 25); 
// 以下操作都会报错 
bill.name = 0; 
bill.age = 'Bill'; 
bill.age = 15; 
