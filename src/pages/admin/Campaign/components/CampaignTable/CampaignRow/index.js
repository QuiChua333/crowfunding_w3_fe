
import classNames from "classnames/bind";

import styles from '../CampaignTable.module.scss'
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import DropDown from "../Dropdown";
import { useRef, useState, useEffect } from "react";
import formatMoney from "~/utils/formatMoney";


const cx = classNames.bind(styles)
function CampaignRow({ index, campaign, setChecked, getAllCampaigns }) {
    
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null)
    const handleClickChecked = (e, index) => {
        e.stopPropagation()
        setChecked(index, !campaign.isChecked)
    }
    const handleClickRow = () => {
        window.location.href = `/campaigns/${campaign.id}/edit/basic`
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (docElement.current && !docElement.current.contains(event.target)) {
                setOpenDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [docElement]);


    return (

        <tr onClick={handleClickRow}>
            {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}
       
            <td className={cx('title')}>{campaign.title}</td>
            <td className={cx('goal')}>{campaign.goal}</td>
            <td className={cx('status')}>
                <span className={cx('campaign-status', {
                    choXacNhan: campaign.status === 'Chờ xác nhận',
                    dangGayQuy: campaign.status === 'Đang gây quỹ',
                    dangTamNgung: campaign.status === 'Đang tạm ngưng' || campaign.status === 'Đã kết thúc'
                })}>
                    {campaign.status}
                </span>
            </td>

            <td className={cx('endDate')}>{campaign.endDate}</td>
            <td className={cx('startDate')}>{campaign.currentMoney}</td>
            <td className={cx('owner')}>{campaign.ownerName}</td>
            <td className={cx('action')}>
                <div className={cx('action-doc')} onClick={(e) => { e.stopPropagation(); setOpenDropDown(prev => !prev) }} ref={docElement}>
                    <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
                    <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
                        <DropDown campaign={campaign} getAllCampaigns={getAllCampaigns} />
                    </div>
                </div>
            </td>
        </tr>

    );
}

export default CampaignRow;