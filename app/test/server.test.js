const assert = require('node:assert/strict')
const { describe, it, before, after } = require('node:test')

let server, baseUrl

before(async () => {
  server = require('../server')
  await new Promise(resolve => server.listen(0, resolve))
  const { port } = server.address()
  baseUrl = `http://localhost:${port}`
})

after(() => { server.close() })

describe('Servidor', () => {
  it('deberia responder 200 en /', async () => {
    const res = await fetch(baseUrl + '/')
    assert.equal(res.status, 200)
  })

  it('deberia responder 404 en rutas inexistentes', async () => {
    const res = await fetch(baseUrl + '/no-existe')
    assert.equal(res.status, 404)
  })
})
