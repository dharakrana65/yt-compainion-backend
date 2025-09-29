import http from 'http';
import app from './app';

const server = http.createServer(app);

server.listen(4000,"0.0.0.0",() => console.log(`server running on url http://0.0.0.0:4000/`))