import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import baseURL from '~/utils/baseURL';
import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import ContributeTable from './components/ContributeTable';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import ModalDetailContribution from './components/ModalDetailContribution';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);

function ViewContributes() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);

  const getInfoUser = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/user/getInfoUser/${id}`);
      setUser(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getInfoUser();
  }, []);

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
    const pathWithQuery = `${baseURL}/contribution/getAllContributionsOfUser/${id}/?${queryString}`;
    setPathWithQuery(pathWithQuery);
  }, [filter]);

  useEffect(() => {
    if (pathWithQuery) {
      getAllContributesOfUer();
    }
  }, [pathWithQuery]);

  const [contributesOfUer, setContributesOfUer] = useState([]);
  const getAllContributesOfUer = async () => {
    try {
      const res = await CustomAxios.get(pathWithQuery);
      setContributesOfUer(res.data.data.contributions);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllContributesOfUer();
  }, []);

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const handleViewContribution = (index) => {
    setIndexOfRow(index);
    setIsOpenModalDetail(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('navbar')}>
        <a href={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
          <span>
            <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
            Xem hồ sơ cá nhân
          </span>
        </a>
        <a href={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
          <span>
            {' '}
            <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
            Chỉnh sửa hồ sơ & Cài đặt
          </span>
        </a>
      </div>

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <a href={`/individuals/${id}/profile`} className={cx('tab')}>
              Hồ sơ
            </a>
            <a href={`/individuals/${id}/campaigns`} className={cx('tab')}>
              Chiến dịch
            </a>
            {currentUser._id && currentUser._id === id && (
              <a href={`/individuals/${id}/contributions`} className={cx('tab', 'active')}>
                Đóng góp của tôi
              </a>
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
                    <Search handleChangeInput={handleChangeSearchInput} />
                  </div>

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
                      listConditions={['Tất cả', 'Đã nhận', 'Chưa nhận']}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div className={cx('table-wrapper')}>
                    <ContributeTable
                      contributesOfUer={contributesOfUer}
                      handleViewContribution={handleViewContribution}
                    />
                  </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenModalDetail && (
        <ModalDetailContribution
          contribution={contributesOfUer[indexOfRow]}
          setIsOpenModalDetail={setIsOpenModalDetail}
        />
      )}
    </div>
  );
}

export default ViewContributes;
