'use server';

import prisma from "@/prisma/db";

interface IAddPost {
  petId: string;
  caption: string;
}
export async function addPost(post: IAddPost) {
  return await prisma.petPost.create({
    data: post
  })
}

export async function getPetPostsById(petId: string) {
  return await prisma.petPost.findMany({
    where: {
      petId
    },
    include: {
      images: true,
      pet: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function deletePetPostById(id: string) {
  return await prisma.petPost.delete({
    where: {
      id
    }
  })
}

interface IUpdatePost {
  caption: string;
}
export async function updatePetPostById(id: string, data: IUpdatePost) {
  return await prisma.petPost.update({
    where: {
      id
    },
    data
  })
}