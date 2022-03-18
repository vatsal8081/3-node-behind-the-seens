const fs = require('fs')
const crypto = require('crypto')

process.env.UV_THREADPOOL_SIZE = 1
console.log('0000', process.env.UV_THREADPOOL_SIZE);

fs.readFile('./data.txt', 'utf-8', () => {
    console.log('I/O');


    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log('pass 1 encrypted');
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log('pass 2 encrypted');
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log('pass 3 encrypted');
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log('pass 4 encrypted');
    })

    setImmediate(() => console.log('immideate'))
})


// hear you can see the I/O done first then we have crypto module use to incrypt string which bellongs to Promise Resolve phase then setImmidiate.

// after I/O because the crypto is Promise Resolve phase it should run but because it is not executed yet it's working still so it is not in the promise Resolve queus yet so after Io we have immidate phase so it get executed and then in future this crypto comes in queus so it gets executed.

// the crypto is one of the heavy tasks so it ofload to libvu thread pools.

// one thing to keep in mind hear is when the console of cryptos come all 4 comes exzet in same time not one after some time then another because as we know the libuv thread pool has 4 threads so event loop can assign each process to each thread so they will execute in same time not one after another.

// we also discuss that we can chnage the thread pools thread size which is possible by process global objects env key and in there there is UV_THREADPOOL_SIZE key which can be change to any number from 1 to 128  
