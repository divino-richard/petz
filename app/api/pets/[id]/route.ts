import { getPetById } from "@/lib/data/pet";

interface Params {
    params: {
        id: string
    }
}
export async function GET(request: Request, { params }: Params) {
    const pet = await getPetById(params.id);
    return Response.json(pet, { status: 200 })
}
