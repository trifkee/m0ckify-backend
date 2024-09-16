import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createNewUser(username: string, firstName: string, lastName: string, password: string, email: string, role: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, updateData: Partial<User>): Promise<import("mongoose").ModifyResult<User>>;
    getAllUsers(): Promise<User[]>;
    getSingleUser(username: string, password: string): Promise<User>;
}
