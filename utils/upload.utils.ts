import { PutBlobResult, put } from "@vercel/blob";

export async function uploadPublicFile(file: File | null): Promise<PutBlobResult | null> {
  if(file && file instanceof File && file.size > 0 && file.name) {
    const result = await put(file.name, file, { 
      access: 'public', 
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN 
    });
    return result;
  } else {
    return null;
  }
}