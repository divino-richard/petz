import Avatar from "@/components/Avatar";
import Separator from "@/components/Separator";
import { getPetById } from "@/lib/data/pet";
import { BiSolidEditAlt } from "react-icons/bi";

interface Params {
  params: {
    id: string;
  }
}

export default async function Page({ params }: Params) {
  const pet = await getPetById(params.id); 
  if(!pet) return;
  return (
    <main>
      <div className="w-2/3 m-auto mt-5">
        <div className="flex justify-between py-5">
          <div className="flex flex-1 gap-5">
            <Avatar 
              imageUrl={pet.avatar ?? ''}
              fallback={pet.name}
              variant="extra-large"
            />
            <div className="flex-1">
              <h1 className="text-[20px] font-semibold text-zinc-800">
                {pet.name}
              </h1>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2 text-[16px]">
                  <p className="font-semibold">Age: </p>
                  <span>{pet.age + " years old"}</span>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                  <span className="font-semibold">Color: </span>
                  <span>{pet.color}</span>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                  <span className="font-semibold">Breed: </span>
                  <span>{pet.breed}</span>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                  <span className="font-semibold">Weight: </span>
                  <span>{pet.weight}</span>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                  <span className="font-semibold">Ability: </span>
                  <span>{pet.ability}</span>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                  <span className="font-semibold">Category: </span>
                  <span>{pet.category.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[16px]">
                  <span className="font-semibold">Adoptation Date: </span>
                  <span>{new Date(pet.adoptationDate).toDateString()}</span>
                </div>
              </div>
            </div> 
            <button 
              className="w-fit h-fit flex items-center gap-2 text-[16px] bg-zinc-50 py-2 px-5 border border-zinc-100 hover:border-zinc-800"
            >
              <BiSolidEditAlt className="text-[20px]"/>
              <span>Edit profile</span>
            </button>
          </div>
        </div>
        <Separator />

        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[16px] text-zinc-800 font-semibold">Posts</h1>
            <button 
              className="bg-zinc-800 text-white text-[16px] py-2 px-5 hover:bg-zinc-700"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}