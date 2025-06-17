import { IUser } from '../interfaces/IUser';

export class UserCredentials {
    static readonly TEST_USER: IUser = {
        email: 'testabc12@sharklasers.com',
        password: 'Admin@123',
        expectedTitle: 'Home - testabc12@sharklasers.com'
    };
}
