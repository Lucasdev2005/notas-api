import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { Note } from "src/note/schemas/note.schema";

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  password: string;

  @ApiProperty()
  notes: Note[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "userId",
});
