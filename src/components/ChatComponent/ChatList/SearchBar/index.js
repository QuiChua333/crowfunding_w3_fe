import React from 'react'
import { FiSearch } from "react-icons/fi";

function SearchBarChatList({textSearch, onChange}) {
  const handleChangeTextSearch = (e) => {
    onChange(e.target.value);
  }
  return (
    <div className='flex items-center border-[2px] bg-white border-gray-100 px-5 py-2 rounded-3xl gap-4'>
        <FiSearch />
        <input value={textSearch} onChange={handleChangeTextSearch} placeholder='Nhập tên để tìm kiếm' type='text' />
    </div>
  )
}

export default SearchBarChatList