import classNames from 'classnames/bind';
import styles from './Complaint.module.scss';
import { useState, useEffect } from 'react';
import ComplaintTable from './components/ComplaintTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import baseURL from '~/utils/baseURL';
import ModalDetailReport from './components/ModalDetailReport';
import useGetAllReportsQuery from '~/hooks/api/queries/admin/admin.complaints.query';

const cx = classNames.bind(styles);

function ComplaintManagement() {
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [isOpenModalSeeDetail, setIsOpenModalSeeDetail] = useState(false);
  const [pathWithQuery, setPathWithQuery] = useState('');
  const [filter, setFilter] = useState({
    textSearch: '',
    status: 'Tất cả',
    page: 1,
  });
  const handleClickItemFilter = (item) => {
    setFilter((prev) => ({ ...prev, status: item }));
  };
  const handleChangeSearchInput = (value) => {
    setFilter((prev) => ({ ...prev, textSearch: value }));
  };
  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleClickNextPage = () => {
    if (filter.page === data?.data?.totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    const queryParams = { page: filter.page, searchString: filter.textSearch, status: filter.status };
    const queryString = new URLSearchParams(queryParams).toString();
    const pathWithQuery = `${baseURL}/report/getAllReports?${queryString}`;
    setPathWithQuery(pathWithQuery);
  }, [filter]);
  const { data, refetch } = useGetAllReportsQuery(pathWithQuery);

  const handleViewReport = (index) => {
    setIndexOfRow(index);
    setIsOpenModalSeeDetail(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('table-action')}>
        <div style={{ marginBottom: '24px', maxWidth: '600px', width: '500px' }}>
          <Search handleChangeInput={handleChangeSearchInput} />
        </div>
        <Filter listConditions={['Tất cả', 'Đã phản hồi', 'Chưa phản hồi']} handleClickItem={handleClickItemFilter} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <div className={cx('table-wrapper')}>
          {data?.data?.reports?.length > 0 && (
            <ComplaintTable reports={data?.data?.reports || []} handleViewReport={handleViewReport} />
          )}
          {data?.data?.reports?.length === 0 && (
            <div className="text-center text-black font-medium text-[28px]">Không tìm thấy dữ liệu</div>
          )}
        </div>

        {data?.data?.totalPages > 0 && (
          <div className={cx('pagination-wrapper')}>
            <div className={cx('pagination')}>
              <span
                className={cx(
                  'icon',
                  `${
                    filter.page <= data?.data?.totalPages &&
                    data?.data?.totalPages !== 1 &&
                    filter.page > 1 &&
                    'hover:bg-[#ebe8f1] hover:cursor-pointer'
                  }`,
                )}
                onClick={handleClickPreviousPage}
              >
                <FaAngleLeft style={{ color: '#7a69b3', opacity: filter.page === 1 ? '0.3' : '1' }} />
              </span>

              <span className={cx('curent')}>{`${filter.page} của ${data?.data?.totalPages}`}</span>
              <span
                className={cx(
                  'icon',
                  `${filter.page < data?.data?.totalPages && 'hover:bg-[#ebe8f1] hover:cursor-pointer'}`,
                )}
                onClick={handleClickNextPage}
              >
                <FaAngleRight
                  style={{ color: '#7a69b3', opacity: filter.page === data?.data?.totalPages ? '0.3' : '1' }}
                />
              </span>
            </div>
          </div>
        )}
      </div>
      {isOpenModalSeeDetail && (
        <ModalDetailReport
          getAllReports={refetch}
          setIsOpenModalSeeDetail={setIsOpenModalSeeDetail}
          report={data?.data?.reports[indexOfRow]}
        />
      )}
    </div>
  );
}

export default ComplaintManagement;
