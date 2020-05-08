Array.prototype.myreduce = function (fn, initialValue) {
    // 判断调用对象是否为数组
    if (Object.prototype.toString.call([]) !== '[object Array]') {
        throw new TypeError('not a array')
    }
    // 判断调用数组是否为空数组
    const sourceArray = this
    if (sourceArray.length === 0) {
        throw new TypeError('empty array')
    }
    // 判断传入的第一个参数是否为函数
    if (typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`)
    }

    // 第二步
    // 回调函数参数初始化
    let accumulator,
        currentValue,
        currentIndex;
    if (initialValue) {
        accumulator = initialValue
        currentIndex = 0
    } else {
        //如果提供了initialValue，则起始索引号为0，否则从索引1起始。
        accumulator = arr[0]
        currentIndex = 1
    }

    // 第三步
    // 开始循环(Object.prototype.hasOwnProperty能够判断数组在某下标位是否为空,reduce会将数组中的空成员自动忽略)
    while (currentIndex < sourceArray.length) {
        if (Object.prototype.hasOwnProperty.call(sourceArray, currentIndex)) {
            currentValue = sourceArray[currentIndex]
            accumulator = fn(accumulator, currentValue, currentIndex, sourceArray)
        }
        currentIndex++
    }

    // 第四步
    // 返回结果
    return accumulator
}

//测试
const rReduce = ['1', null, undefined, , 3, 4].reduce((a, b) => a + b, 3)
const mReduce = ['1', null, undefined, , 3, 4].myreduce((a, b) => a + b, 3)

console.log(rReduce); // 31nullundefined34
console.log(mReduce); // 31nullundefined34