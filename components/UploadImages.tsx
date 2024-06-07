import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  name: string;
}

const IMAGES_ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export default function UploadImages({name}:  Props) {
  const selectImages = useRef<HTMLInputElement>(null);
  const [imageItemHovered, setImageItemHovered] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleSelectFiles = () => {
    if (selectImages.current) {
      selectImages.current.click();
    }
  }

  const handleFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as File[] | null;
    if(files && files.length > 0) {
      createImagesPreview(files);
    }
  }

  const createImagesPreview = (files: File[]) => {
    const promises = [];
    for(let i = 0; i < files.length; i++) {
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(files[i]);
      });
      promises.push(promise);
    }
    Promise.all(promises).then((results) => {
      setImageUrls(results as string[]);
    });
  }

  const handleDeleteImage = (indexToDelete: number) => {
    if (!selectImages.current) return;

    const files = Array.from(selectImages.current.files as FileList);
    if(!files) return;

    const newFiles = files.filter((_, index) => index !== indexToDelete);
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    selectImages.current.files = dataTransfer.files;

    createImagesPreview(newFiles);
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files && files.length <= 0) return;
  
    const dataTransfer = new DataTransfer();
    files.map(file => {
      if(IMAGES_ALLOWED.includes(file.type)) {
        dataTransfer.items.add(file);
      }
    })

    if (selectImages.current) {
      selectImages.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      selectImages.current.dispatchEvent(event);
    }
  };

  return (
    <div>
      <input 
        ref={selectImages} 
        type="file" 
        name={name} 
        accept="image/*" 
        onChange={handleFilesSelected}
        multiple 
        hidden
      />
      <div 
        className={`flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-300 p-5 h-[200px] rounded-lg  ${dragActive ? 'bg-zinc-200' : 'bg-zinc-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}  
      >
        <button 
          type="button" 
          className="w-fit bg-zinc-800 text-white py-2 px-5 rounded-lg text-[14px]"
          onClick={handleSelectFiles}
        >
          Select Images
        </button>
        <span className="text-[12px]">
          (Or drag and drop)
        </span>
      </div>
      <div className="flex-1 flex-wrap flex gap-5 mt-5">
        {imageUrls.map((imageUrl, index) => (
          <div 
            key={index}
            className="relative"
            onMouseOver={() => setImageItemHovered(index)}
            onMouseLeave={() => setImageItemHovered(null)}
          >
            <Image 
              key={index} 
              src={imageUrl}
              className="object-cover w-[100px] h-[100px] rounded-lg border"
              width={100}
              height={100}   
              alt=""
            />
            <div className={`${imageItemHovered !== index ? 'hidden' : ''} absolute top-0 w-full h-full bg-zinc-800 bg-opacity-40 rounded-lg`} />
            <IoClose
              onClick={() => handleDeleteImage(index)}
              size={20}
              className={`${imageItemHovered  !== index ? 'hidden' : ''} text-white absolute top-2 right-2 z-50 cursor-pointer`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}