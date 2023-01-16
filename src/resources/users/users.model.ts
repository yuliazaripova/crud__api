import { v4 as uuidv4 } from 'uuid';
import users from '../../db/users.db';
import { IUser } from './UserDTO';

export function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export function findById(id: string) {
  return new Promise((resolve, reject) => {
    const user = users.find((user: IUser) => user.id === id);
    resolve(user);
  });
}

export function createUser(user: IUser) {
  return new Promise((resolve, reject) => {
    const newPerson = { ...user, id: uuidv4() };
    users.push(newPerson);
    resolve(newPerson);
  });
}

export function updateUser(id: string, user: IUser) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user: IUser) => user.id === id);
    users[index] = { id, ...user };
    resolve(users[index]);
  });
}

export function deleteUser(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user: IUser) => user.id === id);
    if (index > -1) {
      users.splice(index, 1);
    }
    resolve();
  });
}