import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class LoggedUser {
  @ApiProperty()
  id: Types.ObjectId;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  constructor(init: Partial<LoggedUser>) {
    Object.assign(this, init);
  }
}
