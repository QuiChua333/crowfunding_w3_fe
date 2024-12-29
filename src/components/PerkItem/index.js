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
  cryptocurrencyMode,
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
      {item.isNFT && <span className={cx('nft')}>NFT</span>}
      <img src={item.image} alt="img" />
      <div className={cx('container-body')}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{item.name}</h2>
        <p className={cx('des')}>{`- ${item.description}`}</p>
        <div className="mt-2">
          <div>
            <span className="text-[18px] font-[600]">Trị giá:</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '2px' }}>
            <span>{`- ${formatMoney(item.price)} VNĐ`}</span>
            {cryptocurrencyMode && <span>{`- ${item.ethPrice} ETH`}</span>}
          </div>
        </div>

        {showMore && (
          <div>
            <div>
              <span className={cx('text-title')}>Bao gồm: </span>
              <ul className={cx('items')}>
                {item.detailPerks.map((itemA, indexA) => {
                  return <li key={indexA}>{`- ${item.quantity} ${itemA.item.name}`}</li>;
                })}
              </ul>
            </div>
            <p className={cx('text-title')}>Ngày giao dự kiến</p>
            <p className={cx('des')}>{`- ${convertDateFromString(item.estDeliveryDate)}`}</p>

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
