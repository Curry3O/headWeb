## WeakMap
> WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。
注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。

###### Map和WeakMap的主要区别：
- Map对象的键可以是任何类型，但WeakMap对象中的键只能是对象引用
- WeakMap不能包含无引用的对象，否则会被自动清除出集合（垃圾回收机制）。
- WeakSet对象是不可枚举的，无法获取大小。

###### 方法：
- has(key)：判断是否有 key 关联对象
- get(key)：返回key关联对象（没有则则返回 undefined）
- set(key)：设置一组key关联对象
- delete(key)：移除 key 的关联对象

## 总结
    - WeakMap只接受对象作为键名（null除外）
    - WeakMap的键名所指向的对象，不计入垃圾回收机制
    - WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
    - 没有遍历方法，即没有keys()、values()和entries()方法
    - 没有size属性、clear()方法
    - WeakMap只有四个方法可用：get()、set()、has()、delete()