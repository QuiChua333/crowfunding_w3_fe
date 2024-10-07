import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
const cx = classNames.bind(styles);

function DropDown({ menu, onClickItem, index, contribution, getAllContributions }) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [status, setStatus] = useState('');
  const [contentToast, setContentToast] = useState('');
  const handleClickItem = (item) => {
    onClickItem(item, index);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('action')}>Xem đóng góp</div>

      <div style={{ height: '1px', background: '#ccc' }}></div>
      <div className={cx('action', 'action-delete')}>Xóa dự án</div>
    </div>
  );
}

export default DropDown;
