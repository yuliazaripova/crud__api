import * as User from './users.model';
import errorMessage from '../../common/errors';
import { getPostData, isUUID, valideteObj } from '../../common/entities';
import { ServerResponse, IncomingMessage } from 'http';

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await User.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!isUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    } else {
      const user = await User.findById(id);
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person with this id not found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req);
    if (!body.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.requiredFields }));
    } else {
      const user = JSON.parse(body);

      const isValid = valideteObj(user);

      if (!isValid) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: errorMessage.requiredFields }));
      } else {
        const newUser = await User.createUser(user);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newUser));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

export async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!isUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    } else {
      const user = await User.findById(id);

      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: errorMessage.idNotFound }));
      } else {
        const body = await getPostData(req);
        const newUser = JSON.parse(body);
        const updUser = await User.updateUser(id, { ...user, ...newUser });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(updUser));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!isUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    } else {
      const user = await User.findById(id);
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: errorMessage.idNotFound }));
      } else {
        await User.deleteUser(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}
