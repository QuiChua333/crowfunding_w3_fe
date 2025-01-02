import React from 'react'

export const avatar = "data:image/png;base64,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";

function ItemChatList({user, toggleChatList, index, indexActive, setIndexActive}) {
  const handleClickItem = () => {
    setIndexActive(index);
  }
  return (
    <div onClick={handleClickItem} className={`border-b flex justify-between items-center px-5 py-2 min-h-[74px] rounded transition-all hover:cursor-pointer hover:bg-gray-100 ${indexActive === index && "bg-gray-100"}`}>
      <div className='flex justify-center items-center gap-5'>
        <div className='flex rounded justify-center transition-all'>
          <div className='flex items-center justify-center relative'>
            <img className='w-16 h-16 rounded-full border border-gray-300' src={user.avatar || avatar} alt='avatar user'/> 
            <div className='w-3 h-3 rounded-full bg-green-600 absolute right-1 bottom-1'></div>     
          </div>
          {
            !toggleChatList && (<div className='text-[8px] ml-2 rounded-full text-white bg-red-500 inline-flex w-7 h-7 items-center justify-center'>12</div>)
          }
        </div>
        {
          toggleChatList && (
            <div className={`flex flex-col justify-between ${toggleChatList ? "max-w-full" : "max-w-0"}`}>
              <span className='font-medium text-black'>{user.fullName}</span>
              <span className='text-[14px]'>Online</span>
            </div>
          )
        }
      </div>
      <div className={`flex flex-col items-end justify-center gap-y-1 ${toggleChatList ? "max-w-full" : "max-w-0"}`}>
        {
            toggleChatList && (
              <>
                <div className='text-[8px] rounded-full text-white bg-red-500 inline-flex w-7 h-7 items-center justify-center'>12</div>
                <span className='text-[14px]'>30 phút trước</span>
              </>
            )
        }
      </div>
    </div>
  )
}

export default ItemChatList