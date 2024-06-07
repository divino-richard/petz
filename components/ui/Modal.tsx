import { PropsWithChildren } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Separator from "./Separator";

interface Props {
  show: boolean;
  onClose: () => void;
  title: string;
}

export default function Modal(props: PropsWithChildren<Props>) {
  const {show, title, onClose, children} = props;
  if(!show) return;
  return (
    <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center p-10">
      <div className="w-full max-w-[700px] h-fit max-h-full py-5 px-7 rounded-lg bg-white z-50 overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] text-zinc-800 font-semibold">{title}</h1>
          <IoCloseSharp 
            className="text-[20px] cursor-pointer"
            onClick={onClose}
          />
        </div>
        <Separator />
        {children}
      </div>
      <div 
        className="absolute top-0 left-0 w-full h-screen bg-zinc-800 bg-opacity-50 z-40"
        onClick={onClose}
      />
    </div>
  );
}