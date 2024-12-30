import React from 'react'
import ChatList from './ChatList'
import MessageBoard from './MessageBoard'

const ChatComponent = () => {
  return (
    <div className="fixed w-full h-full flex items-center justify-center inset-0 z-[1000] bg-black bg-opacity-50">
      <div className="w-[80%] h-[95vh] bg-white rounded-xl border-[4px] border-[#299899] flex relative z-[1100] overflow-hidden">
        <div className="h-full w-[30%] border-r-[4px] border-r-[#299899]">
          <ChatList />
        </div>
        <div className="h-full w-[70%]">
          <MessageBoard />
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
