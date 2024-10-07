import classNames from 'classnames/bind';
import styles from './Complaint.module.scss';
import { useState, useEffect } from 'react';
import ComplaintTable from './components/ComplaintTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import baseURL from '~/utils/baseURL';
import ModalDetailReport from './components/ModalDetailReport';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);

function ComplaintManagement() {
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [isOpenModalSeeDetail, setIsOpenModalSeeDetail] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
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
    if (filter.page === totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    const queryParams = { page: filter.page, searchString: filter.textSearch, status: filter.status };
    const queryString = new URLSearchParams(queryParams).toString();
    const pathWithQuery = `${baseURL}/report/getAllReports?${queryString}`;
    setPathWithQuery(pathWithQuery);
  }, [filter]);
  useEffect(() => {
    if (pathWithQuery) {
      getAllReports();
    }
  }, [pathWithQuery]);

  const [reports, setReports] = useState([]);
  const getAllReports = async () => {
    try {
      const res = await CustomAxios.get(pathWithQuery);
      setReports(res.data.data.reports);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllReports();
  }, []);

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
          <ComplaintTable
            setIsOpenModalSeeDetail={setIsOpenModalSeeDetail}
            reports={reports}
            handleViewReport={handleViewReport}
          />
        </div>

        {totalPages > 0 && (
          <div className={cx('pagination-wrapper')}>
            <div className={cx('pagination')}>
              <span className={cx('icon')} onClick={handleClickPreviousPage}>
                <FaAngleLeft style={{ color: '#7a69b3' }} />
              </span>
              <span className={cx('curent')}>{`${filter.page} của ${totalPages}`}</span>
              <span className={cx('icon')} onClick={handleClickNextPage}>
                <FaAngleRight style={{ color: '#7a69b3' }} />
              </span>
            </div>
          </div>
        )}
      </div>
      {isOpenModalSeeDetail && (
        <ModalDetailReport
          getAllReports={getAllReports}
          setIsOpenModalSeeDetail={setIsOpenModalSeeDetail}
          report={reports[indexOfRow]}
        />
      )}
    </div>
  );
}

export default ComplaintManagement;
