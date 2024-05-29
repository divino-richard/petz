import { createPet } from "@/lib/data/pet";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const pet = await request.json();
    await createPet(pet);
    return Response.json({ message: "Success" }, { status: 201 })
}
