import {
  Controller,
  Post,
  Delete,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";

@Controller("upload")
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { folderName: string }
  ) {
    return this.cloudinaryService.uploadImage(file, body.folderName);
  }

  @Delete()
  async deleteFile(@Body() body: { fileName: string }) {
    return this.cloudinaryService.deleteFile(body.fileName);
  }
}
