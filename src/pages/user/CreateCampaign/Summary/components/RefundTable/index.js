import classNames from 'classnames/bind';

import styles from './RefundTable.module.scss';
import RefundRow from './RefundRow';
import { useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';
import { ClipLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function RefundTable({ refunds, openDetailRefund, isLoading }) {
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
      {isLoading && (
        <div className="text-center ">
          <ClipLoader size={40} color="#299899" />
        </div>
      )}
      {!isLoading && listRefunds?.length > 0 && (
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
      )}
      {!isLoading && listRefunds?.length === 0 && (
        <div className="text-center text-gray-500 font-medium text-[20px] mt-[100px]">Dữ liệu trống</div>
      )}
    </div>
  );
}

export default RefundTable;
