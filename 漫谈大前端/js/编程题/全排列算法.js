//全排列算法
function permutate(str) {
    var result = [];
    if (str.length == 1 || str.length == 0) {
        result.push(str);
        return result;
    } else {
        var left = str[0];
        var rest = str.slice(1);
        var preResult = permutate(rest);
        for (var i = 0; i < preResult.length; i++) {
            for (var j = 0; j < preResult[i].length + 1; j++) {
                var tmp = preResult[i].slice(0, j) + left + preResult[i].slice(j, preResult[i].length);
                result.push(tmp);
            }
        }
    }
    return result;
}
console.log(permutate('abc'));