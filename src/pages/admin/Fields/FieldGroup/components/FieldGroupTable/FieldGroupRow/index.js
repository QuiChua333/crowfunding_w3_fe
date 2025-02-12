import classNames from 'classnames/bind';
import styles from '../FieldGroupTable.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEdit from '../../ModalEdit';
import ModalConfirm from '~/pages/admin/Fields/components/ModalConfirm.js';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDeleteFieldGroupMutation } from '~/hooks/api/mutations/admin/admin.fieldGroup.mutation';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function FieldGroupRow({index, item, getAllFieldGroup}) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const docElement = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const deleteFieldGroup = useDeleteFieldGroupMutation();
    const handleDeleteItemSelected = async () => {
      dispatch(setLoading(true));
      deleteFieldGroup.mutate(
        { id: item?.id },
        {
          onSuccess: (res) => {
            getAllFieldGroup();
            dispatch(setLoading(false));
            toast.success("Xóa thành công.")
            setOpenModalDelete(false);
          },
          onError: (error) => {
            console.log('error', error);
          },
          onSettled: () => {
            dispatch(setLoading(false));
          },
        },
      );
    }

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
            <DropDown setOpenModalDelete={setOpenModalDelete} item={item} handleOpenModal={() => setOpenModal(true)}/>
          </div>
        </div>
      </td>
    </tr>
    {
      openModal && <ModalEdit setOpenModal={setOpenModal} getAllFieldGroup={getAllFieldGroup} item={item}/>
    }
    {
      openModalDelete && (<ModalConfirm setOpen={setOpenModalDelete} onCancel={() => setOpenModalDelete(false)} contentCancel="HỦY" contentOK="XÁC NHẬN" onConfirm={handleDeleteItemSelected} title="Xóa nhóm lĩnh vực này?" content="Thao tác này sẽ xóa hoàn toàn khỏi hệ thống và không thể hoàn tác được."/>)
    }
    </>
  );
}

export default FieldGroupRow;
