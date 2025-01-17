import classNames from 'classnames/bind';

import styles from './RefundFailedTable.module.scss';
import CampaignRow from './RefundFailedRow';
import { useEffect, useState } from 'react';
import { convertDateFromString } from '~/utils';
import SendSuccessRow from './RefundFailedRow';
import RefundFailedRow from './RefundFailedRow';

const cx = classNames.bind(styles);

function RefundFailedTable({ campaigns, getAllCampaigns, handleClickRow }) {
  const [listCampaigns, setlistCampaigns] = useState([]);
  const [isCheckAll, setCheckAll] = useState(false);
  useEffect(() => {
    setlistCampaigns((prev) => {
      const state = [...campaigns].map((item) => {
        let dateString = '';
        let endDateString = '';
        if (item.publishedAt) {
          dateString = convertDateFromString(item.publishedAt);
          let endDate = new Date(item.publishedAt);
          endDate.setDate(endDate.getDate() + item.duration);
          endDateString = convertDateFromString(endDate);
        }

        return {
          id: item.id,
          title: item.title,
          goal: (item.goal / 1000000).toFixed(2) + ' triệu',
          status: item.status,
          isSend: item.isSend,
          isRefund: item.isRefund,
          startDate: dateString,
          endDate: endDateString,
          ownerName: item.owner.fullName,
          isChecked: false,
          currentMoney: ((item.currentMoney || 0) / 1000000).toFixed(2) + ' triệu',
        };
      });
      return state;
    });
  }, [campaigns]);

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th className={cx('title')}>TÊN CHIẾN DỊCH</th>
            <th className={cx('owner')}>CHỦ SỞ HỮU</th>
            <th className={cx('endDate')}>TIỀN MỤC TIÊU</th>
            <th className={cx('startDate')}>TIỀN HIỆN TẠI</th>
            <th className={cx('status')}>TRẠNG THÁI</th>
            <th className={cx('action')}></th>
          </tr>
        </thead>
        <tbody>
          {listCampaigns?.map((item, index) => {
            return (
              <RefundFailedRow
                key={index}
                campaign={item}
                index={index}
                getAllCampaigns={getAllCampaigns}
                handleClickRow={handleClickRow}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RefundFailedTable;
