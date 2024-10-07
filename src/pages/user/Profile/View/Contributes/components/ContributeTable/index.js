import classNames from 'classnames/bind';

import styles from './ContributeTable.module.scss';
import { useEffect, useState } from 'react';
import ContributeRow from '../ContributeRow';

const cx = classNames.bind(styles);

function ContributeTable({ contributesOfUer, handleViewContribution }) {
  const [listContributionsOfUser, setListContributionsOfUser] = useState([]);
  useEffect(() => {
    setListContributionsOfUser(contributesOfUer);
  }, [contributesOfUer]);

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <th>NGÀY</th>
          <th>CHIẾN DỊCH</th>
          <th>TỔNG TIỀN</th>
          <th>TRẠNG THÁI</th>
          <th></th>
        </thead>
        <tbody>
          {listContributionsOfUser?.map((item, index) => {
            return (
              <ContributeRow
                key={index}
                contribute={item}
                index={index}
                handleViewContribution={handleViewContribution}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ContributeTable;
