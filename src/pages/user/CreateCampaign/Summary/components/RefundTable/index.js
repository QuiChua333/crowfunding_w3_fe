import classNames from 'classnames/bind';

import styles from './RefundTable.module.scss';
import RefundRow from './RefundRow';
import { useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function RefundTable({ refunds, openDetailRefund }) {
  const [listRefunds, setlistRefunds] = useState([]);
  useEffect(() => {
    setlistRefunds((prev) => {
      const state = [...refunds]?.map((item) => {
        return {
          id: item.id,
          userName: item.fullName || 'Khách vãng lai',
          estDeliveryDate: item.estDeliveryDate ? convertDateFromString(item.estDeliveryDate) : 'Không có',
          email: item.email,
          perks: item.perks,
          money: formatMoney(Number(item.totalPayment)) + 'VNĐ',
          date: convertDateFromString(item.date),
          status: item.isRefund ? 'Đã hoàn trả' : 'Chưa hoàn trả',
          isChecked: false,
        };
      });
      return state;
    });
  }, [refunds]);

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th className={cx('user')}>NGƯỜI ĐÓNG GÓP</th>
            <th className={cx('email')}>EMAIL HỆ THỐNG</th>
            <th className={cx('money')}>TIỀN THANH TOÁN</th>
            <th className={cx('date')}>NGÀY ĐÓNG GÓP</th>
            <th className={cx('status')}>TRẠNG THÁI</th>
          </tr>
        </thead>
        <tbody>
          {listRefunds?.map((item, index) => {
            return <RefundRow key={index} refund={item} index={index} openDetailRefund={openDetailRefund} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RefundTable;
