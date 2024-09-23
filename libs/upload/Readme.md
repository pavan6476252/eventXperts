
# NestJS Cloudinary File Upload Library

This library provides a simple and reusable solution for uploading, managing, and deleting files in a **NestJS** application using **Cloudinary** as the cloud storage provider. The library supports uploading files via Multer and handles both image and stream uploads.

## Features

- Upload images or files to Cloudinary
- Generate unique filenames for uploaded files
- Delete files from Cloudinary
- Modular structure for easy integration into any NestJS project
- Configurable environment variables for Cloudinary credentials
- Supports folder-based organization of uploads

## Installation

1. Install necessary dependencies:

```bash
npm install @nestjs/common @nestjs/config cloudinary multer uuid
```

2. Set up Cloudinary in your project:

Sign up for a free [Cloudinary account](https://cloudinary.com/) and get your `cloud_name`, `api_key`, and `api_secret`.

## Setup

1. Add your **Cloudinary** credentials to the `.env` file in your NestJS project:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_PROJECT_NAME=eventxperts
```

2. Import and integrate the `UploadModule` into your project:

In your `app.module.ts` or any other module where you want to use the upload functionality:

```typescript
import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UploadModule],
})
export class AppModule {}
```

## Usage

### Upload a File

This library provides an `upload` endpoint to upload files to Cloudinary.

You can upload a file by making a `POST` request to `/upload`, with the file and optional folder name.

#### Example Request:

```http
POST /upload
Content-Type: multipart/form-data

file: <binary-file>
folderName: <optional-folder-name>
```

#### Example Response:

```json
{
  "asset_id": "some_asset_id",
  "public_id": "eventxperts/your_file_name_unique_id",
  "url": "https://res.cloudinary.com/your_cloud_name/image/upload/eventxperts/your_file_name_unique_id"
}
```

### Delete a File

You can delete a file stored in Cloudinary by providing its public URL.

#### Example Request:

```http
DELETE /upload
Content-Type: application/json

{
  "fileName": "https://res.cloudinary.com/your_cloud_name/image/upload/eventxperts/your_file_name_unique_id"
}
```

#### Example Response:

```json
{
  "result": "ok"
}
```

## Code Structure

The library is organized as follows:

```bash
/upload
  ├── cloudinary
  │   ├── cloudinary.controller.ts   # Handles HTTP requests for upload/delete
  │   ├── cloudinary.module.ts       # Cloudinary-related NestJS module
  │   ├── cloudinary.provider.ts     # Cloudinary provider setup
  │   ├── cloudinary.service.ts      # Business logic for upload/delete
  │   └── utils
  │       └── filename.utils.ts      # Utility for generating unique filenames
  ├── upload.module.ts               # Main upload module
  └── index.ts                       # Exports for easy module import
```

## Modules & Services

### CloudinaryModule

The `CloudinaryModule` provides services to handle file uploads and deletions via Cloudinary. This module is configured using `@nestjs/config` to dynamically load environment variables.

### CloudinaryService

The `CloudinaryService` handles the core logic for uploading and deleting files. Key functions include:
- `uploadImage(file: Express.Multer.File, folder?: string)`: Uploads a file to Cloudinary.
- `uploadStream(createReadStream: () => Readable, filename: string, folder: string)`: Uploads a stream to Cloudinary.
- `deleteFile(fileUrl: string)`: Deletes a file from Cloudinary by extracting the `public_id` from the file URL.

### Utility Function

- `generateUniqueFilename(filename: string)`: Generates a unique filename by appending a UUID to avoid file name collisions.

## Extending the Library

If you want to extend this library to support other file storage solutions (like AWS S3, Firebase), you can create new providers and services in the `upload` module and easily plug them into the existing structure.

## Example Controller

You can add more endpoints or customize the upload and deletion logic in the `CloudinaryController`:

```typescript
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
```

## License

This library is licensed under the MIT License.
 