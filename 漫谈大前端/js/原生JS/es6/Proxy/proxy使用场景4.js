//预警和拦截
//假设你不想让其他开发者删除 noDelete 属性，还想让调用 oldMethod 的开发者了解到这个方法已经被废弃了，或者告诉开发者不要修改 doNotChange 属性，那么就可以使用 Proxy 来实现

let dataStore = {
    noDelete: 1235,
    oldMethod: function () { /*...*/ },
    doNotChange: "tried and true"
};
const NODELETE = ['noDelete'];
const NOCHANGE = ['doNotChange'];
const DEPRECATED = ['oldMethod'];
dataStore = new Proxy(dataStore, {
    set(target, key, value, proxy) {
        if (NOCHANGE.includes(key)) {
            throw Error(`Error! ${key} is immutable.`);
        }
        return Reflect.set(target, key, value, proxy);
    },
    deleteProperty(target, key) {
        if (NODELETE.includes(key)) {
            throw Error(`Error! ${key} cannot be deleted.`);
        }
        return Reflect.deleteProperty(target, key);
    },
    get(target, key, proxy) {
        if (DEPRECATED.includes(key)) {
            console.warn(`Warning! ${key} is deprecated.`);
        }
        var val = target[key];
        return typeof val === 'function' ? function (...args) {
            Reflect.apply(target[key], target, args);
        } : val;
    }
}); 
// these will throw errors or log warnings, respectively 
dataStore.doNotChange = "foo"; 
delete dataStore.noDelete; 
dataStore.oldMethod();