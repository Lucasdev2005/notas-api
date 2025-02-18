import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiParam,
} from "@nestjs/swagger";
import { NoteService } from "./note.service";
import { SaveNoteDto } from "./dtos/save-note.dto";
import { Note } from "./schemas/note.schema";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { LoggedUser } from "src/auth/dtos/logged-user.dto";
import { ObjectId } from "mongodb";
import { ParseObjectIdPipe } from "src/common/pipes/parse-object-id.pipe";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("note")
@ApiTags("Note")
@UseGuards(AuthGuard)
@ApiSecurity("auth")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: "Create a new note" })
  @ApiResponse({ status: 201, description: "Note created successfully." })
  async create(
    @CurrentUser() user: LoggedUser,
    @Body() createNoteDto: SaveNoteDto,
  ): Promise<void> {
    const userId = user.id;
    return this.noteService.create(userId, createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all notes of a user" })
  @ApiResponse({
    status: 200,
    description: "Notes fetched successfully.",
    type: [Note],
  })
  async findAll(@CurrentUser() user: LoggedUser): Promise<Note[]> {
    const userId = user.id;
    return this.noteService.findAll(userId);
  }

  @Get(":noteId")
  @ApiOperation({ summary: "Get a specific note by ID" })
  @ApiParam({
    name: "noteId",
    description: "The ID of the note",
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Note fetched successfully.",
    type: Note,
  })
  async findOne(
    @CurrentUser() user: LoggedUser,
    @Param("noteId", ParseObjectIdPipe) noteId: ObjectId,
  ): Promise<Note> {
    const userId = user.id;
    return this.noteService.findOne(userId, noteId);
  }

  @Put(":noteId")
  @ApiOperation({ summary: "Update a specific note" })
  @ApiResponse({ status: 200, description: "Note updated successfully." })
  @ApiParam({
    name: "noteId",
    description: "The ID of the note",
    type: String,
    required: true,
  })
  async update(
    @CurrentUser() user: LoggedUser,
    @Param("noteId", ParseObjectIdPipe) noteId: ObjectId,
    @Body() updateDto: SaveNoteDto,
  ): Promise<void> {
    const userId = user.id;
    return this.noteService.update(userId, noteId, updateDto);
  }

  @Delete(":noteId")
  @ApiOperation({ summary: "Delete a specific note" })
  @ApiResponse({ status: 200, description: "Note deleted successfully." })
  @ApiParam({
    name: "noteId",
    description: "The ID of the note",
    type: String,
    required: true,
  })
  async remove(
    @CurrentUser() user: LoggedUser,
    @Param("noteId", ParseObjectIdPipe) noteId: ObjectId,
  ): Promise<void> {
    const userId = user.id;
    return this.noteService.remove(userId, noteId);
  }
}
