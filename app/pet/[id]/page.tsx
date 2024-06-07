import Avatar from "@/components/ui/Avatar";
import CreatePetPostModal from "@/components/petpost/CreatePetPostModal";
import EditPetModal from "@/components/pet/EditPetModal";
import Separator from "@/components/ui/Separator";
import { getCategories, getPetById } from "@/lib/data/pet";
import { getPetPostsById } from "@/lib/data/petpost";
import PetPostCard from "@/components/petpost/PetPostCard";

interface Params {
  params: {
    id: string;
  }
}

export default async function Page({ params }: Params) {
  const pet = await getPetById(params.id); 
  const categories = await getCategories();
  const petPosts = await getPetPostsById(params.id);

  if(!pet) return;

  return (
    <main>
      <div className="w-2/3 m-auto mt-5">
        <div className="flex justify-between py-5">
          <div className="flex flex-1 gap-5">
            <Avatar 
              imageUrl={pet.avatar ?? ''}
              fallback={pet.name[0]}
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
            <EditPetModal pet={pet} categories={categories}/>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[16px] text-zinc-800 font-semibold">Posts</h1>
            <CreatePetPostModal petId={pet.id}/>
          </div>
          <div className="py-5 space-y-5">
            {petPosts.map((post, index) => (
              <PetPostCard key={index} petPost={post}/>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}