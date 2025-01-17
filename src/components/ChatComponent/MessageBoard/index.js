import React, { useEffect, useRef, useState } from 'react';
import { avatar } from '../ChatList/ItemChatList';
import { FiX } from 'react-icons/fi';
import { BsFillSendFill } from 'react-icons/bs';
import ItemChat from './ItemChat';
import { logoCrowdfunding } from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '~/services/socket/socket';
import { setActiveChat, setChatList, setNewChat, setOpenChat, setTotalUnreadMessage } from '~/redux/slides/Chat';
import { ClipLoader } from 'react-spinners';

function MessageBoard({}) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const chatList = useSelector((state) => state.chat.chatList);
  const totalUnreadMessage = useSelector((state) => state.chat.totalUnreadMessage);
  const chatListRef = useRef(chatList);
  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  const newChat = useSelector((state) => state.chat.newChat);
  const [isLoadingSend, setLoadingSend] = useState(false);
  const [isLoadingFirst, setLoadingFirst] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleCloseChatBoard = () => {
    dispatch(setOpenChat(false));
    dispatch(setActiveChat({}));
  };
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (activeChat.user?.id) {
      setLoadingFirst(true);
      socket.emit('getMessages', { chatRoomId: activeChat.chatRoomId });
      socket.on('messages', (messagesList) => {
        setLoadingFirst(false);
        console.log(messagesList);
        setMessages(messagesList);
      });

      if (activeChat.chatRoomId) {
        const newChatList = chatListRef.current.map((chat) => {
          if (chat.chatRoomId === activeChat.chatRoomId) {
            return {
              ...chat,
              lastMessageTime: new Date(),
              unreadMessageCount: 0,
            };
          } else return chat;
        });
        dispatch(setChatList(newChatList));
        socket.emit('seenMessage', {
          chatRoomId: activeChat.chatRoomId,
        });
      }

      socket.on('newMessage', (newMessage) => {
        setLoadingSend(false);
        console.log({ chatList: chatList.current });
        console.log({ newMessage });
        console.log({ activeChat });
        const otherChat = chatListRef.current.some(
          (item) => item.chatRoomId === newMessage.chatRoomId && activeChat.chatRoomId !== newMessage.chatRoomId,
        );

        if (otherChat) {
          const newChatList = chatListRef.current.map((chat) => {
            if (chat.chatRoomId === newMessage.chatRoomId) {
              return {
                ...chat,
                lastMessageTime: new Date(),
                unreadMessageCount: chat.unreadMessageCount + 1,
              };
            } else return chat;
          });
          dispatch(setChatList(newChatList));
        } else {
          if (!activeChat.chatRoomId) {
            dispatch(
              setActiveChat({
                ...activeChat,
                chatRoomId: newMessage.chatRoomId,
              }),
            );

            const updateChatList = chatListRef.current.map((item) => {
              if (!item.chatRoomId) {
                return {
                  ...item,
                  chatRoomId: newMessage.chatRoomId,
                };
              } else return item;
            });
            if (newChat.user) dispatch(setNewChat({}));

            dispatch(setChatList(updateChatList));
          }

          setMessages((prevMessages) => [...prevMessages, newMessage]);

          if (activeChat.chatRoomId) {
            socket.emit('seenMessage', {
              chatRoomId: activeChat.chatRoomId,
            });

            const newChatList = chatListRef.current.map((chat) => {
              if (chat.chatRoomId === activeChat.chatRoomId) {
                return {
                  ...chat,
                  lastMessageTime: new Date(),
                  unreadMessageCount: 0,
                };
              } else return chat;
            });
            dispatch(setChatList(newChatList));
          }
        }
      });
    }

    return () => {
      if (activeChat.user?.id) {
        socket.off('newMessage');
        socket.off('messages');
      }
    };
  }, [activeChat]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        message: inputMessage,
        senderId: currentUser.id, // Cập nhật logic sender
        receiverId: activeChat.user.id,
        chatRoomId: activeChat.chatRoomId,
      };
      setLoadingSend(true);
      socket.emit('sendMessage', messageData);
      setInputMessage('');
    }
  };
  const activeUsers = useSelector((state) => state.chat.activeUsers);
  const isOnline = activeUsers.includes(activeChat.user?.id);

  const nestedElement = useRef(null);
  useEffect(() => {
    if (nestedElement.current) {
      nestedElement.current.scrollTo({
        top: nestedElement.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-full bg-[#f5f5f5]">
      {activeChat.user?.id ? (
        <>
          <div className="h-[10%] border-b-[2px] flex items-center justify-between py-5 px-8">
            <div className="flex items-center gap-4">
              <div className="inline-flex relative">
                <img
                  className="w-16 h-16 rounded-full border border-gray-300"
                  src={activeChat.user?.avatar || avatar}
                  alt="avatar user"
                />

                {isOnline && <div className="w-4 h-4 rounded-full bg-green-600 absolute right-1 bottom-0"></div>}
                {!isOnline && <div className="w-4 h-4 rounded-full bg-red-700 absolute right-1 bottom-0"></div>}
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold text-gray-700">{activeChat.user?.fullName}</span>
                {isOnline && <span className="text-[12px] italic">Đang hoạt động</span>}
                {!isOnline && <span className="text-[12px] italic">Ngoại tuyến</span>}
              </div>
            </div>
            <button
              className="hover:bg-gray-200 transition-all p-4 rounded-full"
              onClick={() => {
                dispatch(setActiveChat({}));
              }}
            >
              <FiX className="text-gray-400 text-[20px]" />
            </button>
          </div>
          <div className="flex min-h-[90%] flex-col justify-between gap-10 px-12 py-8 relative">
            <div className=" overflow-y-scroll flex flex-col gap-y-5 p-5" ref={nestedElement}>
              {!isLoadingFirst && (
                <>
                  {messages.map((message, index) => {
                    return (
                      <div
                        className={`flex items-center ${
                          message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <ItemChat message={message} index={index} key={index} activeUser={activeChat.user} />
                      </div>
                    );
                  })}
                </>
              )}
              {isLoadingFirst && (
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-8 h-8 border-4 border-t-4 border-[#299899] border-solid rounded-full animate-spin"></div>
                  <span className="text-gray-600">Đang tải...</span>
                </div>
              )}
            </div>
            <div className="flex flex-col border border-[#cccccc] rounded-2xl p-5">
              <div className="w-full flex items-center flex-wrap"></div>
              <div className={`${files.length > 0 && 'mt-4'} flex items-center justify-between gap-5`}>
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập tin nhắn"
                  className="w-full text-[14px] bg-[#f5f5f5]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputMessage.trim()) {
                      sendMessage();
                    }
                  }}
                />
                <div className="gap-4 flex items-center">
                  {isLoadingSend === false && (
                    <BsFillSendFill
                      onClick={sendMessage}
                      className="w-10 h-9 text-[#299899] hover:cursor-pointer hover:text-[#005759]"
                    />
                  )}
                  {isLoadingSend === true && <ClipLoader size={20} color="#299899" />}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full items-center relative">
          <button
            className="hover:bg-gray-200 transition-all p-4 rounded-full absolute top-10 right-10"
            onClick={handleCloseChatBoard}
          >
            <FiX className="text-gray-400 text-[20px]" />
          </button>
          <span className="text-center text-[#299899] font-semibold text-[30px] italic mt-28">
            Chào mừng bạn đến với kênh chat của GIVE-FUN
          </span>
          <div className="border-4 border-[#299899] rounded-full mt-10">
            <img src={logoCrowdfunding} className="w-[300px] h-[300px]" alt="Section Image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageBoard;
