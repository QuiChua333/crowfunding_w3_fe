import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemCampaign from './components/ItemCampaign';
import { useSelector } from 'react-redux';
import { useGetCampaignsFollowedQuery } from '~/hooks/api/queries/user/follow-campaign.query';
import { useGetCampaignsOfOwnerQuery } from '~/hooks/api/queries/user/campaign.query';
const cx = classNames.bind(styles);
function ViewCampaigns() {
  const [isHasCampaign, setHasCampaign] = useState(false);
  const [isHasCampaignMember, setHasCampaignMember] = useState(false);
  const [isHasCampaignFollowed, setHasCampaignFollowed] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const [campaignsOfUser, setCampaignOfUser] = useState([]);
  const [campaignsFollowed, setCampaignsFollowed] = useState([]);

  const { data: dataCampaigns, isLoading: isLoadingOwnerCampaign } = useGetCampaignsOfOwnerQuery(id);
  useEffect(() => {
    if (dataCampaigns) {
      console.log(dataCampaigns);
      setCampaignOfUser(dataCampaigns);
    }
  }, [dataCampaigns]);

  // const { data: dataUser } = useGetInfoUserQuery(id);

  const { data: dataCampaignsFollowed, refetch } = useGetCampaignsFollowedQuery(id);

  useEffect(() => {
    if (dataCampaignsFollowed) {
      setCampaignsFollowed(dataCampaignsFollowed);
    }
  }, [dataCampaignsFollowed]);

  return (
    <div className={cx('wrapper')}>
      {currentUser.id === id && (
        <div className={cx('navbar')}>
          <Link to={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
            <span>
              <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
              Xem hồ sơ
            </span>
          </Link>
          <Link to={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
            <span>
              {' '}
              <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
              Chỉnh sửa hồ sơ & Cài đặt
            </span>
          </Link>
        </div>
      )}

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{currentUser.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <Link to={`/individuals/${id}/profile`} className={cx('tab')}>
              Hồ sơ
            </Link>
            <Link to={`/individuals/${id}/campaigns`} className={cx('tab', 'active')}>
              Chiến dịch
            </Link>
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/contributions`} className={cx('tab')}>
                Đóng góp của tôi
              </Link>
            )}
          </div>

          <div style={{ marginTop: '32px' }}>
            <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
              <span
                className={cx('titleCampaign')}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#ccc',
                  borderRadius: '4px',
                  color: '#212121',
                }}
              >
                Dự án là chủ sở hữu
              </span>
            </div>
            {campaignsOfUser.map((item, index) => {
              return <ItemCampaign key={index} item={item} getCampaignsFollowed={refetch} />;
            })}
            {!isLoadingOwnerCampaign && campaignsOfUser.length === 0 && id !== currentUser.id && (
              <p>Hiện người này chưa có chiến dịch nào được công khai!</p>
            )}
            {!isLoadingOwnerCampaign && campaignsOfUser.length === 0 && id === currentUser.id && (
              <p>Hiện bạn chưa có chiến dịch nào</p>
            )}
          </div>

          <div style={{ marginTop: '32px' }}>
            <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
              <span
                className={cx('titleCampaign')}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#ccc',
                  borderRadius: '4px',
                  color: '#212121',
                }}
              >
                Dự án là thành viên
              </span>
            </div>

            {campaignsOfUser.map((item, index) => {
              if (
                item.teamMembers?.some((x) => {
                  return x.user.id === id && x.isAccepted === true;
                }) &&
                (item.status === 'Đang gây quỹ' ||
                  item.status === 'Đã kết thúc' ||
                  item.team?.some((x) => {
                    return x.user === currentUser.id && x.isAccepted === true;
                  }))
              ) {
                if (!isHasCampaignMember) setHasCampaignMember(true);
                return <ItemCampaign key={index} item={item} />;
              } else return <></>;
            })}
            {!isHasCampaignMember && (
              <>
                {id !== currentUser.id ? (
                  <p>Hiện người này chưa là thành viên của chiến dịch gây quỹ chính thức nào!</p>
                ) : (
                  <p>Hiện bạn chưa chưa là thành viên của chiến dịch gây quỹ chính thức nào!</p>
                )}
              </>
            )}
          </div>

          {currentUser.id && currentUser.id === id && (
            <div style={{ marginTop: '32px' }}>
              <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                <span
                  className={cx('titleCampaign')}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: '#ccc',
                    borderRadius: '4px',
                    color: '#212121',
                  }}
                >
                  Dự án đang theo dõi
                </span>
              </div>

              {campaignsFollowed?.map((item, index) => {
                if (!isHasCampaignFollowed) setHasCampaignFollowed(true);
                return <ItemCampaign key={index} item={item} />;
              })}
              {!isHasCampaignFollowed && <p>Bạn hiện chưa theo dõi chiến dịch nào!</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCampaigns;
