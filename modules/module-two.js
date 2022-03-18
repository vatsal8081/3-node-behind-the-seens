const add = (a, b) => a + b

const multiply = (a, b) => a * b

// if we want to export multiple things we can create a object and export it because commonJs module not supports named exports as ES modules.
module.exports = { add, multiply }