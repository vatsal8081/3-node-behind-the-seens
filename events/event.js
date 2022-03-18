// 1 
// as we discussed we can create our own events then listern to them and also we can listern to all the events emited by node.

// to create and listern to our own events we will need events module from node whic will return the event emitter class and we can create new instance on the class and use that instance to create and listern to events.

// all node modules internally extends this event emitter class and emit events with it.

const eventEmitter = require('events')
const http = require('http')

const myEvent = new eventEmitter();


// 3
// we can listern to specific event by on method in events. so when we see on in node code that misn we are listerning to any event. we have to provide unique name and we will get the payload in callback if provided by emit

// keep in mind we can only lister to events which are emited by same object so we can listern to customEvent only if it is emited by myEvent and listern by myEvent.
myEvent.on('customEvent', () => console.log('custom event fired'))

myEvent.on('customEvent', ({ name }) => console.log(`custom event fire two name: ${name}`))

// 2
// we can create the custom event by emit method and providing the unique name we can also provide optional payload if we want with emit to use in listern.

myEvent.emit('customEvent', { name: 'vatsal patel' })




// //////////////////////////////////////////////

// 4
// we can also listern to node internal events and we don't need any event module for it because as we learn before every node module extend EventEmitter class so the on and emit method will be avalable in any instance on node module

// let's listern to request emit for http module which will be emited on every request come in server.

// before this we use callback to execute when any request come to our server but now we will use event insted of callback.

const server = http.createServer();

server.listen(3000, '127.0.0.1', () => console.log('listrning on 3000'))

server.on('request', (req, res) => res.end('hittt...'))


