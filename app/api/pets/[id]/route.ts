import { deletePet, updatePet } from "@/app/lib/actions/pets";
import { getPetById } from "@/app/lib/data/pets"

interface Params {
    params: {
        id: string
    }
}
export async function GET(request: Request, { params }: Params) {
    const pet = await getPetById(Number(params.id));
    return Response.json(pet, { status: 200 })
}

export async function PUT(request: Request, { params }: Params) {
    const pet = await request.json();
    await updatePet(Number(params.id), pet);
    return Response.json({ message: "Success"}, { status: 200 });
}

export async function DELETE(request: Request, { params }: Params) {
    await deletePet(Number(params.id));
    return Response.json({ message: "Success"}, { status: 200 });
}