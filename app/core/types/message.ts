import { User } from './user';

export interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: User;
}
