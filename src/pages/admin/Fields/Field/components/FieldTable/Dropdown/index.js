import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

function DropDown({item, handleOpenModal, setOpenModalDelete}) {
  
  const handleDelete = () => {
    setOpenModalDelete(true);
  };
  return (
    <>
    <div className={cx('wrapper')}>
      <div className={cx('action')} onClick={handleOpenModal}>
        Xem và chỉnh sửa
      </div>
      {
        item.campaignCount === 0 && (
          <div className='text-[15px] text-left px-[14px] py-5 text-red-500 hover:cursor-pointer hover:bg-[#f5f5f5]' onClick={handleDelete}>
            Xóa
          </div>
        )
      }
    </div>
    </>
  );
}

export default DropDown;
