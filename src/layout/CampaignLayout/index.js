import SidebarCampaign from '~/pages/user/CreateCampaign/components/Sidebar';
import { Footer, HeaderCreateCampaign } from '../components';
import { useQueryClient } from '@tanstack/react-query';
import { TiCancel } from 'react-icons/ti';
import classNames from 'classnames/bind';
import styles from './CampaignLayout.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCampaignByIdQuery } from '~/hooks/api/queries/user/campaign.query';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { setContentError, setEditAll, setShowErrorDelete } from '~/redux/slides/UserCampaign';
import { useGetCurrentUserQuery } from '~/hooks/api/queries/user/user.query';

const cx = classNames.bind(styles);

function CampaignLayout({ children, item }) {
  const { id } = useParams();
  const [currentTag, setCurrentTag] = useState(1);
  const [contentTag, setContentTag] = useState('Cơ bản');
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const [campaign, setCampaign] = useState({});
  const { data: dataCampaign, isLoading } = useGetCampaignByIdQuery(id);
  const { data: dataUser } = useGetCurrentUserQuery();

  useEffect(() => {
    if (dataCampaign) {
      setCampaign(dataCampaign.data);
    }
    if (dataUser) {
      setCurrentUser(dataUser.data);
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
    if (JSON.stringify(campaign) !== '{}') {
      let edit = false;
      if (currentUser.isAdmin) edit = true;
      else {
        if (campaign.owner?._id === currentUser._id) edit = true;
        console.log(campaign.team);
        if (
          campaign.team?.some((x) => {
            return x.user === currentUser._id && x.isAccepted === true && x.canEdit === true;
          })
        ) {
          edit = true;
        }
      }
      if (edit === true) {
        dispatch(setShowErrorDelete(false));
      } else {
        dispatch(setContentError('Bạn không có quyền chỉnh sửa lúc này!'));
        dispatch(setShowErrorDelete(true));
      }

      dispatch(setEditAll(edit));
    }
  }, [campaign, currentUser]);
  return (
    <div className={cx('wrapper')}>
      <SidebarCampaign
        current={currentTag}
        setCurrent={setCurrentTag}
        setContentTag={setContentTag}
        status={campaign?.status}
        title={campaign?.title}
        cardImage={campaign?.cardImage?.url}
        id={id}
      />
      <div className="flex-1">
        <HeaderCreateCampaign />
        <div className={cx('content')} style={{ pointerEvents: !isEditAll && 'none' }}>
          {!item && (
            <div className={cx('controlBar')}>
              <div className={cx('controlBar-container')}>
                <div className={cx('controlBar-content')}>Chiến dịch / {contentTag}</div>
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
