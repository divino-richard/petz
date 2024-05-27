"use server";

import { ZodError } from "zod";
import { createPet, getAllCategory } from "../data/pet";
import { registerPetSchema } from "../schema/pet.schema";
import { put } from "@vercel/blob";
import { getSession } from "./auth";
import { uploadPublicFile } from "@/utils/upload.utils";

export async function getCategories() {
  try {
    return await getAllCategory();
  } catch(error) {
    throw error;
  }
}

export async function registerPet(_currentState: any, formData: FormData) {
  try {
    const petOwner = await getSession();
    const data = registerPetSchema.parse({
      name: formData.get('name'),
      age: Number(formData.get('age')),
      color: formData.get('color'),
      breed: formData.get('breed'),
      weight: Number(formData.get('weight')),
      adoptationDate: formData.get('adoptationDate'),
      ability: formData.get('ability'),
      categoryId: formData.get('category')
    });
    let avatarUrl;

    if(!petOwner) return;

    const avatar = formData.get('avatar') as File | null;
    const uploadResult = await uploadPublicFile(avatar);
    if(uploadResult) {
      avatarUrl = uploadResult.url;
    }

    const pet = await createPet({ 
      ownerId: petOwner.id,
      ...data, 
      adoptationDate: new Date(data.adoptationDate),
      avatar: avatarUrl
    });

    if(!pet) return {
      error: 'Failed to register pet'
    };

    return {
      success: true
    }

  } catch(error) {
    if(error instanceof ZodError) {
      const firstError = error.errors[0];
      return {
        error: firstError.path + " is " + firstError.message.toLocaleLowerCase()
      }
    }
    return {
      error: "Internal server error"
    }
  }
}