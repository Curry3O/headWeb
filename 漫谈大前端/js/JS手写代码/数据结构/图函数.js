//图的封装
function Graph() {
    //存储顶点
    this.vertexes = [];
    //存储边
    this.edges = new Dictionary();

    //添加顶点
    Graph.prototype.addVertex = function(v){
        this.vertexes.push(v);
        this.edges.set(v,[]);
    }
    //添加边(无向图)
    Graph.prototype.addEdge = function(v1,v2){
        this.edges.get(v1).push(v2);
        this.edges.get(v2).push(v1);
    }
    //转成字符串
    Graph.prototype.toString = function(){
        let str = '';
        for(let i=0;i<this.vertexes.length;i++){
            str += this.vertexes[i] + '->';
            let vEdges = this.edges.get(this.vertexes[i]);
            for(let j=0;j<vEdges.length;j++){
                str += vEdges[j] + ' ';
            }
            str += '\n';
        }
        return str;
    }
    //初始化状态颜色(白色:未访问,灰色:被访问但未探索,黑色:被访问且被探索)
    Graph.prototype.initColor = function(){
        let colors = [];
        for(let i=0;i<this.vertexes.length;i++){
            colors[this.vertexes[i]] = 'white';
        }
        return colors;
    }
    //广度优先搜索(BFS)
    Graph.prototype.bfs = function(initV,handler){
        //初始化颜色
        let colors = this.initColor();
        //创建队列
        let queue = new Queue();
        //将顶点加入到队列中
        queue.enqueue(initV);
        //循环从队列中取出元素
        while (!queue.isEmpty()) {
            //从队列取出第一个顶点(并移除队列)
            let v = queue.dequeue();
            //获取和顶点相连的另外顶点
            let vList = this.edges.get(v);
            //将状态设置成灰色
            colors[v] = 'gray';
            //遍历所有顶点并加入到队列中
            for(let i=0;i<vList.length;i++){
                let e = vList[i];
                if (colors[e] == 'white') {
                    colors[e] = 'gray';
                    queue.enqueue(e);
                }
            }
            //访问顶点
            handler(v);
            //被探索过的顶点设置成黑色
            colors[v] = 'black';
        }
    }
    //深度优先搜索(DFS)
    Graph.prototype.dfs = function(initV,handler){
        let colors = this.initColor();
        //从某个顶点开始依次递归访问
        this.dfsVisit(initV,colors,handler);
    }
    //递归遍历顶点(内部使用)
    Graph.prototype.dfsVisit = function(v,colors,handler){
        //将状态设置成灰色
        colors[v] = 'gray';
        //处理v顶点
        handler(v);
        //访问v相连的顶点
        let vList = this.edges.get(v);
        for(let i=0;i<vList.length;i++){
            let e = vList[i];
            if (colors[e] == 'white') {
                this.dfsVisit(e,colors,handler);
            }
        }
        //将v设置成黑色
        colors[v] = 'black';
    }
}

//测试
let graph = new Graph();
let myVertexes = ['A','B','C','D','E','F','G','H','I'];
for(let i=0;i<myVertexes.length;i++){
    graph.addVertex(myVertexes[i]);
}
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');
console.log(graph.toString());


//测试bfs
let resBFS = '';
graph.bfs(graph.vertexes[0],function(v){
    resBFS += v + ' ';
});
console.log(resBFS);


//测试dfs
let resDFS = '';
graph.dfs(graph.vertexes[0],function(v){
    resDFS += v + ' ';
});
console.log(resDFS);




//调用其他函数
//封装字典
function Dictionary() {
    this.item = {};
    //字典中添加键值对
    Dictionary.prototype.set = function (key, value) {
        this.item[key] = value;
    }
    //判断字典中是否有某个key
    Dictionary.prototype.has = function (key) {
        return this.item.hasOwnProperty(key);
    }
    //从字典中移除元素
    Dictionary.prototype.remove = function (key) {
        if (!this.has(key)) {
            return false;
        }
        delete this.item[key];
        return true;
    }
    //根据key获取value
    Dictionary.prototype.get = function (key) {
        return this.has(key) ? this.item[key] : undefined;
    }
    //获取所有key
    Dictionary.prototype.keys = function () {
        return Object.keys(this.item);
    }
    //获取所有的value
    Dictionary.prototype.values = function () {
        return Object.values(this.item);
    }
    //获取字典key长度
    Dictionary.prototype.size = function () {
        return this.keys().length;
    }
    //清除字典
    Dictionary.prototype.clear = function () {
        this.item = {};
    }
}



//封装队列
function Queue() {
    //队列容器
    this.item = [];
    //队列末尾添加元素
    Queue.prototype.enqueue = function (e) {
        this.item.push(e);
    }
    //队列头部删除元素并返回删除元素
    Queue.prototype.dequeue = function () {
        return this.item.shift();
    }
    //返回队列第一个元素
    Queue.prototype.front = function () {
        return this.item[0];
    }
    //判断队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.item.length == 0;
    }
    //返回队列长度
    Queue.prototype.size = function () {
        return this.item.length;
    }
    //将队列内元素以字符串形式输出
    Queue.prototype.toString = function () {
        var res = '';
        for (let i = 0; i < this.item.length; i++) {
            res += this.item[i] + '';
        }
        return res;
    }
}