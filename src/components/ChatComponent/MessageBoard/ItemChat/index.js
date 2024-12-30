import React from 'react'
import { avatar } from '../../ChatList/ItemChatList'

function ItemChat({index}) {
  return (
    <div className='flex gap-4 items-center'>
        {
            index % 2 === 0 && (
                <img className='w-16 h-16 rounded-full border border-gray-300' src={avatar} alt='avatar user'/> 
            )
        }
        <div className={`px-10 py-2 border text-white bg-[#299899] flex flex-col gap-2 ${index % 2 === 0 ? "rounded-e-[30px] rounded-s-[10px]" : "rounded-s-[30px] rounded-e-[10px]"}`}>
            <span className=''>sbdhsbdshbdshbdshdbshdbsh</span>
            <span className='text-sm self-end'>11:00</span>
        </div>
    </div>
  )
}

export default ItemChat