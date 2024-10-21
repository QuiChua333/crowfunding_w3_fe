import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './EmailVerify.module.scss';
import baseURL from '~/utils/baseURL';
import { success } from '~/assets/images';
import { PageNotFound } from '~/pages/common';
import { useVerifyEmailUrl } from '~/hooks/api/queries/auth/auth.query';

const cx = classNames.bind(styles);

function EmailVerify() {
  const [validUrl, setValidUrl] = useState(null);
  const param = useParams();
  const url = `${baseURL}/user/registerUser/${param.tokenLinkVerifyEmail}`;
  const { isSuccess, isError } = useVerifyEmailUrl(url);
  useEffect(() => {
    if (isSuccess) {
      setValidUrl(true);
    }
    if (isError) {
      setValidUrl(false);
    }
  }, []);

  return (
    <div>
      {validUrl && (
        <div className={cx('container')}>
          <img src={success} alt="success_img" className={cx('success_img')} />
          <h1>Email đã được xác thực thành công</h1>
          <Link to="/login">
            <button className={cx('green_btn')}>Đăng nhập</button>
          </Link>
        </div>
      )}
      {validUrl === false && <PageNotFound />}
    </div>
  );
}

export default EmailVerify;
