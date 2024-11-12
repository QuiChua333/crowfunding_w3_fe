import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './PerkItem.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function PerkItem({
  isPage,
  isShowButton = true,
  setIsOpenModalOption,
  closePerkModal,
  isInModal,
  setPerkInModal,
  item,
  index,
  setItemPerkSelected,
}) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(!isPage);
  const handleClickItem = () => {
    if (isPage) {
      setShowMore(true);
    }
  };
  const { id } = useParams();
  const handleClickPerk = () => {
    closePerkModal();

    if (!isInModal) {
      setPerkInModal(false);
    }
    if (item.detailPerks.some((i) => i.item.options && i.item.options.length > 0)) {
      setItemPerkSelected(item);
      setIsOpenModalOption(true);
    } else {
      // chưa xử lý
      navigate(`/project/${id}/perk/detail`, {
        state: item,
      });
    }
  };

  return (
    <div className={cx('container-item')} onClick={handleClickItem}>
      {item.isFeatured && <span className={cx('featured')}>NỔI BẬT</span>}
      <img src={item.image} alt="img" />
      <div className={cx('container-body')}>
        <h2 style={{ fontSize: '24px' }}>{item.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <b className={cx('price')}>{formatMoney(item.price)}</b>
          <span style={{ fontWeight: '50', color: '#7D7D7D', fontSize: '22px' }}>VND</span>
        </div>
        <p className={cx('des')}>{item.description}</p>

        {showMore && (
          <div>
            <p>
              <b className={cx('text-title')}>Bao gồm: </b>
              <ul className={cx('items')}>
                {item.detailPerks.map((itemA, indexA) => {
                  return <li key={indexA}>{`${item.quantity} ${itemA.item.name}`}</li>;
                })}
              </ul>
            </p>
            <p className={cx('text-title')}>Ngày giao dự kiến</p>
            <p className={cx('des')}>{convertDateFromString(item.estDeliveryDate)}</p>
            <p className={cx('des')}>Giao toàn quốc.</p>

            {isShowButton &&
              (item.quantity !== item.claimed ? (
                <button type="button" className={cx('btn-getPerk')} onClick={handleClickPerk}>
                  CHỌN QUÀ NÀY
                </button>
              ) : (
                <span className={cx('text-error')}>Số lượng đã hết</span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PerkItem;
