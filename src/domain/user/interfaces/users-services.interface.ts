import { User } from 'src/domain/user/entities';

export abstract class IUsersServices {
    abstract verifyEmailExists(email: string): Promise<Boolean>;
    abstract findByEmail(email: string): Promise<User>;
    abstract findById(id: number): Promise<User>;
}
