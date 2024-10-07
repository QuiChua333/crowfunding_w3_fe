
import classNames from "classnames/bind";

import styles from '../TopContributionTable.module.scss'
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import DropDown from "../Dropdown";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import formatMoney from "~/utils/formatMoney";


const cx = classNames.bind(styles)
function TopContributionRow({ index, userContribution, setShowModalGivePerk, setUserContributionGivePerk, isEditComponent  }) {
    
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null)
    const navigate = useNavigate();



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
    const handleSetUserContributionGivePerk = () => {
        setUserContributionGivePerk(userContribution)
    }

    return (

        <tr>
            {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}
            <td className={cx('top')}>{index+1}</td>
            <td className={cx('email')}>{userContribution.user?.email}</td>
            <td className={cx('num')}>{userContribution.totalCount}</td>
            <td className={cx('total')}>{formatMoney(userContribution.totalMoney)} VNĐ</td>
            <td className={cx('action')}>
                <div className={cx('action-doc')} onClick={(e) => { e.stopPropagation(); setOpenDropDown(prev => !prev) }} ref={docElement}>
                    <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
                    <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block', pointerEvents: !isEditComponent && 'none'  }}>
                        <DropDown setShowModalGivePerk={setShowModalGivePerk} setUserContributionGivePerk={handleSetUserContributionGivePerk}/>
                    </div>
                </div>
            </td>
           
        </tr>

    );
}

export default TopContributionRow;