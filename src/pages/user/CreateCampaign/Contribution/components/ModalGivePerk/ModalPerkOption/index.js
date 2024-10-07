import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalPerkOption.module.scss';
import PerkItem from '../PerkItem';
import { IoCloseSharp } from "react-icons/io5";

const cx = classNames.bind(styles);

function ModalPerkOption({ perk, setShowModalOption, handleAddPerk, isOpenModalUpdate, handleEditListSelected }) {
    console.log(perk)
    const [optionsSelectedItems, setOptionsSelectedItems] = useState(() => {
        let arrItemHasOption = perk.items.filter((itemA) => {
            return itemA.item.isHasOption && itemA.item.options.length > 0;
        });

        let result = arrItemHasOption.map((itemB) => {
            return {
                name: itemB.item.name,
                optionsSelected: itemB.item.options.map((i) => {
                    return {
                        name: i.name,
                        value: i.values[0]
                    };
                }),
            };
        });

        return result;
    });
    const handleChangeSelectOption = (e, nameItem) => {
        let nameOption = e.target.name;
        let value = e.target.value;
        setOptionsSelectedItems((prev) => {
            return [...prev].map((item) => {
                if (item.name === nameItem) {
                    return {
                        ...item,
                        optionsSelected: [...item.optionsSelected].map((itemOptionSelect) => {
                            if (itemOptionSelect.name === nameOption)
                            {
                                return {
                                    ...itemOptionSelect,
                                    value: value,
                                };
                            }
                                
                            else {
                                return itemOptionSelect;
                            }
                        }),
                    };
                } else {
                    return item;
                }
            });
        });
    };
    const handleOnclickAccept = () => {
        const newItem = {
            ...perk,
            items: [...perk.items].map((itemA) => {
                if (itemA.item.isHasOption && itemA.item.options.length > 0) {
                    return {
                        ...itemA,
                        optionsSelected: optionsSelectedItems.find((i) => {
                            return i.name === itemA.item.name;
                        }).optionsSelected,
                    };
                } else {
                    return itemA;
                }
            }),
        };
        handleAddPerk(newItem)
        // if (!isOpenModalUpdate) {
        //     handleSelectedItem(perk.index, newItem);
        //     setIsOpenModal(false);
        // } else {
        //     handleEditListSelected(perk.index, newItem);
        //     setIsOpenModal(false);
        // }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-body')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('container-1')}>
                    <span className={cx('title')}>THÔNG TIN ĐẶC QUYỀN</span>
                   
                </div>
                <div className={cx('container-2')}>
                    <div style={{ width: '50%' }}>
                        <PerkItem isShowButton={false} item={perk} />
                    </div>

                    <div style={{ width: '50%' }}>
                        <p style={{fontSize: '20px', margin: '24px'}}>Chọn vật phẩm</p>
                        {perk.items.map((itemA, indexA) => {
                            return (
                                <div className={cx('container-list-perk')} key={indexA}>
                                    <p style={{fontSize: '18px', fontWeight: '600'}}>{itemA.item.name}</p>
                                    {itemA.item.isHasOption &&
                                        itemA.item.options.length > 0 &&
                                        itemA.item.options.map((itemB, indexB) => {
                                            return (
                                                <div className={cx('container-options')} key={indexB}>
                                                    <span className={cx('name')}>{itemB.name + ': '}</span>
                                                    <select onChange={(e) => handleChangeSelectOption(e, itemA.item.name)} name={itemB.name} >
                                                        {itemB.values.map((itemC, indexC) => {
                                                            return (
                                                                <option value={itemC} key={indexC} >
                                                                    {itemC}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button type="button" className={cx('btn-continue')} onClick={handleOnclickAccept}>
                    Xác nhận
                </button>
                <span onClick={() => setShowModalOption(false)} className={cx('editFile-icon')}><IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} /></span>
            </div>
        </div>
    );
}

export default ModalPerkOption;
