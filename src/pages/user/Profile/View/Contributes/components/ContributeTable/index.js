import classNames from 'classnames/bind';

import styles from './ContributeTable.module.scss';
import { useEffect, useState } from 'react';
import ContributeRow from '../ContributeRow';
import { ClipLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function ContributeTable({ contributesOfUer, handleViewContribution, isLoading }) {
  const [listContributionsOfUser, setListContributionsOfUser] = useState([]);
  useEffect(() => {
    setListContributionsOfUser(contributesOfUer);
  }, [contributesOfUer]);

  return (
    <div className={cx('wrapper')}>
      {isLoading && (
        <div className="text-center ">
          <ClipLoader size={40} color="#299899" />
        </div>
      )}
      {!isLoading && listContributionsOfUser?.length > 0 && (
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
      )}

      {!isLoading && listContributionsOfUser?.length === 0 && (
        <div className="text-center text-gray-500 font-medium text-[20px] mt-[100px]">Dữ liệu trống</div>
      )}
    </div>
  );
}

export default ContributeTable;
