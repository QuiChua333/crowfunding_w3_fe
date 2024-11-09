import classNames from 'classnames/bind';

import styles from '../ItemTable.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function ItemRow({ index, item }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const options =
    item.options?.length > 0
      ? item.options
          ?.map((i) => {
            const name = i.name;
            const values = `(${i.values.replaceAll('|', ', ')})`;
            return `${name} ${values}`;
          })
          .join(', ')
      : '';
  const containPerks =
    item.detailPerks?.length > 0
      ? item.detailPerks
          .map((i) => {
            return i.perk.name;
          })
          .join(', ')
      : '-';

  const handleClickItem = () => {
    navigate(`/campaigns/${id}/edit/items/${item.id}`);
  };

  return (
    <tr onClick={handleClickItem}>
      {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}

      <td className={cx('name')}>{item.name}</td>
      <td className={cx('option')}>{options} </td>
      <td className={cx('associated')}>{containPerks} </td>
    </tr>
  );
}

export default ItemRow;
