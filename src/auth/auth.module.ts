import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { TOKEN_EXPIRES } from "src/common/constants/token-expires.constant";

const services = [AuthService];

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: TOKEN_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  exports: [...services],
  providers: [...services],
})
export class AuthModule {}
