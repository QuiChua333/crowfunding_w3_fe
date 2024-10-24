import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import baseURL from '~/utils/baseURL';
import { IoIosArrowBack } from 'react-icons/io';
import styles from './ThankPayment.module.scss';
import { logoXanhLon } from '~/assets/images';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);
function ThankPayment() {
  const url = new URL(window.location.href);
  const extraData = url.searchParams.get('extraData');
  const orderId = url.searchParams.get('orderId');
  const resultCode = url.searchParams.get('resultCode');

  const [campaignId, setCampaignId] = useState('');
  const [time, setTime] = useState(1);
  const handleSuccess = async (body) => {
    try {
      const url = `${baseURL}/contribution/paymentMomo/success`;
      const res = await CustomAxios.post(url, body);
      console.log(res.data.data);
      setCampaignId(res.data.data);
      setTime((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (time === 1) {
      if (parseInt(resultCode) === 0) {
        handleSuccess({ extraData, orderId });
      }
    }
  }, []);
  const handleClickBack = () => {
    if (campaignId) {
      window.location.href = `/project/${campaignId}/detail`;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div>
          <img src={logoXanhLon} style={{ width: ' 300px', objectFit: 'cover' }} />
        </div>
        <div>Cảm ơn bạn đã ủng hộ chiến dịch của chúng tôi!</div>
        <div onClick={handleClickBack} className={cx('back-btn')}>
          {' '}
          <IoIosArrowBack /> Quay về trang chiến dịch
        </div>
      </div>
    </div>
  );
}

export default ThankPayment;
