'use client'

import Image from "next/image";
import { useRef, useState } from "react";
import userPlaceholder from '@/public/user.png';

export default function UploadAvatar() {
  const selectImage = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleSelectFile = () => {
    if (selectImage.current) {
      selectImage.current.click();
    }
  }

  const [dragActive, setDragActive] = useState(false);

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
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      if (selectImage.current) {
        selectImage.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        selectImage.current.dispatchEvent(event);
      }
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      createImagePreview(files[0]);
    }
  };

  const createImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as  string);
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className="flex-1 flex items-center justify-center h-[150px] rounded-lg gap-5">
        <div className="h-fit w-fit rounded-full bg-zinc-50 border border-zinc-200">
          <Image
            src={previewUrl || userPlaceholder}
            alt="Picture of the author"
            width={100}
            height={100}
            className="rounded-full w-[100px] h-[100px] object-cover"
          />
        </div>
        <div 
          className={`flex-1 flex flex-col items-center justify-center h-[150px] border border-dashed border-zinc-200 rounded-lg ${dragActive ? 'bg-gray-200' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <button
            type="button"
            className="bg-zinc-800 text-white py-2 px-5 rounded-lg text-[14px]"
            onClick={handleSelectFile}
          >
            Select Image
          </button>
          <span className="text-center text-[12px]">{"(or drag here)"}</span>
        </div>
      </div>
      <input 
        type="file" 
        accept="image/*" 
        ref={selectImage}
        name="avatar"
        onChange={handleFileSelected}
        hidden
      />
    </>
  )
}