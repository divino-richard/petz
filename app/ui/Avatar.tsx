import Image from "next/image";

type VariantType = 'small' | 'medium' | 'large' | 'extra-large';

interface Props {
  imageUrl: string | null;
  variant: VariantType;
  fallback: string;
}

export default function Avatar({imageUrl, variant, fallback}: Props) {
  let size = 40;

  switch(variant) {
    case 'medium':
      size = 60;
      break;
    case 'large':
      size = 80;
      break;
    case 'extra-large':
      size = 100;
      break;
  }

  return (
    <div 
      className={`rounded-full bg-zinc-200 flex items-center justify-center cursor-pointer w-fit`} 
      style={{ width: size, height: size}}
    >
      {imageUrl ? 
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} className="rounded-full h-full w-full object-cover" alt=""  />
        : 
        <span className={`text-[16px] text-zinc-900 font-semibold`}>{fallback}</span>}
    </div>
  )
}