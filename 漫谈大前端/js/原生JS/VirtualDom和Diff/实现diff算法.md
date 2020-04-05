### 实现 diff 算法
> 这里我们做的就是实现一个 diff 算法进行虚拟节点 Element 的对比，并返回一个 patch 对象，用来存储两个节点不同的地方。这也是整个 virtual dom 实现最核心的一步。而 diff 算法又包含了两个不一样的算法，一个是 O(n)，一个则是 O(max(m, n))

###### 同层级元素比较（O(n)）
首先，我们的知道的是，如果元素之间进行完全的一个比较，即新旧 Element 对象的父元素，本身，子元素之间进行一个混杂的比较，其实现的时间复杂度为 O(n^3)。但是在我们前端开发中，很少会出现跨层级处理节点，所以这里我们会做一个同级元素之间的一个比较，则其时间复杂度则为 O(n)。算法流程如图(diff1.png)所示

> 在这里，我们做同级元素比较时，可能会出现四种情况(属于 diff 的第二种算法)
- 整个元素都不一样，即元素被 replace 掉
- 元素的 attrs 不一样
- 元素的 text 文本不一样
- 元素顺序被替换，即元素需要 reorder

> 针对以上四种情况，我们先设置四个常量进行表示。diff 入口方法及四种状态如下:

```js

const REPLACE = 0  // replace => 0
const ATTRS   = 1  // attrs   => 1
const TEXT    = 2  // text    => 2
const REORDER = 3  // reorder => 3

// diff 入口，比较新旧两棵树的差异
function diff (oldTree, newTree) {
  let index   = 0
  let patches = {} // 用来记录每个节点差异的补丁对象
  walk(oldTree, newTree, index, patches)
  return patches
}

```

> OK，状态定义好了，接下来开搞。我们一个一个实现，获取到每个状态的不同。这里需要注意的一点就是，我们这里的 diff 比较只会和上面的流程图显示的一样，只会两两之间进行比较，如果有节点 remove 掉，这里会 pass 掉，直接走 list diff。

- a.首先我们先从最顶层的元素依次往下进行比较，直到最后一层元素结束，并把每个层级的差异存到 patch 对象中去，即实现walk方法(代码见实现diff算法1.js)

- b.实际上我们需要对新旧元素进行一个深度的遍历，为每个节点加上一个唯一的标记，具体流程如图(diff2.png)所示

> OK，这一步偶了。咱调用一下看下效果，看看两个不同的 Element 对象比较会返回一个哪种形式的 patch 对象

```js

let ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2'])
])
let ul1 = el('ul', { id: 'list1' }, [
  el('li', { class: 'item1' }, ['Item 4']),
  el('li', { class: 'item2' }, ['Item 5'])
])
let patches = diff(ul, ul1);
console.log(patches);

```


###### listDiff实现 O(m*n) => O(max(m, n))
> 首先我们得明确一下为什么需要 list diff 这种算法的存在，list diff 做的一件事情是怎样的，然后它又是如何做到这么一件事情的。举个栗子，我有新旧两个 Element 对象，分别为:

```js

let oldTree = el('ul', { id: 'list' }, [
  el('li', { class: 'item1' }, ['Item 1']),
  el('li', { class: 'item2' }, ['Item 2']),
  el('li', { class: 'item3' }, ['Item 3'])
])
let newTree = el('ul', { id: 'list' }, [
  el('li', { class: 'item3' }, ['Item 3']),
  el('li', { class: 'item1' }, ['Item 1']),
  el('li', { class: 'item2' }, ['Item 2'])
])

```
控制台结果图可以参考diff4.png

> 如果要进行 diff 比较的话，我们直接用上面的方法就能比较出来，但我们可以看出来这里只做了一次节点的 move。如果直接按照上面的 diff 进行比较，并且通过后面的 patch 方法进行 patch 对象的解析渲染，那么将需要操作三次 DOM 节点才能完成视图最后的 update。

> 当然，如果只有三个节点的话那还好，我们的浏览器还能吃的消，看不出啥性能上的区别。那么问题来了，如果有 N 多节点，并且这些节点只是做了一小部分 remove，insert，move 的操作，那么如果我们还是按照一一对应的 DOM 操作进行 DOM 的重新渲染，那岂不是操作太昂贵？

> 所以，才会衍生出 list diff 这种算法，专门进行负责收集 remove，insert，move 操作，当然对于这个操作我们需要提前在节点的 attrs 里面申明一个 DOM 属性，表示该节点的唯一性。另外上张图说明一下 list diff 的时间复杂度，小伙伴们可以看图(diff5.png)了解一下

OK，接下来我们举个具体的例子说明一下 list diff 具体如何进行操作的，代码如下

```js

let oldTree = el('ul', { id: 'list' }, [
  el('li', { key: 1 }, ['Item 1']),
  el('li', {}, ['Item']),
  el('li', { key: 2 }, ['Item 2']),
  el('li', { key: 3 }, ['Item 3'])
])
let newTree = el('ul', { id: 'list' }, [
  el('li', { key: 3 }, ['Item 3']),
  el('li', { key: 1 }, ['Item 1']),
  el('li', {}, ['Item']),
  el('li', { key: 4 }, ['Item 4'])
])

```

> 对于上面例子中的新旧节点的差异对比，如果我说直接让小伙伴们看代码捋清楚节点操作的流程，估计大家都会说我耍流氓。所以我整理了一幅流程图，解释了 list diff 具体如何进行计算节点差异的，如图diff3.png

我们看图说话，list diff 做的事情就很简单明了啦。

###### 第一步
- newChildren 向 oldChildren 的形式靠近进行操作（移动操作，代码中做法是直接遍历 oldChildren 进行操作），得到 simulateChildren = [key1, 无key, null, key3]
- step1. oldChildren 第一个元素 key1 对应 newChildren 中的第二个元素
- step2. oldChildren 第二个元素 无key 对应 newChildren 中的第三个元素
- step3. oldChildren 第三个元素 key2 在 newChildren 中找不到，直接设为 null
- step4. oldChildren 第四个元素 key3 对应 newChildren 中的第一个元素

###### 第二步
- 稍微处理一下得出的 simulateChildren，将 null 元素以及 newChildren 中的新元素加入，得到 simulateChildren = [key1, 无key, key3, key4]

###### 第三步
- 将得出的 simulateChildren 向 newChildren 的形式靠近，并将这里的移动操作全部记录下来（注：元素的 move 操作这里会当成 remove 和 insert 操作的结合）。所以最后我们得出上图中的一个 moves 数组，存储了所有节点移动类的操作。

> OK，整体流程我们捋清楚了，接下来要做的事情就会简单很多了。我们只需要用代码把上面列出来要做的事情得以实现即可。(代码见实现diff算法2.js)


## 总结

> 先从 Element 模拟 DOM 节点开始，然后通过 render 方法将 Element 还原成真实的 DOM 节点。然后再通过完成 diff 算法，比较新旧 Element 的不同，并记录在 patch 对象中。最后在完成 patch 方法，将 patch 对象解析，从而完成 DOM 的 update。