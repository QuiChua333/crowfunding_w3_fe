import classNames from 'classnames/bind';
import styles from './Bell.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoBell } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import { socket } from '~/services/socket/socket';
import { setNotifications } from '~/redux/slides/Notification';
import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';
const cx = classNames.bind(styles);
function Bell({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdownNotification, setShowDropdownNotification] = useState(false);
  const bellRef = useRef();
  const notifications = useSelector((state) => state.notification.notifications);
  const currentUser = useSelector((state) => state.user.currentUser);
  const totalUnread = notifications.reduce((acc, cur) => acc + (cur.isRead ? 0 : 1), 0);
  useEffect(() => {
    function handleClickOutside(event) {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setShowDropdownNotification(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [bellRef]);

  useEffect(() => {
    socket.on('newNotification', ({ id, content, url, isRead, to }) => {
      console.log(content, to);
      if (to === currentUser.id) {
        console.log('vào');
        dispatch(
          setNotifications([
            {
              id,
              content,
              url,
              isRead,
            },
            ...notifications,
          ]),
        );
      }
    });

    return () => {
      socket.off('newNotification');
    };
  }, [notifications]);

  const handleClickNotification = async (notification) => {
    if (notification.url) {
      const parsedUrl = new URL(notification.url);
      const path = parsedUrl.pathname;

      if (!notification.isRead) {
        const updateNotifications = notifications.map((item) => {
          if (notification.id === item.id) {
            return {
              ...item,
              isRead: true,
            };
          } else return item;
        });
        dispatch(setNotifications(updateNotifications));
      }
      navigate(path);
      try {
        if (!notification.isRead) {
          const response = await CustomAxios.patch(`${baseURL}/notification/${notification.id}/seen`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cx('wrapper')} onClick={() => setShowDropdownNotification((prev) => !prev)} ref={bellRef}>
      <div className="relative">
        <GoBell className="text-[20px]" />
        {totalUnread > 0 && (
          <div className="bg-red-500 rounded-[50%] w-6 h-6 flex items-center justify-center absolute -left-[2px] -top-[2px]">
            <span className="text-[10px] text-white">{totalUnread}</span>
          </div>
        )}
      </div>
      {showDropdownNotification && (
        <div className={cx('dropdownNotification')}>
          {notifications.length > 0 &&
            notifications.map((notification) => {
              return (
                <div
                  onClick={() => handleClickNotification(notification)}
                  key={notification.id}
                  className={cx('item', {
                    notRead: !notification.isRead,
                  })}
                >
                  {!notification.isRead && <div className={cx('un-read')}></div>}
                  <span className="flex-1">{notification.content}</span>
                </div>
              );
            })}
          {notifications.length === 0 && <div className="p-3">Không có thông báo</div>}
        </div>
      )}
    </div>
  );
}

export default Bell;
