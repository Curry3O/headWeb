let weakmap = new WeakMap();
(function(){
    let o = {n: 1};
    weakmap.set(o, "A");
})();  // here 'o' key is garbage collected

let s = {m: 1};
weakmap.set(s, "B");
weakmap.set(1, "2"); //TypeError: Invalid value used as weak map key
console.log(weakmap.has(s)); //true
console.log(weakmap.get(s)); //B
console.log(...weakmap); // exception thrown
weakmap.delete(s);
weakmap.clear(); // Exception, no such function
let weakmap_1 = new WeakMap([[{}, 2], [{}, 5]]); //this works
console.log(weakmap_1.size); //undefined