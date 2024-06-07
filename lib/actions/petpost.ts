'use server';

import { uploadPublicFile } from "@/utils/upload.utils";
import { createPetPostSchema } from "../schema/petpost.schema";
import { ZodError } from "zod";
import deletePetPostById, { addPost } from "../data/petpost";
import { addPostImage, deletePostImagesByPostId } from "../data/postimages";
import { revalidatePath } from "next/cache";

export async function createPetPost(_currentState: any, formData: FormData) {
  try {
    const images = Array.from(formData.getAll('petImages') as File[]);
    const data = createPetPostSchema.parse({
      petId: formData.get('petId'),
      caption: formData.get('caption'),
    });

    if(images[0].size <= 0) {
      return {
        error: 'No images selected'
      }
    }
    
    const postResult = await addPost(data);

    const uploadPromises = images.map(async (file) => {
      return await uploadPublicFile(file);
    });
    const uploadResults = await Promise.all(uploadPromises);

    const postImagePromises = uploadResults.map(async (result) => {
      return await addPostImage({
        postId: postResult.id,
        imageUrl: result?.url ?? '',
      })
    });
    await Promise.all(postImagePromises);

    revalidatePath('/pet/[id]');

    return {
      success: true,
    }
  } catch (error) {
    if(error instanceof ZodError) {
      const firstError = error.errors[0];
      return {
        error: firstError.path + ' is ' + firstError.message.toLocaleLowerCase(),
      }
    }
    throw error;
  }
}

export async function deletePetPost(_currentState: any, formData: FormData) {
  try {
    const postId = formData.get('postId') as string;
    if(!postId) return {
      error: "Post id is required"
    }
    await deletePostImagesByPostId(postId);
    await deletePetPostById(postId);
    revalidatePath('/pet/[id]')
    return {
      success: true
    }
  } catch (error) {
    throw error;
  }
}