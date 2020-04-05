//封装二叉搜索树
function BinarySearchTree(){
    function Tnode(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    this.root = null;
    //插入数据
    BinarySearchTree.prototype.insert = function(key){
        let newTnode = new Tnode(key);
        if (this.root == null) {
            this.root = newTnode;
        }else{
            this.insertNode(this.root,newTnode)
        }
    }
    //插入数据(内部使用)
    BinarySearchTree.prototype.insertNode = function(node,newNode){
        if (newNode.key < node.key) {
            if (node.left == null) {
                node.left = newNode;
            }else{
                this.insertNode(node.left,newNode)
            }
        }else{
            if (node.right == null) {
                node.right = newNode;
            }else{
                this.insertNode(node.right,newNode)
            }
        }
    }
    //先序遍历
    BinarySearchTree.prototype.preOrder = function(handler){
        this.preOrderNode(this.root,handler);
    }
    //先序遍历(内部使用)
    BinarySearchTree.prototype.preOrderNode = function(node,handler){
        if (node != null) {
            handler(node.key);
            this.preOrderNode(node.left, handler);
            this.preOrderNode(node.right, handler);
        }
    }
    //中序遍历
    BinarySearchTree.prototype.midOrder = function (handler) {
        this.midOrderNode(this.root, handler);
    }
    //中序遍历(内部使用)
    BinarySearchTree.prototype.midOrderNode = function (node, handler) {
        if (node != null) {
            this.midOrderNode(node.left, handler);
            handler(node.key);
            this.midOrderNode(node.right, handler);
        }
    }
    //后序遍历
    BinarySearchTree.prototype.postOrder = function (handler) {
        this.postOrderNode(this.root, handler);
    }
    //后序遍历(内部使用)
    BinarySearchTree.prototype.postOrderNode = function (node, handler) {
        if (node != null) {
            this.postOrderNode(node.left, handler);
            this.postOrderNode(node.right, handler);
            handler(node.key);
        }
    }
    //获取最小值
    BinarySearchTree.prototype.min = function(){
        let node = this.root;
        while(node.left != null){
            node = node.left;
        }
        return node.key;
    }
    //获取最大值
    BinarySearchTree.prototype.max = function () {
        let node = this.root;
        while(node.right != null){
            node = node.right;
        }
        return node.key;
    }
    //搜索特定值
    BinarySearchTree.prototype.search = function(key){
        return this.searchNode(this.root,key);
    }
    //搜索特定值(内部使用)
    BinarySearchTree.prototype.searchNode = function (node,key) {
        if (node == null) {
            return false;
        }
        if (node.key > key) {
            return this.searchNode(node.left,key);
        }else if (node.key < key) {
            return this.searchNode(node.right,key);
        }else{
            return true;
        }
    }
    //删除节点
    BinarySearchTree.prototype.remove = function(key){
        let current = this.root;
        let parent = null;
        let isLeftChild = true;
        while (current.key != key) {
            parent = current;
            if (key < current.key) {
                current = current.left;
                isLeftChild = true;
            }else{
                current = current.right;
                isLeftChild = false;
            }
            if (current == null) {
                return false;
            }
        }
        //删除叶子节点
        if (current.left == null && current.right == null) {
            if (current == this.root) {
                this.root = null;
            }else if (isLeftChild) {
                parent.left = null;
            }else{
                parent.right = null;
            }
        }else if (current.right == null) {
            if (current == this.root) {
                this.root = current.left;
            }
            if (isLeftChild) {
                parent.left = current.left;
            }else{
                parent.right = current.left;
            }
        }else if (current.left == null) {
            if (current == this.root) {
                this.root = current.right;
            }
            if (isLeftChild) {
                parent.left = current.right;
            }else{
                parent.right = current.right;
            }
        }else{
            //获取后继节点
            let successor = this.getSuccessor(current);
            if (current == this.root) {
                this.root = successor;
            }else if (isLeftChild) {
                parent.left = successor;
            }else{
                parent.right = successor;
            }
            successor.left = current.left;
        }
    }
    //后继节点(内部使用)
    BinarySearchTree.prototype.getSuccessor = function(delNode){
        let successor = delNode;
        let current = delNode.right;
        let successorParent = delNode;
        while (current != null) {
            successorParent = successor;      
            successor = current;
            current = current.left;
        }
        if (successor != delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }
        return successor;
    }
}

//测试
let bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
bst.remove(7);


//测试先序遍历
let res1 = '';
bst.preOrder(function(key){
    res1 += key + ' ';
});
console.log(res1);


//测试中序遍历
let res2 = '';
bst.midOrder(function (key) {
    res2 += key + ' ';
});
console.log(res2);


//测试后序遍历
let res3 = '';
bst.postOrder(function (key) {
    res3 += key + ' ';
});
console.log(res3);
console.log(bst.min());
console.log(bst.max());
console.log(bst.search(20));
