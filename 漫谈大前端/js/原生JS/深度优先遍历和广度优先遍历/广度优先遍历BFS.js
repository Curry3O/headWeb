//广度优先遍历BFS
const data = [
    {
        name: 'root',
        children:[
            {
                name: 'a',
                children: [
                    { name: 'b', children: [{ name: 'e' }] },
                    { name: 'c', children: [{ name: 'f' }] },
                    { name: 'd', children: [{ name: 'g' }] },
                ],
            },
            {
                name: 'a2',
                children: [
                    { name: 'b2', children: [{ name: 'e2' }] },
                    { name: 'c2', children: [{ name: 'f2' }] },
                    { name: 'd2', children: [{ name: 'g2' }] },
                ],
            }
        ]
    }
];

//广度遍历, 创建一个执行队列, 当队列为空的时候则结束
function breadthFirstSearch(data){
    let res = [];
    let queue = data;
    while (queue.length > 0) {
        [...queue].forEach( child => {
            queue.shift();
            res.push(child.name);
            child.children && (queue.push(...child.children));
        });
    }
    return res.join(',');
}
console.log(breadthFirstSearch(data));

