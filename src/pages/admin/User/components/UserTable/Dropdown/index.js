import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
const cx = classNames.bind(styles);

function DropDown({ user, handleStatus, handlVerify}) {

    return (
        <div>
            {user.isVerifiedUser && user.status && (
                <div className={cx('wrapper')}>
                    <div className={cx('action', 'action-delete')} onClick={handleStatus}>Khóa tài khoản</div>
                </div>
            )}

            {user.isVerifiedUser === false && user.status && (
                <div className={cx('wrapper')}>
                    <div className={cx('action')} onClick={handlVerify}>Xác minh tài khoản</div>
                    <div style={{ height: '1px', background: '#ccc' }}></div>
                    <div className={cx('action', 'action-delete')} onClick={handleStatus}>Khóa tài khoản</div>
                </div>
            )}

            {user.isVerifiedUser && user.status === false && (
                <div className={cx('wrapper')}>
                    <div className={cx('action', 'action-active')} onClick={handleStatus}>Kích hoạt lại</div>
                </div>
            )}

            {user.isVerifiedUser === false && user.status === false && (
                <div className={cx('wrapper')}>
                    <div className={cx('action')} onClick={handlVerify}>Xác minh tài khoản</div>
                    <div style={{ height: '1px', background: '#ccc' }}></div>
                    <div className={cx('action', 'action-active')} onClick={handleStatus}>Kích hoạt lại</div>
                </div>
            )}
        </div>
    );
}

export default DropDown;
