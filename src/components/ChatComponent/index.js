import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import MessageBoard from './MessageBoard';
import { BiChevronsLeft } from 'react-icons/bi';
import { BiChevronsRight } from 'react-icons/bi';
import SearchBarChatList from './ChatList/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';
import { setChatList, setListUser, setOpenChat } from '~/redux/slides/Chat';

const ChatComponent = () => {
  const activeUsers = useSelector((state) => state.chat.activeUsers);
  const chatList = useSelector((state) => state.chat.chatList);
  const [activeUser, setActiveUser] = useState({});
  const dispatch = useDispatch();
  const handleCloseChat = () => {
    dispatch(setOpenChat(false));
  };
  const [toggleChatList, setToggleChatlist] = useState(true);
  const handleToggle = () => {
    setToggleChatlist((prev) => !prev);
  };
  const currentUser = useSelector((state) => state.user.currentUser);
  const getHistoryChatUsers = async () => {
    const response = await CustomAxios.get(`${baseURL}/chat/history/chat-list`);
    const chatListResponse = response.data;

    if (activeUsers.length > 0) {
      prioritizeOnline([...chatList, ...chatListResponse]);
    } else {
      dispatch(setChatList([...chatList, ...chatListResponse]));
    }
  };

  const prioritizeOnline = (chatList) => {
    console.log({ chatList });
    const onlines = chatList.filter((item) => activeUsers.includes(item.user.id));
    const offlines = chatList.filter((item) => !activeUsers.includes(item.user.id));
    const newList = [...onlines, ...offlines];
    dispatch(setChatList(newList));
  };

  useEffect(() => {
    if (chatList?.length > 0 && activeUsers.length > 0) {
      prioritizeOnline(chatList);
    }
  }, [activeUsers]);
  const [textSearch, setTextSearch] = useState('');
  const [filteredChatList, setFilteredChatList] = useState([]);

  const handleChangeTextSearch = (value) => {
    setTextSearch(value);
    const search = value.toString().toLowerCase();
    const usersSearch = chatList.filter((item) => {
      const name = item.user.fullName.toLowerCase();
      return name.includes(search);
    });
    setFilteredChatList(usersSearch);
  };
  useEffect(() => {
    setFilteredChatList(chatList);
  }, [chatList]);
  useEffect(() => {
    handleChangeTextSearch(textSearch);
  }, [textSearch]);

  useEffect(() => {
    getHistoryChatUsers();
  }, []);

  return (
    <div
      className="fixed w-full h-full flex items-center justify-center inset-0 z-[1000] bg-black bg-opacity-50"
      onClick={handleCloseChat}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[70%] md:w-[90%] h-[70vh] md:h-[95vh] bg-white rounded-xl border-[4px] border-[#299899] flex relative z-[1100] overflow-hidden"
      >
        <div
          className={`h-full transition-all flex-grow md:flex-grow-0 ${
            toggleChatList ? 'md:max-w-[45%]' : 'md:max-w-[100%]'
          }  border-r-[4px] border-r-[#299899] relative`}
        >
          <div
            className={`flex justify-center items-center bg-[#299899] px-2 md:px-5 py-4 md:py-8 min-h-[12%] ${
              toggleChatList && 'gap-5'
            }`}
          >
            <button
              onClick={handleToggle}
              className={`text-[24px] hidden md:flex text-white ring-1 hover:ring-2 ring-white rounded-full p-1 items-center justify-center`}
            >
              {toggleChatList ? <BiChevronsRight /> : <BiChevronsLeft />}
            </button>
            <div className={`transition-all overflow-hidden ${toggleChatList ? 'max-w-full' : 'max-w-0'}`}>
              {toggleChatList && <SearchBarChatList value={textSearch} onChange={setTextSearch} />}
            </div>
          </div>

          <ChatList chatList={filteredChatList} toggleChatList={toggleChatList} />
        </div>
        <div className="h-full hidden md:block flex-grow">
          <MessageBoard />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
