'use client';

import { PropsWithChildren, useEffect, useRef } from "react";

type PositionType = 'left' | 'right';

interface Props {
  show: boolean;
  onClose: () => void;
  position: PositionType;
}

export default function Dropdown(props: PropsWithChildren<Props>) {
  const { show, onClose, position, children} = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const getPosition = (position: PositionType) => {
    switch(position) {
      case 'left':
        return 'right-0';
      case 'right':
        return 'left-0'
    }
  }

  if(!show) return;

  return (
    <>
      <div ref={dropdownRef} className={`absolute top-0 ${getPosition(position)} w-full min-w-[200px] bg-white p-5 rounded-lg border border-zinc-200 z-50`}>
      {children}
      </div>
      <div 
        onClick={() => onClose()}
        className="fixed top-0 left-0 w-full h-[100vh]"
      />
    </>
  )
}