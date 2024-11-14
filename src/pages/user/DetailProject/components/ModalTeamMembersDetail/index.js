import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalTeamMembersDetail.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useGetTeamMemberByCampaignId } from '~/hooks/api/queries/user/team.query';
import { defaultAvt } from '~/assets/images';

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
            if (item.confirmStatus === 'Đã xác nhận' || item.isOwner === true) {
              return (
                <div className={cx('item-members')}>
                  <div className={cx('info-members')}>
                    <img src={item.avatar || defaultAvt} alt="avt" />
                    <div className={cx('info')}>
                      <Link to={`/individuals/${item.userId}/profile`} className={cx('name')}>
                        {item.name}
                      </Link>
                      <Link to={`mailto:${item.email}`} className={cx('email')}>
                        {item.email}
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
