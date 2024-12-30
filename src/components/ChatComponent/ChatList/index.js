import React from 'react'
import SearchBarChatList from './SearchBar'
import ItemChatList from './ItemChatList'

function ChatList() {
  return (
    <div className='h-full flex flex-col'>
        <div className='flex flex-col bg-[#299899] p-5 min-h-[110px] gap-y-4'>
            <span className='text-[14px] font-semibold text-white'>Tìm kiếm</span>
            <SearchBarChatList />
        </div>
        {/* Phần danh sách chat */}
        <div className='flex-1 p-5 overflow-y-auto rounded-lg'>
            {
                Array.from({ length: 20 }).map((item, index) => (
                    <ItemChatList key={index} />
                ))
            }
        </div>
    </div>
  )
}

export default ChatList
