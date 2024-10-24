import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalTeamMembersDetail.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ModalTeamMembersDetail({ setIsOpenModalMember, members }) {
  const handleClose = () => {
    setIsOpenModalMember(false);
  };
  return (
    <div onClick={handleClose} className={cx('wrapper')}>
      <div onClick={(e) => e.stopPropagation()} className={cx('modal')}>
        <div className={cx('header-modal')}>
          <span className={cx('title')}>Thành viên của chiến dịch</span>
          <span onClick={handleClose} className={cx('close')}>
            &times;
          </span>
        </div>

        <div className={cx('separate')}></div>
        <div className={cx('content-modal')}>
          {members?.map((item) => {
            if (item.isAccepted || item.isOwner === true) {
              return (
                <div className={cx('item-members')}>
                  <div className={cx('info-members')}>
                    <img src={item.user.avatar.url} alt="avt" />
                    <div className={cx('info')}>
                      <Link to={`/individuals/${item.user._id}/profile`} className={cx('name')}>
                        {item.user.fullName}
                      </Link>
                      <Link to={`mailto:${item.user?.email}`} className={cx('email')}>
                        {item.user.email}
                      </Link>
                    </div>
                  </div>
                  <div className={cx('role')}>
                    <span>VAI TRÒ: </span>
                    {item.isOwner ? (
                      <div className={cx('owner')}>chủ sở hữu</div>
                    ) : (
                      <div className={cx('member')}>thành viên</div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className={cx('footer-modal')}>
          <div onClick={handleClose} className={cx('button-close')}>
            ĐÓNG
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTeamMembersDetail;
