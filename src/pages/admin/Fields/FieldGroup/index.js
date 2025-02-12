import classNames from 'classnames/bind';
import styles from './FieldGroup.module.scss';
import { useEffect, useState } from 'react';
import Search from '../../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { setTabAdmin } from '~/redux/slides/Admin';
import { ClipLoader } from 'react-spinners';
import FieldGroupTable from './components/FieldGroupTable';
import { useGetAllFieldGroupQuery } from '~/hooks/api/queries/admin/admin.fieldGroup.query';
import ModalAdd from './components/ModalAdd';

const cx = classNames.bind(styles);
function FieldGroupManagement() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
      useEffect(() => {
          dispatch(
            setTabAdmin({
              number: 1,
              content: 'Quản lý lĩnh vực chiến dịch',
            }),
          );
        }, [dispatch]);
  const [filter, setFilter] = useState({
    textSearch: '',
    page: 1,
  });

  const handleChangeSearchInput = (value) => {
    setFilter((prev) => ({ ...prev, textSearch: value }));
  };
  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleClickNextPage = () => {
    if (filter.page === data?.totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const { data, refetch, isLoading } = useGetAllFieldGroupQuery(filter);

  return (
    <>
    <div className={cx('wrapper')}>
      <span className='font-semibold'>Nhóm các lĩnh vực:</span>
      <div className='mb-6 flex w-full justify-between mt-10 items-center'>
        <div className="w-[600px] max-w-[600px]">
          <Search handleChangeInput={handleChangeSearchInput} placeholder={'Tìm kiếm tên nhóm lĩnh vực'} />
        </div>

        <div onClick={() => setOpenModal(true)} className='p-5 border text-white text-[14px] bg-[#7a69b3] rounded hover:cursor-pointer hover:opacity-90'>Thêm mới</div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div className={cx('table-wrapper')}>
          {isLoading && (
            <div className="text-center ">
              <ClipLoader size={40} color="#299899" />
            </div>
          )}
          {!isLoading && data?.data?.length > 0 && (
            <FieldGroupTable
              getAllFieldGroup={refetch}
              fieldGroup={data?.data}
            />
          )}
          {!isLoading && data?.data?.length === 0 && (
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
    </div>
    {
      openModal && <ModalAdd getAllFieldGroup={refetch} setOpenModal={setOpenModal}/>
    }
    </>
  );
}

export default FieldGroupManagement;
