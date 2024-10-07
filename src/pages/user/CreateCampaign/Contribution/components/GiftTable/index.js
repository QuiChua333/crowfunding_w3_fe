import classNames from 'classnames/bind';

import styles from './GiftTable.module.scss';
import GiftRow from './GiftRow';
import { useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function GiftTable({ gifts, getAllContributions, openDetailGift }) {
  const [listGifts, setlistGifts] = useState([]);
  useEffect(() => {
    setlistGifts((prev) => {
      const state = [...gifts].map((item) => {
        return {
          id: item._id,
          userName: item.user.fullName,
          email: item.user.email || '',
          perks: item.perks,
          money: formatMoney(item.money) + 'VNĐ',
          date: convertDateFromString(item.shippingInfo.estDelivery, 'less'),
          status: item.isFinish ? 'Đã gửi' : 'Chưa gửi',
        };
      });
      return state;
    });
  }, [gifts]);

  return (
    <div className={cx('wrapper')}>
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
    </div>
  );
}

export default GiftTable;
