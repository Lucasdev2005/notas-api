import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { LoggedUser } from "src/auth/dtos/logged-user.dto";
import { Types } from "mongoose";

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: LoggedUser = request["user"];

    if (!user) {
      return null;
    }

    if (
      user.id &&
      typeof user.id === "string" &&
      Types.ObjectId.isValid(user.id)
    ) {
      user.id = new Types.ObjectId(user.id);
    }

    return user;
  },
);
