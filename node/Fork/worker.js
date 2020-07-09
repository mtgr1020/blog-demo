const http = require('http')
const process = require('process')

const server = http.createServer(
    (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
        })
        res.end(`handle by child ${process.pid}`)
    }
)

console.log(process.pid)

process.on('message', (m, tcp) => {
    if (m === 'server') {
        // 建立新的 TCP 流时会触发此事件
        tcp.on('connection', socket => {
            // 让工作进程去处理连接请求
            server.emit('connection', socket)
        })
    }
})
