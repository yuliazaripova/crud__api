import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './resources/users/users.controller';
import METHOD from './common/constants';
import errorMessage from './common/errors';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
   
    if (req.url === '/api/users' && req.method === METHOD.GET) {
      getUsers(req, res);
    } else if (req.url && req.url.match(/\/api\/users\/([a-zA-Z0-9]+)/) && req.method === METHOD.GET) {
      const id = req.url.split('/')[3];
      getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === METHOD.POST) {
      createUser(req, res);
    } else if (req.url && req.url.match(/\/api\/users\/([a-zA-Z0-9]+)/) && req.method === METHOD.PUT) {
      const id = req.url.split('/')[3];
      updateUser(req, res, id);
    } else if (req.url && req.url.match(/\/api\/users\/([a-zA-Z0-9]+)/) && req.method === METHOD.DELETE) {
      const id = req.url.split('/')[3];
      deleteUser(req, res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[404] }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
