import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './schemas/user.schema';
import mongoose, {Model} from 'mongoose';
import {genSaltSync, hashSync} from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash; // Add this line to return the hash value
    };

    async create(createUserDto: CreateUserDto) {
        const hashPassword = this.getHashPassword(createUserDto.password);
        const user = await this.userModel.create({...createUserDto, password: hashPassword});
        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) return "Not Found User!";

        return this.userModel.findOne({_id: id});

    }

    async update(updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto});
    }

    remove(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) return "Not Found User!";

        return this.userModel.deleteOne({_id: id});
    }
}