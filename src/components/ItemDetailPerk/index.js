import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerk.module.scss';
import formatMoney from '~/utils/formatMoney';

const cx = classNames.bind(styles);

function ItemDetailPerk({ item, setPerkSelected, setIsOpenModal, index, setIsOpenModalUpdate }) {
    const handleClickItem = () => {
        setPerkSelected({ ...item, index });
        setIsOpenModalUpdate(false);
        setIsOpenModal(true);
    };
    return (
        <div onClick={handleClickItem}
            className={cx('itemPerk', { disabled: item.isSelected || item.quantity === item.claimed })}>
            <img src={item.image.url} alt="img"/>
            <div className={cx('content')}>
                <span className={cx('name')}>{item.title}</span>
                <span className={cx('price')}>{formatMoney(item.price)} VND</span>
                <span className={cx('quantity')}>
                    {item.claimed}/{item.quantity} <span style={{ fontWeight: '350' }}>đã được yêu cầu</span>
                </span>
                {item.quantity === item.claimed ? (
                    <span className={cx('text-error')}>Số lượng đã hết</span>
                ) : (
                    <button type="button" className={cx('btn-get')} onClick={handleClickItem}>
                        THÊM
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemDetailPerk;
