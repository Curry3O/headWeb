//深度优先遍历DFS
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

// 深度遍历, 使用递归
function deepFirstSearch(data) {
    const result = [];
    data.forEach((item)=>{
        const find = items =>{
            result.push(items.name);
            items.children && items.children.forEach(child => find(child));
        }
        find(item);
    });
    return result.join(',');
}
console.log(deepFirstSearch(data));