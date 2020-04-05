//题目：实现将句中的所有单词颠倒输出(句中只有空格和单词)
//例如输入：'Nice To Meet You'，输出：'You Meet To Nice'

function reverseStr(str) {
    var res = "";
    var stack = [];
    var arr = str.split(' ');
    for (var i = 0; i < arr.length; i++) {
        var reg = new RegExp("", "g");
        arr[i] = arr[i].replace(reg, "");
    }
    for (var i = 0; i < arr.length; i++) {
        stack.unshift(arr[i]);
    }
    res = stack.join(" ");
    return res;
}
console.log(reverseStr('Nice To Meet You'));
