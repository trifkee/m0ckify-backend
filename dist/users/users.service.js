"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async findAll() {
        return await this.usersModel.find().exec();
    }
    async findOne(username, password) {
        try {
            const user = await this.usersModel.findOne({ username }).exec();
            if (!user) {
                throw new Error(`Sorry! we don't have account with ${username} as username.`);
            }
            if (await bcrypt.compare(password, user.password)) {
                return user;
            }
            else {
                throw new common_1.HttpException('Invalid Credentials!', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async create(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const createdUser = new this.usersModel({
                ...user,
                password: hashedPassword,
            });
            return await createdUser.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException(`${Object.keys(error.keyValue)} already exists.`);
            }
            throw new Error('Something went wrong!.');
        }
    }
    async delete(userId) {
        try {
            const user = await this.usersModel.deleteOne({ id: userId }).exec();
            if (user.deletedCount === 0) {
                throw new common_1.NotFoundException(`User doesn't exists!`);
            }
        }
        catch (error) {
            if (error.status === 404) {
                throw new common_1.NotFoundException(`User doesn't exists!`);
            }
            throw new Error('Something went wrong.');
        }
    }
    async update(id, payload) {
        try {
            const user = await this.usersModel
                .findOneAndUpdate(id, payload, { new: true })
                .exec();
            if (!user) {
                throw new common_1.NotFoundException(`User doesn't exists!`);
            }
            return user;
        }
        catch (error) {
            throw new Error('Something went wrong!');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map