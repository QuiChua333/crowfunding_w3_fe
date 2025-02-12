import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ItemDetailNFT.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '~/utils';

const cx = classNames.bind(styles);

function ItemDetailNFT({ item, index, cryptocurrencyMode, setNFTSelected, handleSelectedItem }) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const handleClickItem = () => {
    setShowMore((prev) => !prev);
  };
  const { id } = useParams();
  const handleClickNFT = (e) => {
    e.stopPropagation();
    if (item.isSelected || item.supply === item.claimed) return;
    handleSelectedItem(index, item);
  };

  return (
    <div
      className={cx('container-item', { disabled: item.isSelected || item.supply === item.claimed })}
      onClick={handleClickItem}
    >
      <span className={cx('nft')}>NFT</span>
      <img src={item.image} alt="img" />
      <div className={cx('container-body')}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{item.name}</h2>
        <p
          className={cx('des', {
            showMore,
          })}
        >{`- ${item.description}`}</p>
        <div className="mt-2">
          <div>
            <span className="text-[18px] font-[600]">Trị giá:</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '2px' }}>
            <span>{`- ${formatMoney(item.price)} VNĐ`}</span>
            {cryptocurrencyMode && <span>{`- ${item.ethPrice} ETH`}</span>}
            <span className={cx('quantity')}>
              {item.claimed}/{item.supply} <span style={{ fontWeight: '350' }}>đã được yêu cầu</span>
            </span>
          </div>
        </div>
        {!showMore && (
          <button type="button" className={cx('btn-getPerk')} onClick={(e) => handleClickNFT(e)}>
            THÊM
          </button>
        )}
        {showMore && (
          <div>
            <div>
              <span className={cx('text-title')}>Đặc điểm: </span>
              <ul className={cx('items')}>
                <li>{`- Màu sắc: ${item.color}`}</li>
                <li>{`- Chất liệu: ${item.materials}`}</li>
                <li>{`- Phong cách: ${item.styles}`}</li>
              </ul>
            </div>
            {item.supply !== item.claimed ? (
              <button type="button" className={cx('btn-getPerk')} onClick={(e) => handleClickNFT(e)}>
                THÊM
              </button>
            ) : (
              <span className={cx('text-error')} style={{ marginTop: '8px' }}>
                Số lượng đã hết
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetailNFT;
