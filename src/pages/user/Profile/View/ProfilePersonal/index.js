import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import { useSelector } from 'react-redux';
import baseURL from '~/utils/baseURL';
import { FaUserCircle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { CustomAxios } from '~/config';
import { defaultAvt } from '~/assets/images';
const cx = classNames.bind(styles);

function ProfilePersonal() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showModalCampaigns, setShowModalCampaigns] = useState(false);
  const [showModalContributes, setShowModalContributes] = useState(false);
  const [quantityCampaignOfUser, setQuantityCampaignOfUser] = useState(0);
  const [quantityContributeOfUser, setQuantityContributeOfUser] = useState(0);

  const handleShowModalOverCampaigns = () => {
    setShowModalCampaigns(true);
  };
  const handleShowModalOutCampaigns = () => {
    setShowModalCampaigns(false);
  };
  const handleShowModalOverContributes = () => {
    setShowModalContributes(true);
  };
  const handleShowModalOutContributes = () => {
    setShowModalContributes(false);
  };
  const getInfoUser = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/user/getInfoUser/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getInfoUser();
  }, []);

  const getQuantityCampaignOfUser = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/campaign/getQuantityCampaignOfUserId/${id}`);
      setQuantityCampaignOfUser(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getQuantityCampaignOfUser();
  }, []);

  const getQuantityContributeOfUser = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/contribution/getQuantityContributeOfUserId/${id}`);
      setQuantityContributeOfUser(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getQuantityContributeOfUser();
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
            <a href={`/individuals/${id}/profile`} className={cx('tab', 'active')}>
              Hồ sơ
            </a>
            <a href={`/individuals/${id}/campaigns`} className={cx('tab')}>
              Chiến dịch
            </a>
            {currentUser._id && currentUser._id === id && (
              <a href={`/individuals/${id}/contributions`} className={cx('tab')}>
                Đóng góp của tôi
              </a>
            )}
          </div>

          <div className={cx('container-body-profile')}>
            <img className={cx('avatar')} src={user.profileImage?.url ? user.profileImage.url : defaultAvt} alt="img" />
            <div className={cx('container-middle')}>
              <span className={cx('title-profile')}>Giới thiệu</span>
              <p className={cx('des-profile')}>
                {user.story?.shortDescription.trim().length === 0
                  ? 'Thông tin chưa cập nhật'
                  : user.story?.shortDescription}
              </p>
            </div>
            <div className={cx('container-final')}>
              <span className={cx('title-profile')}>Về bản thân tôi</span>
              <div className={cx('container-me')}>
                <div className={cx('container-campaigns')}>
                  <span className={cx('quantity-campaigns')}>{quantityCampaignOfUser}</span>
                  <span className={cx('title-campaigns')}>Chiến dịch</span>
                  <BsFillQuestionCircleFill
                    onMouseOver={handleShowModalOverCampaigns}
                    onMouseOut={handleShowModalOutCampaigns}
                    className={cx('icon-campaigns')}
                  />
                  {showModalCampaigns && (
                    <div className={cx('modal-hover')}>
                      Đây là số lượng chiến dịch mà tôi đã kêu gọi trên nền tảng GiveFun. Những ý tưởng mới mẽ và niềm
                      đam mê khởi nghiệp, sáng tạo đã thúc đẩy tôi thực hiện nhưng chiến dịch này.
                    </div>
                  )}
                </div>

                <div className={cx('container-campaigns')}>
                  <span className={cx('quantity-campaigns')}>{quantityContributeOfUser}</span>
                  <span className={cx('title-campaigns')}>Đóng góp</span>
                  <BsFillQuestionCircleFill
                    onMouseOver={handleShowModalOverContributes}
                    onMouseOut={handleShowModalOutContributes}
                    className={cx('icon-campaigns')}
                  />
                  {showModalContributes && (
                    <div className={cx('modal-hover')}>
                      Đây là số lượt đóng góp của tôi trên nền tảng GiveFun. Tôi nhìn thấy được những ý tưởng hay từ
                      nhưng chiến dịch của những người dùng khác và tôi đã ủng hộ họ thực hiện và nhậ được rất nhiều đặc
                      quyền và quà tặng hấp dẫn. Nó có ý nghĩa với bản thân tôi.
                    </div>
                  )}
                </div>
              </div>
              <div style={{ height: '1.5px', backgroundColor: '#ccc', marginTop: '25px' }}></div>
              <div style={{ marginTop: '15px' }}>
                <span className={cx('title-profile')}>Xác minh</span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '10px solid #E1E1E1',
                    marginTop: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#6a6a6a',
                      margin: '5px 10px',
                    }}
                  >
                    <IoMdMail style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '10px', fontWeight: '500' }}>Đã xác minh email</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#6a6a6a',
                      margin: '5px 10px',
                    }}
                  >
                    <FaUserCircle style={{ fontSize: '20px' }} />
                    <span style={{ marginLeft: '10px', fontWeight: '500' }}>
                      {user.isVerifiedUser ? 'Đã xác minh tài khoản' : 'Chưa xác minh tài khoản'}
                    </span>
                  </div>
                </div>
              </div>

              {user.linkFacebook && (
                <>
                  <div style={{ height: '1.5px', backgroundColor: '#ccc', marginTop: '25px' }}></div>
                  <div style={{ marginTop: '15px' }}>
                    <span className={cx('title-profile')}>Tìm tôi trên</span>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '10px solid #E1E1E1',
                        marginTop: '10px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#6a6a6a',
                          margin: '5px 10px',
                        }}
                      >
                        <a href={user.linkFacebook}>
                          <FaFacebook className={cx('icon-facebook')} />
                        </a>
                        <span style={{ marginLeft: '10px', fontWeight: '500' }}>Facebook</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePersonal;
