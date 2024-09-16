import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    projects: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
