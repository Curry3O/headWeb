### var
> 由于变量声明（以及其他声明）总是在任意代码执行之前处理的，所以在代码中的任意位置声明变量总是等效于在代码开头声明。这意味着变量可以在声明之前使用，这个行为叫做“hoisting”。“hoisting”就像是把所有的变量声明移动到函数或者全局代码的开头位置。
```js
bla = 2
var bla;
// ...
// 可以理解为：   
var bla;  
bla = 2;  //由于这个原因，我们建议总是在作用域的最开始（函数或者全局代码的开头）声明变 量。这样可以使变量的作用域变得清晰。
```

> 声明提升机制
```js
//在函数作用域或全局作用域中通过关键字var 声明的变量,无论实际上是在哪里声明的,都会被当成在当前作用域顶部声明的变量,这就是我们常说的提升机制,例如:
function getValue () {
    if(true) {
        var value = 'blue';
        return value ;
    } else {
        return null
    }
}

//在预编译阶段, js 引擎会将上面的getValue函数修改成下面这样:
function getValue () {
    var value ; 
    if(true) {
        value = 'blue' ;
        return value ;
    } else {
        return null ;
    }
}
//变量声明被提升至函数作用域顶部, 而初始化操作依旧留在原处执行, 这就意味着在else子句中也可以访问到该变量 , 而且由于此时变量尚未初始化 , 所以其值为undefined
```

> var 声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问，包含它的代码块对此没有什么影响。有些人称此为 var 作用域或函数作用域。函数参数也使用函数作用域。
```js
function f(init) {
    if (init) {
        var x = 10;
    }
    return x;
}
f(true);  // 10
f(false); // undefined
```

> 捕获变量怪异之处
```js
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
//输出 10 次 10
//我们传给 setTimeout 的每一个函数表达式实际上都引用了相同作用域里的同一个 i。setTimeout 在若干毫秒后执行一个函数，并且是在 for 循环结束后。for 循环结束后，i 的值为 10。 所以当函数被调用的时候，它会打印出 10
```

> 通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时i的值：
```js
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
//输出 0 1 2 3 4 5 6 7 8 9
//使用立即执行的函数表达式来获取每次 for 循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。
```



### let
#### 块级声明
> 块级声明用于声明在指定块的作用域之外无法访问的变量 , 块级作用域存在于 :
    - 函数内部
    - 块中{} 很多类c语言都有块级作用域 , 而es6 引入就上为了让js 更灵活和普适

> let 声明的用法与var 相同。 用let 代替var来声明变量, 就可以把变量的作用域限制在当前代码块中 , 由于let 声明不会被提升, 因此开发者将let 声明语句放在封闭代码块的顶部,以便整个代码块都可以访问,
```js
function getValue (condition) {
    if(condition) {
        let value = 'blue' ;
        return value ;
    } else {
        //变量value 不存在
        return null
    }
    //变量value 在此处不存在
}
//现在这个getValue 函数的运行结果更像类c语言. 变量value改由关键字let 进行声明后 , 不再被提升至函数顶部。 执行流离开if 块value立刻被销毁。 如果condition 的值false ,就永远不会声明并初始化value.
```

> 禁止重声明
```js
//假设作用域中已经存在某个标志符, 此时再使用let 关键字声明它就会报错 ， 比如:
var  count = 30 ;
//抛出错误
let count = 10 ;

//同一作用域中, 不能用let 重复定义已经存在的标志符, 所以此处的let 声明会抛出错误。但如果当前作用域内嵌另一个作用域, 便可在内嵌的作用域中用let 声明同名变量,例如 :
var count = 30 ; 
if(1) {
    //不会抛出错误
    let count = 10 ;
}
//由于此处的let是在if块内声明了新变量count, 因此不会抛出错误。 内部块中的count会遮蔽全局作用域中的count ， 后者只有在if块外才能访问到
```

> 块级作用域变量的获取
```js
//每次进入一个作用域时，它创建了一个变量的环境。 就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }

    return getCity(); //Seattle
}
```

```js
//当 let 声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域。 这就是我们在使用立即执行的函数表达式时做的事，所以在 setTimeout例子里我们仅使用 let 声明就可以了。
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}
//输出 0 1 2 3 4 5 6 7 8 9
```



### const
> es6标准还提供了const关键字。使用const 声明的变量是常量，其值一旦被设定后不可更改。因此，每个通过const声明的常量必须进行初始化，例如
```js
// 有效的常量
const maxItem = 30 ;

//语法错误 , 常量未初始化
const name ;
```

> 它与 let 声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 let 相同的作用域规则，但是不能对它们重新赋值。
```js
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}

// Error
//const声明不允许修改绑定, 但允许修改值
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};

// all "okay"
//可以修改对象属性的值
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

> const 与let 声明的都是块级标识符,所以常量也只在当前代码块内有效，一旦执行到块外会立即被销毁,在同一作用域用const 声明已经存在的标识符也会导致语法错误,无论该标志符是使用var 还是let声明的。

####  临时死区(Temporal Dead Zone)
> 与var 不同，let 和 const 声明的变量不会被提升到作用域顶部, 如果在声明之前访问这些变量， 即时是相对安全的typeof操作符也会触发引用错误,例如:
```js
if(true) {
    console.log(typeof value) ;//引用错误
    let value = 'blue'
}
//由于console.log(typeof value)语句会抛出错误, 因此用let定义并初始化变量value的语句不会执行。此时的value还位于js所谓的临时死区(TDZ)中。虽然es标准并没有明确提到TDZ，但人们常用来它来描述let和const的不提升效果。
```

> javaScript引擎在扫描代码发现变量声明中,要么将他们提升至作用域顶部(遇到var 声明),要么将声明放到TDZ中(遇到let 和const声明)。访问TDZ中的变量会触发运行时错误。只有执行过变量声明的语句后，变量才会从TDZ中移出,然后方可正常访问。在声明前访问由let定义的变量就是这样。由前面实例可见，即便是相对不容易出错的typeof操作符也无法阻挡引擎抛出的错误。但在let声明的作用域外对该变量使用typeof则不会报错，具体如下:
```js
console.log(typeof value) ;//undefined

if(true) {
    let value = 'blue'
}
//typeof 是在声明value的代码块外执行的，此时value并不在TDZ中。这也就意味着不存在value这个绑定，typeof操作最终返回undefined
```

#### 全局块作用域绑定
> let和const与var的另外一个区别是它们在全局作用域中的行为。当var被用于全局作用域时，它会创建一个新的全局变量作为全局对象(浏览器环境中的window对象)的属性。这意味着用var 很可能会无意中覆盖一个已经存在的全局变量，就像这样:
```js
//在浏览器中
var RegExp = "hello!" ;
console.log(window.RegExp) ;  // "hello"

var ncz = "Hi!" ;
console.log(window.ncz) ; // "Hi!"
```

> 即使全局对象RegExp定义在window上,也不能幸免被var声明覆盖。实例中声明的全局对象RegExp会覆盖之前原来那个。同样，ncz被定义为一个全局变量，并立即成为window的属性。javaScript过去一直这样。如果你在全局作用域中使用let或const，会在全局作用域下创建一个新的绑定，但该绑定不会添加为全局对象的属性。换句话说，用let或const不能覆盖全局变量，而只能遮蔽它。实例如下:
```js
//在浏览器中
let RegExp = "hello!" ;
console.log(RegExp) ;    //  "hello"
console.log(RegExp === window.RegExp)  //   false

const  ncz = "Hi!" ;
console.log(ncz) ;   //  "Hi!" 
console.log("ncz" in window)  //  false
//这里let声明的RegExp创建了一个绑定并遮蔽了全局的RegExp变量。结果是window.RegExp和RegExp不相同，但不会破坏全局作用域。同样,const声明的ncz创建了一个绑定但没有创建为全局对象的属性。如果不想为全局对象创建属性，则使用let和const要安全得多。
```
> 如果希望在全局对象下定义变量，仍然可以使用var。这种情况常见于在浏览器中跨frame或跨window访问代码。

> let和const的行为很多时候与var一致。然而，他们在循环中的行为很不一样。在for循环中，let和const都会每次迭代创建新绑定，从而使循环体内创建的函数可以访问到相应迭代的值，而非最后一次迭代后的值(像var声明那样)。




### 总结
> let、const、var 的区别
    - let/const 定义的变量不会出现变量提升，而 var 定义的变量会提升
    - 相同作用域中，let 和 const 不允许重复声明，var 允许重复声明
    - const 声明变量时必须设置初始值
    - const 声明一个只读的常量，这个常量不可改变。
    - 在JS中，复杂数据类型，存储在栈中的是堆内存的地址，存在栈中的这个地址是不变的，但是存在堆中的值是可以变得


    声明方式    变量提升    暂时性死区    重复声明    块作用域有效
      var         会         不存在       允许         不是
      let        不会         存在       不允许         是
     const       不会         存在       不允许         是
