### a == 1 && a == 2 && a == 3 为true(非严格模式)

> 在JS中，宽松相等 == 会先将左右两两边的值转化成相同的原始类型，然后再去比较他们是否相等。在转化之后( == 一边或两边都需要转化)，最后的相等匹配会像 === 符号一样去执行判断。宽松相等是可逆的，对于任何值A与B，通常A == B与B == A具有相同的表现(除了转换的顺序不同)。可以在这里详细深度地了解宽松匹配 == 与严格匹配 ===

> 在进行两个值的比较时，执行了类型的强制转换， 让我们先了解下内置的转换函数。
    ToPrimitive(input, PreferredType?)

> 可选参数PreferredType可以指定最终转化的类型，它可以是Number类型或String类型，这依赖于ToPrimitive()方法执行的结果返回的是Number类型或String类型。值的转化过程如下
    1.如果输入Input是基本类型, 就返回这个值
    2.如果输入变量是Object类型, 那么调用input.valueOf(). 如果返回结果是基本类型，就返回这个指
    3.如果都不是的话就调用input.toString(). 如果结果是基本类型, 就返回它
    4.如果以上都不可以，就会抛出一个类型错误TypeError， 表示转化input变量到基本类型失败。

> 如果PreferredType是Number， 那转换算法就会像上述说明的顺序执行，如果是String，步骤2和步骤3会交换顺序。PreferredType是一个缺省值，如果不输入的话，Date类型会被当作String类型处理，其他变量会当作Number处理。默认的valueOf返回this，默认的toString()会返回类型信息。

> 如上是操作符+和==调用toPrimitive()的执行过程。

> valueOf返回的值是基本数据类型时才会按照此值进行计算，如果不是基本数据类型，则将使用toString()方法返回的值进行计算。


###### 实现宽松相等方法
>1.如果a是一个对象Object，那在执行 a == 的时候首先会去先执行valueOf方法，如果没有valueOf方法，就会去执行toString方法。
```js
const a = { value: 0 }
a.valueOf = function () {
    return  this.value += 1
}
console.log( a == 1 && a == 2 && a == 3 );

//所以在上面的代码中, 如JS引擎所解析的，a == 1， 1是基本类型, JS引擎会尝试将a转换成Number类型，然后在上面的算法中，a.valueOf被调用并且返回1(自增1并且返回自己)。在a==2和a==3发生了同样的类型转换并增加自己的值。
```

> 2.重写Object的toString
```js
const a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}
console.log( a == 1 && a == 2 && a == 3 );
```

> 3.如果a是一个数组Array，在数组转换成字符串的时候，数组toString会隐含调用join()方法
```js
const a = [1, 2, 3];
a.join = a.shift;
console.log( a == 1 && a == 2 && a ==3 );
```

> 4.Symbol
> 如果部署了 [Symbol.toPrimitive] 接口，那么调用此接口，若返回的不是基本数据类型，抛出错误。

> 如果没有部署 [Symbol.toPrimitive] 接口，那么根据要转换的类型，先调用 valueOf / toString
    - 非Date类型对象， hint 是 default 时，调用顺序为： valueOf >>> toString，即 valueOf 返回的不是基本数据类型，才会继续调用 valueOf，如果 toString 返回的还不是基本数据类型，那么抛出错误。
    - 如果 hint 是 string(Date对象的hint默认是string) ，调用顺序为： toString >>> valueOf，即 toString 返回的不是基本数据类型，才会继续调用 valueOf，如果 valueOf 返回的还不是基本数据类型，那么抛出错误。
    - 如果 hint 是 number，调用顺序为： valueOf >>> toString
    
```js
//Symbol对象被转为原始类型的值时，会调用 toPrimitive 方法，返回该对象对应的原始类型值。
let a = {
    [Symbol.toPrimitive]: ((i)) => () => ++i) (0)
};
console.log(a == 1 && a == 2 && a ==3);

//或者
let a = {
    [Symbol.toPrimitive]:(function(hint){
        let i = 1;
        //闭包特性：i不会被回收
        return function(){
            return i++;
        }
    })()
}
```

> 5.利用with关键字
```js
var i = 0;
with({
    get a() {
        return ++i;
    }
}) {
    a == 1 && a == 2 && a == 3; // true
}
```



### a === 1 && a === 2 && a === 3 为true(严格模式)
> 从经典问题的解答中，我们了解到JS中的原始类型将不再满足于上面的条件(严格相等没有转化的过程)，所以我们需要通过一些方式去调用一个函数，并在这个函数中做我们想做的事情。但是执行函数往往需要在函数名字后引入()。并且由于这里不是宽松相等==，valueOf将不会被JS引擎调用。还好有Property函数, 特别是getter描述符， 带来了解决这个问题的办法。

###### 什么是属性描述符(property descriptors)
> 属性描述符有两种类型, 数据描述符和存取描述符

> 1.数据描述符
    强制键值 
        - value

    可选键值
        - configurable
        - enumable
        - writeable

    例子：
        {
            value: 5,
            writable: true
        }

> 2.存取描述符
    强制键值 
        - get
        - set

    可选键值 
        - confiturable 
        - enumerable

    例子：
        {
            get: function () { return 5; },
            enumerable: true
        }



###### 实现严格相等方法
> 1.在浏览器环境中，利用数据劫持(Proxy/Object.definedProperty)
```js
var value = 0;  //window.value
Object.defineProperty(window, 'a', {
    get: function() {
        return this.value += 1;
    }
});
console.log(a===1 && a ===2 && a===3) // true

//上面代码中，我们在window对象上定义了一个具有getter的 a 属性, 通过get属性, 我们可以调用一个函数并且不用在函数名后添加 ()，所以 a 可以在代码中直接被访问到(全局变量)， 因此也可以直接获得a的值。如果我们在其他对象上定义了属性 a 而不是window的话，例如object1， 我们就需要改变题目为 object1.a === 1 && object1.a === 2 && object1.a === 3 了。
```

> 2.字符编码实现相同效果
```js
//使用隐藏字符
var aﾠ = 1;
var a = 2;
var ﾠa = 3;
console.log(aﾠ === 1 && a === 2 && ﾠa=== 3 );
```