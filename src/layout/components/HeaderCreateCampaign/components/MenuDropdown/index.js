import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FaAngleDown } from 'react-icons/fa6';

import styles from './MenuDropdown.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '~/hooks/api/mutations/auth/auth.mutation';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '~/redux/slides/User';
const cx = classNames.bind(styles);

const MenuDropdown = ({ fullHeader, isLogin, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutMutation = useLogOutMutation();
  const queryClient = useQueryClient();
  const handleClickLogout = () => {
    logOutMutation.mutate(null, {
      onSuccess() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setCurrentUser({}));
        queryClient.removeQueries('getCurrentUser');
        window.location.href = '/';
      },
      onError(err) {
        console.log(err.response.data.message);
      },
    });
  };
  const boxFilterElement = useRef();
  const [showDropdownUser, setShowDropdownUser] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxFilterElement.current && !boxFilterElement.current.contains(event.target)) {
        setShowDropdownUser(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [boxFilterElement]);
  return (
    <div
      className={cx('wrapper', {
        fullHeader,
      })}
    >
      <div className={cx('nav-list')}>
        <p className={cx('nav-item')}>Khám phá</p>
        <p className={cx('nav-item')}>Về chúng tôi</p>
        <p className={cx('nav-item')}>Tạo chiến dịch</p>
      </div>

      <div>
        {isLogin && (
          <div className="flex gap-2 px-[16px] mt-[8px] items-center">
            <span>Tài khoản: </span>
            <div
              className={cx('user-section')}
              onClick={() => setShowDropdownUser((prev) => !prev)}
              ref={boxFilterElement}
            >
              <img className={cx('user-avatar')} src={user.avatar?.url} />
              <span className={cx('user-name')}>
                {user.fullName} <FaAngleDown className={cx('icon', { active: showDropdownUser })} />
              </span>
              {showDropdownUser && (
                <div className={cx('dropdownBoxFilter')}>
                  {!user.isAdmin && (
                    <>
                      <span onClick={() => navigate(`/individuals/${user._id}/campaigns`)}>Chiến dịch của tôi</span>
                      <span onClick={() => navigate(`/individuals/${user._id}/contributions`)}>Đóng góp của tôi</span>
                      <span onClick={() => navigate(`/individuals/${user._id}/profile`)}>Hồ sơ</span>
                      <span onClick={() => navigate(`/individuals/${user._id}/edit/settings`)}>Cài đặt</span>
                    </>
                  )}
                  {user.isAdmin && <span onClick={() => navigate(`/admin`)}>Đến trang quản lý</span>}
                  <span onClick={handleClickLogout} style={{ paddingBottom: '16px' }}>
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {!isLogin && (
        <div className="mt-[20px] flex flex-col items-center">
          <div className="w-[300px] max-w-[90%]  py-4 bg-myGreen text-white font-semibold text-center rounded-[12px]">
            Đăng nhập
          </div>
          <div className="w-[300px] max-w-[90%] py-4 border-[1px] border-[#c0bdb8] font-semibold text-center rounded-[12px] mt-[12px]">
            Đăng ký
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
