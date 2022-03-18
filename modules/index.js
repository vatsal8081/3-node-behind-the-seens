// 1 
// as you know that in the node all js files are modules and node wrap this module in one immideatly executable wrapper function so when we log the arguments which is global onject in js we will get all those arguments used by the main wrapper function
console.log('wrapper afguments', arguments);
// where 1 is export, 2 is require, 3 is module, 4 is __filename, 5 is __dirname

// 2 
// we can see this wrapper function how it looks like by loging wrapper method of one builtin module of node cald module
console.log('main wrapper function', require('module').wrapper);


// 3 
// when we use the commenJs module system we have few ways to export and import the things from one to other module 

// then we can catch exported thing from one module to other in variable
const calculatorModule = require('./module-one')

const calc = new calculatorModule()

console.log('addd from one', calc.add(5, 5));

// 4
// we can require the module and it will give same object which we exported from module so we can exported things as onject
const calculatorModuleTwo = require('./module-two')
console.log('add from two', calculatorModuleTwo.add(5, 5));


// 5
// we can require the directly added things to export just the way we did in module two
const calculatorModuleThree = require('./module-three')
console.log('add from three', calculatorModuleThree.add(5, 5));


// 6
//  as you know the node do caching for module imports that mins it only load module one time no matter how many time you require it in same file it load it again only it find any change in it
// to prove this we added log in module top level and import it multiple times we will see the main log only one time 

require('./module-four')()
require('./module-four')()
require('./module-four')()
require('./module-four')()

// as you can see no matter how many times we require the module the module loded will come once.