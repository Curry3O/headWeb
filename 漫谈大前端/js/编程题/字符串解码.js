//题目:
/* 
给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_ string]， 表示其中方括号内部的encoded.string正好重复k次。注意k保证为正整数。
你可以认为输入字符串总是有效的;输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数k，例如不会出现像3a或2[4]的输入。 
示例：
s = "3[a]2[bc]", 返回: "aaabcbc"
s = "3[a2[c]]", 返回: "accaccacc"
s = "2[abc]3[cd]ef", 返回: "abcabccdcdcdef"
*/

//思路:1.在中括号层次比较深的情况下，如何完成回溯，将当前的字符与之前的字符拼接。2.当出现次数并不是个位数，而是类似100，1000 这样的多位数，如何来解析。


//方法一：利用栈
/* 
    首先有两个重要的变量， 表示重复次数的 multi 值和累积字符串 res。
    1. 遇到数字, 直接参加计算，累积multi值。
    2. 遇到普通字符(除[, ] 外)， 累积到 res 后面。
    3. 遇到[, 将之前累积的字符串res压栈， 当前multi值压到另一个栈。 然后当前 multi归零， res置空。
    4. 遇到], 取出栈中multi值， 将当前的 res 字符串重复 multi 次， 赋值给临时变量tmp， 然后让另一个存放累积字符串的栈中弹出栈顶元素和当前的tmp拼接， 作为最新的累积字符串赋值给res。
*/

var decodeString = function (s) {
    // 存放 【重复次数】 的栈
    let countStack = [];
    // 存放 【累积字符串】 的栈
    let resStack = [];
    // 用来累积的字符串 res
    let res = "";
    // 表示重复次数
    let multi = 0;
    for (let i = 0; i < s.length; i++) {
        let cur = s.charAt(i);
        if (cur == '[') {
            // 双双压栈，保存了当前的状态
            countStack.push(multi);
            resStack.push(res);
            // 纷纷置空，准备下面的累积
            multi = 0;
            res = "";
        } else if (cur == ']') {
            // 遇到 ]，表示累积结束，要算账了。
            // 【当前的串出现多少次】还保存在栈中，把它取出来
            let count = countStack.pop();
            let temp = "";
            // 让 [ 和 ] 之间的字符串(就是累积字符串res)重复 count 次
            for (let i = 0; i < count; i++) {
                temp += res;
            }
            // 和前面已经求得的字符串进行拼接
            res = resStack.pop() + temp;
        } else if (cur >= '0' && cur <= '9') {
            // multi累积
            multi = multi * 10 + (cur - '0');
        } else {
            // 字符累积
            res += cur;
        }
    }
    return res;
};

//测试
console.log(decodeString("3[a2[c]]"));



//方法二：利用递归程序
//思路：递归的思路就容易一点，一旦遇到[，立马进入新的递归程序，扫描到对应的]为止。也就是说，凡是遇到括号，括号里面的事情，全部交给子程序完成。

var decodeString2 = function (s) {
    // 从第 0 个元素开始处理
    return dfs(s, 0);
};

let dfs = (s, n) => {
    let res = "";
    // 保存起始索引
    let i = n;
    // 同上，表示重复的次数
    let multi = 0;
    while (i < s.length) {
        let cur = s.charAt(i);
        // 遇到数字，累积 multi 值
        if (cur >= '0' && cur <= '9')
            multi = multi * 10 + (cur - '0');
        else if (cur === '[') {
            // 划重点！给子程序，把对应的 ] 索引和括号包裹的字符串返回
            // 即tmp 的格式为 [索引，字符串]
            let tmp = dfs(s, i + 1);
            // 这样下次遍历就是从对应的 ] 后面遍历了，因为当前已经把括号里面的处理完了
            i = tmp[0];
            // 需要重复的字符串已经返回来了
            let repeatStr = tmp[1];
            for (let j = 0; j < multi; j++) {
                res += repeatStr;
            }
            // 当前已经把括号里面的处理完，multi 置零，为下一轮遍历准备
            multi = 0;
        } else if (cur === ']') {
            // 遇到了对应的 ] ，返回 ] 索引和括号包裹的字符串
            return [i, res];
        } else {
            res += cur;
        }
        // 继续遍历
        i++;
    }
    return res;
}

//测试
console.log(decodeString2("2[abc]3[cd]ef"));

/* 
总结：
1.考察对栈这种数据结构的理解
2.考察字符串的基本操作， 涉及对编程语言的考察
3.考察对递归和回溯思想的理解。(其实字符串拼接就是向前回溯的过程)
*/
