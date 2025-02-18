import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "./schemas/note.schema";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";

const services = [NoteService];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NoteController],
  providers: [...services],
  exports: [...services],
})
export class NoteModule {}
