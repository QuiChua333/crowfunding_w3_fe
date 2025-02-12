import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDeleteFieldGroupMutation } from '~/hooks/api/mutations/admin/admin.fieldGroup.mutation';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function DropDown({item, getAllFieldGroup, handleOpenModal}) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);

  const handleDelete = () => {
    dispatch(
      setMessageBox({
        title: 'Xóa nhóm lĩnh vực này?',
        content: 'Thao tác này sẽ xóa hoàn toàn khỏi hệ thống và không thể hoàn tác được.',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: "deleteFieldGroup"
      }),
    );
  };

  const deleteFieldGroup = useDeleteFieldGroupMutation();
  const deleteFieldGroupSelected = async () => {
    dispatch(setLoading(true));
    deleteFieldGroup.mutate(
      { id: item?.id },
      {
        onSuccess: (res) => {
          getAllFieldGroup();
          dispatch(setLoading(false));
          toast.success("Xóa thành công.")
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
  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === "deleteFieldGroup") {
        if (messageBox.result === true) {
          deleteFieldGroupSelected();
        }
      }
    }
  }, [messageBox.result])

  const navigate = useNavigate();

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
