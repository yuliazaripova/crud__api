import { IncomingMessage, ServerResponse } from 'http';
import { version, validate } from 'uuid';
import { IUser } from '../resources/users/UserDTO';
import errorMessage from './errors';

export const isUUID = (id: string) => validate(id) && version(id) === 4;

export const valideteUUID = (id: string, res: ServerResponse) => {
  if (!isUUID(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
  }
  return true;
};

export const valideteObj = (obj: IUser) => {
  if (typeof obj !== 'object') {
    return false;
  }
  return obj.age !== undefined && obj.username !== undefined && obj.hobbies !== undefined;
};

export const getPostData = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk: string) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};
