function uniqueArrayWithFlattern(array) {
    var _array = array || []; // 保存传参
    // 判断空对象,这块判断折腾了许久
    function isEmptyObject(object) {
        if (Object.prototype.toString.call(object) === "[object Object]") {
            for (var i in object) {
                // 存在属性或方法，则不是空对象
                return false
            }
            return true;
        } else {
            return false;
        }
    }


    // 遍历查询判断,扁平化数组
    function forArrayFlattern(arr) {

        for (var m = 0, n = arr.length; m < n; m++) {
            if (Array.isArray(arr[m])) {
                var _tempSpliceArr = _array.splice(m, 1)[0];
                _array = _array.concat(_tempSpliceArr);
                return forArrayFlattern(_array);
            }
        }
        return uniqueArr(_array);
    }


    // 传入值必须存在，且长度小于等于1的时候直接返回数组
    if (_array && _array.length <= 1) {
        return _array
    } else {
        if (Array.isArray(_array)) {
            return forArrayFlattern(_array)
        } else {
            return _array;
        }
    }


    // 数组去重
    function uniqueArr(_array) {
        var temp = [];
        var emptyObjectMark = true; // 标识位
        var NaNObjectMark = true; // 标识位
        //遍历当前数组
        for (var a = 0, b = _array.length; a < b; a++) {
            // 标识位的作用就是用来判断是否存在NaN和空对象,第一次找到保留到新数组中
            // 然后标识位置改为false是为了再次找到的时候不推入数组
            if (isEmptyObject(_array[a])) {
                emptyObjectMark && temp.indexOf(_array[a]) == -1 ? temp.push(_array[a]) : '';
                emptyObjectMark = false;
            } else if (_array[a] !== _array[a]) {
                NaNObjectMark && temp.indexOf(_array[a]) == -1 ? temp.push(_array[a]) : '';
                NaNObjectMark = false;
            } else {
                temp.indexOf(_array[a]) === -1 ? temp.push(_array[a]) : '';
            }
        }
        return temp;
    }
}


//测试
let arr = [1, 1, [['true', true, true, [5, 'F'], false], undefined], null, null, [undefined, NaN, {}, '{}'], {}, '{}', 0, 1, 'a','a', NaN];
console.log(uniqueArrayWithFlattern(arr));