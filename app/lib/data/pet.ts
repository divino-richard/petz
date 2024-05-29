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

export async function getPetsByOwnerId(id: string) {
  return await prisma.pet.findMany({
    where: {
      ownerId: id
    },
    include: {
      category: true,
      _count: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

export async function getPetById(id: string) {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        posts: true,
        owner: true,
        vaccinations: true,
      }
    });
    return pet;
  } catch (error) {
    throw error;
  }
}