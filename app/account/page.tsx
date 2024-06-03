import EditProfileModal from "@/components/EditProfileModal";
import Avatar from "../../components/Avatar";
import LogoutButton from "../../components/LogoutButton";
import Separator from "../../components/Separator";
import RegisterPetModal from "@/components/RegisterPetModal";
import Link from "next/link";
import { getCategories, getPetsByOwnerId } from "@/lib/data/pet";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@/lib/data/users";

export default async function Page() {
  const session = await auth();
  if(!session) return redirect('/');
  const { user } = session;

  const categories = await getCategories  ();
  const pets = await getPetsByOwnerId(user.id);
  
  return (
    <main>
      <div className="w-2/3 m-auto mt-5">
        <div className="flex justify-between py-5">
          <div className="flex flex-1 gap-5">
            <Avatar 
              imageUrl={user.avatar}
              fallback={user.firstName[0] + user.lastName[0]}
              variant="extra-large"
            />
            <div className="flex-1 py-2 space-y-1">
              <h1 className="text-[20px] font-semibold text-zinc-800">
                {user.firstName + " " + user.lastName}
              </h1>
              <p className="text-[16px]">{user.email}</p>
              <p className="text-[14px]">@{user.username}</p>
              {user.bio && <p className="text-[14px]">{user.bio}</p>}
              <EditProfileModal user={user}/>
            </div>  
          </div>
          <LogoutButton className={'bg-zinc-600'}/>
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <h1 className="text-[16px] text-zinc-800 font-semibold">Your Pets</h1>
          <RegisterPetModal categories={categories}/>
        </div>

        <div className="py-5 space-y-5">
          {pets.map(pet => (
            <div 
              key={pet.id}
              className="border border-zinc-200 p-5 rounded-lg flex justify-between"
            >
              <div className="flex gap-5">
                <Avatar 
                  imageUrl={pet.avatar}
                  fallback={pet.name[0]}
                  variant="large"
                />
                <div>
                  <h1 className="text-[18px] text-zinc-800 font-semibold">
                    {pet.name}
                  </h1>
                  <p className="text-[16x] text-zinc-800">
                    {pet.age + "years old"}
                  </p>
                  <p  className="text-[16px] text-zinc-800">
                    {"Adoptation Date: " + new Date(pet.adoptationDate).toDateString()}
                  </p>
                </div>
              </div>
              <div>
                <Link
                  href={`/pet/${pet.id}`} 
                  className="w-fit flex items-center gap-2 text-[16px] bg-zinc-50 py-2 px-5 border border-zinc-100 hover:border-zinc-800"
                >
                  <span>View Profile</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}