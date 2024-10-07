import classNames from 'classnames/bind';

import styles from './ComplaintTable.module.scss';
import ComplaintRow from './ComplaintRow';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ComplaintTable({reports, handleViewReport}) {

    const [listReports, setListReports] = useState([]);
    useEffect(() => {
        setListReports(reports);
    },[reports])

    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <th>CHIẾN DỊCH</th>
                    <th>TIÊU ĐỀ</th>
                    <th>NGƯỜI GỬI</th>
                    <th>NGÀY</th>
                    <th>TRẠNG THÁI</th>
                    <th></th>
                </thead>
                <tbody>
                    {listReports?.map((item, index) => {
                        return <ComplaintRow key={index} report={item} index={index} handleViewReport={handleViewReport}/>;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ComplaintTable;
