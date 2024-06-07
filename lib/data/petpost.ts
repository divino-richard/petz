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

export default async function deletePetPostById(id: string) {
  return await prisma.petPost.delete({
    where: {
      id
    }
  })
}