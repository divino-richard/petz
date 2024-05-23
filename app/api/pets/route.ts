import { createPet } from "@/app/lib/actions/pets";
import { getAllPets } from "@/app/lib/data/pets";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const pet = await request.json();
    await createPet(pet);
    return Response.json({ message: "Success" }, { status: 201 })
}

export async function GET() {
    const pets = await getAllPets();
    return Response.json(pets, { status: 200 });
}
