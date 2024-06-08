import { Pet, PetPost, PostImage } from "@prisma/client";
import Image from "next/image";
import PostActionDropdown from "./PostActionDropdown";
import Avatar from "../ui/Avatar";
import Separator from "../ui/Separator";
import { auth } from "@/auth";
import { IoMdHeart } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { FaLaughBeam } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import PostReaction from "./PostReaction";
import { getPetOwnerById } from "@/lib/data/pet";

interface Params {
  petPost: PetPost & {
    images: PostImage[],
    pet: Pet
  }
}

export default async function PetPostCard(params: Params) {
  const session = await auth();
  const { petPost } = params;
  const petOwner = await getPetOwnerById(petPost.pet.ownerId); 

  return (
    <div className="border border-zinc-200 p-5 rounded-md space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            imageUrl={petPost.pet.avatar}
            fallback={petPost.pet.name[0]}
            variant="medium"
          />
          <div>
            <h1 className="text-[16px] font-semibold">
              {petPost.pet.name}
            </h1>
            <p className="text-[14px]">
              {"Owner: " + petOwner?.firstName + " " + petOwner?.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[14px]">{petPost.createdAt.toDateString()}</p>
          {(session && session?.user.id === petPost.pet.ownerId) &&
            <PostActionDropdown petPost={petPost}/>
          }
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
      <Separator />
      <div className="flex justify-center items-end gap-5">
        <PostReaction 
          icon={ 
            <IoMdHeart 
              className="text-zinc-800 hover:text-red-500 cursor-pointer" 
              size={30}
            />
          }
          label="Heart"
        />
        <PostReaction 
          icon={ 
            <FaLaughBeam 
              className="text-zinc-800 hover:text-yellow-500 cursor-pointer" 
              size={25}
            />
          }
          label="Heart"
        />
        <PostReaction 
          icon={ 
            <BiSolidLike 
              className="text-zinc-800 hover:text-blue-500 cursor-pointer" 
              size={26}
            />
          }
          label="Heart"
        />
        <div className="w-[50px] flex flex-col items-center space-y-[4px]">
          <MdComment className="text-zinc-800 cursor-pointer hover:text-zinc-500" size={25}/>
          <p className="text-[10px]">Comment</p>
        </div>
      </div>
    </div>
  )
}