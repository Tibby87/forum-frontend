import { Author } from '../../model/topics/author';
import { User } from '../../model/user/user';

export class TopicsHelperService {
  public static mapUserToAuthor(user: User): Author {
    return { name: user.name, email: user.email, id: user.id, role: user.role };
  }
}
