import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalVerifyAccount.module.scss';
import TextAreaAutoSize from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { convertDateFromString } from '~/utils';
import { useVerifyInfoUserMutation } from '~/hooks/api/mutations/admin/admin.user.mutation';
import { toast } from 'react-toastify';
import { useGetInfoVerifyUserByIdQuery, useGetInfoVerifyUserQuery } from '~/hooks/api/queries/user/user-verify.query';

const cx = classNames.bind(styles);

function ModalVerifyAccount({ setIsOpenModalVerify, userId, getAllUsers }) {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsOpenModalVerify(false);
  };
  const { data: infoVerify } = useGetInfoVerifyUserByIdQuery(userId);
  const verifyInfoUser = useVerifyInfoUserMutation();
  const handleConfirmInfo = async () => {
    dispatch(setLoading(true));
    verifyInfoUser.mutate(userId, {
      onSuccess: () => {
        getAllUsers();
        toast.success('Xác minh thông tin người dùng thành công');
      },
      onError: (error) => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        console.log(error.response.data.message);
      },
      onSettled: () => {
        dispatch(setLoading(false));
        setIsOpenModalVerify(false);
      },
    });
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

        {infoVerify ? (
          <div className={cx('content-modal')}>
            <div className={cx('content-left')}>
              <div className={cx('container-input')}>
                <span className={cx('title')}>Họ tên</span>
                <input type="text" placeholder="Họ và Tên" value={infoVerify?.fullName} />
              </div>

              <div className={cx('container-input')}>
                <span className={cx('title')}>Số điện thoại</span>
                <input type="text" placeholder="Số điện thoại" value={infoVerify?.phoneNumber} />
              </div>

              <div className={cx('container-input')}>
                <span className={cx('title')}>Ngày sinh</span>
                <input type="text" value={convertDateFromString(infoVerify?.bod)} />
              </div>

              <div className={cx('container-input')}>
                <span className={cx('title')}>Quê quán</span>
                <TextAreaAutoSize
                  className={cx('input-autosize')}
                  placeholder="Thông tin quê quán"
                  value={infoVerify?.address}
                />
              </div>
            </div>
            <div className={cx('content-right')}>
              <div className={cx('container-input')}>
                <span className={cx('title')}>Số CCCD/ID Card</span>
                <input type="text" placeholder="CCCD / ID Card" value={infoVerify?.identifyNumber} />
              </div>

              <div className={cx('container-img')}>
                <span className={cx('title')}>Ảnh mặt trước căn cước công dân</span>
                <div className={cx('frame-img')}>
                  <img src={infoVerify?.identifyCardImageFront} alt="img" />
                </div>
              </div>

              <div className={cx('container-img')}>
                <span className={cx('title')}>Ảnh mặt sau căn cước công dân</span>
                <div className={cx('frame-img')}>
                  <img src={infoVerify?.identifyCardImageBack} alt="img" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx('not-verify')}>Người dùng chưa xác minh thông tin</div>
        )}

        <div className={cx('footer')}>
          {infoVerify ? (
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
