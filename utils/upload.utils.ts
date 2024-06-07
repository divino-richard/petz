import { PutBlobResult, put } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN;

export async function uploadPublicFile(file: File | null): Promise<PutBlobResult | null> {
  if(!token) return null;
  if(file && file instanceof File && file.size > 0 && file.name) {
    const result = await put(file.name, file, { 
      access: 'public', 
      token
    });
    return result;
  } else {
    return null;
  }
}