
import classNames from "classnames/bind";

import styles from '../ItemTable.module.scss'
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles)
function ItemRow({ index, item }) {
    const navigate = useNavigate();
    console.log(item)
    const [options, setOptions] = useState(() => {
        const str = item.options?.map(i => {
            return (i.name + ' (' + i.values.join(', ') + ')')
        }).join(', ') || ''
        return str;
    });
    const handleClickItem = () => {
        navigate(`/campaigns/${item.campaign}/edit/items/${item._id}`)
    }

    return (

        <tr onClick={handleClickItem}>
            {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}

            <td className={cx('name')}>{item.name}</td>
            <td className={cx('option')}>{options} </td>
            <td className={cx('associated')}>{item.listAssociatedPerks.join(', ') || '—'} </td>

        </tr>

    );
}

export default ItemRow;