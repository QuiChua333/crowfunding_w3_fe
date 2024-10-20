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
import useGetAllUsersQuery from '~/hooks/api/queries/admin/admin.users.query';
import { useChangeStatusUserMutation } from '~/hooks/api/mutations/admin/admin.user.mutation';
import { toast } from 'react-toastify';
import { setCurrentUser } from '~/redux/slides/User';

const cx = classNames.bind(styles);

function UserManagement() {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [isOpenModalVerify, setIsOpenModalVerify] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(null);
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
    if (filter.page === data?.data?.totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  const { data, refetch } = useGetAllUsersQuery(pathWithQuery);
  const handleStatusUser = (index) => {
    setIndexOfRow(index);
    dispatch(
      setMessageBox({
        title: 'Thay đổi trạng thái của người dùng này !',
        content: 'Bạn có chắc chắn muốn thay đổi trạng thái của người dùng này !',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `changeStatus${data?.data?.users[index]._id}`,
      }),
    );
  };

  const handlVerifyUser = (index) => {
    setIndexOfRow(index);
    setIsOpenModalVerify(true);
  };

  const changeStatusUserMutation = useChangeStatusUserMutation();
  const handleChangeStatus = async () => {
    if (messageBox.result) {
      if (messageBox.type === `changeStatus${data?.data?.users[indexOfRow]._id}`) {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
          dispatch(setLoading(true));
          const id = data?.data?.users[indexOfRow]._id;
          changeStatusUserMutation.mutate(id, {
            onSuccess(response) {
              dispatch(setCurrentUser(response));
              refetch();
              toast.success('Cập nhật trạng thái tài khoản người dùng thành công');
            },
            onError(err) {
              toast.error('Cập nhật trạng thái tài khoản người dùng thất bại', err);
              console.log(err);
            },
            onSettled(response, err) {
              dispatch(setLoading(false));
            },
          });
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
          {data?.data?.users?.length > 0 && (
            <UserTable
              allUsers={data?.data?.users || []}
              handleStatusUser={handleStatusUser}
              handlVerifyUser={handlVerifyUser}
            />
          )}
          {data?.data?.users?.length === 0 && (
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
      {isOpenModalVerify && (
        <ModalVerifyAccount
          setIsOpenModalVerify={setIsOpenModalVerify}
          user={data?.data?.users[indexOfRow]}
          getAllUsers={refetch}
        />
      )}
    </div>
  );
}

export default UserManagement;
