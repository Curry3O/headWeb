//题目：给出长度一样并含有相同字符的两字符串A、B，需要将A字符串转成跟B一样的字符串，并且每次移动只能将A字符串的字符移到第一位，返回最少移动次数。例如：输入字符串A：'ABC',B:'CAB',返回1。因为只需移动一次，只要将C移动到第一位就行。又例如输入A:'BCAD',B:'ACBD',返回3。因为:BCAD ==> ABCD，ABCD ==> CABD，CABD ==> ACBD.
function tranStr(A,B){
    var a = A.split('');
    var b = B.split('');
    var count = 0;
    var i = a.length - 1;
    while (a != b && i >= 0) {
        if (a[i] != b[i]) {
            var t = a.splice(i,1);
            a.unshift(t[0]);
            count ++;
        }
        if (a[i] == b[i]) {
            i--;
        }
    }
    return count;
}

//测试
console.log(tranStr('EABCD', 'AEDBC'));