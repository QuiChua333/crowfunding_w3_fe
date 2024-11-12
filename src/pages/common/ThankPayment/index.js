import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import styles from './ThankPayment.module.scss';
import { giveLove, logoEmail, logoXanhLon } from '~/assets/images';
import { usePaymentSuccessMutation } from '~/hooks/api/mutations/user/contribution.mutation';
const cx = classNames.bind(styles);
function ThankPayment() {
  // const url = new URL(window.location.href);
  // const extraData = url.searchParams.get('extraData');
  // const orderId = url.searchParams.get('orderId');
  // const resultCode = url.searchParams.get('resultCode');

  // const [campaignId, setCampaignId] = useState('');
  // const [time, setTime] = useState(1);
  // const paymentSuccess = usePaymentSuccessMutation();
  // const handleSuccess = async () => {
  //   paymentSuccess.mutate(null, {
  //     onSuccess: (res) => {
  //       setCampaignId(res?.data);
  //       setTime((prev) => prev + 1);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (time === 1) {
  //     if (parseInt(resultCode) === 0) {
  //       handleSuccess({ extraData, orderId });
  //     }
  //   }
  // }, []);
  const handleClickBack = () => {
    window.location.href = '/';
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className="mb-[20px]">
          <img src={logoEmail} style={{ width: ' 300px', objectFit: 'cover', borderRadius: '16px' }} />
        </div>
        <div className="text-[#34ca96] font-[600] text-[20px]">Cảm ơn bạn đã ủng hộ chiến dịch của chúng tôi!</div>
        <img src={giveLove} className="w-[60px]" />
        <div onClick={handleClickBack} className={cx('back-btn')}>
          <IoIosArrowBack /> Quay về trang chủ
        </div>
      </div>
    </div>
  );
}

export default ThankPayment;
