export abstract class IUsersServices {
    abstract verifyEmailExists(email: string): Promise<Boolean>;
}
