import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link, useParams } from 'react-router-dom';
import { MdAddchart, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import { useGetInfoUserQuery } from '~/hooks/api/queries/user/user.query';
import { ComplaintTable, ModalDetailReport } from './components';
import { useGetAllReportOfCurrentUser } from '~/hooks/api/queries/user/complaints.query';

const cx = classNames.bind(styles);

function ViewComplaints() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isOpenModalSeeDetail, setIsOpenModalSeeDetail] = useState(false);

  const { data: dataUser } = useGetInfoUserQuery(id);
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
    }
  }, [dataUser]);

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

  const { data, refetch, isLoading } = useGetAllReportOfCurrentUser(filter);

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const handleViewReport = (index) => {
    setIndexOfRow(index);
    setIsOpenModalSeeDetail(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('navbar')}>
        <Link to={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
          <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
          <span>Xem hồ sơ</span>
        </Link>
        <Link to={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
          <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
          <span>Chỉnh sửa hồ sơ & Cài đặt</span>
        </Link>
        <Link to={`/individuals/${id}/statistic`} className={cx('nav-item')}>
          <MdAddchart style={{ fontSize: '24px', marginRight: '8px' }} />
          <span>Thống kê</span>
        </Link>
      </div>

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <Link to={`/individuals/${id}/profile`} className={cx('tab')}>
              Hồ sơ
            </Link>
            <Link to={`/individuals/${id}/campaigns`} className={cx('tab')}>
              Chiến dịch
            </Link>
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/contributions`} className={cx('tab')}>
                Đóng góp của tôi
              </Link>
            )}
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/complaints`} className={cx('tab', 'active')}>
                Báo cáo vi phạm
              </Link>
            )}
          </div>

          <div className={cx('container-body-profile')}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <h2 style={{ fontWeight: '600', fontSize: '24px' }}>Những đóng góp của tôi</h2>

              <div className={cx('wrapper-container')}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'space-between',
                    margin: '10px 0 40px 0',
                  }}
                >
                  <div style={{ maxWidth: '600px', width: '500px' }}>
                    <Search
                      handleChangeInput={handleChangeSearchInput}
                      placeholder={'Tìm kiếm theo tên chiến dịch, tiêu đề báo cáo'}
                    />
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <span
                        style={{
                          fontSize: '16px',
                          color: '#888',
                          fontWeight: '550',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                      >
                        Trạng thái:{' '}
                      </span>
                      <Filter
                        handleClickItem={handleClickItemFilter}
                        listConditions={['Tất cả', 'Đã phản hồi', 'Chưa phản hồi']}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div className={cx('table-wrapper')}>
                    <ComplaintTable reports={data?.reports || []} handleViewReport={handleViewReport} />
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
        </div>
      </div>
      {isOpenModalSeeDetail && (
        <ModalDetailReport
          getAllReports={refetch}
          setIsOpenModalSeeDetail={setIsOpenModalSeeDetail}
          report={data?.reports[indexOfRow]}
        />
      )}
    </div>
  );
}

export default ViewComplaints;
