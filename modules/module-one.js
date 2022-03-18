class Calculator {

    add(a, b) {
        return a + b
    }

    multiply(a, b) {
        return a * b
    }
}

// simplest and most used way is to assign the thing which you want to export from module to module.exports 

module.exports = Calculator