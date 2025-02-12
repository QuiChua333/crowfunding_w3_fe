import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../Profile.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import ContributeTable from './components/ContributeTable';
import Search from '~/pages/admin/components/Search';
import ModalDetailContribution from './components/ModalDetailContribution';
import { useGetContributesNFTQuery } from '~/hooks/api/queries/user/nft.query';

const cx = classNames.bind(styles);

function ViewContributesNFT() {
  const [filter, setFilter] = useState({
    searchString: '',
    page: 1,
  });
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

  const { data, isLoading } = useGetContributesNFTQuery({
    ...filter,
  });

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const handleViewContribution = (index) => {
    setIndexOfRow(index);
    setIsOpenModalDetail(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-body-profile')}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <h2 style={{ fontWeight: '600', fontSize: '24px' }}>Những NFT của tôi</h2>
          <div className={cx('wrapper-container')}>
            <div className="flex items-end justify-between mt-2.5 mb-10 mx-0">
              {data?.nfts?.length > 0 && (
                <div className="mt-5" style={{ maxWidth: '600px', width: '500px' }}>
                  <Search
                    handleChangeInput={handleChangeSearchInput}
                    placeholder={'Tìm kiếm theo tên, mã hoặc địa chỉ hợp đồng'}
                  />
                </div>
              )}
            </div>
            <div style={{ marginTop: '20px' }}>
              <div className={cx('table-wrapper')}>
                <ContributeTable
                  contributesOfUer={data?.nfts || []}
                  handleViewContribution={handleViewContribution}
                  isLoading={isLoading}
                />
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
                      <FaAngleRight
                        style={{ color: '#7a69b3', opacity: filter.page === data?.totalPages ? '0.3' : '1' }}
                      />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpenModalDetail && (
        <ModalDetailContribution contribution={data?.nfts[indexOfRow]} setIsOpenModalDetail={setIsOpenModalDetail} />
      )}
    </div>
  );
}

export default ViewContributesNFT;
