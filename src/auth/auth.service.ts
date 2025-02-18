import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoggedUser } from "./dtos/logged-user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: LoginDto): Promise<LoggedUser> {
    const user = await this.userService.findUserByEmail(dto.email);
    const isMatch = await bcrypt.compare(dto.password, user.password);
    const response: Partial<LoggedUser> = {
      email: user.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: user.toObject()._id,
    };

    if (!isMatch) {
      throw new UnauthorizedException("Wrong email or password.");
    }

    const token = await this.jwtService.signAsync(response);

    return new LoggedUser({
      ...response,
      token,
    });
  }
}
