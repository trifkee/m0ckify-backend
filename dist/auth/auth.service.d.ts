import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<User>);
    validateUser({ username, password }: AuthPayloadDto): Promise<string>;
}
