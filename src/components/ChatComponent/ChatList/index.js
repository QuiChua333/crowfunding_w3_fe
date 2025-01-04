import React from 'react';
import ItemChatList from './ItemChatList';

function ChatList({ chatList, toggleChatList }) {
  return (
    <div className="transition-all flex-1 p-5 h-full overflow-y-auto rounded-lg">
      {chatList?.map((item, index) => (
        <ItemChatList chat={item} index={index} toggleChatList={toggleChatList} key={index} />
      ))}
    </div>
  );
}

export default ChatList;
