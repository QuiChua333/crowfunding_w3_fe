import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import ModalVerifyAccount from './components/ModalVerifyAccount';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);

function UserManagement() {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [isOpenModalVerify, setIsOpenModalVerify] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pathWithQuery, setPathWithQuery] = useState('');
  const [filter, setFilter] = useState({
    textSearch: '',
    status: 'Tất cả',
    isVerifiedUser: 'Tất cả',
    page: 1,
  });

  const handleClickItemFilterVerify = (item) => {
    setFilter((prev) => ({ ...prev, isVerifiedUser: item }));
  };
  const handleClickItemFilterActive = (item) => {
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

  const getAllUsers = async () => {
    try {
      const res = await CustomAxios.get(pathWithQuery);
      setAllUsers(res.data.data.users);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatusUser = (index) => {
    setIndexOfRow(index);
    dispatch(
      setMessageBox({
        title: 'Thay đổi trạng thái của người dùng này !',
        content: 'Bạn có chắc chắn muốn thay đổi trạng thái của người dùng này !',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `changeStatus${allUsers[index]._id}`,
      }),
    );
  };

  const handlVerifyUser = (index) => {
    setIndexOfRow(index);
    // bật modal lên
    setIsOpenModalVerify(true);
  };

  const handleChangeStatus = async () => {
    if (messageBox.result) {
      if (messageBox.type === `changeStatus${allUsers[indexOfRow]._id}`) {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
          dispatch(setLoading(true));
          try {
            const id = allUsers[indexOfRow]._id;
            await CustomAxios.put(`${baseURL}/user/changeStatusUser/${id}`);
            getAllUsers();
            // điếm thúi z cho nó chắc
            window.location.reload();
            dispatch(setLoading(false));
          } catch (error) {
            dispatch(setLoading(false));
            console.log(error.message);
          }
        }
      }
    }
  };

  useEffect(() => {
    handleChangeStatus();
  }, [messageBox.result]);

  useEffect(() => {
    const queryParams = {
      page: filter.page,
      searchString: filter.textSearch,
      status: filter.status,
      isVerifiedUser: filter.isVerifiedUser,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    const pathWithQuery = `${baseURL}/user/getAllUser?${queryString}`;
    setPathWithQuery(pathWithQuery);
  }, [filter]);
  useEffect(() => {
    if (pathWithQuery) {
      getAllUsers();
    }
  }, [pathWithQuery]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('table-action')}>
        <div style={{ maxWidth: '600px', width: '500px' }}>
          <Search handleChangeInput={handleChangeSearchInput} />
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Filter
            listConditions={['Tất cả', 'Đã xác minh', 'Chưa xác minh']}
            handleClickItem={handleClickItemFilterVerify}
          />
          <Filter
            listConditions={['Tất cả', 'Đang hoạt động', 'Đã bị khóa']}
            handleClickItem={handleClickItemFilterActive}
          />
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <div className={cx('table-wrapper')}>
          <UserTable allUsers={allUsers} handleStatusUser={handleStatusUser} handlVerifyUser={handlVerifyUser} />
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
      {isOpenModalVerify && (
        <ModalVerifyAccount
          setIsOpenModalVerify={setIsOpenModalVerify}
          user={allUsers[indexOfRow]}
          getAllUsers={getAllUsers}
        />
      )}
    </div>
  );
}

export default UserManagement;
