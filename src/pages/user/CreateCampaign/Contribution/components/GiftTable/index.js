import classNames from 'classnames/bind';

import styles from './GiftTable.module.scss';
import GiftRow from './GiftRow';
import { useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';
import { ClipLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function GiftTable({ gifts, getAllContributions, openDetailGift, isLoading }) {
  const [listGifts, setlistGifts] = useState([]);
  useEffect(() => {
    setlistGifts((prev) => {
      const state = [...gifts].map((item) => {
        return {
          id: item.id,
          userName: item.fullName || 'Khách vãng lai',
          email: item.email || '',
          perks: item.perks,
          money: formatMoney(item.amount) + 'VNĐ',
          date: convertDateFromString(item.shippingInfo.estDeliveryDate, 'less'),
          status: item.isFinish ? 'Đã gửi' : 'Chưa gửi',
        };
      });
      return state;
    });
  }, [gifts]);

  return (
    <div className={cx('wrapper')}>
      {isLoading && (
        <div className="text-center ">
          <ClipLoader size={40} color="#299899" />
        </div>
      )}
      {!isLoading && listGifts?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className={cx('email')}>EMAIL HỆ THỐNG</th>
              <th className={cx('perks')}>ĐẶC QUYỀN</th>
              <th className={cx('date')}>NGÀY GIAO DỰ KIẾN</th>
              <th className={cx('status')}>TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody>
            {listGifts?.map((item, index) => {
              return <GiftRow key={index} gift={item} index={index} openDetailGift={openDetailGift} />;
            })}
          </tbody>
        </table>
      )}

      {!isLoading && listGifts?.length === 0 && (
        <div className="text-center text-gray-500 font-medium text-[20px] mt-[100px]">Dữ liệu trống</div>
      )}
    </div>
  );
}

export default GiftTable;
