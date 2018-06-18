const http = require('http')
const port = 3000
const fs = require('fs')
const path = require('path')

const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('hello')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if(err) {
        return console.log('error', err)
    }
    console.log(`server is listening on ${port}`)
})