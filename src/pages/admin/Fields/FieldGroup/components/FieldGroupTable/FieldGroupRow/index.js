import classNames from 'classnames/bind';
import styles from '../FieldGroupTable.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEdit from '../../ModalEdit';

const cx = classNames.bind(styles);
function FieldGroupRow({index, item, getAllFieldGroup}) {
  const [openModal, setOpenModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const docElement = useRef(null);
  const navigate = useNavigate();
  const handleClickRow = () => {
    navigate(`/admin/fields/field-group/${item?.id}`, { state: { id: item?.id } });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (docElement.current && !docElement.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [docElement]);

  return (
    <>
    <tr onClick={handleClickRow}>
      <td className={cx('endDate')}>{index + 1}</td>
      <td className={cx('title')}>{item.name}</td>
      <td className={cx('owner')}>{item.fieldCount}</td>
      <td className={cx('action')}>
        <div
          className={cx('action-doc')}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropDown((prev) => !prev);
          }}
          ref={docElement}
        >
          <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
          <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
            <DropDown item={item} getAllFieldGroup={getAllFieldGroup} handleOpenModal={() => setOpenModal(true)}/>
          </div>
        </div>
      </td>
    </tr>
    {
      openModal && <ModalEdit setOpenModal={setOpenModal} getAllFieldGroup={getAllFieldGroup} item={item}/>
    }
    </>
  );
}

export default FieldGroupRow;
