import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { HASH_SALTS } from "../../common/constants/hash-salts.constant";

export class UserMapper {
  static async toSchema(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await bcrypt.hash(dto.password, HASH_SALTS);

    return dto;
  }
}
