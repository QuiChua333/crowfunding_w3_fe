import React from 'react';
import { avatar } from '../../ChatList/ItemChatList';
import { useSelector } from 'react-redux';

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
        className={`px-10 py-2 border text-white bg-[#299899] flex flex-col gap-2 ${
          message.senderId !== currentUser.id
            ? 'rounded-e-[30px] rounded-s-[10px]'
            : 'rounded-s-[30px] rounded-e-[10px]'
        }`}
      >
        <span className="">{message.content}</span>
        <span className="text-sm self-end">11:00</span>
      </div>
    </div>
  );
}

export default ItemChat;
