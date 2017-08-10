import { Message } from './Message';

export class Conversation {
  _id: string;
  createdAt: number|string;
  updatedAt: number|string;
  messages: [Message];
}

