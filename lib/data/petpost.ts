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