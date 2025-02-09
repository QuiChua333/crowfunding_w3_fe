import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailPerk.module.scss';
import ItemDetailPerk from '~/components/ItemDetailPerk';
import ItemDetailPerkSelect from '~/components/ItemDetailPerkSelect';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ModalDetailPerk from './components/ModalDetailPerk';
import formatMoney from '~/utils/formatMoney';
import { useDispatch } from 'react-redux';
import { setPayment } from '~/redux/slides/Payment';
import { useGetPerksHasListItemsByCampaignIdQuery } from '~/hooks/api/queries/user/perk.query';
const cx = classNames.bind(styles);

function DetailPerk() {
  const { id } = useParams();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const itemPerkSelectedFirst = location.state.perkSelected;
  console.log({ itemPerkSelectedFirst });
  const cryptocurrencyMode = location.state.cryptocurrencyMode;
  const [quantityContribute, setQuantityContribute] = useState(0);
  const [listSelected, setListSelected] = useState([]);
  const [listPerkByCampaignId, setListPerkByCampaignId] = useState([]);
  const [perkSelected, setPerkSelected] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetPerksHasListItemsByCampaignIdQuery(id);
  useEffect(() => {
    if (data) {
      let newData = data.map((perk) => {
        return {
          ...perk,
          detailPerks: perk.detailPerks?.map((item) => ({
            ...item,
            item: {
              ...item.item,
              ...(item.item.isHasOption
                ? {
                    options: item.item.options.map((option) => ({
                      ...option,
                      values: option.values?.split('|') ?? [],
                    })),
                  }
                : {}),
            },
          })),
        };
      });
      console.log({ newData });
      let arr = newData.map((item) => {
        if (item.id === itemPerkSelectedFirst.id) {
          return {
            ...item,
            isSelected: true,
            detailPerks: item.detailPerks?.map((itemInclude) => {
              if (itemInclude.item.isHasOption && itemInclude.item.options.length > 0) {
                const optionSelected = itemPerkSelectedFirst.detailPerks.find(
                  (x) => x.item.name === itemInclude.item.name,
                ).optionsSelected.optionsSelected;
                return {
                  ...itemInclude,
                  optionsSelected: optionSelected,
                };
              } else {
                return itemInclude;
              }
            }),
          };
        } else {
          return {
            ...item,
            isSelected: false,
            detailPerks: item.detailPerks?.map((itemInclude) => {
              if (itemInclude.item.isHasOption && itemInclude.item.options.length > 0) {
                return {
                  ...itemInclude,
                  optionsSelected: itemInclude.item.options.map((i) => {
                    return {
                      name: i.name,
                      value: i.values[0],
                    };
                  }),
                };
              } else {
                return itemInclude;
              }
            }),
          };
        }
      });

      // if (cryptocurrencyMode) {
      //   setListPerkByCampaignId(arr);
      // } else {
      //   setListPerkByCampaignId(arr.filter((perk) => !perk.isNFT));
      // }
      setListPerkByCampaignId(arr);
    }
  }, [data]);

  const handleSelectedItem = (index, newItem) => {
    setListPerkByCampaignId((prev) => {
      const next = [...prev].map((item, index2) => {
        if (index2 === index) {
          return { ...item, isSelected: true };
        } else return item;
      });
      return next;
    });
    addItemIntoListSelected({ ...newItem }, index);
  };

  useEffect(() => {
    for (let i = 0; i < listPerkByCampaignId.length; i++) {
      if (listPerkByCampaignId[i].isSelected === true) {
        addItemIntoListSelected(listPerkByCampaignId[i], i);
      }
    }
  }, [listPerkByCampaignId.length]);

  useEffect(() => {
    setQuantityContribute((prev) => {
      const res = listSelected.reduce((acc, cur) => {
        return acc + cur.quantityOrder;
      }, 0);
      return res;
    });
  }, [listSelected]);

  const addItemIntoListSelected = (item, index) => {
    setListSelected((prev) => {
      return [
        ...prev,
        {
          ...item,
          oldIndex: index,
          quantityOrder: 1,
        },
      ];
    });
  };

  const handleEditListSelected = (index, newItem) => {
    setListSelected((prev) => {
      return [...prev].map((item2, index2) => {
        if (index2 === index) {
          return {
            ...newItem,
          };
        } else {
          return item2;
        }
      });
    });
  };
  const handleChangeQuantityOrder = (type, index) => {
    setListSelected((prev) => {
      return [...prev].map((item2, index2) => {
        if (index2 === index) {
          return {
            ...item2,
            quantityOrder: type === 'sub' ? item2.quantityOrder - 1 : item2.quantityOrder + 1,
          };
        } else {
          return item2;
        }
      });
    });
  };
  const handleClickPayment = () => {
    const listPayment = listSelected.map((item) => {
      return {
        id: item.id,
        shippingFees: item.shippingFees || [],
        image: item.image,
        name: item.name,
        quantity: item.quantityOrder,
        ethPrice: item.ethPrice,
        price: item.price,
        isNFT: item.isNFT,
        options: item.detailPerks.reduce((acc, cur) => {
          if (cur.optionsSelected && cur.optionsSelected.length > 0) {
            return [
              ...acc,
              {
                name: cur.item.name,
                quantity: cur.quantity,
                optionsString: cur.optionsSelected.map((i) => i.value).join('|'),
              },
            ];
          } else {
            return [
              ...acc,
              {
                name: cur.item.name,
                quantity: cur.quantity,
                optionsString: '',
              },
            ];
          }
        }, []),
      };
    });
    let estDeliveryDate = null;
    listSelected.forEach((item) => {
      if (!estDeliveryDate) {
        estDeliveryDate = item.estDeliveryDate;
      }
      estDeliveryDate = item.estDeliveryDate > estDeliveryDate ? item.estDeliveryDate : estDeliveryDate;
    });
    dispatch(
      setPayment({
        total: total,
        listPerkPayment: listPayment,
      }),
    );
    const state = {
      total: total,
      totalETH,
      listPerkPayment: listPayment,
      estDeliveryDate,
      cryptocurrencyMode,
    };
    navigate(`/project/${id}/payments/new/checkout`, {
      state: {
        res: state,
        hasPerk: true,
      },
    });
  };
  const handleClickRemoveItem = (index) => {
    for (let i = 0; i < listPerkByCampaignId.length; i++) {
      if (listPerkByCampaignId[i].id === listSelected[index].id) {
        listPerkByCampaignId[i].isSelected = false;
      }
    }
    setListSelected((prev) => {
      let res = [...prev];
      res.splice(index, 1);
      return res;
    });
  };

  const [total, setTotal] = useState(0);
  const [totalETH, setTotalETH] = useState(0);
  useEffect(() => {
    setTotal(() => {
      const res = listSelected.reduce((acc, cur) => {
        return acc + cur.quantityOrder * cur.price;
      }, 0);
      return res;
    });

    setTotalETH(() => {
      const res = listSelected.reduce((acc, cur) => {
        return acc + cur.quantityOrder * Number(cur.ethPrice * 1000000);
      }, 0);
      return res / 1000000;
    });
  }, [listSelected]);

  return (
    <div className={cx('disableSelect', 'wrapper')}>
      <p className={cx('title-website')}>GIVE-FUN</p>
      <div className={cx('container-body')}>
        <div className={cx('container-body-1')}>
          <p className={cx('title')}>Danh sách quà tặng có thể thêm</p>
          <div className={cx('custom-scroll')}>
            {listPerkByCampaignId.map((item, index) => {
              return (
                <ItemDetailPerk
                  index={index}
                  key={index}
                  item={item}
                  setPerkSelected={setPerkSelected}
                  setIsOpenModal={setIsOpenModal}
                  setIsOpenModalUpdate={setIsOpenModalUpdate}
                  cryptocurrencyMode={cryptocurrencyMode}
                />
              );
            })}
          </div>
        </div>

        <div className={cx('container-body-2')}>
          <div className={cx('container-1')}>
            <span className={cx('title')}>
              Đóng góp của bạn
              <span className={cx('value')}>
                (<span>{quantityContribute}</span> đặc quyền)
              </span>
            </span>
            <div className={cx('custom-scroll-2')}>
              {listSelected.map((item, index) => {
                return (
                  <ItemDetailPerkSelect
                    setPerkSelected={setPerkSelected}
                    item={item}
                    key={index}
                    index={index}
                    setIsOpenModalUpdate={setIsOpenModalUpdate}
                    setIsOpenModal={setIsOpenModal}
                    handleChangeQuantityOrder={handleChangeQuantityOrder}
                    handleClickRemoveItem={handleClickRemoveItem}
                    cryptocurrencyMode={cryptocurrencyMode}
                  />
                );
              })}
            </div>
          </div>

          <div className={cx('container-2')}>
            <div className={cx('container-total')}>
              <span>Tổng tiền: </span>
              <b>{formatMoney(total)} VND</b>
            </div>
            <div className="flex items-center justify-end">
              {cryptocurrencyMode && (
                <>
                  <span className="font-[600] mr-1">{`${totalETH}`} </span>
                  <span>{'ETH'}</span>
                </>
              )}
            </div>

            <div className={cx('separate')}></div>

            <button onClick={handleClickPayment} className={cx('btn-checkout')} type="button">
              TIẾP TỤC THANH TOÁN
            </button>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <ModalDetailPerk
          handleEditListSelected={handleEditListSelected}
          isOpenModalUpdate={isOpenModalUpdate}
          handleSelectedItem={handleSelectedItem}
          itemPerk={perkSelected}
          setIsOpenModal={setIsOpenModal}
          cryptocurrencyMode={cryptocurrencyMode}
        />
      )}
    </div>
  );
}

export default DetailPerk;
