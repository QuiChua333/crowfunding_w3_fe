import classNames from 'classnames/bind';
import SidebarCampaign from '../components/Sidebar';
import { TiCancel } from 'react-icons/ti';

import Footer from '~/layout/components/Footer';

import styles from './Setting.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { Header } from '~/layout/components';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);

function SettingCampaign() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [campaginState, setCampaignState] = useState({});
  const [campagin, setCampaign] = useState({});
  const [campaignMain, setCampaignMain] = useState({});
  const getCampaign = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/campaign/getCampaignById/${id}`);
      let infoBasic = {
        id: res.data.data._id,
        title: res.data.data.title || '',
        cardImage: res.data.data.cardImage || { url: '', public_id: '' },
        status: res.data.data.status,
        isIndemand: res.data.data.isIndemand || false,
        owner: res.data.data.owner || '',
        team: res.data.data.team || [],
      };
      setCampaign({ ...infoBasic });
      setCampaignState({ ...infoBasic });
      setCampaignMain(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCampaign();
  }, []);
  const currentUser = useSelector((state) => state.user.currentUser);
  const checkInfo = () => {
    if (!campaignMain.cardImage?.url) {
      setContentError('PHẦN CƠ BẢN: Chiến dịch của bạn chưa có ảnh thẻ chiến dịch.');
      return false;
    }
    if (!campaignMain.field) {
      setContentError('PHẦN CƠ BẢN: Vui lòng chọn lĩnh vực cho chiến dịch của bạn.');
      return false;
    }
    if (!campaignMain.duration) {
      setContentError('PHẦN CƠ BẢN: Vui lòng nhập thời hạn cho chiến dịch.');
      return false;
    }
    if (!campaignMain.videoUrl && !campagin.imageDetailPage?.url) {
      setContentError('PHẦN NỘI DUNG: Vui lòng chọn video hoặc hình ảnh.');
      return false;
    }
    if (!campaignMain.goal) {
      setContentError('PHẦN GÂY QUỸ: Vui lòng nhập số tiền mục tiêu của chiến dịch.');
      return false;
    }
    if (!campaignMain.momoNumber) {
      setContentError('PHẦN GÂY QUỸ: Vui lòng nhập số tài khoản ở mục thông tin ngân hàng.');
      return false;
    }
    if (!(campaignMain.owner?.isVerifiedUser || currentUser.isAdmin)) {
      setContentError('PHẦN GÂY QUỸ: Vui lòng xác minh tài khoản chủ sỡ hữu chiến dịch.');
      return false;
    }
    return true;
  };
  const handleClickLaunchCampaign = async () => {
    const check = checkInfo();
    if (!check) {
      setShowErrorDelete(true);
      return;
    }

    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.patch(`${baseURL}/campaign/launchCampaign/${id}`);
      dispatch(setLoading(false));
      window.location.href = `/individuals/${res.data.data.owner}/campaigns`;
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isEditAll, setEditAll] = useState(null);

  useEffect(() => {
    if (JSON.stringify(campagin) !== '{}') {
      let edit = false;
      if (currentUser.isAdmin) edit = true;
      else {
        if (campagin.owner?._id === currentUser._id) edit = true;
        if (
          campagin.team?.some((x) => {
            return x.user === currentUser._id && x.isAccepted === true && x.canEdit === true;
          })
        ) {
          edit = true;
        }
      }
      if (edit === true) {
        setShowErrorDelete(false);
      } else {
        setContentError('Bạn không có quyền chỉnh sửa lúc này!');
        setShowErrorDelete(true);
      }
      setEditAll(edit);
    }
  }, [campagin]);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const [contentError, setContentError] = useState('');
  return (
    <>
      <div className={cx('wrapper')}>
        <SidebarCampaign
          current={7}
          status={campagin.status}
          title={campagin.title}
          cardImage={campagin.cardImage?.url}
          id={id}
        />
        <div style={{ flex: '1' }}>
          <Header isFixed={false} />

          <div className={cx('content')} style={{ pointerEvents: !isEditAll && 'none' }}>
            <div className={cx('controlBar')}>
              <div className={cx('controlBar-container')}>
                <div className={cx('controlBar-content')}>Chiến dịch / Cài đặt</div>
              </div>
              {showErrorDelete && (
                <div className={cx('container-error')}>
                  <TiCancel className={cx('icon-error')} />
                  <span>{contentError}</span>
                </div>
              )}
            </div>
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
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default SettingCampaign;
