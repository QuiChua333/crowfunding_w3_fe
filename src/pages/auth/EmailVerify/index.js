import React, { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './EmailVerify.module.scss';
import baseURL from '~/utils/baseURL';
import { success } from '~/assets/images';
import { PageNotFound } from '~/pages/common';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);

function EmailVerify() {
  const [validUrl, setValidUrl] = useState(null);
  const param = useParams();
  const verifyEmailUrl = async () => {
    try {
      const url = `${baseURL}/user/registerUser/${param.tokenLinkVerifyEmail}`;
      const { data } = await CustomAxios.get(url);
      console.log(data);
      setValidUrl(true);
    } catch (error) {
      console.log(error);
      setValidUrl(false);
    }
  };

  useEffect(() => {
    verifyEmailUrl();
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
