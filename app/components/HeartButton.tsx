'use client';

import {SafeUser} from "@/app/types";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import useFavorite from "@/app/hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null
}
const HeartButton: React.FC<HeartButtonProps> = ({listingId, currentUser}) => {
  const {hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser});
  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart className="absolute fill-white -top-[2px] -right-[2px]" size={28}/>
      <AiFillHeart className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} size={24}/>
    </div>
  )
}
export default  HeartButton;