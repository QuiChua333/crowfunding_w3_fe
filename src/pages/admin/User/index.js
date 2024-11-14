import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import ModalVerifyAccount from './components/ModalVerifyAccount';
import { useChangeStatusUserMutation } from '~/hooks/api/mutations/admin/admin.user.mutation';
import { toast } from 'react-toastify';
import { setCurrentUser } from '~/redux/slides/User';
import { useGetAllUsersQuery } from '~/hooks/api/queries/admin/admin.users.query';
import { setTabAdmin } from '~/redux/slides/Admin';

const cx = classNames.bind(styles);

function UserManagement() {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [isOpenModalVerify, setIsOpenModalVerify] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(null);
  const [filter, setFilter] = useState({
    searchString: '',
    userVerifyStatus: 'Tất cả',
    userStatus: 'Tất cả',
    page: 1,
  });

  const handleClickItemFilteruserVerifyStatus = (item) => {
    setFilter((prev) => ({ ...prev, userVerifyStatus: item }));
  };
  const handleClickItemFilterUserStatus = (item) => {
    setFilter((prev) => ({ ...prev, userStatus: item }));
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

  const handleStatusUser = (index) => {
    setIndexOfRow(index);
    dispatch(
      setMessageBox({
        title: 'Thay đổi trạng thái của người dùng này !',
        content: 'Bạn có chắc chắn muốn thay đổi trạng thái của người dùng này !',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `changeStatus${data?.users[index].id}`,
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
      if (messageBox.type === `changeStatus${data?.users[indexOfRow].id}`) {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
          dispatch(setLoading(true));
          const id = data?.users[indexOfRow].id;
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

  const { data, refetch } = useGetAllUsersQuery(filter);

  useEffect(() => {
    dispatch(
      setTabAdmin({
        number: 2,
        content: 'Quản lý thông tin người dùng',
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
          <div className="flex gap-[24px]">
            <div>
              <label style={{ marginBottom: '4px' }}>Xác thực</label>
              <Filter
                listConditions={['Tất cả', 'Đã xác thực', 'Chờ xác thực', 'Chưa xác thực']}
                handleClickItem={handleClickItemFilteruserVerifyStatus}
              />
            </div>
            <div>
              <label style={{ marginBottom: '4px' }}>Hoạt động</label>
              <Filter
                listConditions={['Tất cả', 'Đang hoạt động', 'Tạm khóa']}
                handleClickItem={handleClickItemFilterUserStatus}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <div className={cx('table-wrapper')}>
          {data?.users?.length > 0 && (
            <UserTable
              allUsers={data?.users || []}
              handleStatusUser={handleStatusUser}
              handlVerifyUser={handlVerifyUser}
            />
          )}
          {data?.users?.length === 0 && (
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
      {isOpenModalVerify && (
        <ModalVerifyAccount
          setIsOpenModalVerify={setIsOpenModalVerify}
          userId={data?.users[indexOfRow]?.id}
          getAllUsers={refetch}
        />
      )}
    </div>
  );
}

export default UserManagement;
