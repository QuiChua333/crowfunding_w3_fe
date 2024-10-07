
import classNames from "classnames/bind";

import styles from '../GiftTable.module.scss'

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
function GiftRow({ index, gift, getAllContributions, openDetailGift }) {
    

    const navigate = useNavigate();



  

    return (

        <tr onClick={() => openDetailGift(index)}>
            {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}
            <td className={cx('email')}>{gift.email}</td>
            <td className={cx('perks')}>{gift.perks.map(i => i.perkTitle).join(', ')}</td>
            <td className={cx('date')}>{gift.date}</td>
            <td className={cx('status')}>
                <span className={cx('campaign-status')}>
                    {gift.status}
                </span>
            </td>
 
           
        </tr>

    );
}

export default GiftRow;