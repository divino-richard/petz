"use server";

import prisma from "@/prisma/db";
import { Pet } from "@prisma/client";

export async function getAllCategory() {
  return await prisma.petCategory.findMany();
} 

interface ICreatePet {
  ownerId: string,
  name: string,
  age: number,
  color: string,
  breed: string,
  weight: number,
  adoptationDate: Date,
  ability: string,
  categoryId: string,
  avatar?: string
}
export async function createPet(data: ICreatePet) {
  return await prisma.pet.create({
    data
  });
}