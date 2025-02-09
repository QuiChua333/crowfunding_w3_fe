import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CommentMenu.module.scss';

import { BsThreeDotsVertical } from 'react-icons/bs';
const cx = classNames.bind(styles);
const CommentMenu = ({ campaign, comment, setOnEdit, handleRemoveComment, members }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleRemove = () => {
    if (campaign.owner.id === currentUser.id || comment.author?.id === currentUser.id) {
      handleRemoveComment(comment);
    }
  };
  const element = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (element.current && !element.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [element]);
  const MenuItem = () => {
    return (
      <div className={cx('dropdown')}>
        <div className={cx('item-drop')} onClick={() => setOnEdit(true)}>
          <span>Chỉnh sửa</span>
        </div>
        <div className={cx('item-drop')} onClick={handleRemove}>
          <span>Xóa</span>
        </div>
      </div>
    );
  };
  const MenuItem2 = () => {
    return (
      <div className={cx('dropdown')}>
        <div className={cx('item-drop')} onClick={handleRemove}>
          <span>Xóa</span>
        </div>
      </div>
    );
  };

  const [isShowDropdown, setShowDropdown] = useState(false);
  return (
    <div className={cx('wrapper')}>
      {(members.some((i) => i.userId === currentUser.id) || comment.author?.id === currentUser.id) && (
        <div style={{ position: 'relative' }} onClick={() => setShowDropdown((prev) => !prev)} ref={element}>
          <span className={cx('three-dot')}>
            <BsThreeDotsVertical style={{ color: '#888' }} />
          </span>

          {isShowDropdown && (
            <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: '-20px', zIndex: '20' }}>
              {members.some((i) => i.userId === currentUser.id)
                ? comment.author?.id === currentUser.id
                  ? MenuItem()
                  : MenuItem2()
                : comment.author?.id === currentUser.id && MenuItem()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
