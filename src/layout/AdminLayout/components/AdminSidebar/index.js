import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import styles from './AdminSidebar.module.scss';
import { useSelector } from 'react-redux';
import { useLogOutMutation } from '~/hooks/api/mutations/auth/auth.mutation';

const cx = classNames.bind(styles);

function AdminSidebar() {
  const tabAdmin = useSelector((state) => state.admin.tabAdmin);
  const navigate = useNavigate();
  const logOutMutation = useLogOutMutation();
  const handleClickLogout = () => {
    logOutMutation.mutate(null, {
      onSuccess() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/');
      },
      onError(err) {
        console.log(err.response.data.message);
      },
    });
  };

  return (
    <div className={cx('wrapper')}>
      <div>
        <div className={cx('campaignInfo')}>
          <div className={cx('campaignPhase')}>
            <span>Trang quản trị</span>
          </div>
        </div>

        <div className={cx('navItems')}>
          <div className={cx('navSection')}>
            <a className={cx('navSection-title')} style={{ cursor: 'pointer' }}>
              <div>Chức năng</div>
              <FaAngleDown className={cx('icon', 'icon-down')} />
            </a>

            <div className={cx('navSection-children')}>
              <Link
                to="/admin/campaigns"
                className={cx('navItem--child', 'navItem', {
                  'navItem--current': tabAdmin.number === 1,
                })}
              >
                <div className={cx('navItem-link')}>
                  <div>1. Chiến dịch</div>
                </div>
              </Link>
              <Link
                to="/admin/users"
                className={cx('navItem--child', 'navItem', {
                  'navItem--current': tabAdmin.number === 2,
                })}
              >
                <div className={cx('navItem-link')}>
                  <div>2. Người dùng</div>
                </div>
              </Link>

              <Link
                to="/admin/complaint"
                className={cx('navItem--child', 'navItem', {
                  'navItem--current': tabAdmin.number === 3,
                })}
              >
                <div className={cx('navItem-link')}>
                  <div>3. Báo cáo vi phạm</div>
                </div>
              </Link>

              <Link
                to="/admin/send-refund"
                className={cx('navItem--child', 'navItem', {
                  'navItem--current': tabAdmin.number === 4,
                })}
              >
                <div className={cx('navItem-link')}>
                  <div>4. Gửi - Trả</div>
                </div>
              </Link>

              <Link
                to="/admin/statistic"
                className={cx('navItem--child', 'navItem', {
                  'navItem--current': tabAdmin.number === 5,
                })}
              >
                <div className={cx('navItem-link')}>
                  <div>5. Thống kê</div>
                </div>
              </Link>
            </div>
          </div>

          <div className={cx('navItem')}>
            <a href="/" className={cx('navItem-link')}>
              <div>Về trang chủ</div>
            </a>
          </div>
          <div className={cx('navItem')}>
            <a onClick={handleClickLogout} className={cx('navItem-link')} style={{ cursor: 'pointer' }}>
              <div>Đăng xuất</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
