import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersModel;
    constructor(config: ConfigService, usersModel: Model<User>);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export {};
