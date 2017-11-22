const lessMain = require('../less/main.less');//引入样式
// var greeter = require('./Greeter.js');
// document.querySelector("body").appendChild(greeter());
// console.log(23456711222334545)
const mainTpl = require('../tpl/main.juicer');//引入样式
// const aa = mainTpl();
console.log(mainTpl())
document.querySelector("body").append(mainTpl())