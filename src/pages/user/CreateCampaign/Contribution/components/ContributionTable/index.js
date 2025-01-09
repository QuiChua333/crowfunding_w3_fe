import classNames from 'classnames/bind';

import styles from './ContributionTable.module.scss';
import ContributionRow from './ContributionRow';
import { useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';
import { ClipLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function ContributionTable({ contributions, openDetailContribution, isLoading }) {
  const [listContributions, setlistContributions] = useState([]);
  useEffect(() => {
    setlistContributions((prev) => {
      const state = [...contributions]?.map((item) => {
        return {
          id: item.id,
          userName: item.fullName || 'Khách vãng lai',
          estDeliveryDate: item.estDeliveryDate ? convertDateFromString(item.estDeliveryDate) : 'Không có',
          email: item.email,
          perks: item.perks,
          money: formatMoney(Number(item.totalPayment)) + 'VNĐ',
          date: convertDateFromString(item.date),
          status: item.isFinish ? 'Đã gửi' : 'Chưa gửi',
          isChecked: false,
        };
      });
      return state;
    });
  }, [contributions]);

  return (
    <div className={cx('wrapper')}>
      {isLoading && (
        <div className="text-center ">
          <ClipLoader size={40} color="#299899" />
        </div>
      )}
      {!isLoading && listContributions?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className={cx('user')}>NGƯỜI ĐÓNG GÓP</th>
              <th className={cx('email')}>EMAIL HỆ THỐNG</th>
              {/* <th className={cx('perks')}>ĐẶC QUYỀN</th> */}
              <th className={cx('money')}>TIỀN THANH TOÁN</th>
              <th className={cx('date')}>NGÀY ĐÓNG GÓP</th>
              <th className={cx('date')}>NGÀY GIAO DỰ KIẾN</th>
              <th className={cx('status')}>TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody>
            {listContributions?.map((item, index) => {
              return (
                <ContributionRow
                  key={index}
                  contribution={item}
                  index={index}
                  openDetailContribution={openDetailContribution}
                />
              );
            })}
          </tbody>
        </table>
      )}
      {!isLoading && listContributions?.length === 0 && (
        <div className="text-center text-gray-500 font-medium text-[20px] mt-[100px]">Dữ liệu trống</div>
      )}
    </div>
  );
}

export default ContributionTable;
