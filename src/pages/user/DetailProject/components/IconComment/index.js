import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IconComment.module.scss';

const cx = classNames.bind(styles);
const IconComment = ({ setContent, content }) => {
  const reactions = [
    '❤️',
    '😆',
    '😯',
    '😢',
    '😡',
    '👍',
    '👎',
    '😄',
    '😂',
    '😍',
    '😘',
    '😗',
    '😚',
    '😳',
    '😭',
    '😓',
    '😤',
    '🤤',
    '👻',
    '💀',
    '🤐',
    '😴',
    '😷',
    '😵',
  ];
  const element = useRef(null);
  const [isShowDropdown, setShowDropdown] = useState(false);
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
  return (
    <div className={cx('wrapper')} ref={element} onClick={() => setShowDropdown((prev) => !prev)}>
      <span style={{ padding: '4px' }}>
        <span style={{ cursor: 'pointer', opacity: '0.8' }}>😄</span>
      </span>

      {isShowDropdown && (
        <div className={cx('dropdown')}>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', textAlign: 'center', cursor: 'pointer' }}
          >
            {reactions.map((icon) => (
              <span style={{ margin: '3px 0' }} key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconComment;
