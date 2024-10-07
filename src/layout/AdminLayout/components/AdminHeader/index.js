import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";


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