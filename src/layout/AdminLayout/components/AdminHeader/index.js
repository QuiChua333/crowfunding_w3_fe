import classNames from "classnames/bind";


import styles from './AdminHeader.module.scss'
const cx = classNames.bind(styles);

function AdminHeader({title}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('controlBar')}>
                <div className={cx('controlBar-container')}>
                    <div className={cx('controlBar-content')}>
                        Admin / {title}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;