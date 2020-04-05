//使用 stack 无限反嵌套多层嵌套数组
function flattenDeep(arr){
    const stack = [...arr];
    const res = [];
    while(stack.length){
        //使用 pop 从 stack 中取出并移除值
        const next = stack.pop();
        if(Array.isArray(next)){
            //使用 push 送回内层数组中的元素，不会改变原始输入
            stack.push(...next);
        }else{
            res.push(next);
        }
    }
    //使用 reverse 恢复原数组的顺序
    return res.reverse();
}

const arr = [1, 2, [3], [4, 5, 6, [7, [8, 9]]]];
console.log(flattenDeep(arr));