//题目：至少连续出现四个一样数字或者至少出现四个数的'顺子'的电话号码被称为靓号。判断输入的号码是不是靓号，是返回'Y',不是返回'N'。例如输入：13865333326，返回'Y'；输入：18722345832，返回'Y'；输入：18279653689，返回'N'。

function isNiceNum(nums) {
    if (typeof nums == 'number') {
        var s = nums.toString();
    } else if (typeof nums == 'string') {
        var s = nums;
    } else {
        return 'N';
    }
    var len = s.length;
    var i = 0;
    var count1 = 0;
    var count2 = 0;
    var temp;
    while (i < len) {
        temp = s[i];
        for (var j = i + 1; j < len; j++) {
            if (temp == s[j]) {
                count1++;
            } else {
                break;
            }
        }
        for (var j = i + 1; j < len; j++) {
            if (temp == s[j] - 1) {
                count2++;
                temp = s[j];
            } else {
                break;
            }
        }
        if (count1 >= 4 || count2 >= 4) {
            return 'Y';
        }
        i++;
    }
    return 'N';
}

//测试
console.log(isNiceNum('13865333326'));
