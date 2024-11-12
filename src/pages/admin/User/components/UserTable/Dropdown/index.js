import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
const cx = classNames.bind(styles);

function DropDown({ user, handleStatus, handlVerify }) {
  return (
    <div>
      <div className={cx('wrapper')}>
        {user.verifyStatus === 'Chờ xác thực' && (
          <div className={cx('action')} onClick={handlVerify}>
            Xác minh tài khoản
          </div>
        )}
        {user.userStatus === 'Tạm khóa' && (
          <div className={cx('action', 'action-active')} onClick={handleStatus}>
            Kích hoạt lại
          </div>
        )}
        {user.userStatus === 'Đang hoạt động' && (
          <>
            <div className={cx('action', 'action-delete')} onClick={handleStatus}>
              Khóa tài khoản
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DropDown;
