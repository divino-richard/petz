'use server';

import prisma from "@/prisma/db";

interface IAddPostImage {
  postId: string;
  imageUrl: string;
}
export async function addPostImage(data: IAddPostImage) {
  return await prisma.postImage.create({
    data
  })
}