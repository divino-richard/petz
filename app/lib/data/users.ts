import prisma from "@/prisma/db";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
}

interface IUpdateUser {
  avatar: string;
  firstName: string;
  lastName: string;
  userName: string;
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