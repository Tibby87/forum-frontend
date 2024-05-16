import { Author } from './author';

export interface Comment {
  id: number;
  body: string;
  author: Author;
  comments: Array<Comment>;
}
