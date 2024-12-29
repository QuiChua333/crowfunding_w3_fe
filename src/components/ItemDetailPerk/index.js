import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerk.module.scss';
import formatMoney from '~/utils/formatMoney';

const cx = classNames.bind(styles);

function ItemDetailPerk({ item, setPerkSelected, setIsOpenModal, index, setIsOpenModalUpdate, cryptocurrencyMode }) {
  console.log(cryptocurrencyMode);
  const handleClickItem = () => {
    setPerkSelected({ ...item, index });
    setIsOpenModalUpdate(false);
    setIsOpenModal(true);
  };
  return (
    <div
      onClick={handleClickItem}
      className={cx('itemPerk', { disabled: item.isSelected || item.quantity === item.claimed })}
    >
      {item.isFeatured && <span className={cx('featured')}>NỔI BẬT</span>}
      {item.isNFT && <span className={cx('nft')}>NFT</span>}
      <div>
        <img src={item.image} alt="img" />
        <div className={cx('content')}>
          <span className={cx('name')}>{item.name}</span>
          <span className={cx('price')}>{`- ${formatMoney(item.price)}`} VND</span>
          {cryptocurrencyMode && <span>{`- ${item.ethPrice} ETH`}</span>}
          <span className={cx('quantity')}>
            {item.claimed}/{item.quantity} <span style={{ fontWeight: '350' }}>đã được yêu cầu</span>
          </span>
        </div>
      </div>
      {item.quantity === item.claimed ? (
        <span className={cx('text-error')}>Số lượng đã hết</span>
      ) : (
        <button type="button" className={cx('btn-get')} onClick={handleClickItem}>
          THÊM
        </button>
      )}
    </div>
  );
}

export default ItemDetailPerk;
