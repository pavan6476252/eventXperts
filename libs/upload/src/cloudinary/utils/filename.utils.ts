import { v4 as uuidv4 } from "uuid";

export function generateUniqueFilename(
  filename: string
): { fileName: string; fileNameWithExtension: string } {
  const extension = filename.split(".").pop();
  const uniqueId = uuidv4();
  return {
    fileName: `${filename.split(".")[0]}_${uniqueId}`,
    fileNameWithExtension: `${filename.split(".")[0]}_${uniqueId}.${extension}`,
  };
}
