import { ZDriveClient } from "@ziqx/drive";

export async function uploadFile(file: File, signedUrl: string) {
  const client = new ZDriveClient();
  const response = await client.uploadFile(signedUrl, file);
  return response;
}