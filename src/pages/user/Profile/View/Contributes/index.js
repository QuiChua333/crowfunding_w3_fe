import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdAddchart, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetInfoUserQuery } from '~/hooks/api/queries/user/user.query';
import ViewContributesNormal from './TabContributeNormal';
import ViewContributesNFT from './TabContributeNFT';
const cx = classNames.bind(styles);


function ViewContributes() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const { data: dataUser } = useGetInfoUserQuery(id);
  const [tabActive, setTabActive] = useState(1);

  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
    }
  }, [dataUser]);

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
            <Link to={`/individuals/${id}/profile`} className={cx('tab')}>
              Hồ sơ
            </Link>
            <Link to={`/individuals/${id}/campaigns`} className={cx('tab')}>
              Chiến dịch
            </Link>
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/contributions`} className={cx('tab', 'active')}>
                Đóng góp của tôi
              </Link>
            )}
            {currentUser.id && currentUser.id === id && (
              <Link to={`/individuals/${id}/complaints`} className={cx('tab')}>
                Báo cáo vi phạm
              </Link>
            )}
          </div>

          <div className={cx('tabpanel')} style={{ marginTop: '10px' }}>
            <div
              onClick={() => setTabActive(1)}
              className={cx('tab', {
                'active-green': tabActive === 1,
              })}
            >
              Đóng góp với tiền mặt
            </div>
            <div
              onClick={() => setTabActive(2)}
              className={cx('tab', {
                'active-green': tabActive === 2,
              })}
            >
              Đóng góp với NFT
            </div>
          </div>

          <div className="mt-[20px]">
            {tabActive === 1 && <ViewContributesNormal />}
            {tabActive === 2 && <ViewContributesNFT />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewContributes;
