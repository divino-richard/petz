import { decrypt } from "@/utils/auth.utils";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export async function getSession(): Promise<User | null> {
  try {   
    const session = cookies().get('session')?.value;
    if(!session) return null;
    const decoded = decrypt(session);
    return decoded as User;
  } catch(error) {
    throw error;
  }
}