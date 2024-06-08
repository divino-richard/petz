import { auth } from "@/auth";
import PetPostCard from "@/components/petpost/PetPostCard";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Separator from "@/components/ui/Separator";
import { getAllPosts } from "@/lib/data/petpost";
import { MdOutlinePets } from "react-icons/md";

export default async function Home() {
  const session = await auth();
  const posts = await getAllPosts();
  return (
    <main>
      <div className="w-2/3 m-auto mt-5">
        {session &&
          <div className="flex gap-2 justify-between border border-zinc-100 p-5 rounded-lg mb-5">
            <div className="flex gap-2">
              <Avatar
                imageUrl={session.user.avatar}
                fallback={session.user.firstName[0] + session.user.lastName[0]}
                variant="medium"
              />
              <div className="space-y-1">
                <h1 className="text-[16px] font-semibold text-zinc-800">
                  {session.user.firstName + " " + session.user.lastName}
                </h1>
                <p className="text-[14px] text-zinc-800">
                  {'@'+session.user.username}
                </p>
                <div className="flex items-center gap-2">
                  <MdOutlinePets className="text-zinc-800" size={18}/>
                  <p className="text-[14px] text-zinc-800">
                    {`With 4 pets`}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button 
                htmlType="button"
                type="no-fill"
                title="Create Post"
              />
            </div>
          </div>
        }
        <Separator />
        <div className="py-5 space-y-5">
          <h1 className="text-[16px] text-zinc-800 font-semibold">
            New feed
          </h1>
          {posts.map((post, index) => (
            <PetPostCard 
              key={index}
              petPost={post}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
