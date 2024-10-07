import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import ItemCampaign from './components/ItemCampaign';
import { useSelector } from 'react-redux';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);
function ViewCampaigns() {
  const [isHasCampaign, setHasCampaign] = useState(false);
  const [isHasCampaignMember, setHasCampaignMember] = useState(false);
  const [isHasCampaignFollowed, setHasCampaignFollowed] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const [campaignsOfUser, setCampaignOfUser] = useState([]);
  const [campaignsFollowed, setCampaignsFollowed] = useState([]);
  const [user, setUser] = useState({});
  const getCampaigns = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/campaign/getCampaignsOfUserId/${id}`);
      setCampaignOfUser(res.data.data);
    } catch (error) {}
  };
  const getInfoUser = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/user/getInfoUser/${id}`);
      setUser(res.data.data);
    } catch (error) {}
  };
  const getCampaignsFollowed = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/user/getCampaignFollowed/${id}`);
      setCampaignsFollowed(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCampaigns();
    getInfoUser();
    getCampaignsFollowed();
  }, []);
  return (
    <div className={cx('wrapper')}>
      {currentUser._id === id && (
        <div className={cx('navbar')}>
          <a href={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
            <span>
              <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
              Xem hồ sơ
            </span>
          </a>
          <a href={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
            <span>
              {' '}
              <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
              Chỉnh sửa hồ sơ & Cài đặt
            </span>
          </a>
        </div>
      )}

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <a href={`/individuals/${id}/profile`} className={cx('tab')}>
              Hồ sơ
            </a>
            <a href={`/individuals/${id}/campaigns`} className={cx('tab', 'active')}>
              Chiến dịch
            </a>
            {currentUser._id && currentUser._id === id && (
              <a href={`/individuals/${id}/contributions`} className={cx('tab')}>
                Đóng góp của tôi
              </a>
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
              if (
                item.owner?._id === id &&
                (item.status === 'Đang gây quỹ' ||
                  item.team?.some((x) => {
                    return x.user === currentUser._id && (x.isAccepted === true || x.isOwner === true);
                  }))
              ) {
                if (!isHasCampaign) setHasCampaign(true);
                return <ItemCampaign key={index} item={item} getCampaignsFollowed={getCampaignsFollowed} />;
              } else return <></>;
            })}
            {!isHasCampaign && (
              <>
                {id !== currentUser._id ? (
                  <p>Hiện người này chưa có chiến dịch nào được công khai!</p>
                ) : (
                  <p>Hiện bạn chưa có chiến dịch nào</p>
                )}
              </>
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
                item.team?.some((x) => {
                  return x.user === id && x.isAccepted === true;
                }) &&
                (item.status === 'Đang gây quỹ' ||
                  item.status === 'Đã kết thúc' ||
                  item.team?.some((x) => {
                    return x.user === currentUser._id && x.isAccepted === true;
                  }))
              ) {
                if (!isHasCampaignMember) setHasCampaignMember(true);
                return <ItemCampaign key={index} item={item} />;
              } else return <></>;
            })}
            {!isHasCampaignMember && (
              <>
                {id !== currentUser._id ? (
                  <p>Hiện người này chưa là thành viên của chiến dịch gây quỹ chính thức nào!</p>
                ) : (
                  <p>Hiện bạn chưa chưa là thành viên của chiến dịch gây quỹ chính thức nào!</p>
                )}
              </>
            )}
          </div>

          {currentUser._id && currentUser._id === id && (
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

              {campaignsFollowed.map((item, index) => {
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
