import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
const cx = classNames.bind(styles);

function DropDown({ onClickItem, index, setShowModalGivePerk, setUserContributionGivePerk }) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [status, setStatus] = useState('');
  const [contentToast, setContentToast] = useState('');
  const handleClickItem = (item) => {
    onClickItem(item, index);
  };

  return (
    <div className={cx('wrapper')}>
      <div
        onClick={() => {
          setUserContributionGivePerk();
          setShowModalGivePerk(true);
        }}
        className={cx('action')}
      >
        Tặng đặc quyền
      </div>
    </div>
  );
}

export default DropDown;
