import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalOptionPerk.module.scss';
import PerkItem from '~/components/PerkItem';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ModalOptionPerk({ close, setIsOpenModal, perkInModal, itemPerk, cryptocurrencyMode }) {
  console.log('ModalOptionPerk');
  const navigate = useNavigate();
  const { id } = useParams();
  const [optionsSelectedItems, setOptionsSelectedItems] = useState(() => {
    let arrItemHasOption = itemPerk.detailPerks.filter((i) => {
      return i.item.isHasOption && i.item.options.length > 0;
    });

    let result = arrItemHasOption.map((itemA) => {
      return {
        name: itemA.item.name,
        quantity: itemA.quantity,
        optionsSelected: itemA.item.options.map((i) => {
          return {
            name: i.name,
            value: i.values[0],
          };
        }),
      };
    });

    return result;
  });
  useEffect(() => {
    console.log(optionsSelectedItems);
  }, [optionsSelectedItems]);
  const handleClickPayment = () => {
    const state = {
      perkSelected: {
        ...itemPerk,
        detailPerks: [...itemPerk.detailPerks].map((i) => {
          if (i.item.isHasOption && i.item.options.length > 0) {
            return {
              ...i,
              optionsSelected: optionsSelectedItems.find((j) => {
                return j.name === i.item.name;
              }),
            };
          } else {
            return i;
          }
        }),
      },
      cryptocurrencyMode,
    };
    navigate(`/project/${id}/perk/detail`, {
      state,
    });
  };

  const handleChangeSelectOption = (e, nameItem) => {
    let nameOption = e.target.name;
    let value = e.target.value;

    setOptionsSelectedItems((prev) => {
      return [...prev].map((item) => {
        if (item.name === nameItem) {
          return {
            ...item,
            optionsSelected: [...item.optionsSelected].map((itemOptionSelect) => {
              if (itemOptionSelect.name === nameOption) {
                return {
                  ...itemOptionSelect,
                  value: value,
                };
              } else {
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

  return (
    <div
      className={cx('wrapper')}
      onClick={() => {
        perkInModal && setIsOpenModal(true);
        close();
      }}
    >
      <div className={cx('container-body')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('container-body-1')}>
          <span className={cx('text-title')}>Quà của bạn</span>
          <span
            role="button"
            className={cx('btn-close')}
            onClick={() => {
              perkInModal && setIsOpenModal(true);
              close();
            }}
          >
            &times;
          </span>
        </div>
        <div className={cx('container-body-2')}>
          <div className={cx('container')}>
            <PerkItem isShowButton={false} item={itemPerk} cryptocurrencyMode={cryptocurrencyMode} />
          </div>

          <div className={cx('container')}>
            <p className={cx('text-title-topic')}>Chọn quà của bạn</p>
            {itemPerk.detailPerks.map((itemA, indexA) => {
              return (
                <div className={cx('container-content')} key={indexA}>
                  <p>{itemA.item.name}</p>
                  {itemA.item.isHasOption &&
                    itemA.item.options.length &&
                    itemA.item.options.map((itemB, indexB) => {
                      return (
                        <div className={cx('container-items')} key={indexB}>
                          <span className={cx('name-options')}>{itemB.name + ': '}</span>
                          <select
                            className={cx('options')}
                            onChange={(e) => handleChangeSelectOption(e, itemA.item.name)}
                            name={itemB.name}
                          >
                            {itemB.values.map((itemC, indexC) => {
                              return (
                                <option value={itemC} key={indexC}>
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

        <button type="button" className={cx('btn-continue')} onClick={handleClickPayment}>
          Đi đến thanh toán
        </button>
      </div>
    </div>
  );
}

export default ModalOptionPerk;
