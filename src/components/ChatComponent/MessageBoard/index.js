import React, { useEffect, useRef, useState } from 'react';
import { avatar } from '../ChatList/ItemChatList';
import { FiX } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiFilePlus } from 'react-icons/fi';
import { BsFillSendFill } from 'react-icons/bs';
import ItemChat from './ItemChat';
import { logoCrowdfunding } from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '~/services/socket/socket';
import { setActiveChat, setChatList, setOpenChat } from '~/redux/slides/Chat';

function MessageBoard({}) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const chatList = useSelector((state) => state.chat.chatList);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event) {
    const selectedFiles = Array.from(event.target.files); // Chuyển thành mảng thực
    if (selectedFiles.length === 0) return;

    const newFiles = [];
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} vượt quá kích thước 5MB và sẽ không được thêm.`);
        continue;
      }

      // Kiểm tra file đã tồn tại trong danh sách chưa
      if (!files.some((e) => e.name === file.name)) {
        formData.append('files', file); // Thêm file vào FormData
        newFiles.push({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type, // Loại tệp
        });
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
  }

  function deleteFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }
  const handleCloseChatBoard = () => {
    dispatch(setOpenChat(false));
  };
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (activeChat.user?.id) {
      socket.emit('getMessages', { chatRoomId: activeChat.chatRoomId });
      socket.on('messages', (messagesList) => {
        console.log(messagesList);
        setMessages(messagesList);
      });

      socket.on('newMessage', (newMessage) => {
        if (!activeChat.chatRoomId) {
          dispatch(
            setActiveChat({
              ...activeChat,
              chatRoomId: newMessage.chatRoomId,
            }),
          );

          const updateChatList = chatList.map((item) => {
            if (item.user.id === activeChat.user.id) {
              return {
                ...item,
                chatRoomId: newMessage.chatRoomId,
              };
            } else return item;
          });

          dispatch(setChatList(updateChatList));
        }
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      if (activeChat.user?.id) {
        socket.off('newMessage');
        socket.off('messages');
      }
    };
  }, [activeChat.user]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        message: inputMessage,
        senderId: currentUser.id, // Cập nhật logic sender
        receiverId: activeChat.user.id,
        chatRoomId: activeChat.chatRoomId,
      };
      socket.emit('sendMessage', messageData);
      setInputMessage('');
    }
  };
  const activeUsers = useSelector((state) => state.chat.activeUsers);
  const isOnline = activeUsers.includes(activeChat.user?.id);
  return (
    <div className="flex flex-col h-full">
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
              onClick={() => dispatch(setActiveChat({}))}
            >
              <FiX className="text-gray-400 text-[20px]" />
            </button>
          </div>
          <div className="flex min-h-[90%] flex-col justify-between gap-10 px-12 py-8 relative">
            <div className=" overflow-y-scroll flex flex-col gap-y-5 p-5">
              {/* {
                                Array.from({length: 25}).map((item, index) => {
                                    return (
                                        <div className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                            <ItemChat index={index} key={index}/>
                                        </div>
                                    )
                                })
                            } */}
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
            </div>
            <div className="flex flex-col border border-[#cccccc] rounded-2xl p-5">
              <div className="w-full flex items-center flex-wrap">
                {files.map((item, index) => (
                  <div className="flex -ml-2 relative" key={index}>
                    {item.type.startsWith('image/') ? (
                      <img
                        className="w-[60px] h-[60px] relative mx-4 border rounded-lg"
                        src={item.url}
                        alt={item.name}
                      />
                    ) : (
                      <div className="relative mx-4 border rounded-lg flex flex-col items-center justify-center border-gray-200 p-2 hover:cursor-pointer hover:underline">
                        <span className="text-[10px] italic truncate w-full text-center" title={item.name}>
                          {item.name}
                        </span>
                      </div>
                    )}
                    <AiFillCloseCircle
                      className="absolute -top-4 -right-1 text-[30px] cursor-pointer mt-1 h-6 font-bold"
                      onClick={() => deleteFile(index)}
                    />
                  </div>
                ))}
              </div>
              <div className={`${files.length > 0 && 'mt-4'} flex items-center justify-between gap-5`}>
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập tin nhắn"
                  className="w-full text-[14px]"
                />
                <div className="gap-4 flex items-center">
                  <FiFilePlus
                    className="w-10 h-9 text-[#299899] hover:cursor-pointer hover:text-[#005759]"
                    onClick={selectFiles}
                  />
                  <input type="file" name="file" multiple hidden ref={fileInputRef} onChange={onFileSelect} />
                  <BsFillSendFill
                    onClick={sendMessage}
                    className="w-10 h-9 text-[#299899] hover:cursor-pointer hover:text-[#005759]"
                  />
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
