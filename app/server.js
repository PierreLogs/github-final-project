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

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Servidor en :${PORT}`))
}

module.exports = server
