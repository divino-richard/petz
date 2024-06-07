'use client';

import { PropsWithChildren, ReactNode } from "react";
import Separator from "./Separator";

interface Props {
  show: boolean;
  title: ReactNode;
  onClose: () => void;
}
export default function Popup(props: PropsWithChildren<Props>) {
  const { show, title, onClose, children } = props;
  if(!show) return;
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center">
      <div className="bg-white border border-zinc-100 p-5 rounded-lg z-10">
        <h1 className="text-[16px] font-semibold">{title}</h1>
        <Separator />
        {children}
      </div>
      <div 
        className="absolute top-0 left-0 w-full h-screen bg-zinc-800 bg-opacity-50"
        onClick={onClose}
      />
    </div>
  )
}