import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageBox } from '~/redux/slides/GlobalApp';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useChangeStatusCampaignMutation,
  useAdminDeleteCampaignMutation,
} from '~/hooks/api/mutations/admin/admin.campaigns.mutation';
const cx = classNames.bind(styles);

function DropDown({ menu, onClickItem, index, campaign, getAllCampaigns }) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [status, setStatus] = useState('');
  const [contentToast, setContentToast] = useState('');

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
    setStatus('Tạm dừng');
    setContentToast('Dự án đã tạm dừng!');
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

  const handleChangeStatusCampaign = useChangeStatusCampaignMutation();

  const changeStatusCampaign = async (status) => {
    const dataApi = {
      status,
      id: campaign.id,
    };
    dispatch(setLoading(true));
    handleChangeStatusCampaign.mutate(dataApi, {
      onSuccess: () => {
        getAllCampaigns();
        toast.success(contentToast);
      },
      onError: (error) => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        console.log(error);
      },
      onSettled: () => {
        dispatch(setLoading(false));
      },
    });
  };

  const handleDeleteCampaign = useAdminDeleteCampaignMutation();

  const deleteCampaign = async () => {
    dispatch(setLoading(true));
    handleDeleteCampaign.mutate(campaign.id, {
      onSuccess: () => {
        toast.success('Dự án đã được xóa khỏi hệ thống');
        getAllCampaigns();
      },
      onError: (error) => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        console.log(error);
      },
      onSettled: () => {
        dispatch(setLoading(false));
      },
    });
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
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('action')} onClick={() => navigate(`/campaigns/${campaign.id}/edit/basic`)}>
        Xem và chỉnh sửa dự án
      </div>
      {campaign.status === 'Đang gây quỹ' && (
        <div className={cx('action')} onClick={handleAdminStop}>
          Tạm ngưng dự án
        </div>
      )}
      {campaign.status === 'Tạm dừng' && (
        <div className={cx('action')} onClick={handleAdminActive}>
          Kích hoạt dự án
        </div>
      )}
      {campaign.status === 'Chờ xác nhận' && (
        <div className={cx('action')} onClick={handleAdminLaunch}>
          Phê duyệt dự án
        </div>
      )}
      {/* <div style={{ height: '1px', background: '#ccc' }}></div>
      <div className={cx('action', 'action-delete')} onClick={handleAdminDelete}>
        Xóa dự án
      </div> */}
    </div>
  );
}

export default DropDown;
