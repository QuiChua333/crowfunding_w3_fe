import SidebarCampaign from '~/pages/user/CreateCampaign/components/Sidebar';
import { Footer, HeaderCreateCampaign } from '../components';
import { useQueryClient } from '@tanstack/react-query';
import { TiCancel } from 'react-icons/ti';
import classNames from 'classnames/bind';
import styles from './CampaignLayout.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetCampaignByIdQuery } from '~/hooks/api/queries/user/campaign.query';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { setCampaign, setContentError, setEditAll, setShowErrorDelete } from '~/redux/slides/UserCampaign';
import { useGetCurrentUserQuery } from '~/hooks/api/queries/user/user.query';

const cx = classNames.bind(styles);

function CampaignLayout({ children, item = false }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const tab = useSelector((state) => state.userCampaign.tab);
  const { data: dataCampaign, isLoading } = useGetCampaignByIdQuery(id);
  const { data: dataUser } = useGetCurrentUserQuery();
  const campaign = useSelector((state) => state.userCampaign.campaign);
  useEffect(() => {
    if (dataCampaign) {
      dispatch(setCampaign(dataCampaign));
    }
    if (dataUser) {
      setCurrentUser(dataUser);
    }
  }, [dataCampaign, dataUser]);

  if (isLoading) {
    dispatch(setLoading(true));
  } else {
    dispatch(setLoading(false));
  }

  const showErrorDelete = useSelector((state) => state.userCampaign.showErrorDelete);
  const contentError = useSelector((state) => state.userCampaign.contentError);
  const isEditAll = useSelector((state) => state.userCampaign.isEditAll);

  useEffect(() => {
    if (JSON.stringify(campaign) !== '{}' && currentUser.id) {
      let edit = false;
      if (currentUser.isAdmin) edit = true;
      if (campaign.ownerId === currentUser.id) {
        edit = true;
      }

      if (
        campaign.teamMembers?.some((x) => {
          return x.email === currentUser.email && x.confirmStatus === 'Đã xác nhận' && x.isEdit === true;
        })
      ) {
        edit = true;
      }

      dispatch(setEditAll(edit));
    }
  }, [campaign, currentUser]);

  useEffect(() => {
    if (!isEditAll) {
      dispatch(setShowErrorDelete(true));
      dispatch(setContentError('Bạn không có quyền chỉnh sửa chiến dịch'));
    }
  }, [isEditAll]);

  return (
    <div className={cx('wrapper')}>
      <SidebarCampaign status={campaign?.status} title={campaign?.title} cardImage={campaign?.cardImage} id={id} />
      <div className="flex-1">
        <HeaderCreateCampaign />
        <div className={cx('content')} style={{ pointerEvents: !isEditAll && 'none' }}>
          {!item && (
            <div className={cx('controlBar')}>
              <div className={cx('controlBar-container')}>
                <div className={cx('controlBar-content')}>Chiến dịch / {tab.content}</div>
              </div>
              {showErrorDelete && (
                <div className={cx('container-error')}>
                  <TiCancel className={cx('icon-error')} />
                  <span>{contentError}</span>
                </div>
              )}
            </div>
          )}
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CampaignLayout;
