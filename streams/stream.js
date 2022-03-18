const fs = require('fs')
const server = require('http').createServer()

server.listen(3000, '127.0.0.1', () => console.log('listrning on 3000....'))


// 1 
// there are many ways with which we can handle the streaming in node and we will see some the the main ways of them

server.on('request', (req, res) => {
    console.log('hittt');

    // 2
    // solutation 1
    // this is the simplest solutation which we was using before hear we are reading whle file and we will load it in data variable in memory and then we will send it to user as response
    // but we know that this readFile will be async and will pufform in thread pool insted of in main thread so it will not block the main thread but as we know the data file is to large so that's why reading it can take time so for that time our therad pool's one therad will stay busy and along whit that because we are loading all this data in data variable it will store in memory so when the app will be in production on on in local because of to mutch resourse use our app can become out of resorce very quickly and can stop working of can cresh. so it's not a good idea to load this big data into memory.

    // fs.readFile('./data.txt', (err, data) => {
    //     res.end(data)
    // })

    // 3
    // solutation 2
    // now we will use the streaming in node to read and wright data so it's not loaded all at time and can become resorce friendly

    // we can create redable stream of file by createReadStream functioon in fs module.
    // we can listern on data, end and err events on redable stream object bocause as you know the stream is listance of event emitter class

    const redableDataFileStream = fs.createReadStream('./data.txt')

    // we can get chuck of data in data emit from stream and as you know that response in node is instance on writeable stream so we can use write method in res to write in stream of response.

    // redableDataFileStream.on('data', chunk => {
    //     res.write(chunk)
    // })

    // on end of file reading we have to end the response stream so it can send the data to user.

    // redableDataFileStream.on('end', () => {
    //     res.end()
    // })

    // we can also listern to any error event if auccor in stream stream.

    // redableDataFileStream.on('error', (err) => {
    //     console.log('err on redable stream', err);
    // })

    // but also hear is one problem which we cannot see it is the back pressure problem 
    // this will auccor when we are reading a stream and writing it to other stream and we are not able to write in stream as fast as we are resiving from reading stream.
    // hear it's the same case the reading from file is to much faster in steram but we need some time to writhe that data in to response in writing stream


    // 4
    // solutation 3
    // to avoid this kind of back presure we can use the pipe method in redable stream this pipe method takes care of speed of both read and wrigth.
    // the pipe method is alwase avalable in any redable steram and it takes writable stream object as argument where it can run write function
    // the argument can be any writable of duplex stream it just taht a stream shoud be writable.

    redableDataFileStream.pipe(res)

    // yse it's that simple it workes just same in every redable stream it just need the writable stream object and it will internally execute the data, end and error events for redable stream and on end of redable stream it will execute the end method of writable stream automatically.

    // so it's best to leave all this to handle by node and we just use pipe in most of the senarios.
})
