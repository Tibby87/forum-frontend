import { Author } from './author';
import { Comment } from './comment';

export interface Topic {
  id: number;
  author: Author;
  title: string;
  body: string;
  comments: Array<Comment>;
}
