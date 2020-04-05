let obj = {
    age: 20,
    info: function () {
        return () => {
            //this继承的是外层上下文绑定的this
            console.log(this.age)
        }
    }
}
let person = {
    age: 28
};

//this指向obj里的age
let info = obj.info();
info(); //20

//this指向全局的age
let info2 = obj.info.call(person);
info2(); //28