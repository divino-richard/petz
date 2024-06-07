'use client';

import { useEffect, useState } from "react";

interface Props {
  onClick?: () => void;
  title: string;
  type: 'fill' | 'no-fill' | 'text';
  htmlType: 'button' | 'reset' | 'submit';
}
export default function Button(props: Props) {
  const { title, onClick, type, htmlType} = props;

  const getStyles = () => {
    switch(type) {
      case 'no-fill':
        return 'hover:bg-zinc-800 hover:text-white';
      case 'fill':
        return 'bg-zinc-800 text-white hover:bg-white hover:text-zinc-800';
    }
  }

  return (
    <button
      type={htmlType} 
      onClick={onClick}
      className={`py-2 px-5 text-[16px] border border-zinc-800 ${getStyles()}`}
    >
      {title}
    </button>
  )
}