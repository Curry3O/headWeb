//题目：给定一个数组，找出数组里出现次数最多的字符串。例如：['abc','tr','ff','abc'],输出结果：'abc'

function mostStr(arr){
    var obj = {};
    var res = '';
    var strArr = [];
    for(var i=0;i<arr.length;i++){
        var value = arr[i];
        if (obj[value]) {
            obj[value] ++;
        }else{
            obj[value] = 1;
        }
    }
    for(var key in obj){
        strArr.push(obj[key]);
    }
    strArr.sort(function(a,b){
        return a < b ? 1 : -1;
    });
    var max = strArr[0];
    var arrs = [];
    for(var item in obj){
        if (obj[item] == max) {
            arrs.push(item);
        }
    }
    res = arrs.join(',');
    return res;
}
console.log(mostStr(['abc','fb','jk','abc','fb']));
