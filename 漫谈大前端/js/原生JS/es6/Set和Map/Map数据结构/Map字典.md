## 字典
在数据结构还有一种结构叫做字典，它就是实现基于ES6中的Map类的结构

> 那么集合又和字典有什么区别呢：
- 共同点：集合、字典可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

所以这一下让我们明白了，Map其实的主要用途也是用于存储数据的，相比于Object只提供“字符串—值”的对应，Map提供了“值—值”的对应。也就是说如果你需要“键值对”的数据结构，Map比Object更合适

```js
const map = new Map();
const o = {p: 'Hello World'};
map.set(o, 'content')
map.get(o) // "content"

map.has(o) // true
map.delete(o) // true
map.has(o) // false
```

#### Map的属性和方法
> Map的属性：
- size：返回字典所包含的元素个数

> Map的方法:
- 操作方法：
    - set(key, val): 向字典中添加新元素
    - get(key):通过键值查找特定的数值并返回
    - has(key):如果键存在字典中返回true,否则false
    - delete(key): 通过键值从字典中移除对应的数据
    - clear():将这个字典中的所有元素删除
- 遍历方法：
    - keys():将字典中包含的所有键名以数组形式返回
    - values():将字典中包含的所有数值以数组形式返回
    - forEach()：遍历字典的所有成员


###### Map与其他数据结构的相互转换
> Map 转 Array
```js
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])    // [[1, 1], [2, 2], [3, 3]]
```
> Array 转 Map
```js
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map)    // Map {1 => 1, 2 => 2, 3 => 3}
```
> Map 转 Object
因为 Object 的键名都为字符串，而 Map 的键名为对象，所以转换的时候会把非字符串键名转换为字符串键名。
```js
function mapToObj(map) {
    let obj = Object.create(null)
    for (let [key, value] of map) {
        obj[key] = value
    }
    return obj
}
const map = new Map().set('name', 'An').set('des', 'JS')
mapToObj(map)  // {name: "An", des: "JS"}
```
> Object 转 Map
```js
function objToMap(obj) {
    let map = new Map()
    for (let key of Object.keys(obj)) {
        map.set(key, obj[key])
    }
    return map
}
objToMap({'name': 'An', 'des': 'JS'}) // Map {"name" => "An", "des" => "JS"}
```
> Map 转 JSON
```js
function mapToJson(map) {
    return JSON.stringify([...map])
}
let map = new Map().set('name', 'An').set('des', 'JS')
mapToJson(map)    // [["name","An"],["des","JS"]]
```
> JSON 转 Map
```js
function jsonToStrMap(jsonStr) {
  return objToMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"name": "An", "des": "JS"}') // Map {"name" => "An", "des" => "JS"}
```