'use client';

import { PropsWithChildren, ReactNode } from "react"

interface Props {
  icon: ReactNode;
  label: string;
}

export default function PostReaction(props: Props) {
  const  { icon, label } = props;
  return (
    <div className="w-[50px] flex flex-col items-center space-y-1">
      {icon}
      <p className="text-[10px]">{label}</p>
    </div>
  )
}