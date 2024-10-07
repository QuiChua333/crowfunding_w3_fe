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
    if (item.items.some((i) => i.item.options && i.item.options.length > 0)) {
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
    <div className={cx('wrapper')} onClick={handleClickItem}>
      <img src={item.image.url} alt="img" />
      <div className={cx('container-body')}>
        <h2 style={{ fontSize: '20px' }}>{item.title}</h2>
        <b className={cx('price')}>{formatMoney(item.price)}VNĐ</b>
        <p className={cx('des')}>{item.description}</p>

        {showMore && (
          <div>
            <p>
              <b className={cx('text-title')}>Bao gồm: </b>
              <ul className={cx('items')}>
                {item.items.map((itemA, indexA) => {
                  return <li key={indexA}>{itemA.item.name}</li>;
                })}
              </ul>
            </p>
            <p className={cx('text-title')}>Ngày giao dự kiến</p>
            <p className={cx('des')}>{convertDateFromString(item.estDelivery)}</p>
            <p className={cx('des')}>Giao toàn lành thổ.</p>

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
