import { PetPost, PostImage } from "@prisma/client"
import { BiSolidEditAlt } from "react-icons/bi";
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import UploadImages from "../ui/UploadImages";
import Separator from "../ui/Separator";
import { useFormState, useFormStatus } from "react-dom";
import { updatePetPost } from "@/lib/actions/petpost";
import Button from "../ui/Button";
import { imageUrlToFile } from "@/utils/converter.utils";

interface FormState {
  error?: string;
  success?: boolean;
}
const initialState: FormState = {
  error: '',
  success: false
}
interface Props {
  petPost: PetPost & {
    images: PostImage[]
  }
}
export default function EditPetPostModal(props: Props) {
  const { petPost } = props;
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useFormState(updatePetPost, initialState);
  const [defaultImages, setDefaultImages] = useState<File[]>();

  const convertImageUrlsToFiles =  async(postImages: PostImage[]) => {
    const convertPromises = postImages.map(async(postImage) => {
      return await imageUrlToFile(postImage.imageUrl);
    });
    const results = await Promise.all(convertPromises);
    setDefaultImages(results)
  }

  useEffect(() => {
    if(petPost.images) {
      convertImageUrlsToFiles(petPost.images)
    }
  }, [petPost.images])

  useEffect(() => {
    if(state.success) {
      setShowModal(false);
    }
  }, [state.success])

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center gap-2 px-5 py-2 border border-zinc-100 bg-zinc-50"
      >
        <BiSolidEditAlt className="text-[20px]"/>
        <span>Edit</span>
      </button>
      <Modal
        show={showModal}
        title="Edit Pet Post"
        onClose={() => setShowModal(false)}
      >
        <form action={dispatch} className="py-5 space-y-5">
          {state?.error && 
            <p className="text-red-500 text-[14px] text-center">{state.error}</p>
          }

          <input type="hidden" name="postId" value={petPost.id}/>

          <div className="flex flex-col">
            <label 
              htmlFor="caption"
              className="text-[14px] text-zinc-800"
            >
              Caption
            </label>
            <input 
              type="text" 
              id="caption"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="caption"
              placeholder="Write the caption here"
              defaultValue={petPost.caption}
            />
          </div>
          <UploadImages 
            name="petImages" 
            defaultImages={defaultImages}
          />
          <Separator />
          <div className="flex justify-end gap-5">
            <Button 
              type="no-fill"
              htmlType="button"
              title="Cancel"
              onClick={() => setShowModal(false)}
            />
            <SaveButton />
          </div>
        </form>
      </Modal>
    </div>
  )
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="fill"
      htmlType="submit"
      title={pending ? "Saving..." : "Save"}
    />
  )
}