### 实现一个 Object 去模拟 DOM 节点的展示形式。真实节点如下:

```html

<ul id="list">
  <li class="item">item1</li>
  <li class="item">item2</li>
  <li class="item">item3</li>
</ul>

```
> 我们需要完成一个 Element 模拟上面的真实节点，形式如下

```js

let ul = {
  tagName: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    { tagName: 'li', attrs: { class: 'item' }, children: ['item1'] },
    { tagName: 'li', attrs: { class: 'item' }, children: ['item1'] },
    { tagName: 'li', attrs: { class: 'item' }, children: ['item1'] },
  ]
}

```

> 看到这里，我们可以看到的是 el 对象中的 tagName，attrs，children 都可以提取出来到 Element 中去，即

```js

class Element {
  constructor(tagName, attrs, children) {
    this.tagName  = tagName
    this.attrs    = attrs
    this.children = children
  }
}
function el (tagName, attrs, children) {
  return new Element(tagName, attrs, children)
}
module.exports = el;

```

> 那么上面的ul就可以用更简化的方式进行书写了，即

```js

let ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
])

```