import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserMapper } from "./mappers/user.mapper";
import { RecordNotFoundException } from "../common/exceptions/record-not-found.exception";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const dto = await UserMapper.toSchema(createUserDto);
    const user = new this.userModel<User>(dto as User);

    await Promise.all([this.validateDuplicate(dto.email), user.save()]);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new RecordNotFoundException();
    }

    return user;
  }

  private async validateDuplicate(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();

    if (user) {
      throw new ConflictException("email in use.");
    }
  }
}
