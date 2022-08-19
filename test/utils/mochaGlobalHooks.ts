import * as mocha from 'mocha'
import { createServer } from 'http-server'
import * as http from 'http'

let httpd: http.Server

mocha.before(() => {
  startHttpTestServer()
})

mocha.after(() => {
  stopHttpTestServer()
})

function startHttpTestServer() {
  httpd = createServer({
    root: '.',
  })
  httpd.listen(8080)
}

function stopHttpTestServer() {
  httpd.close()
}
