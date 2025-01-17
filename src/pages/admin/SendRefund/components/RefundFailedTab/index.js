import classNames from 'classnames/bind';
import styles from './RefundFailedTab.module.scss';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { useDispatch } from 'react-redux';
import { useGetAllFailedCampaign, useGetAllSuccessCampaign } from '~/hooks/api/queries/admin/admin.campaigns.query';
import { ClipLoader } from 'react-spinners';
import SendSuccessTable from '../SendSuccessTable';
import Filter from '~/pages/admin/components/Filter';
import Search from '~/pages/admin/components/Search';
import ModalSendSuccess from '../ModalSendSuccess';
import { useQueryClient } from '@tanstack/react-query';
import RefundFailedTable from '../RefundFailedTable';

const cx = classNames.bind(styles);
function RefundFailedTab() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    searchString: '',
    status: 'Tất cả',
    page: 1,
  });
  const handleClickItemFilter = (item) => {
    setFilter((prev) => ({ ...prev, status: item }));
  };

  const handleChangeSearchInput = (value) => {
    setFilter((prev) => ({ ...prev, searchString: value }));
  };
  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleClickNextPage = () => {
    if (filter.page === data?.totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const { data, refetch, isLoading } = useGetAllFailedCampaign(filter);

  return (
    <>
      <div className={cx('wrapper')}>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div className="w-[600px] max-w-[600px]">
            <Search handleChangeInput={handleChangeSearchInput} placeholder={'Tìm kiếm tên chiến dịch, chủ sở hữu'} />
          </div>
          <div className={cx('table-action')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div>
                <label style={{ marginBottom: '4px' }}>Trạng thái</label>
                <Filter
                  listConditions={['Tất cả', 'Chưa hoàn trả', 'Đã hoàn trả']}
                  handleClickItem={handleClickItemFilter}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <div className={cx('table-wrapper')}>
            {isLoading && (
              <div className="text-center ">
                <ClipLoader size={40} color="#299899" />
              </div>
            )}
            {!isLoading && data?.campaigns?.length > 0 && (
              <RefundFailedTable campaigns={data?.campaigns || []} getAllCampaigns={refetch} />
            )}
            {!isLoading && data?.campaigns?.length === 0 && (
              <div className="text-center text-gray-500 font-medium text-[20px] mt-[100px]">Dữ liệu trống</div>
            )}
          </div>
          {data?.totalPages > 0 && (
            <div className={cx('pagination-wrapper')}>
              <div className={cx('pagination')}>
                <span
                  className={cx(
                    'icon',
                    `${
                      filter.page <= data?.totalPages &&
                      data?.totalPages !== 1 &&
                      filter.page > 1 &&
                      'hover:bg-[#ebe8f1] hover:cursor-pointer'
                    }`,
                  )}
                  onClick={handleClickPreviousPage}
                >
                  <FaAngleLeft style={{ color: '#7a69b3', opacity: filter.page === 1 ? '0.3' : '1' }} />
                </span>

                <span className={cx('curent')}>{`${filter.page} của ${data?.totalPages}`}</span>
                <span
                  className={cx(
                    'icon',
                    `${filter.page < data?.totalPages && 'hover:bg-[#ebe8f1] hover:cursor-pointer'}`,
                  )}
                  onClick={handleClickNextPage}
                >
                  <FaAngleRight style={{ color: '#7a69b3', opacity: filter.page === data?.totalPages ? '0.3' : '1' }} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RefundFailedTab;
