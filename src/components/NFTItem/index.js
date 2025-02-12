import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './NFTItem.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '~/utils';

const cx = classNames.bind(styles);

function NFTItem({ item, cryptocurrencyMode }) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const handleClickItem = () => {
    setShowMore((prev) => !prev);
  };
  const { id } = useParams();
  const handleClickPerk = () => {
    const state = {
      nftSelected: item,
      cryptocurrencyMode,
    };
    navigate(`/project/${id}/nft/detail`, {
      state,
    });
  };

  return (
    <div className={cx('container-item')} onClick={handleClickItem}>
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
          </div>
        </div>

        {showMore && (
          <div>
            <div>
              <span className={cx('text-title')}>Đặc điểm: </span>
              <ul className={cx('items')}>
                {/* {item.detailPerks.map((itemA, indexA) => {
                  return <li key={indexA}>{`- ${item.quantity} ${itemA.item.name}`}</li>;
                })} */}
                <li>{`- Màu sắc: ${item.color}`}</li>
                <li>{`- Chất liệu: ${item.materials}`}</li>
                <li>{`- Phong cách: ${item.styles}`}</li>
              </ul>
            </div>

            {item.supply !== item.claimed ? (
              <button type="button" className={cx('btn-getPerk')} onClick={handleClickPerk}>
                CHỌN NFT NÀY
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

export default NFTItem;
