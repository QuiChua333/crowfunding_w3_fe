
import classNames from "classnames/bind";

import styles from '../ContributionTable.module.scss'
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import DropDown from "../Dropdown";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
function ContributionRow({ index, contribution, setChecked, getAllContributions, openDetailContribution }) {
    
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null)
    const navigate = useNavigate();
    const handleClickChecked = (e, index) => {
        e.stopPropagation()
        setChecked(index, !contribution.isChecked)
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

        <tr onClick={() => openDetailContribution(index)}>
            {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}
            <td className={cx('user')}>{contribution.userName}</td>
            <td className={cx('email')}>{contribution.email}</td>
            {/* <td className={cx('perks')}>{contribution.perks.map(i => i.perkTitle).join(', ')}</td> */}
            <td className={cx('money')}>{contribution.money}</td>
            <td className={cx('date')}>{contribution.date}</td>
            <td className={cx('date')}>{contribution.estDelivery}</td>
            <td className={cx('status')}>
                <span className={cx('campaign-status')}>
                    {contribution.status}
                </span>
            </td>
 
           
        </tr>

    );
}

export default ContributionRow;