import { encrypt } from "@/app/lib/actions/auth";
import { getUserByEmail } from "@/app/lib/data/users";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const credentials = await request.json();
  
  const user = await getUserByEmail(credentials.email);
  if(!user || credentials.password !== user.password) {
    return Response.json({ 
      message: 'Invalid email or password'
    }, { status: 401 });
  }

  const expires = 60 * 60 * 24 * 7;
  const token = await encrypt(user, expires);

  return Response.json({ 
    user: user,
    token
  }, { status: 200 });
}