import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './EmailVerify.module.scss';
import { success, verifyEmailSuccess } from '~/assets/images';

const cx = classNames.bind(styles);

function EmailVerify() {
  return (
    <div>
      <div className={cx('container')}>
        <img src={verifyEmailSuccess} alt="success_img" className={cx('success_img')} />
        <h1>Email đã được xác thực thành công</h1>
        <Link to="/login">
          <button className={cx('green_btn')}>Đăng nhập</button>
        </Link>
      </div>
    </div>
  );
}

export default EmailVerify;
