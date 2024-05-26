import EditProfileModal from "@/components/EditProfileModal";
import { getSession } from "../lib/actions/auth";
import Avatar from "../ui/Avatar";
import LogoutButton from "../../components/LogoutButton";
import Separator from "../ui/Separator";
import { getUserProfile } from "../lib/actions/user";

export default async function Page() {
  const user = await getUserProfile();

  if(!user) return;
  
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
      </div>
    </main>
  );
}