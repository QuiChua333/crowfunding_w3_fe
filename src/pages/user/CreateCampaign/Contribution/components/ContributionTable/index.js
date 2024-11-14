import classNames from 'classnames/bind';

import styles from './ContributionTable.module.scss';
import ContributionRow from './ContributionRow';
import { useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function ContributionTable({ contributions, onContributionTableChange, openDetailContribution }) {
  const [listContributions, setlistContributions] = useState([]);
  const [isCheckAll, setCheckAll] = useState(false);
  useEffect(() => {
    setlistContributions((prev) => {
      const state = [...contributions]?.map((item) => {
        return {
          id: item.id,
          userName: item.fullName || 'Khách vãng lai',
          estDeliveryDate: item.estDeliveryDate ? convertDateFromString(item.estDeliveryDate) : 'Không có',
          email: item.email,
          perks: item.perks,
          money: formatMoney(Number(item.amount)) + 'VNĐ',
          date: convertDateFromString(item.date),
          status: item.isFinish ? 'Đã gửi' : 'Chưa gửi',
          isChecked: false,
        };
      });
      return state;
    });
  }, [contributions]);

  const handleClickCheckAll = () => {
    setCheckAll((prev) => !prev);
    setlistContributions((prev) => {
      const nextState = [...prev].map((item, index) => {
        return { ...item, isChecked: !isCheckAll };
      });
      return nextState;
    });
  };
  const handleSetChecked = (indexChange, checked) => {
    setlistContributions((prev) => {
      const nextState = [...prev].map((item, index) => {
        if (index === indexChange) {
          return { ...item, isChecked: checked };
        } else return { ...item };
      });
      return nextState;
    });
  };
  useEffect(() => {
    const checkAll = listContributions.length > 0 ? listContributions.every((item) => item.isChecked === true) : false;
    setCheckAll(checkAll);

    onContributionTableChange([...listContributions]);
  }, [listContributions]);

  return (
    <div className={cx('wrapper')}>
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
                setChecked={handleSetChecked}
                openDetailContribution={openDetailContribution}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ContributionTable;
