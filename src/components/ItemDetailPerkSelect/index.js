import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { HiOutlineMinusSm } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerkSelect.module.scss';
import formatMoney from '~/utils/formatMoney';

const cx = classNames.bind(styles);

function ItemDetailPerkSelect({
    setIsOpenModal,
    item,
    setPerkSelected,
    index,
    handleClickRemoveItem,
    handleChangeQuantityOrder,
    setIsOpenModalUpdate
}) {
    const [options, setOptions] = useState([]);
    const handleClickEdit = () => {
        setPerkSelected({ ...item, index });
        setIsOpenModalUpdate(true)
        setIsOpenModal(true);
    };
    const handleClickSub = () => {
        if (item.quantityOrder > 1) {
            handleChangeQuantityOrder('sub', index);
        }
    };
    const handleClickAdd = () => {
        if (item.quantityOrder < item.quantity - item.claimed) {
            handleChangeQuantityOrder('add', index);
        }
    };
    useEffect(() => {
        setOptions((prev) => {
            const res = item.items.reduce((acc, cur) => {
                if (cur.optionsSelected && cur.optionsSelected.length > 0) {
                    return (

                        [...acc, {
                            name: cur.item.name,
                            optionsString: cur.optionsSelected.map(i => i.value).join('/')
                        }]
                    )
                } else {
                    return [...acc, {
                        name: cur.item.name,
                        optionsString: ''
                    }]
                }
            }, []);
            return [...res];
        });
    }, [item]);
    // useEffect(() => {
    //     console.log(options)
    // },[options])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-body')}>
                <div className={cx('container-1')}>
                    <img src={item.image.url} alt="img" />
                    <div className={cx('content')}>
                        <span className={cx('title')}>{item.title}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                            {
                                options?.map((option, index) => {
                                    return <span key={index}>{option.name}{option.optionsString && ':'} {option.optionsString}</span>
                                })
                            }
                        </div>
                        <div className={cx('container-item')}>
                            <HiOutlineMinusSm
                                className={cx('btn-quantity')}
                                style={{ cursor: 'pointer' }}
                                onClick={handleClickSub}
                            />
                            <span className={cx('quantityOder')}>{item.quantityOrder}</span>
                            <BiPlus
                                className={cx('btn-quantity')}
                                style={{ cursor: 'pointer' }}
                                onClick={handleClickAdd}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('container-2')}>
                    <div>
                        <span className={cx('btn-edit')} onClick={handleClickEdit}>
                            Edit
                        </span>
                        <span className={cx('btn-remove')} onClick={() => handleClickRemoveItem(index)}>
                            Remove
                        </span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span className={cx('money')}>{formatMoney(item.price)}</span>
                        <span>VND</span>
                    </div>
                </div>
            </div>
            {item.quantityOrder === item.quantity - item.claimed && (
                <span className={cx('text-error')}>
                    ! Số lượng tối đa còn lại có thể chọn là: {item.quantity - item.claimed}
                </span>
            )}
        </div>
    );
}

export default ItemDetailPerkSelect;
