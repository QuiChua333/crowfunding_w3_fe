import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SuccessVerify.module.scss';
import baseURL from '~/utils/baseURL';
import PageNotFound from '../PageNotFound';
import { success } from '~/assets/images';
import { useVerifyEmailUrl } from '~/hooks/api/queries/auth/auth.query';
const cx = classNames.bind(styles);

function SuccessVerifyInvitation() {
  const [validUrl, setValidUrl] = useState(null);
  const param = useParams();
  const url = `${baseURL}/campaign/team/${param.tokenLinkInvitation}`;

  const { data, refetch } = useVerifyEmailUrl(url);
  useEffect(() => {
    if (data) {
      setValidUrl(true);
    } else {
      setValidUrl(false);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [param]);

  return (
    <>
      {validUrl && (
        <div className={cx('container')}>
          <img src={success} alt="success_img" className={cx('success_img')} />
          <h1>Bạn đã tham gia vào chiến dịch</h1>
          <Link to="/">
            <button className={cx('green_btn')}>Quay về trang chủ</button>
          </Link>
        </div>
      )}
      {validUrl === false && <PageNotFound />}
    </>
  );
}

export default SuccessVerifyInvitation;
