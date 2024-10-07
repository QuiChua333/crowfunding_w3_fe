import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemPerk.module.scss';
import formatMoney from '~/utils/formatMoney';

const cx = classNames.bind(styles);

function ItemPerk({ item, handleClickItem }) {

    return (
        <div
            className={cx('itemPerk', { disabled: item.isSelected })}>
            {
                item.isFeatured &&
                <span className={cx('featured')}>
                    NỔI BẬT
                </span>
            }
            <img src={item.image?.url} alt="img" />
            <div className={cx('content')}>
                <span className={cx('name')}>{item.title}</span>
                <span className={cx('price')}>{formatMoney(item.price)}VNĐ</span>
                <span className={cx('quantity')}>
                    {item.claimed}/{item.quantity} <span style={{ fontWeight: '350' }}>đã được yêu cầu</span>
                </span>
                {item.quantity === item.claimed ? (
                    <span className={cx('text-error')}>Số lượng đã hết</span>
                ) : (
                    <button onClick={() => handleClickItem(item)} type="button" className={cx('btn-get')} >
                        THÊM
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemPerk;
