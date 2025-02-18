import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiResponseNoStatusOptions,
} from "@nestjs/swagger";

export function CustomNoContentResponse(options?: ApiResponseNoStatusOptions) {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiNoContentResponse(options),
  );
}
