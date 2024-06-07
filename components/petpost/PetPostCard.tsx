import { Pet, PetPost, PostImage } from "@prisma/client";
import Image from "next/image";
import PostActionDropdown from "./PostActionDropdown";
import Avatar from "../ui/Avatar";
import Separator from "../ui/Separator";

interface Params {
  petPost: PetPost & {
    images: PostImage[],
    pet: Pet
  }
}

export default function PetPostCard(params: Params) {
  const { petPost } = params;
  return (
    <div className="border border-zinc-200 p-5 rounded-md space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar 
            imageUrl={petPost.pet.avatar}
            fallback={petPost.pet.name[0]}
            variant="medium"
          />
          <h1 className="text-[16px] font-semibold">{petPost.pet.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[14px]">{petPost.createdAt.toDateString()}</p>
          <PostActionDropdown petPost={petPost}/>
        </div>
      </div>
      <Separator />
      <div>
        <p className="text-[16px]">
          {petPost.caption}
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {petPost.images.map((image, index) => (
          <div key={index}>
            <Image 
              src={image.imageUrl} 
              width={200} 
              height={200} 
              alt=""
              unoptimized={true}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}