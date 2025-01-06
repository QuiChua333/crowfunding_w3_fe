import React, { useEffect, useRef, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { geminiLogo, logoCrowdfunding } from '~/assets/images';
import { setOpenGemini } from '~/redux/slides/GlobalApp';
import ItemChat from './ItemChat';
import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

function ChatGemini() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const handleCloseChat = () => {
    dispatch(setOpenGemini(false));
  };

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMessagesFirst = async () => {
    try {
      setLoading(true);
      const res = await CustomAxios.get(`${baseURL}/chat-gemini/${currentUser.id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const getMessages = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/chat-gemini/${currentUser.id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const nestedElement = useRef(null);
  useEffect(() => {
    if (nestedElement.current) {
      nestedElement.current.scrollTo({
        top: nestedElement.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  useEffect(() => {
    getMessagesFirst();
  }, []);

  const [textInput, setTextInput] = useState('');
  const handleSend = async () => {
    const textMsg = textInput;
    const msgUser = {
      content: textMsg,
      isGemini: false,
      sentAt: new Date(),
    }
    setTextInput('');
    setMessages((prev) => [
      ...prev, 
      msgUser
    ]);
    
    try {
      if (textMsg.trim().length === 0) return;
      const res = await CustomAxios.post(`${baseURL}/chat-gemini/${currentUser.id}`, {message: textMsg.trim()});
      
      setMessages((prev) => [
        ...prev, 
        res.data
      ]);
      getMessages();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="fixed w-full h-full flex md:items-center justify-center inset-0 z-[1000] bg-black bg-opacity-50"
      onClick={handleCloseChat}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-col p-10 md:mt-0 w-[70%] md:w-[50%] h-[65vh] md:h-[70vh] bg-white rounded-xl border-[4px] border-[#588dcf] flex relative z-[1100] overflow-hidden"
      >
        <div className="flex justify-between items-center border-b-[4px] pb-5">
          <span className='font-bold text-[#4381de] text-[20px]'>Chatbot tự động</span>
          <button className="hover:bg-gray-200 transition-all p-4 rounded-full" onClick={handleCloseChat}>
            <FiX className="text-gray-600 text-[20px]" />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full gap-10 mt-5">
            <div ref={nestedElement} className='flex flex-col gap-5 h-auto max-h-[38vh] md:max-h-[40vh] overflow-y-scroll p-5'>
              {
                loading ? (
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                      <span className="text-gray-600">Đang tải...</span>
                    </div>
                  ) : (
                    messages.length !== 0 ? (
                        messages.map((item, index) => {
                          return (
                              <div className={`flex items-center`}>
                                  <ItemChat msg={item} key={index}/>
                              </div>
                          )
                        })
                      ) : (
                        <div className="flex justify-center items-center space-x-2">
                          <span className="text-gray-600">Chưa có lịch sử chat</span>
                        </div>
                    )
                  )
              }
            </div>
            <div className="flex flex-col border-[2px] border-[#cccccc] rounded-2xl px-5 py-2 focus-within:border-[#3a6ca9]">
                <div className="flex items-center justify-between gap-5">
                  <input value={textInput} onChange={(e) => setTextInput(e.target.value)}
                      className="w-full text-[14px] p-2 border border-gray-300 rounded-lg"
                      placeholder="Nhập tin nhắn..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && textInput.trim()) {
                          handleSend();
                        }
                      }}
                  />
                  <div className="gap-4 flex items-center" onClick={handleSend}>
                      <BsFillSendFill className="w-10 h-9 text-[#588dcf] hover:cursor-pointer hover:text-[#3a6ca9]" />
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ChatGemini;
