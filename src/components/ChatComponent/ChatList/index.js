import React from 'react'
import ItemChatList from './ItemChatList'

function ChatList({listUser, toggleChatList, indexActive, setIndexActive}) {
  return (
    <div className='transition-all flex-1 p-5 h-full overflow-y-auto rounded-lg'>
      {
          listUser?.map((user, index) => (
              <ItemChatList user={user} indexActive={indexActive} index={index} setIndexActive={setIndexActive} toggleChatList={toggleChatList} key={index} />
          ))
      }
    </div>
  )
}

export default ChatList
