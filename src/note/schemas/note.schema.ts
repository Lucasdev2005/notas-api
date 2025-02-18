import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
})
export class Note extends Document {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: false })
  @ApiProperty()
  description: string;

  @Prop({ type: ObjectId, ref: "User", required: true })
  @ApiProperty()
  userId: ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
