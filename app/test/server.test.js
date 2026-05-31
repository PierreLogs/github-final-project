const assert = require('node:assert/strict')
const { describe, it, before, after } = require('node:test')

describe('Servidor', () => {
  let baseUrl, app

  before(async () => {
    app = require('../server')
    await app.start()
    const { port } = app.server.address()
    baseUrl = `http://localhost:${port}`
  })

  after(() => { app.server.close() })

  it('deberia responder 200 en /', async () => {
    const res = await fetch(baseUrl + '/')
    assert.equal(res.status, 200)
  })

  it('deberia responder 404 en rutas inexistentes', async () => {
    const res = await fetch(baseUrl + '/no-existe')
    assert.equal(res.status, 404)
  })
})
