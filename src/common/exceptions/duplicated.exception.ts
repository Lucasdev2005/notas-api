import { ConflictException } from "@nestjs/common";

export class DuplicatedException extends ConflictException {
  constructor() {
    super("Record contains data already registered.");
  }
}
