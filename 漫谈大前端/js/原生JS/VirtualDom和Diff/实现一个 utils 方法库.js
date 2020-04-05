const _ = exports

_.setAttr = function setAttr (node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value
      break;
    case 'value':
      let tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // 如果节点不是 input 或者 textarea, 则使用 `setAttribute` 去设置属性
        node.setAttribute(key, value)
      }
      break;
    default:
      node.setAttribute(key, value)
      break;
  }
}

_.slice = function slice (arrayLike, index) {
  //Array.prototype.slice.call改变数组的slice方法的作用域，在特定作用域中去调用slice方法，call（）方法的第二个参数表示传递给slice的参数即截取数组的起始位置。
  //Array.prototype.slice.call(arguments)能将具有length属性的对象(key值为数字)转成数组。[]是Array的实例，所以可以直接使用[].slice.call()方法。
  return Array.prototype.slice.call(arrayLike, index)
}


_.type = function type (obj) {
  //使用Object.prototype上的原生toString()方法判断数据类型
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = function isArray (list) {
  return _.type(list) === 'Array'
}

_.toArray = function toArray (listLike) {
  if (!listLike) return [];
  let list = []
  for (let i = 0, l = listLike.length; i < l; i++) {
    list.push(listLike[i])
  }
  return list
}

_.isString = function isString (list) {
  return _.type(list) === 'String'
}

_.isElementNode = function (node) {
  return node.nodeType === 1
}

console.log(_.type(2));
