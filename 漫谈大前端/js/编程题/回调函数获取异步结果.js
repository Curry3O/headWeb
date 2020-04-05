//回调函数:获取异步结果
function add(x,y,callback){
    setTimeout(function(){
        let res = x + y;
        //执行回调函数
        callback(res);
    },1000);
}

//回调函数作为参数传入
add(10,20,function(res){
    console.log(res);
});