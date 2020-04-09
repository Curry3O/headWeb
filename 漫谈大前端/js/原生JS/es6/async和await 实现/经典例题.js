async function test1() {
    console.log('1');
    console.log(await test2());
    console.log('7');
}

async function test2() {
    console.log('2');
    return '6'
}

test1().then(res => {
    console.log('9')
    return '10'
}).then(res => {
    console.log(res)
})

console.log('3');

setTimeout(() => {
    console.log('11');
}, 0);

new Promise((resolve, reject) => {
    console.log('promise1')
    resolve()
}).then(() => {
    console.log('then1')
    new Promise((resolve, reject) => {
        console.log('promise2')
        resolve()
    }).then(() => {
        console.log('then11')
    }).then(() => {
        console.log('then12')
    }).then(() => {
        console.log('then13')
    })
}).then(() => {
    console.log('then14')
}).then(() => {
    console.log('then15')
})
console.log('5');

/* 
输出：
    1
    2
    3
    promise1
    5
    then1
    promise2
    then11
    then14
    6
    7
    then12
    then15
    9
    then13
    10
    11
*/