import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import MessageBoard from './MessageBoard'
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import SearchBarChatList from './ChatList/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenChat } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

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
  const currentUser = useSelector((state) => state.user.currentUser);
  const [listUser, setListUser] = useState([]);
  const getAllUser = async () => {
    const users = await CustomAxios.get(`${baseURL}/user/getAll`);
    const listUser = users.data.filter(user => user.id !== currentUser.id);
    setListUser(listUser);
  }
  const [textSearch, setTextSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleChangeTextSearch = (value) => {
    setTextSearch(value);
    const search = value.toString().toLowerCase();
    const usersSearch = listUser.filter(user => {
      const name = user.fullName.toLowerCase();
      return name.includes(search);
    });
    setFilteredUsers(usersSearch);
  };
  useEffect(() => {
    setFilteredUsers(listUser);
  }, [listUser]);
  useEffect(() => {
    handleChangeTextSearch(textSearch);
  }, [textSearch]);

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="fixed w-full h-full flex items-center justify-center inset-0 z-[1000] bg-black bg-opacity-50" onClick={handleCloseChat}>
      <div onClick={(e) => e.stopPropagation()} className="w-[70%] md:w-[90%] h-[70vh] md:h-[95vh] bg-white rounded-xl border-[4px] border-[#299899] flex relative z-[1100] overflow-hidden">
        <div className={`h-full transition-all flex-grow md:flex-grow-0 ${toggleChatList ? "md:max-w-[45%]" : "md:max-w-[100%]"}  border-r-[4px] border-r-[#299899] relative`}>
          <div className={`flex justify-center items-center bg-[#299899] px-2 md:px-5 py-4 md:py-8 min-h-[12%] ${toggleChatList && "gap-5"}`}>
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
              {toggleChatList && <SearchBarChatList value={textSearch} onChange={setTextSearch}/>}
            </div>         
          </div>
          
          <ChatList listUser={filteredUsers} indexActive={indexActive} setIndexActive={setIndexActive} toggleChatList={toggleChatList} />
        </div>
        <div className="h-full hidden md:block flex-grow">
          <MessageBoard userActive={listUser[indexActive]} indexActive={indexActive} setIndexActive={setIndexActive}/>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
