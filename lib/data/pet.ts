"use server";

import prisma from "@/prisma/db";

export async function getCategories() {
  try {
    return await prisma.petCategory.findMany();
  } catch(error) {
    throw error;
  }
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
  try {
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
  } catch (error) {
    throw error;
  }
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

interface IUpdatePet {
  name: string;
  age: number;
  color: string;
  breed: string;
  weight: number;
  adoptationDate: Date;
  avatar?: string;
  ability: string;
  categoryId: string;
}
export async function updatePetById(petId: string, data: IUpdatePet) {
  return await prisma.pet.update({
    where: {
      id: petId
    },
    data
  })
}