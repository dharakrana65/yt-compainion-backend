import http from 'http';
import app from './app';
import ociClient from './utils/ociClient'

const server = http.createServer(app);
console.log(ociClient)

server.listen(4000,"0.0.0.0",() => console.log(`server running on url http://0.0.0.0:4000/`))