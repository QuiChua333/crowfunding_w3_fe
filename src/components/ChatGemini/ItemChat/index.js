import React from 'react'
import { formatDateTimeChat } from '~/utils/formatTimeChat'

function ItemChat({msg}) {
  return (
    <div className={`flex gap-4 max-w-full w-full ${msg.isGemini ? "justify-start" : "justify-end"}`}>
        {
            msg.isGemini && (
                <div className='w-16 h-16 rounded-full text-[8px] text-white flex items-center justify-center bg-[#15365d] border border-gray-300'>GiveFun</div>
            )
        }
        <div className={`px-5 py-2 border text-white ${msg.isGemini ? "bg-[#2d4365]" : "bg-[#328ce1]"} inline-flex items-baseline flex-col gap-2 rounded-xl max-w-[70%]`}>
            <span className={`max-w-full break-all text-wrap whitespace-wrap self-start text-[10px] md:text-[14px] text-start`}>{msg.content}</span>
            <span className={`${msg.isGemini ? "self-end" : "self-start" } text-[10px]`}>{formatDateTimeChat(msg.sentAt)}</span>
        </div>
    </div>
  )
}

export default ItemChat