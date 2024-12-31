import classNames from 'classnames/bind';

import styles from './Summary.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '~/redux/slides/UserCampaign';
import { formatMoney } from '~/utils';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import { useGetAllRefundsByCampaignQuery } from '~/hooks/api/queries/user/contribution.query';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import RefundTable from './components/RefundTable';
import ModalRefund from './components/ModalRefund';
import { useQueryClient } from '@tanstack/react-query';

const cx = classNames.bind(styles);

function SummaryCampaign() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const campaign = useSelector((state) => state.userCampaign.campaign);
  const [showModal, setShowModal] = useState(false);
  const [indexRefundActive, setIndexRefundActive] = useState(-1);
  const [filterRefund, setFilterRefund] = useState({
    searchString: '',
    status: 'Tất cả',
    sortMoney: 'Tất cả',
    page: 1,
  });

  useEffect(() => {
    dispatch(
      setTab({
        number: 9,
        content: 'Tổng kết',
      }),
    );
  }, []);

  const { data: dataRefunds } = useGetAllRefundsByCampaignQuery({
    ...filterRefund,
    campaignId: id,
  });

  const handleChangeSearchInput = (value) => {
    setFilterRefund((prev) => ({ ...prev, searchString: value }));
  };

  const handleClickItemFilterRefundStatus = (item) => {
    setFilterRefund((prev) => ({ ...prev, status: item }));
  };

  const handleClickItemFilterRefundMoney = (item) => {
    setFilterRefund((prev) => ({
      ...prev,
      sortMoney: item,
    }));
  };
  const openDetailRefund = (index) => {
    setIndexRefundActive(index);
    setShowModal(true);
  };

  const handleClickPreviousPageRefund = () => {
    if (filterRefund.page === 1) return;
    setFilterRefund((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleClickNextPageRefund = () => {
    if (filterRefund.page === dataRefunds?.totalPages) return;
    setFilterRefund((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handleChangeStatus = (id, isRefund, proofImage) => {
    queryClient.setQueryData(
      [
        'useGetAllRefundsByCampaignQuery',
        filterRefund.searchString,
        filterRefund.status,
        filterRefund.sortMoney,
        filterRefund.page,
      ],
      (oldData) => {
        return {
          ...oldData,
          refunds: oldData.refunds.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                isRefund: isRefund,
                ...(proofImage
                  ? {
                      proofImage: proofImage,
                    }
                  : {}),
              };
            } else return item;
          }),
        };
      },
    );
  };
  return (
    <>
      <div className={cx('body')}>
        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Tổng kết</div>
          <div className={cx('entreField-subHeader')}>
            Xem lại danh sách đóng góp của chiến dịch. Thực hiện việc chuyển tiền cho chủ chiến dịch hoặc hoàn trả cho
            người đóng góp.
          </div>
          <div style={{ margin: '30px 0', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
        </div>

        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Thông tin gây quỹ</div>

          <div className={cx('entreField')}>
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-[600]">Số tiền mục tiêu: </span>
              <div>
                <span className="text-[#6a6a6a] font-[600]">{formatMoney(campaign.goal)}</span>
                <span className="text-[#6a6a6a] text-[14px]">VNĐ</span>
              </div>
            </div>
            <div className={cx('entreField')}>
              <div className="flex items-center gap-3">
                <span className="text-[16px] font-[600]">Số tiền gây quỹ: </span>
                <div>
                  <span className="text-[#6a6a6a] font-[600]">{formatMoney(campaign.currentMoney)}</span>
                  <span className="text-[#6a6a6a] text-[14px]">VNĐ</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('entreField')}>
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-[600]">Trạng thái: </span>
              {campaign.status === 'Đã hoàn thành' && (
                <div
                  style={{
                    padding: '2px 8px',
                    background: '#34ca96',
                    color: '#fff',
                    borderRadius: '4px',
                  }}
                >
                  Thành công
                </div>
              )}
              {campaign.status === 'Thất bại' && (
                <div
                  style={{
                    padding: '2px 8px',
                    background: '#a8a8a8',
                    color: '#fff',
                    borderRadius: '8px',
                  }}
                >
                  Thất bại
                </div>
              )}
            </div>
          </div>
          <div style={{ margin: '30px 0', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
        </div>

        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Danh sách hoàn trả</div>

          <div style={{ marginBottom: '24px', maxWidth: '600px', marginTop: '20px' }}>
            <Search handleChangeInput={handleChangeSearchInput} placeholder={'Tìm kiếm đóng góp, tên, email'} />
          </div>

          <div className={cx('filter-wrapper')}>
            <div>
              <label style={{ marginBottom: '4px' }}>Trạng thái</label>
              <Filter
                listConditions={['Tất cả', 'Đã hoàn trả', 'Chưa hoàn trả']}
                handleClickItem={handleClickItemFilterRefundStatus}
                valueShow={filterRefund.status}
              />
            </div>
            <div>
              <label style={{ marginBottom: '4px' }}>Tiền</label>
              <Filter
                listConditions={['Tất cả', 'Tăng dần', 'Giảm dần']}
                handleClickItem={handleClickItemFilterRefundMoney}
                valueShow={filterRefund.sortMoney}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <div className={cx('table-wrapper')}>
            <RefundTable refunds={dataRefunds?.refunds || []} openDetailRefund={openDetailRefund} />
            {dataRefunds?.totalPages > 0 && (
              <div className={cx('pagination-wrapper')}>
                <div className={cx('pagination')}>
                  <span
                    className={cx(
                      'icon',
                      `${
                        filterRefund.page <= dataRefunds?.totalPages &&
                        dataRefunds.totalPages !== 1 &&
                        filterRefund.page > 1 &&
                        'hover:bg-[#ebe8f1] hover:cursor-pointer'
                      }`,
                    )}
                    onClick={handleClickPreviousPageRefund}
                  >
                    <FaAngleLeft style={{ color: '#7a69b3', opacity: filterRefund.page === 1 ? '0.3' : '1' }} />
                  </span>

                  <span className={cx('curent')}>{`${filterRefund.page} của ${dataRefunds?.totalPages}`}</span>
                  <span
                    className={cx(
                      'icon',
                      `${filterRefund.page < dataRefunds?.totalPages && 'hover:bg-[#ebe8f1] hover:cursor-pointer'}`,
                    )}
                    onClick={handleClickNextPageRefund}
                  >
                    <FaAngleRight
                      style={{
                        color: '#7a69b3',
                        opacity: filterRefund.page === dataRefunds?.totalPages ? '0.3' : '1',
                      }}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalRefund
          setShowModal={setShowModal}
          refund={dataRefunds?.refunds[indexRefundActive]}
          handleChangeStatus={handleChangeStatus}
        />
      )}
    </>
  );
}

export default SummaryCampaign;
