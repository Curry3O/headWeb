//Symbol是ES6 引入了一种新的原始数据类型
let s1 = Symbol('a');
let s2 = Symbol('b');
let s3 = Symbol('b');

console.log(typeof s1); //symbol
console.log(s1.toString()); //Symbol(a)
console.log(s2.toString()); //Symbol(b)
console.log(s1 === s3); //false
console.log(Boolean(s1)); //true
console.log(!s1); //false

let obj1 = {};
obj1[s1] = 'hi';

let obj2 ={
    [s1] : 'hello'
}

//Symbol 值作为对象属性名时，不能用点运算符，因为点运算符后面是一个字符串
console.log(obj1.s1); //undefined
console.log(obj1[s1]); //hi
console.log(obj2[s1]); //hello


//应用场景1：使用Symbol来作为对象属性名(key)

//在这之前，我们通常定义或访问对象的属性时都是使用字符串，比如下面的代码：
let obj = {
    abc: 123,
    "hello": "world"
}
console.log(obj["abc"]); //123
console.log(obj["hello"]); //world

//而现在，Symbol可同样用于对象属性的定义和访问：
const PROP_NAME = Symbol()
const PROP_AGE = Symbol()

obj = {
    [PROP_NAME]: "一斤代码"
}
obj[PROP_AGE] = 18

console.log(obj[PROP_NAME]); // 一斤代码
console.log(obj[PROP_AGE]); // 18


//Symbol 作为属性名，不会被常规方法遍历得到，即该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回，但是，它并不是私有属性，可以使用 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名；

var object = {};
var a = Symbol('a');
var b = Symbol('b');

object[a] = 'Hello';
object[b] = 'World';
object.c = 'Mine';

console.log(Object.keys(object)); //[ 'c' ]

for (let key in object) {
    console.log(key) // c
}

//也正因为这样一个特性，当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外：
console.log(JSON.stringify(object)); //{"c":"Mine"}

//专门针对Symbol的API:

// 使用Object的API
var objectSymbols = Object.getOwnPropertySymbols(object);
console.log(objectSymbols) // [Symbol(a), Symbol(b)]

// 使用新增的反射API
var objectKeys = Reflect.ownKeys(object);
console.log(objectKeys); //[ 'c', Symbol(a), Symbol(b) ]


//应用场景2：使用Symbol来替代常量

//在这之前,我们需要为常量赋一个唯一的值（比如这里的'AUDIO'、'VIDEO'、 'IMAGE'），常量少的时候还算好，但是常量一多，你可能还得花点脑子好好为他们取个好点的名字。

/* 
const TYPE_AUDIO = 'AUDIO'
const TYPE_VIDEO = 'VIDEO'
const TYPE_IMAGE = 'IMAGE' 
*/

//现在有了Symbol，我们大可不必这么麻烦了,直接就保证了三个常量的值是唯一的了
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()


//应用场景3：使用Symbol定义类的私有属性/方法

//我们知道在JavaScript中，是没有如Java等面向对象语言的访问控制关键字private的，类上所有定义的属性或方法都是可公开访问的。因此这对我们进行API的设计时造成了一些困扰。而有了Symbol以及模块化机制， 类的私有属性和方法才变成可能。 例如：

//在文件 a.js中
/* 
const PASSWORD = Symbol()

class Login {
    constructor(username, password) {
        this.username = username
        this[PASSWORD] = password
    }

    checkPassword(pwd) {
        return this[PASSWORD] === pwd
    }
}

export default Login 
*/

//在文件 b.js 中
/* 
import Login from './a'

const login = new Login('admin', '123456')

login.checkPassword('123456') // true

login.PASSWORD // 拿不到
login[PASSWORD] // 拿不到
login["PASSWORD"] // 拿不到
*/

//由于Symbol常量PASSWORD被定义在a.js所在的模块中，外面的模块获取不到这个Symbol，也不可能再创建一个一模一样的Symbol出来（因为Symbol是唯一的），因此这个PASSWORD的Symbol只能被限制在a.js内部使用，所以使用它来定义的类属性是没有办法被模块外访问到的，达到了一个私有化的效果。


//Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值；它与Symbol()不同的是，Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值，而 Symbol()每次都会返回3不同的Symbol值；

console.log(Symbol.for("name") === Symbol.for("name")); // true

console.log(Symbol("name") === Symbol("name")); // false


//Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key，而Symbol()写法是没有登记机制的
var n1 = Symbol.for("name");
console.log(Symbol.keyFor(n1)); // name

var n2 = Symbol("name");
console.log(Symbol.keyFor(n2)); // undefined

//Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值


//应用场景4：注册和获取全局Symbol

//通常情况下，我们在一个浏览器窗口中（window），使用Symbol()函数来定义和Symbol实例就足够了。但是，如果你的应用涉及到多个window（最典型的就是页面中使用了<iframe>），并需要这些window中使用的某些Symbol是同一个，那就不能使用Symbol()函数了，因为用它在不同window中创建的Symbol实例总是唯一的，而我们需要的是在所有这些window环境下保持一个共享的Symbol。这种情况下，我们就需要使用另一个API来创建或获取Symbol，那就是Symbol.for()，它可以注册或获取一个window间全局的Symbol实例：

let gs1 = Symbol.for('global_symbol_1') //注册一个全局Symbol
let gs2 = Symbol.for('global_symbol_1') //获取全局Symbol

console.log(gs1 === gs2); //true

//这样一个Symbol不光在单个window中是唯一的，在多个相关window间也是唯一的了。