## Virtual Dom
> virtual dom，也就是虚拟节点。它通过 JS 的 Object 对象模拟 DOM 中的节点，然后再通过特定的 render 方法将其渲染成真实的 DOM 节点。

> virtual dom 是通过 JS 层面的计算，返回一个 patch 对象，即补丁对象，在通过特定的操作解析 patch 对象，完成页面的重新渲染。


> virtual dom的本质是一个用来映射真实dom的JavaScript对象,例如：

```js

class VNode {
  constructor (sel, tagName, id, className, el, children, data, text, key) {
    this.tagName = tagName // DIV
    this.sel = sel // div#id.class
    this.id = id // id
    this.className = className // []
    this.children = children // []
    this.el = el // node
    this.data = data // {}
    this.key = key
    this.text = text
  }
}
```

> 通过一个vnode对象去对应一个dom元素，vnode的属性对应反映dom元素的属性。然后我们可以定义一个toVnode方法，把一个dom tree转为virtual dom tree。

```js

import VNode from './vnode'
import * as utils from './is'

function toVnode (node, utilsTool) {
  const api = (utilsTool === undefined ? utils : utilsTool) // 自定义的一些工具
  let text

// 判断是否为node节点，不是抛出错误
  if (!node) {
    throw new Error('Please make sure you have pass the argument "node" in to function toVnode')
  }

// 如果是element类型节点
  if (api.isElement(node)) {

   // 收集该节点各属性信息，这里实现方式比较多，只要获取到需要的足够的信息就行了
  // 这里获取了id，类名cn，类名数组ca，类字符串如 .classA.classB，sel 等等
    const id = node.id ? node.id : ''
    const cn = node.getAttribute('class')
    const ca = cn ? cn.split(' ') : null // classArray
    const c = cn ? '.' + cn.split(' ').join('.') : '' // .classA.classB
    const sel = node.tagName.toLowerCase() + '#' + id + c
    const attrs = {}
    const elmAttrs = node.attributes
    const elmChildren = node.childNodes
    const children = elmChildren.length ? [] : null
    const tag = node.tagName
    let i, n
  
    for (i = 0, n = elmAttrs.length; i < n; i++) {
      if (elmAttrs[i].nodeName !== 'class' && elmAttrs[i].nodeName !== 'id') {
        // id 和 class例外处理
        attrs[elmAttrs[i].nodeName] = elmAttrs[i].nodeValue
      }
    }

// 如果给节点指定了key属性，则获取key的值
    const key = attrs.key ? attrs.key : undefined

// 如果有子节点，对子节点递归调用toVnode方法
    for (i = 0, n = elmChildren.length; i < n; i++) {
      children.push(toVnode(elmChildren[i], api))
    }
    return new VNode(sel, tag, id, ca, node, children, attrs, undefined, key)

// 文本节点
  } else if (api.isText(node)) {
    text = node.textContent
    return new VNode(undefined, undefined, undefined, undefined, node, undefined, undefined, text, undefined)

// 注释节点
  } else if (api.isComment(node)) {
    text = node.textContent
    return new VNode('commont', undefined, undefined, undefined, node, undefined, undefined, text, undefined)
  } else {
    return new VNode('', undefined, undefined, undefined, node, undefined, undefined, undefined, undefined)
  }
}

export default toVnode
```

> toVnode方法说白了就是，判断当前节点类型，创建对应类型的vnode，然后如果有子节点的话，对子节点递归调用toVnode方法，将子节点也转为vnode，执行结束后，我们就可以得到一棵以传入节点为根节点的virtual dom tree了。

> 到这里我们已经有了一个映射真实dom的virtual dom类（vnode），以及一个将dom转为virtual dom方法（toVnode）