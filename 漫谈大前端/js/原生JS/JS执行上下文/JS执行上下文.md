## JS执行上下文
> 首先明确几个概念：
    - EC：函数执行环境（或执行上下文），Execution Context
    - ECS：执行环境栈，Execution Context Stack
    - VO：变量对象，Variable Object
    - AO：活动对象，Active Object
    - scope chain：作用域链



### EC（执行上下文）
> 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。

> JS中执行环境
    - 全局环境
    - 函数环境
    - eval函数环境 （已不推荐使用）

> 执行上下文类型分为：
    - 全局执行上下文：这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：1. 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。2. 将 this 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。

    - 函数执行上下文：每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤。

    - Eval函数执行上下文：运行在 eval 函数中的代码也获得了自己的执行上下文，但由于 Javascript 开发人员不常用 eval 函数。

> 执行上下文特点：
    - 单线程，在主进程上运行
    - 同步执行，从上往下按顺序执行
    - 全局上下文只有一个，浏览器关闭时会被弹出栈
    - 函数的执行上下文没有数目限制
    - 函数每被调用一次，都会产生一个新的执行上下文环境，即使是调用自身

> 执行上下文生命周期:
    1.创建阶段
        - VariableEnvironment（变量环境） 组件被创建。/创建变量，函数和参数
        - LexicalEnvironment（词法环境） 组件被创建。/创建作用域链
        - 确定 this 的值，也被称为 This Binding

    2.执行阶段
        - 变量赋值
        - 函数引用
        - 执行其他代码

    3.销毁阶段
        - 执行完毕出栈，等待回收被销毁


#### 创建阶段
> 执行上下文创建过程中，需要做以下几件事:
    - 创建变量对象：首先初始化函数的参数arguments，提升函数声明和变量声明。
    - 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。
    - 确定this的值，即 ResolveThisBinding

> 一个执行上下文从概念上可以视为一个包含三个property的Object:
```js
executionContextObj = {
    'scopeChain': { /* variableObject + all parent execution context's variableObject */ },
    'variableObject': { /* function arguments / parameters, inner variable and function declarations */ },
    'this': {}
}

//或者
ExecutionContext = {  
  ThisBinding = <this value>,  
  LexicalEnvironment = { ... },  
  VariableEnvironment = { ... },  
}
```

###### This Binding
> 在全局执行上下文中，this 的值指向全局对象，在浏览器中，this 的值指向 window 对象。在函数执行上下文中，this 的值取决于函数的调用方式。如果它被一个对象引用调用，那么 this 的值被设置为该对象，否则 this 的值被设置为全局对象或 undefined（严格模式下）。
```js
let person = {  
    name: 'peter',  
    birthYear: 1994,  
    calcAge: function() {  
        console.log(2018 - this.birthYear);  
  }  
}

person.calcAge();   
// 'this' 指向 'person', 因为 'calcAge' 是被 'person' 对象引用调用的。

let calculateAge = person.calcAge;  
calculateAge();  
// 'this' 指向全局 window 对象,因为没有给出任何对象引用
```


###### 词法环境（Lexical Environment）
> 词法环境是一种规范类型，基于 ECMAScript 代码的词法嵌套结构来定义标识符与特定变量和函数的关联关系。词法环境由环境记录（environment record）和可能为空引用（null）的外部词法环境组成。

> 简而言之，词法环境是一个包含标识符变量映射的结构。（这里的标识符表示变量/函数的名称，变量是对实际对象【包括函数类型对象】或原始值的引用）

> 在词法环境中，有两个组成部分：
    - 环境记录（environment record）：环境记录是存储变量和函数声明的实际位置
    - 对外部环境的引用：对外部环境的引用意味着它可以访问其外部词法环境

> 词法环境有两种类型:
    - 全局环境（在全局执行上下文中）是一个没有外部环境的词法环境。全局环境的外部环境引用为 null。它拥有一个全局对象（window 对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，this 的值指向这个全局对象

    - 函数环境，用户在函数中定义的变量被存储在环境记录中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境

> 注意： 对于函数环境而言，环境记录 还包含了一个 arguments 对象，该对象包含了索引和传递给函数的参数之间的映射以及传递给函数的参数的长度（数量）。例如，下面函数的 arguments 对象如下所示：
```js
function foo(a, b) {  
    var c = a + b;  
}  
foo(2, 3);

// arguments 对象  
Arguments: {0: 2, 1: 3, length: 2},
```
> 环境记录 同样有两种类型（如下所示）：
    - 声明性环境记录 存储变量、函数和参数。一个函数环境包含声明性环境记录
    - 对象环境记录 用于定义在全局执行上下文中出现的变量和函数的关联。全局环境包含对象环境记录

> 抽象地说，词法环境在伪代码中看起来像这样：
```js
// 全局环境
GlobalExectionContext = {
    // 全局词法环境
    LexicalEnvironment: {
        // 环境记录
        EnvironmentRecord: {
            Type: "Object", //类型为对象环境记录
            // 标识符绑定在这里 
        },
        outer: `< null >`
    }
};
// 函数环境
FunctionExectionContext = {
    // 函数词法环境
    LexicalEnvironment: {
        // 环境纪录
        EnvironmentRecord: {
            Type: "Declarative", //类型为声明性环境记录
            // 标识符绑定在这里 
        },
        outer: `< Global or outerfunction environment reference >`
    }
};
```

###### 变量环境（VariableEnvironment）
> 变量环境可以说也是词法环境，它具备词法环境所有属性，一样有环境记录与外部环境引入。在 ES6 中，LexicalEnvironment 组件和 VariableEnvironment 组件的区别在于前者用于存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定。
```js
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
    var g = 20;  
    return e * f * g;  
}

c = multiply(20, 30);
```
> 我们用伪代码来描述上述代码中执行上下文的创建过程：
```js
//全局执行上下文
GlobalExectionContext = {
    // this绑定为全局对象
    ThisBinding: `<Global Object>`,
    // 词法环境
    LexicalEnvironment: {  
        //环境记录
        EnvironmentRecord: {  
            Type: "Object",  // 对象环境记录
            // 标识符绑定在这里 let const创建的变量a b在这
            a: `< uninitialized >`,  
            b: `< uninitialized >`,  
            multiply: `< func >`  
        }
        // 全局环境外部环境引入为null
        outer: `<null>`  
    },
  
    VariableEnvironment: {  
        EnvironmentRecord: {  
            Type: "Object",  // 对象环境记录
            // 标识符绑定在这里  var创建的c在这
            c: undefined,  
        }
        // 全局环境外部环境引入为null
        outer: `<null>`  
    }  
}

// 函数执行上下文
FunctionExectionContext = {
    //由于函数是默认调用 this绑定同样是全局对象
    ThisBinding: `<Global Object>`,
    // 词法环境
    LexicalEnvironment: {  
        EnvironmentRecord: {  
            Type: "Declarative",  // 声明性环境记录
            // 标识符绑定在这里  arguments对象在这
            Arguments: {0: 20, 1: 30, length: 2},  
        },  
        // 外部环境引入记录为</Global>
        outer: `<GlobalEnvironment>`  
    },

    VariableEnvironment: {  
        EnvironmentRecord: {  
            Type: "Declarative",  // 声明性环境记录
            // 标识符绑定在这里  var创建的g在这
            g: undefined  
        },  
        // 外部环境引入记录为</Global>
        outer: `<GlobalEnvironment>`  
    }  
}
```
> 注意： 只有在遇到函数 multiply 的调用时才会创建函数执行上下文。你可能已经注意到了 let 和 const 定义的变量没有任何与之关联的值，但 var 定义的变量设置为 undefined。这是因为在创建阶段，代码会被扫描并解析变量和函数声明，其中函数声明存储在环境中，而变量会被设置为 undefined（在 var 的情况下）或保持未初始化（在 let 和 const 的情况下）。这就是为什么你可以在声明之前访问 var 定义的变量（尽管是 undefined ），但如果在声明之前访问 let 和 const 定义的变量就会提示引用错误的原因。这就是我们所谓的变量提升。


##### 解释器解析代码的流程概述:
> 1.找到被调用函数的代码内容

> 2.在执行function代码前，先创建执行上下文execution context

> 3.进入创建阶段
    第一步: 初始化作用域链

    第二步：创建 变量对象(variable object)

        a.创建 arguments object；检查上下文获取入参，初始化形参名称和数值，并创建一个引用拷贝

        b.扫描上下文获取内部函数声明：

            1.对发现的每一个内部函数，都在variable object中创建一个和函数名一样的property，该property作为一个引用指针指向函数代码在内存中的地址

            2.如果在variable object中已经存在相同名称的property，那么相应的property会被重写
        
        c.扫描上下文获取内部变量声明：

            1.对发现的每一个内部变量声明，都在variable object中创建一个和变量名一样的property，并且将其初始化为 undefined

            2.如果在variable object中已经存在相同变量名称的property，那么就跳过，不做任何动作，继续扫描
        
    第三步：决定在上下文中"this" 的值

> 例子：
```js
function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };
    function c() {

    }
}

foo(22);
```
> 当刚调用foo(22)函数的时候，创建阶段的上下文大致是下面的样子：
```js
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {  // 创建了参数对象
            0: 22,
            length: 1
        },
        i: 22,  // 检查上下文，创建形参名称，赋值/或创建引用拷贝
        c: pointer to function c()  // 检查上下文，发现内部函数声明，创建引用指向函数体
        a: undefined,  // 检查上下文，发现内部声明变量a，初始化为undefined
        b: undefined   // 检查上下文，发现内部声明变量b，初始化为undefined，此时并不赋值，右侧的函数作为赋值语句，在代码未执行前，并不存在
    },
    this: { ... }
}
```
> 参见代码中的备注，在创建阶段除了形参参数进行了定义和赋值外，其他只定义了property的名称，并没有赋值。一旦创建阶段完成，执行流程就进入到函数内部进入激活/代码执行阶段。在执行完后的上下文大致如下：
```js
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```


#### 执行阶段
> 在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。

> 注： 在执行阶段，如果 Javascript 引擎在源代码中声明的实际位置找不到 let 变量的值，那么将为其分配 undefined 值。


#### 变量对象（Variable Object）和活动对象（Active Object）的区别
> 变量对象（Variable object）:
    是说JS的执行上下文中都有个对象用来存放执行上下文中可被访问但是不能被delete的函数标示符、形参、变量声明等。它们会被挂在这个对象上，对象的属性对应它们的名字对象属性的值对应它们的值但这个对象是规范上或者说是引擎实现上的不可在JS环境中访问到活动对象。

> 激活对象（Activation object）: 
    有了变量对象存每个上下文中的东西，但是它什么时候能被访问到呢？就是每进入一个执行上下文时，这个执行上下文儿中的变量对象就被激活，也就是该上下文中的函数标示符、形参、变量声明等就可以被访问到了。

```js
function compare(value1, value2) {    
    if (value1 < value2) {          
        return -1;    
    } else if (value1 > value2) {          
        return 1;    
    } else {          
        return 0;    
    }
}

var result = compare(5,10)
//以上代码定义了compare()函数，然后又在全局作用域中调用了它（定义了变量result，赋值compare(5,10)）。当调用compare()时，会创建一个包含arguments、value1、value2的 `活动对象`，全局执行环境的`变量对象`(包含result和compare)。
```

##### 变量对象
> 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。并且不同的执行上下文也有着不同的变量对象，这里分为全局上下文中的变量对象和函数执行上下文中的变量对象。


###### 全局上下文中的变量对象(VO)
> 全局上下文中的变量对象其实就是全局对象。我们可以通过this来访问全局对象，并且在浏览器环境中，this === window；在node环境中，this === global。

###### 函数上下文中的变量对象(AO)
> 在函数上下文中的变量对象，我们用活动对象来表示（activation object，这里简称AO），为什么称其为活动对象呢，因为只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，并且只有被激活的变量对象，其属性才能被访问。

> 在函数执行之前，会为当前函数创建执行上下文，并且在此时，会创建变量对象：
    - 根据函数arguments属性初始化arguments对象
    - 根据函数声明生成对应的属性，其值为一个指向内存中函数的引用指针。如果函数名称已存在，则覆盖
    - 根据变量声明生成对应的属性，此时初始值为undefined。如果变量名已声明，则忽略该变量声明

```js
var scope = 'global scope';

function checkscope(s) {
    var scope = 'local scope';

    function f() {
        return scope;
    }
    return f();
}
checkscope('scope');

//在执行checkscope函数之前，会为其创建执行上下文，并初始化变量对象，此时的变量对象为：
VO = {
    arguments: {
        0: 'scope',
        length: 1,
    },
    s: 'scope', // 传入的参数
    f: pointer to function f(),
    scope: undefined, // 此时声明的变量为undefined
}

//随着checkscope函数的执行，变量对象被激活，变相对象内的属性随着代码的执行而改变：
VO = {
    arguments: {
        0: 'scope',
        length: 1,
    },
    s: 'scope', // 传入的参数
    f: pointer to function f(),
    scope: 'local scope', // 变量赋值
}

//其实也可以用另一个概念“函数提升”和“变量提升”来解释：
function checkscope(s) {
    function f() { // 函数提升
        return scope;
    }
    var scope; // 变量声明提升

    scope = 'local scope' // 变量对象的激活也相当于此时的变量赋值

    return f();
}
```

#### 作用域
> 作用域负责收集和维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

#### 作用域链
> 作用域链就是从当前作用域开始一层一层向上寻找某个变量，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链。

##### 什么是作用域链
> 当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。下面还是用我们的例子来讲解作用域链：
```js
var scope = 'global scope';

function checkscope(s) {
    var scope = 'local scope';

    function f() {
        return scope;
    }
    return f();
}
checkscope('scope');
```

> 首先在checkscope函数声明的时候，内部会绑定一个[[scope]]的内部属性：
```js
checkscope.[[scope]] = [
  globalContext.VO
];
```

> 接着在checkscope函数执行之前，创建执行上下文checkscopeContext，并推入执行上下文栈：
    - 复制函数的[[scope]]属性初始化作用域链
    - 创建变量对象
    - 将变量对象压入作用域链的最顶端

```js
// -> 初始化作用域链；
checkscopeContext = {
  scope: checkscope.[[scope]],
}

// -> 创建变量对象
checkscopeContext = {
    scope: checkscope.[[scope]],
    VO = {
        arguments: {
            0: 'scope',
            length: 1,
        },
        s: 'scope', // 传入的参数
        f: pointer to function f(),
        scope: undefined, // 此时声明的变量为undefined
    },
}

ESC = [
  globalContext,
]

// -> 将变量对象压入作用域链的最顶端
checkscopeContext = {
    scope: [VO, checkscope.[[scope]]],
    VO = {
        arguments: {
            0: 'scope',
            length: 1,
        },
        s: 'scope', // 传入的参数
        f: pointer to function f(),
        scope: undefined, // 此时声明的变量为undefined
    },
}

// 进入执行上下文栈
ESC = [
  checkscopeContext,
  globalContext,
]
```

> 接着，随着函数的执行，修改变量对象：
```js
checkscopeContext = {
    scope: [VO, checkscope.[[scope]]],
    VO = {
        arguments: {
            0: 'scope',
            length: 1,
        },
        s: 'scope', // 传入的参数
        f: pointer to function f(),
        scope: 'local scope', // 变量赋值
    }
}
```

> 与此同时遇到f函数声明，f函数绑定[[scope]]属性：
```js
checkscope.[[scope]] = [
  checkscopeContext.VO, // f函数的作用域还包括checkscope的变量对象
  globalContext.VO
];
//之后f函数的步骤同checkscope函数。
```

> f函数执行，创建执行上下文，推入执行上下文栈：
```js
// 创建执行上下文
fContext = {
  scope: [VO, checkscopeContext.VO, globalContext.VO], // 复制[[scope]]属性，然后VO推入作用域链顶端
  VO = {
    arguments: {
      length: 0,
    },
  },
  this: globalContext.VO,
}

// 入栈
ESC = [
  fContext,
  checkscopeContext,
  globalContext,
]
```

> f函数执行完成，f函数执行上下文出栈，checkscope函数执行完成，checkscope函数出栈：
```js
ESC = [
  // fContext出栈
  checkscopeContext,
  globalContext,
]

ESC = [
  // checkscopeContext出栈,
  globalContext,
]
```


#### 词法作用域 & 动态作用域
> JavaScript这门语言是基于词法作用域来创建作用域的，也就是说一个函数的作用域在函数声明的时候就已经确定了，而不是函数执行的时候。

> JS采用的是词法作用域工作模型，词法作用域意味着作用域是由书写代码时变量和函数声明的位置决定的。( with 和 eval 能够修改词法作用域，但是不推荐使用，对此不做特别说明)
```js
var scope = 'global scope';

function f() {
    console.log(scope)
}

function checkscope() {
    var scope = 'local scope';

    f();
}
checkscope(); //global scope
```

> 因为JavaScript是基于词法作用域创建作用域的，所以打印的结果是global scope而不是local scope。我们结合上面的作用域链来分析一下，首先遇到了f函数的声明，此时为其绑定[[scope]]属性：
```js
// 这里就是我们所说的“一个函数的作用域在函数声明的时候就已经确定了”
f.[[scope]] = [
  globalContext.VO, // 此时的全局上下文的变量对象中保存着scope = 'global scope';
];
```

> 然后我们直接跳过checkscope的执行上下文的创建和执行的过程，直接来到f函数的执行上。此时在函数执行之前初始化f函数的执行上下文：
```js
// 这里就是为什么会打印global scope
fContext = {
    scope: [VO, globalContext.VO], // 复制f.[[scope]]，f.[[scope]]只有全局执行上下文的变量对象
    VO = {
        arguments: {
            length: 0,
        },
    },
}
```

> 然后到了f函数执行的过程，console.log(scope)，会沿着f函数的作用域链查找scope变量，先是去自己执行上下文的变量对象中查找，没有找到，然后去global执行上下文的变量对象上查找，此时scope的值为global scope。


#### this
> 在这里this绑定也可以分为全局执行上下文和函数执行上下文：
    - 在全局执行上下文中，this的指向全局对象。(在浏览器中，this引用 Window 对象)。
    - 在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么this会被设置成那个对象，否则this的值被设置为全局对象或者undefined（在严格模式下）




### ECS（执行环境栈）
> 浏览器中的JS解释器是单线程的。也就是说在浏览器中同一时间只能做一个事情，其他的action和event都会被排队放入到执行栈中(Execution Context Stack)如图ESC.png。执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。

> 执行上下文栈(下文简称执行栈)也叫调用栈，执行栈用于存储代码执行期间创建的所有上下文，具有LIFO（Last In First Out后进先出，也就是先进后出）的特性。JS代码首次运行，都会先创建一个全局执行上下文并压入到执行栈中，之后每当有函数被调用，都会创建一个新的函数执行上下文并压入栈内；由于执行栈LIFO的特性，所以可以理解为，JS代码执行完毕前在执行栈底部永远有个全局执行上下文。
```js
function f1() {
    f2();
    console.log(1);
};

function f2() {
    f3();
    console.log(2);
};

function f3() {
    console.log(3);
};

f1();//3 2 1
```

> 我们通过执行栈与上下文的关系来解释上述代码的执行过程，为了方便理解，我们假象执行栈是一个数组，在代码执行初期一定会创建全局执行上下文并压入栈，因此过程大致如下：
```js
//代码执行前创建全局执行上下文
ECStack = [globalContext];
// f1调用
ECStack.push('f1 functionContext');
// f1又调用了f2，f2执行完毕之前无法console 1
ECStack.push('f2 functionContext');
// f2又调用了f3，f3执行完毕之前无法console 2
ECStack.push('f3 functionContext');
// f3执行完毕，输出3并出栈
ECStack.pop();
// f2执行完毕，输出2并出栈
ECStack.pop();
// f1执行完毕，输出1并出栈
ECStack.pop();
// 此时执行栈中只剩下一个全局执行上下文
```