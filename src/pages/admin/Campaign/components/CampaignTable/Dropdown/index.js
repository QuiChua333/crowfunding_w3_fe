import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import baseURL from '~/utils/baseURL';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageBox } from '~/redux/slides/GlobalApp';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);

function DropDown({ menu, onClickItem, index, campaign, getAllCampaigns }) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [status, setStatus] = useState('');
  const [contentToast, setContentToast] = useState('');
  const handleClickItem = (item) => {
    onClickItem(item, index);
  };

  const handleAdminLaunch = () => {
    setStatus('Đang gây quỹ');
    setContentToast('Dự án đã được đăng tải!');
    dispatch(
      setMessageBox({
        title: 'Đăng tải dự án?',
        content: 'Chọn xác nhận đồng nghĩa với việc dự án sẽ được đăng tải và gây quỹ ngay từ bây giờ',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `adminAction${campaign.id}`,
      }),
    );
  };
  const handleAdminStop = () => {
    setStatus('Đang tạm ngưng');
    setContentToast('Dự án đã tạm ngưng!');
    dispatch(
      setMessageBox({
        title: 'Tạm ngưng dự án?',
        content: 'Chọn xác nhận đồng nghĩa với việc dự án sẽ bị tạm ngưng và quá trình quyên góp sẽ tạm dừng lại',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `adminAction${campaign.id}`,
      }),
    );
  };
  const handleAdminActive = () => {
    setStatus('Đang gây quỹ');
    setContentToast('Dự án đã được đăng tải trở lại!');
    dispatch(
      setMessageBox({
        title: 'Kích hoạt dự án?',
        content: 'Chọn xác nhận đồng nghĩa với việc dự án sẽ tiếp tục được đăng tải và gây quỹ',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `adminAction${campaign.id}`,
      }),
    );
  };
  const handleAdminDelete = () => {
    dispatch(
      setMessageBox({
        title: 'Xóa dự án?',
        content: 'Thao tác này sẽ xóa hoàn toàn chiến dịch này khỏi hệ thống và không thể hoàn tác được.',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: `adminDelete${campaign.id}`,
      }),
    );
  };

  const changeStatusCampaign = async (status) => {
    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.patch(`${baseURL}/campaign/adminChangeStatusCampaign/${campaign.id}`, { status });
      getAllCampaigns();
      dispatch(setLoading(false));
      toast.success(contentToast);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteCampaign = async () => {
    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.delete(`${baseURL}/campaign/adminDeleteCampaign/${campaign.id}`);
      dispatch(setLoading(false));
      toast.success('Dự án đã được xóa khỏi hệ thống');
      getAllCampaigns();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === `adminAction${campaign.id}`) {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
          changeStatusCampaign(status);
        }
      }
      if (messageBox.type === `adminDelete${campaign.id}`) {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
          deleteCampaign();
        }
      }
    }
  }, [messageBox.result]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('action')} onClick={() => (window.location.href = `/campaigns/${campaign.id}/edit/basic`)}>
        Xem và chỉnh sửa dự án
      </div>
      {campaign.status === 'Đang gây quỹ' && (
        <div className={cx('action')} onClick={handleAdminStop}>
          Tạm ngưng dự án
        </div>
      )}
      {campaign.status === 'Đang tạm ngưng' && (
        <div className={cx('action')} onClick={handleAdminActive}>
          Kích hoạt dự án
        </div>
      )}
      {campaign.status === 'Chờ xác nhận' && (
        <div className={cx('action')} onClick={handleAdminLaunch}>
          Phê duyệt dự án
        </div>
      )}
      <div style={{ height: '1px', background: '#ccc' }}></div>
      <div className={cx('action', 'action-delete')} onClick={handleAdminDelete}>
        Xóa dự án
      </div>
    </div>
  );
}

export default DropDown;
