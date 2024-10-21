import classNames from 'classnames/bind';
import SidebarCampaign from '../components/Sidebar';
import { TiCancel } from 'react-icons/ti';

import Footer from '~/layout/components/Footer';

import styles from './Setting.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';
import { HeaderCreateCampaign } from '~/layout/components';
import { useQueryClient } from '@tanstack/react-query';
import { useLaunchCampaignMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { setContentError, setShowErrorDelete } from '~/redux/slides/UserCampaign';
const cx = classNames.bind(styles);

function SettingCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [campaginState, setCampaignState] = useState({});
  const [campagin, setCampaign] = useState({});
  const [campaignMain, setCampaignMain] = useState({});
  const queryClient = useQueryClient();
  const dataCampaign = queryClient.getQueryData(['getCampaignById']);
  useEffect(() => {
    if (dataCampaign) {
      let infoBasic = {
        id: dataCampaign.data._id,
        title: dataCampaign.data.title || '',
        cardImage: dataCampaign.data.cardImage || { url: '', public_id: '' },
        status: dataCampaign.data.status,
        isIndemand: dataCampaign.data.isIndemand || false,
        owner: dataCampaign.data.owner || '',
        team: dataCampaign.data.team || [],
      };
      setCampaign({ ...infoBasic });
      setCampaignState({ ...infoBasic });
      setCampaignMain(dataCampaign.data);
    }
  }, [dataCampaign]);

  const currentUser = useSelector((state) => state.user.currentUser);
  const checkInfo = () => {
    if (!campaignMain.cardImage?.url) {
      dispatch(setContentError('PHẦN CƠ BẢN: Chiến dịch của bạn chưa có ảnh thẻ chiến dịch.'));
      return false;
    }
    if (!campaignMain.field) {
      dispatch(setContentError('PHẦN CƠ BẢN: Vui lòng chọn lĩnh vực cho chiến dịch của bạn.'));
      return false;
    }
    if (!campaignMain.duration) {
      dispatch(setContentError('PHẦN CƠ BẢN: Vui lòng nhập thời hạn cho chiến dịch.'));
      return false;
    }
    if (!campaignMain.videoUrl && !campagin.imageDetailPage?.url) {
      dispatch(setContentError('PHẦN NỘI DUNG: Vui lòng chọn video hoặc hình ảnh.'));
      return false;
    }
    if (!campaignMain.goal) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng nhập số tiền mục tiêu của chiến dịch.'));
      return false;
    }
    if (!campaignMain.momoNumber) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng nhập số tài khoản ở mục thông tin ngân hàng.'));
      return false;
    }
    if (!(campaignMain.owner?.isVerifiedUser || currentUser.isAdmin)) {
      dispatch(setContentError('PHẦN GÂY QUỸ: Vui lòng xác minh tài khoản chủ sỡ hữu chiến dịch.'));
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
        navigate(`/individuals/${data.data.owner}/campaigns`);
      },
      onError(error) {
        console.log(error.message);
      },
      onSettled() {
        dispatch(setLoading(false));
      },
    });
  };

  return (
    <div className={cx('body')}>
      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>Cài đặt</div>
        <div className={cx('entreField-subHeader')}>Phát hành chiến dịch của bạn tại đây!</div>
        <div className={cx('entreField-subHeader')}>
          Lưu ý: Bạn phải đạt ít nhất 70% mục tiêu gây quỹ thì chiến dịch của bạn mới được xem là thành công!
        </div>
      </div>

      <div className={cx('entreSection')}>
        {campagin.status === 'Bản nháp' && (
          <div className={cx('container-btn text-left')}>
            <a onClick={handleClickLaunchCampaign} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }}>
              PHÁT HÀNH CHIẾN DỊCH
            </a>
          </div>
        )}
        {campagin.status === 'Đang tạm ngưng' && (
          <div className={cx('container-btn text-left')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0' }}>
              CHIẾN DỊCH ĐANG BỊ TẠM NGƯNG
            </a>
          </div>
        )}
        {campagin.status === 'Đang gây quỹ' && (
          <div className={cx('container-btn text-left')}>
            <a className={cx('btn-ok')} style={{ marginLeft: '0' }}>
              CHIẾN DỊCH ĐÃ PHÁT HÀNH
            </a>
          </div>
        )}
        {campagin.status === 'Đã kết thúc' && (
          <div className={cx('container-btn')}>
            <a className={cx('btn')} style={{ marginLeft: '0', background: '#a8a8a8', color: '#fff' }}>
              CHIẾN DỊCH ĐÃ KẾT THÚC
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingCampaign;
