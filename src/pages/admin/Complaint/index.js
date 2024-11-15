import classNames from 'classnames/bind';
import styles from './Complaint.module.scss';
import { useState, useEffect } from 'react';
import ComplaintTable from './components/ComplaintTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import ModalDetailReport from './components/ModalDetailReport';
import { setTabAdmin } from '~/redux/slides/Admin';
import { useDispatch } from 'react-redux';
import { useGetAllReportsQuery } from '~/hooks/api/queries/admin/admin.complaints.query';

const cx = classNames.bind(styles);

function ComplaintManagement() {
  const dispatch = useDispatch();
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [isOpenModalSeeDetail, setIsOpenModalSeeDetail] = useState(false);
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

  const { data, refetch } = useGetAllReportsQuery(filter);

  const handleViewReport = (index) => {
    setIndexOfRow(index);
    setIsOpenModalSeeDetail(true);
  };
  useEffect(() => {
    dispatch(
      setTabAdmin({
        number: 3,
        content: 'Quản lý báo cáo vi phạm dự án',
      }),
    );
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('table-action')}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',

            justifyContent: 'space-between',
          }}
        >
          <div className="max-w-[600px] w-[600px]">
            <Search handleChangeInput={handleChangeSearchInput} />
          </div>
          <div>
            <label style={{ marginBottom: '4px' }}>Trạng thái</label>
            <Filter
              listConditions={['Tất cả', 'Đã phản hồi', 'Chưa phản hồi']}
              handleClickItem={handleClickItemFilter}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div className={cx('table-wrapper')}>
          {data?.reports?.length > 0 && (
            <ComplaintTable reports={data?.reports || []} handleViewReport={handleViewReport} />
          )}
          {data?.reports?.length === 0 && (
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
                className={cx('icon', `${filter.page < data?.totalPages && 'hover:bg-[#ebe8f1] hover:cursor-pointer'}`)}
                onClick={handleClickNextPage}
              >
                <FaAngleRight style={{ color: '#7a69b3', opacity: filter.page === data?.totalPages ? '0.3' : '1' }} />
              </span>
            </div>
          </div>
        )}
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

export default ComplaintManagement;
