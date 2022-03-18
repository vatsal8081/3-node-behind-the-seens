const fs = require('fs');

// 2
setTimeout(() => console.log('timer 1'), 0)
// 3
setImmediate(() => console.log('immideat 1'))

// 1
console.log('top level code');

fs.readFile('./data.txt', 'utf-8', () => {
    // 4
    console.log('I/O');

    // 6
    setTimeout(() => console.log('timer 2'), 0)
    // 8
    setTimeout(() => console.log('timer 3'), 3000)
    // 7
    setImmediate(() => console.log('immideat 2'))
    // 5
    process.nextTick(() => console.log('Promise resolve or next tick'))
})


// - because the 1 is in top level it will execute the first before anything and the event loop is not started yet.

// now the event loop is started and it is in timer phase so 2 will excecute because it is 0 sec and then 3 will execute but you will say that after timer phase there should be I/O phase so 4 should execute before 3 but it will not heppan because 2 and 3 are not executing in event loop because it's not inside callback as you can see and only code inside callbacks execute in event loop so 2 and 3 will execute in top lavel code.

// when we are in 4 we don't have any callback in timer phase so it moves to I/O phase where we have file to read and after thate 4 clg will log.

// when 4 is done we are in I/O phase so as we know that 5 is    from Promise resolve or nextTick phase so it will execute immidetaly after I/O finish so thats why 6,7,8 not execute there

// then 6,7,8 runs.