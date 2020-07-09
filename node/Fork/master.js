const fork = require('child_process').fork;
const cpus = require('os').cpus();
const net = require('net');

const list = [];
for (let i = 0; i < cpus.length; i++) {
    const child = fork('./worker.js')
    list.push(child)
}

const server = net.createServer()

server.listen(8080, () => {
    list.forEach(child => {
        child.send('server', server)
    })
    server.close()
})