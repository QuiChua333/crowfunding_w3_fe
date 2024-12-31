import React, { useState } from 'react'
import ChatList from './ChatList'
import MessageBoard from './MessageBoard'
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import SearchBarChatList from './ChatList/SearchBar';
import { useDispatch } from 'react-redux';
import { setOpenChat } from '~/redux/slides/GlobalApp';

const ChatComponent = () => {
  const [indexActive, setIndexActive] = useState(-1);
  const dispatch = useDispatch();
  const handleCloseChat = () => {
    dispatch(setOpenChat(false));
  }
  const [toggleChatList, setToggleChatlist] = useState(true);
  const handleToggle = () => {
    setToggleChatlist(prev => !prev);
  }
  return (
    <div className="fixed w-full h-full flex items-center justify-center inset-0 z-[1000] bg-black bg-opacity-50" onClick={handleCloseChat}>
      <div onClick={(e) => e.stopPropagation()} className="w-[70%] md:w-[90%] h-[70vh] md:h-[95vh] bg-white rounded-xl border-[4px] border-[#299899] flex relative z-[1100] overflow-hidden">
        <div className={`h-full transition-all flex-grow md:flex-grow-0 ${toggleChatList ? "md:max-w-[45%]" : "md:max-w-[100%]"}  border-r-[4px] border-r-[#299899] relative`}>
          <div className={`flex items-center bg-[#299899] px-2 md:px-5 py-4 md:py-8 min-h-[12%] ${toggleChatList && "gap-5"}`}>
            <button onClick={handleToggle} className={`text-[24px] hidden md:flex text-white ring-1 hover:ring-2 ring-white rounded-full p-1 items-center justify-center`}>
                {toggleChatList ? <BiChevronsRight /> : <BiChevronsLeft />}
            </button>   
            <div
              className={`transition-all overflow-hidden ${
                toggleChatList
                  ? 'max-w-full'
                  : 'max-w-0'
              }`}
            >
              {toggleChatList && <SearchBarChatList />}
            </div>         
          </div>
          
          <ChatList indexActive={indexActive} setIndexActive={setIndexActive} toggleChatList={toggleChatList} />
        </div>
        <div className="h-full hidden md:block flex-grow">
          <MessageBoard indexActive={indexActive} setIndexActive={setIndexActive}/>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
