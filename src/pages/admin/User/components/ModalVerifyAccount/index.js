import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalVerifyAccount.module.scss';
import TextAreaAutoSize from 'react-textarea-autosize';
import baseURL from '~/utils/baseURL';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { convertDateFromString } from '~/utils';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);

function ModalVerifyAccount({ setIsOpenModalVerify, user, getAllUsers }) {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsOpenModalVerify(false);
  };

  const handleConfirmInfo = async () => {
    dispatch(setLoading(true));
    try {
      const id = user._id;
      await CustomAxios.put(`${baseURL}/user/VerifiedInfoOfUser/${id}`);
      getAllUsers();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }

    setIsOpenModalVerify(false);
  };

  return (
    <div className={cx('wrapper')} onClick={handleCloseModal}>
      <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('header-modal')}>
          <span className={cx('title')}>Xác minh thông tin tài khoản</span>
          <span className={cx('close')} onClick={handleCloseModal}>
            &times;
          </span>
        </div>

        <div className={cx('separate')}></div>

        {user.infoVerify ? (
          <div className={cx('content-modal')}>
            <div className={cx('content-left')}>
              <div className={cx('container-input')}>
                <span className={cx('title')}>Họ tên</span>
                <input type="text" placeholder="Họ và Tên" value={user.infoVerify?.fullName} />
              </div>

              <div className={cx('container-input')}>
                <span className={cx('title')}>Số điện thoại</span>
                <input type="text" placeholder="Số điện thoại" value={user.infoVerify?.phoneNumber} />
              </div>

              <div className={cx('container-input')}>
                <span className={cx('title')}>Ngày sinh</span>
                <input type="text" value={convertDateFromString(user.infoVerify?.birthday)} />
              </div>

              <div className={cx('container-input')}>
                <span className={cx('title')}>Quê quán</span>
                <TextAreaAutoSize
                  className={cx('input-autosize')}
                  placeholder="Thông tin quê quán"
                  value={user.infoVerify?.detailAddress}
                />
              </div>
            </div>
            <div className={cx('content-right')}>
              <div className={cx('container-input')}>
                <span className={cx('title')}>Số CCCD/ID Card</span>
                <input type="text" placeholder="CCCD / ID Card" value={user.infoVerify?.identifyCode} />
              </div>

              <div className={cx('container-img')}>
                <span className={cx('title')}>Ảnh mặt trước căn cước công dân</span>
                <div className={cx('frame-img')}>
                  <img src={user.infoVerify?.identifyCardImage.url} alt="img" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx('not-verify')}>Người dùng chưa xác minh thông tin</div>
        )}

        <div className={cx('footer')}>
          <div>{user.infoVerify && <span>Số lần xác minh ({user.infoVerify?.times})</span>}</div>
          {user.infoVerify ? (
            <div className={cx('btn-confirm')} onClick={handleConfirmInfo}>
              XÁC NHẬN
            </div>
          ) : (
            <div className={cx('btn-confirm')} onClick={handleCloseModal}>
              ĐÓNG
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalVerifyAccount;
