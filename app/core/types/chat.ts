import { Message } from './message';
import { User } from './user';

export interface Chat {
  _id: string;
  messages: Message[];
  name: string;
  createdAt: string;
  author: User;
}
