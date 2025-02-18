import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { NoteModule } from "./note/note.module";

const modules = [UserModule, AuthModule, UserModule, NoteModule];

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI || ""), ...modules],
})
export class AppModule {}
