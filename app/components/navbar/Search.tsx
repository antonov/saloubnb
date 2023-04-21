'use client'
import { BiSearch } from 'react-icons/bi'
import useSearchModal from "@/app/hooks/useSearchModal";
const Search = () => {
    const searchModal = useSearchModal();
    return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
    ">
        <div className="
            flex
            flex-row
            items-center
            justify-between
        ">
            <div className="px-6 font-semibold text-sm">Anywhere</div>
            <div className="hidden sm:block text-sm px-6 border-x-[1px] text-center flex-1 font-semibold">Any week</div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block"> Add Guests </div>    
                <div className="p-2 bg-rose-200 rounded-full text-white"> <BiSearch size={18}></BiSearch> </div>    
            </div>
        </div>
        
    </div>
     );
}
 
export default Search;