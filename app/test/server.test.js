const assert = require('node:assert/strict')
const { describe, it, before, after } = require('node:test')

describe('Servidor', () => {
  let server

  before(() => { process.env.NODE_ENV = 'test'; server = require('../server') })
  after(() => { server.close() })

  it('deberia responder 200 en /', async () => {
    const res = await fetch('http://localhost:3000/')
    assert.equal(res.status, 200)
  })

  it('deberia responder 404 en rutas inexistentes', async () => {
    const res = await fetch('http://localhost:3000/no-existe')
    assert.equal(res.status, 404)
  })
})
