import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(username: string, password: string): Promise<User>;
    create(user: User): Promise<User>;
    delete(userId: string): Promise<void>;
    update(id: string, payload: Partial<User>): Promise<import("mongoose").ModifyResult<User>>;
}
