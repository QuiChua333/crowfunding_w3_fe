import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageBox, setPreviousLink } from '~/redux/slides/GlobalApp';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function DropDown({ setIsOpenModalMember, setIsOpenModalReport, IsOpenModalReport, statusCampaign }) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const handleClickSeeMember = () => {
    setIsOpenModalMember(true);
  };
  const handleClickReport = () => {
    const token = localStorage.getItem('accessToken') || false;
    if (!token) {
      dispatch(
        setMessageBox({
          title: 'Thông báo',
          content: 'Bạn cần phải đăng nhập để báo cáo dự án.',
          contentOK: 'XÁC NHẬN',
          contentCancel: 'HỦY',
          isShow: true,
          type: 'reportModal',
        }),
      );
    } else {
      setIsOpenModalReport(true);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === 'reportModal') {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
          dispatch(setPreviousLink('@report' + window.location.href));
          navigate('/login');
        } else {
          dispatch(setMessageBox({ result: null, isShow: false }));
        }
      }
    }
  }, [messageBox.result]);

  return (
    <div className={cx('wrapper')}>
      <div onClick={handleClickSeeMember} className={cx('action')}>
        Xem thành viên
      </div>
      <div style={{ height: '1px', background: '#ccc' }}></div>
      <div onClick={handleClickReport} className={cx('action', 'action-delete')}>
        Báo cáo vi phạm
      </div>
    </div>
  );
}

export default DropDown;
