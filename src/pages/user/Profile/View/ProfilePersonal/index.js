import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link, useParams } from 'react-router-dom';
import { MdAddchart, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { defaultAvt } from '~/assets/images';
import { useGetInfoUserQuery } from '~/hooks/api/queries/user/user.query';
import { useGetQuantityContributionOfUserQuery } from '~/hooks/api/queries/user/contribution.query';
import { useGetQuantitySuccessCampaignsOfUserQuery } from '~/hooks/api/queries/user/campaign.query';
const cx = classNames.bind(styles);

function ProfilePersonal() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);
  const [quantityCampaignOfUser, setQuantityCampaignOfUser] = useState(0);
  const [quantityContributeOfUser, setQuantityContributeOfUser] = useState(0);

  const { data: dataUser } = useGetInfoUserQuery(id);
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
    }
  }, [dataUser]);

  const { data: dataQuantityCampaignOfUser } = useGetQuantitySuccessCampaignsOfUserQuery(id);
  useEffect(() => {
    if (dataQuantityCampaignOfUser) {
      setQuantityCampaignOfUser(dataQuantityCampaignOfUser);
    }
  }, [dataQuantityCampaignOfUser]);

  const { data: dataQuantityContributeOfUser } = useGetQuantityContributionOfUserQuery(id);
  useEffect(() => {
    if (dataQuantityContributeOfUser) {
      setQuantityContributeOfUser(dataQuantityContributeOfUser);
    }
  }, [dataQuantityContributeOfUser]);

  return (
    <div className={cx('wrapper')}>
      {currentUser.id === id && (
        <div className={cx('navbar')}>
          <Link to={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
            <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
            <span>Xem hồ sơ</span>
          </Link>
          <Link to={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
            <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
            <span>Chỉnh sửa hồ sơ & Cài đặt</span>
          </Link>
          <Link to={`/individuals/${id}/statistic`} className={cx('nav-item')}>
            <MdAddchart style={{ fontSize: '24px', marginRight: '8px' }} />
            <span>Thống kê</span>
          </Link>
        </div>
      )}

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <Link to={`/individuals/${id}/profile`} className={cx('tab', 'active')}>
              Hồ sơ
            </Link>
            <Link to={`/individuals/${id}/campaigns`} className={cx('tab')}>
              Chiến dịch
            </Link>
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/contributions`} className={cx('tab')}>
                Đóng góp của tôi
              </Link>
            )}
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/complaints`} className={cx('tab')}>
                Báo cáo vi phạm
              </Link>
            )}
          </div>

          <div className={cx('container-body-profile')}>
            <img className={cx('avatar')} src={user?.avatar || defaultAvt} alt="img" />
            <div className={cx('container-middle')}>
              <span className={cx('title-profile')}>Giới thiệu</span>
              <p className={cx('des-profile')}>{user.story ? user.story : 'Thông tin chưa cập nhật'}</p>
            </div>
            <div className={cx('container-final')}>
              <span className={cx('title-profile')}>Về bản thân tôi</span>
              <div className={cx('container-me')}>
                <div className={cx('container-campaigns')}>
                  <span className={cx('quantity-campaigns')}>{quantityCampaignOfUser || 0} </span>
                  <span className={cx('title-campaigns')}>Chiến dịch thành công</span>
                </div>

                <div className={cx('container-campaigns')}>
                  <span className={cx('quantity-campaigns')}>{quantityContributeOfUser || 0}</span>
                  <span className={cx('title-campaigns')}>Đóng góp</span>
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
                      {user.verifyStatus === 'Đã xác thực' ? 'Đã xác minh tài khoản' : 'Chưa xác minh tài khoản'}
                    </span>
                  </div>
                </div>
              </div>

              {user.facebookLink && (
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
                        <a href={user.facebookLink} target="_blank" className="flex items-center">
                          <FaFacebook className={cx('icon-facebook')} />
                          <span style={{ marginLeft: '10px', fontWeight: '500' }}>Facebook</span>
                        </a>
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
