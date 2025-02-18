import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { InjectModel } from "@nestjs/mongoose";
import { Note } from "./schemas/note.schema";
import { SaveNoteDto } from "./dtos/save-note.dto";
import { RecordNotFoundException } from "src/common/exceptions/record-not-found.exception";

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(userId: ObjectId, createNoteDto: SaveNoteDto): Promise<void> {
    await this.noteModel.insertOne({
      ...createNoteDto,
      userId,
    });
  }

  async findAll(userId: ObjectId): Promise<Note[]> {
    return this.noteModel.find({ userId }).exec();
  }

  async findOne(userId: ObjectId, noteId: ObjectId): Promise<Note> {
    const note = await this.noteModel.findOne({ _id: noteId, userId }).exec();

    if (!note) {
      throw new RecordNotFoundException();
    }

    return note;
  }

  async update(
    userId: ObjectId,
    noteId: ObjectId,
    updateDto: SaveNoteDto,
  ): Promise<void> {
    const note = await this.noteModel.findByIdAndUpdate(
      { _id: noteId, userId },
      updateDto,
    );

    if (!note) {
      throw new RecordNotFoundException();
    }
  }

  async remove(userId: ObjectId, noteId: ObjectId): Promise<void> {
    const note = await this.noteModel
      .findOneAndDelete({ _id: noteId, userId })
      .exec();

    if (!note) {
      throw new RecordNotFoundException();
    }
  }
}
