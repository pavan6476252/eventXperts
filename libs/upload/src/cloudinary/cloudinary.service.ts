import { Injectable, Inject } from "@nestjs/common";
import { v2, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { generateUniqueFilename } from "./utils/filename.utils";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CloudinaryService {
  private projectName: string;

  constructor(
    @Inject("CLOUDINARY") private readonly cloudinary,
    private readonly configService: ConfigService
  ) {
    this.projectName = configService.get<string>("CLOUDINARY_PROJECT_NAME") || 'eventxperts';
  }

  async uploadImage(
    file: Express.Multer.File,
    folder?: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const { fileName, fileNameWithExtension } = generateUniqueFilename(file.filename);

    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(
          {
            folder: folder ? `${this.projectName}/${folder}` : this.projectName,
            public_id: fileName,
            filename_override: fileNameWithExtension,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(file.buffer);
    });
  }

  async deleteFile(fileUrl: string): Promise<any> {
    const publicId = this.getPublicIdFromUrl(fileUrl);

    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.destroy(publicId, {}, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  private getPublicIdFromUrl(fileUrl: string): string {
    const parts = fileUrl.split("/");
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];
    const path = parts.slice(-3, -1).join("/");
    return `${path}/${publicId}`;
  }
}
