import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoggedUser } from "./dtos/logged-user.dto";

@Controller("auth")
@ApiTags("Authorization")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    description: "endpoint to log into the application.",
  })
  async signIn(@Body() dto: LoginDto): Promise<LoggedUser> {
    return this.authService.signIn(dto);
  }
}
