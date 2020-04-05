//提供一个 render 函数,将 Element 对象渲染成真实的 DOM 节点,完整的 Element 的代码如下:

import _ from './实现一个 utils 方法库';

/**
 * @class Element Virtrual Dom
 * @param { String } tagName
 * @param { Object } attrs   Element's attrs, 如: { id: 'list' }
 * @param { Array <Element|String> } 可以是Element对象，也可以只是字符串，即textNode
 */
class Element {
    constructor(tagName, attrs, children) {
        // 如果只有两个参数(比如el('ul',[el('li',['Item 1'])]))
        if (_.isArray(attrs)) {
            children = attrs;
            attrs = {};
        }
        this.tagName = tagName;
        this.attrs = attrs || {};
        this.children = children;
        // 设置this.key属性，为了后面list diff做准备
        //void是一元运算符，出现在操作数的左边，操作数可以是任意类型的值，void右边的表达式可以是带括号形式（例如：void(0)），也可以是不带括号的形式（例如：void 0）。 undefined并不是javascript中的保留字，我们可以使用undefined作为变量名字，然后给它赋值。void 0输出唯一的结果undefined，保证了不变性。
        this.key = attrs ? attrs.key : void 0;
    }

    render() {
        let el = document.createElement(this.tagName);
        let attrs = this.attrs;

        for (let attrName in attrs) { // 设置节点的DOM属性
            let attrValue = attrs[attrName];
            _.setAttr(el, attrName, attrValue);
        }

        let children = this.children || [];
        children.forEach(child => {
            let childEl = child instanceof Element ?
                child.render() // 若子节点也是虚拟节点，递归进行构建
                :
                document.createTextNode(child); // 若是字符串，直接构建文本节点
            el.appendChild(childEl);
        })

        return el
    }
}

function el(tagName, attrs, children) {
    return new Element(tagName, attrs, children);
}
module.exports = el;
