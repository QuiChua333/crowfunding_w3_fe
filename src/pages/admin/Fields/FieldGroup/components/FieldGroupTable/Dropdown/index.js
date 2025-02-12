import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function DropDown({item, setOpenModalDelete, handleOpenModal}) {
  const navigate = useNavigate();
  const handleDelete = () => {
    setOpenModalDelete(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('action')} onClick={handleOpenModal}>
        Xem và chỉnh sửa
      </div>
      <div className={cx('action')} onClick={() => navigate(`/admin/fields/field-group/${item?.id}`, { state: { id: item?.id } })}>
        Chi tiết các lĩnh vực
      </div>
      {
        item?.fieldCount === 0 && (
          <div className='text-[15px] text-left px-[14px] py-5 text-red-500 hover:cursor-pointer hover:bg-[#f5f5f5]' onClick={handleDelete}>
              Xóa
          </div>
        )
      }
    </div>
  );
}

export default DropDown;
