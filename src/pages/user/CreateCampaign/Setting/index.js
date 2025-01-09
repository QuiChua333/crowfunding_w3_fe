import classNames from 'classnames/bind';

import styles from './Setting.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useQueryClient } from '@tanstack/react-query';
import { useLaunchCampaignMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { setContentError, setShowErrorDelete, setTab } from '~/redux/slides/UserCampaign';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function SettingCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [campaignState, setCampaignState] = useState({});
  const campaign = useSelector((state) => state.userCampaign.campaign);

  useEffect(() => {
    if (campaign) {
      let infoBasic = {
        status: campaign.status,
      };
      setCampaignState({ ...infoBasic });
    }
  }, [campaign]);

  const currentUser = useSelector((state) => state.user.currentUser);
  const checkInfo = () => {
    if (!campaign.cardImage) {
      dispatch(setContentError('PHẦN CƠ BẢN: Chiến dịch của bạn chưa có ảnh thẻ chiến dịch.'));
      return false;
    }
    if (!campaign.field) {
      dispatch(setContentError('PHẦN CƠ BẢN: Vui lòng chọn lĩnh vực cho chiến dịch của bạn.'));
      return false;
    }
    if (!campaign.duration) {
      dispatch(setContentError('PHẦN CƠ BẢN: Vui lòng nhập thời hạn cho chiến dịch.'));
      return false;
    }
    if (!campaign.youtubeUrl && !campaign.imageDetailPage) {
      dispatch(setContentError('PHẦN NỘI DUNG: Vui lòng chọn video hoặc hình ảnh.'));
      return false;
    }
    if (!campaign.goal) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng nhập số tiền mục tiêu của chiến dịch.'));
      return false;
    }
    if (!campaign.bankAccountNumber) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng nhập số tài khoản ở mục thông tin ngân hàng.'));
      return false;
    }
    if (!campaign.bankUsername) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng nhập tên tài khoản ở mục thông tin ngân hàng.'));
      return false;
    }
    if (!campaign.bankName) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng nhập tên ngân hàng ở mục thông tin ngân hàng.'));
      return false;
    }
    if (campaign.owner?.verifyStatus !== 'Đã xác thực') {
      dispatch(setContentError('PHẦN GÂY QUỸ: Tài khoản chủ sở hữu chiến dịch phải được xác minh.'));
      return false;
    }
    return true;
  };

  const launchCampaignMutation = useLaunchCampaignMutation();
  const handleClickLaunchCampaign = async () => {
    const check = checkInfo();
    if (!check) {
      dispatch(setShowErrorDelete(true));
      return;
    }

    dispatch(setLoading(true));
    launchCampaignMutation.mutate(id, {
      onSuccess(data) {
        navigate(`/individuals/${currentUser.id}/campaigns`);
        toast.success('Đăng ký phát hành chiến dịch thành công');
      },
      onError(error) {
        dispatch(setContentError(error.response.data.message));
        dispatch(setShowErrorDelete(true));
        console.log(error.response.data.message);
      },
      onSettled() {
        dispatch(setLoading(false));
      },
    });
  };
  useEffect(() => {
    dispatch(
      setTab({
        number: 7,
        content: 'Gây quỹ',
      }),
    );
  }, []);
  return (
    <div className={cx('body')}>
      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>Cài đặt</div>
        <div className={cx('entreField-subHeader')}>Phát hành chiến dịch của bạn tại đây!</div>
        <div className={cx('entreField-subHeader')}>
          <span className="underline">Lưu ý:</span>
        </div>
        <div>
          <div>- Bạn phải đạt được mục tiêu gây quỹ thì chiến dịch của bạn mới được xem là thành công!</div>
          <div>
            - Bạn phải chịu một khoảng phí nền tảng. Số tiền phí nền tảng của chúng tôi là 5% tổng số tiền bạn quyên góp
            được nếu chiến dịch thành công
          </div>
        </div>
      </div>

      <div className={cx('entreSection')}>
        {campaign.status === 'Bản nháp' && (
          <div className={cx('container-btn text-left')}>
            <a onClick={handleClickLaunchCampaign} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }}>
              PHÁT HÀNH CHIẾN DỊCH
            </a>
          </div>
        )}
        {campaign.status === 'Chờ xác nhận' && (
          <div className={cx('container-btn text-left')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0' }}>
              CHIẾN DỊCH ĐANG CHỜ XÁC NHẬN
            </a>
          </div>
        )}
        {campaign.status === 'Tạm dừng' && (
          <div className={cx('container-btn text-left')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0' }}>
              CHIẾN DỊCH ĐANG BỊ TẠM NGƯNG
            </a>
          </div>
        )}
        {campaign.status === 'Đang gây quỹ' && (
          <div className={cx('container-btn text-left')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0' }}>
              CHIẾN DỊCH ĐÃ PHÁT HÀNH
            </a>
          </div>
        )}
        {campaign.status === 'Thất bại' && (
          <div className={cx('container-btn')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0', background: '#a8a8a8', color: '#fff' }}>
              CHIẾN DỊCH ĐÃ THẤT BẠI
            </a>
          </div>
        )}
        {campaign.status === 'Thành công' && (
          <div className={cx('container-btn')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0', background: '#34ca96', color: '#fff' }}>
              CHIẾN DỊCH ĐÃ THÀNH CÔNG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingCampaign;
