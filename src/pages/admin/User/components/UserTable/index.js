import React from 'react'
import classNames from 'classnames/bind';
import styles from './UserTable.module.scss';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';
const cx = classNames.bind(styles)

function UserTable({allUsers, handleStatusUser, handlVerifyUser}) {

    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        setListUser(allUsers);
    }, [allUsers])

  return (
    <div className={cx('wrapper')}>
            <table>
                <thead>
                    <th>NGƯỜI DÙNG</th>
                    <th>SỐ LƯỢNG CHIẾN DỊCH</th>
                    <th>SỐ LƯỢT ĐÓNG GÓP</th>
                    <th>XÁC MINH</th>
                    <th>TRẠNG THÁI</th>
                    <th></th>
                </thead>
                <tbody>
                    {listUser?.map((item, index) => {
                        return <UserRow key={index} user={item} index={index} handleStatusUser={handleStatusUser} handlVerifyUser={handlVerifyUser}/>;
                    })}
                </tbody>
            </table>
        </div>
  )
}

export default UserTable