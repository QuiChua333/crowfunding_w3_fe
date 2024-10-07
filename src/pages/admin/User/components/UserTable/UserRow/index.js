import React from 'react';

import classNames from 'classnames/bind';
import styles from './UserRow.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function UserRow({ index, user, handleStatusUser, handlVerifyUser }) {
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (docElement.current && !docElement.current.contains(event.target)) {
                setOpenDropDown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [docElement]);

    const handleStatus = () => {
        handleStatusUser(index);
    };
    const handlVerify = () => {
        handlVerifyUser(index);
    }

    return (
        <tr>
            {user.isAdmin === false && (
                <>
                    <td>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <img className={cx('avatar')} src={user.avatar.url} alt="avt" />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: '10px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <span style={{ fontSize: '14px' }}>{user.fullName}</span>
                                <span style={{ fontSize: '10px', fontStyle: 'italic' }}>{user.email}</span>
                            </div>
                        </div>
                    </td>
                    <td>{user.quantityCampaign} chiến dịch</td>
                    <td>{user.quantityContribute} lượt</td>
                    <td>
                        {user.isVerifiedUser ? (
                            <div className={cx('verify')}>Đã xác minh</div>
                        ) : (
                            <div className={cx('unverify')}>Chưa xác minh</div>
                        )}
                    </td>
                    <td>
                        {user.status ? (
                            <div className={cx('status-active')}>Đang hoạt động</div>
                        ) : (
                            <div className={cx('status-unactive')}>Đã bị khóa</div>
                        )}
                    </td>

                    <td className={cx('action')}>
                        <div
                            className={cx('action-doc')}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropDown((prev) => !prev);
                            }}
                            ref={docElement}
                        >
                            <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
                            <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
                                <DropDown user={user} handleStatus={handleStatus} handlVerify={handlVerify}/>
                            </div>
                        </div>
                    </td>
                </>
            )}
        </tr>
    );
}

export default UserRow;
