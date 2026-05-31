const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'public', 'index.html')
    fs.readFile(filePath, (err, content) => {
      if (err) { res.writeHead(500); res.end('Error'); return }
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(content)
    })
  } else {
    res.writeHead(404)
    res.end('No encontrado')
  }
})

function start(port = PORT) {
  return new Promise(resolve => server.listen(port, resolve))
}

if (require.main === module) {
  start().then(() => console.log(`Servidor en http://localhost:${PORT}`))
}

module.exports = { server, start }
// optimización: cache en memoria
