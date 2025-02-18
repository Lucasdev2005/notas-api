import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { CustomNoContentResponse } from "src/common/decorators/custom-no-content-response.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CustomNoContentResponse({
    description: "endpoint to create a User.",
  })
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    return this.userService.create(body);
  }
}
