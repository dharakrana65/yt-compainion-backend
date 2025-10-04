import http from 'http';
import app from './app';
import { generateResponse } from './services/aiTasks.service';
// import ociClient from './utils/ociClient'

const server = http.createServer(app);

const response = generateResponse();
response.then((data) => {
  console.log(data);
});
server.listen(4000,"0.0.0.0",() => console.log(`server running on url http://0.0.0.0:4000/`))