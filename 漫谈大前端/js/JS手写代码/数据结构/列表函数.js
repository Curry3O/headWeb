//封装列表类
function ArrayList(){
    this.array = [];
    //插入元素
    ArrayList.prototype.insert = function(item){
        this.array.push(item);
    }
    //转成字符串
    ArrayList.prototype.toString = function(){
        return this.array.join('-');
    }
    //实现排序算法
    //交换两个位置的数据
    ArrayList.prototype.swap = function(m,n){
        let temp = this.array[m];
        this.array[m] = this.array[n];
        this.array[n] = temp;
    }
    //冒泡排序
    ArrayList.prototype.bubbleSort = function(){
        for(let i=this.array.length-1;i>=0;i--){
            for(let j=0;j<i;j++){
                if (this.array[j] > this.array[j+1]) {
                    this.swap(j,j+1);
                }
            }
        }
    }
    //选择排序
    ArrayList.prototype.selectSort = function () {
        let length = this.array.length;
        for(let i=0;i<length-1;i++){
            let min = i;
            for(let j=min+1;j<length;j++){
                if (this.array[min] > this.array[j]) {
                    min = j;
                }
            }
            this.swap(min,i);
        }
    }
    //插入排序
    ArrayList.prototype.insertSort = function(){
        let length = this.array.length;
        for(let i=1;i<length;i++){
            let temp = this.array[i];
            let j = i;
            while(this.array[j - 1] > temp && j > 0){
                this.array[j] = this.array[j - 1];
                j -= 1;
            }
            this.array[j] = temp;
        }
    }
    //希尔排序
    ArrayList.prototype.shellSort = function(){
        let length = this.array.length;
        //初始化间隙gap
        let gap = Math.floor(length / 2);
        while (gap >= 1) {
            for(let i=gap;i<length;i++){
                let temp = this.array[i];
                let j = i;
                while (this.array[j - gap] > temp && j > gap - 1) {
                    this.array[j] = this.array[j - gap];
                    j -= gap;
                }
                this.array[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
    }
    //快速排序
    //选择枢纽
    ArrayList.prototype.median = function(left,right){
        let center = Math.floor((left + right) / 2);
        if (this.array[left] > this.array[center]) {
            this.swap(left,center);
        }
        if (this.array[center] > this.array[right]) {
            this.swap(center,right);
        }
        if (this.array[left] > this.array[center]) {
            this.swap(left,center);
        }
        this.swap(center,right - 1);
        return this.array[right - 1];
    }
    //快速排序实现
    ArrayList.prototype.quickSort = function(){
        this.quick(0,this.array.length - 1);
    }
    //快速排序(内部使用)
    ArrayList.prototype.quick = function(left,right){
        //结束条件
        if (left >= right) {
            return
        }
        //获取枢纽
        let pivot = this.median(left,right);
        //定义变量记录当前位置
        let i = left;
        let j = right - 1;
        while (true) {
            while (this.array[++i] < pivot) {}
            while (this.array[--j] > pivot) {}
            if (i < j) {
                this.swap(i,j);
            }else{
                break
            }
        }
        //将枢纽放置在正确位置
        if (i < right - 1) {
            this.swap(i,right - 1);
        }
        //分而治之(左边或右边的数量大于2时才递归调用)
        if (i - left > 2) {
           this.quick(left,i - 1); 
        }else{
            if (this.array[left] > this.array[i - 1]) {
                this.swap(left,i - 1);
            }
        }
        if (right - i > 2) {
            this.quick(i + 1,right);
        }else{
            if (this.array[i + 1] > this.array[right]) {
                this.swap(right,i + 1)
            }
        }
        
        
    }
}
let aList = new ArrayList();
aList.insert(66);
aList.insert(78);
aList.insert(13);
aList.insert(59);
aList.insert(7);
aList.insert(24);
aList.insert(30);
aList.quickSort();
console.log(aList.toString());