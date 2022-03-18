const fs = require('fs')
const crypto = require('crypto')

fs.readFile('./data.txt', 'utf-8', () => {
    console.log('I/O');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log('pass 1 encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log('pass 2 encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log('pass 3 encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
    console.log('pass 4 encrypted');


    setImmediate(() => console.log('immideate'))
})


// as you can see this is the blocking code example which we should avoid

// because we using sync versions not async so all crypto execute one after another insted of all in same time which was the case in ofload so we was getting the all clgs in same time but because it's sync version it is executing inside event loop insted of thread pool so it's bloacking the event loop to execute further so after one get execute onother one get chance to execute.

// so that's why it's our responsablity to identify which code will execute in event loop and which in thread pool and only right code that not block the main event loop.