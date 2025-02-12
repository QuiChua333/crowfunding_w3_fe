import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { HiOutlineMinusSm } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerkSelect.module.scss';
import formatMoney from '~/utils/formatMoney';

const cx = classNames.bind(styles);

function ItemDetailNFTSelect({ item, index, handleClickRemoveItem, handleChangeQuantityOrder, cryptocurrencyMode }) {
  const [options, setOptions] = useState([]);

  const handleClickSub = () => {
    if (item.quantityOrder > 1) {
      handleChangeQuantityOrder('sub', index);
    }
  };
  const handleClickAdd = () => {
    if (item.quantityOrder < item.supply - item.claimed) {
      handleChangeQuantityOrder('add', index);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-body')}>
        <div className={cx('container-1')}>
          <div>
            <div className="flex items-center gap-2">
              <div className={cx('nft')} style={{ fontSize: '12px' }}>
                NFT
              </div>
              <span>{item.name}</span>
            </div>
            <img src={item.image} alt="img" />
          </div>
          <div className={cx('content')}>
            <span className={cx('title')}>{item.title}</span>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
              <span>Màu sắc: {item.color}</span>
              <span>Chất liệu: {item.materials}</span>
              <span>Phong cách: {item.styles}</span>
            </div>
            <div className={cx('container-item')}>
              <HiOutlineMinusSm className={cx('btn-quantity')} style={{ cursor: 'pointer' }} onClick={handleClickSub} />
              <span className={cx('quantityOder')}>{item.quantityOrder}</span>
              <BiPlus className={cx('btn-quantity')} style={{ cursor: 'pointer' }} onClick={handleClickAdd} />
            </div>
          </div>
        </div>

        <div className={cx('container-2')}>
          <div>
            <span className={cx('btn-remove')} onClick={() => handleClickRemoveItem(index)}>
              Xóa
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={cx('money')}>{formatMoney(item.price)}</span>
            <span>VND</span>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <>
            <span className="font-[600] mr-1">{`${item.ethPrice}`} </span>
            <span>{'ETH'}</span>
          </>
        </div>
      </div>
      {item.quantityOrder === item.supply - item.claimed && (
        <span className={cx('text-error')}>! Số lượng tối đa còn lại có thể chọn là: {item.supply - item.claimed}</span>
      )}
    </div>
  );
}

export default ItemDetailNFTSelect;
