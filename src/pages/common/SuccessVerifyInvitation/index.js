import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuccessVerify.module.scss';
import { success } from '~/assets/images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SuccessVerifyInvitation() {
  return (
    <div className={cx('container')}>
      <img src={success} alt="success_img" className={cx('success_img')} />
      <h1>Bạn đã tham gia vào chiến dịch</h1>
      <Link to="/">
        <button className={cx('green_btn')}>Quay về trang chủ</button>
      </Link>
    </div>
  );
}

export default SuccessVerifyInvitation;
