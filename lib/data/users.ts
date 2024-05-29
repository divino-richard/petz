'use server';

import prisma from "@/prisma/db";
import { getSession } from "./auth";

export async function getUserProfile() {
  const session = await getSession();
  if(!session) return null;
  return await getUserById(session?.id);
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
}

interface IUpdateUser {
  avatar?: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
}
export async function updateUser(userId: string, data: IUpdateUser) {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: data
  })
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}