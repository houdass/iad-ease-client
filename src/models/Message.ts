import { User } from './User';

export class Message {
  _id: string;
  createdAt: number|string;
  updatedAt: number|string;
  user: User;
  toUser: User;
  time: number|string;
  message: string;
}

