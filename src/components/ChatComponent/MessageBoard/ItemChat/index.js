import React from 'react';
import { avatar } from '../../ChatList/ItemChatList';
import { useSelector } from 'react-redux';
import { formatDateTimeChat } from '~/utils/formatTimeChat';

function ItemChat({ message, index, activeUser }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="flex gap-4 items-center">
      {message.senderId !== currentUser.id && (
        <img
          className="w-16 h-16 rounded-full border border-gray-300"
          src={activeUser.avatar || avatar}
          alt="avatar user"
        />
      )}
      <div
        className={`px-10 py-2 border text-white  flex flex-col gap-2 ${
          message.senderId !== currentUser.id
            ? 'rounded-e-[30px] rounded-s-[10px]  bg-white border'
            : 'rounded-s-[30px] rounded-e-[10px] bg-[#299899]'
        }`}
      >
        <span className={`${message.senderId !== currentUser.id && 'text-[#080809]'}`}>{message.content}</span>
        <span className={`text-sm self-end ${message.senderId !== currentUser.id && 'text-[#080809]'}`}>
          {formatDateTimeChat(message.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default ItemChat;
