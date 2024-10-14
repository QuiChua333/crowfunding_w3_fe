import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailPerk.module.scss';
import ItemDetailPerk from '~/components/ItemDetailPerk';
import ItemDetailPerkSelect from '~/components/ItemDetailPerkSelect';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ModalDetailPerk from './components/ModalDetailPerk';
import formatMoney from '~/utils/formatMoney';
import baseUrl from '../../../utils/baseURL';
import { useDispatch } from 'react-redux';
import { setPayment } from '~/redux/slides/Payment';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);

function DetailPerk() {
  const { id } = useParams();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const itemPerkSelectedFirst = location.state;
  const [quantityContribute, setQuantityContribute] = useState(0);
  const [listSelected, setListSelected] = useState([]);
  const [listPerkByCampaignId, setListPerkByCampaignId] = useState([]);
  const [perkSelected, setPerkSelected] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getListPerksByCampaignId = async () => {
    try {
      const config = {};
      const { data } = await CustomAxios.get(`${baseUrl}/perk/getPerksHasListItemsByCampaignId/${id}`, config);
      setListPerkByCampaignId([...data.data]);
      let arr = [...data.data].map((item) => {
        if (item._id === itemPerkSelectedFirst._id) {
          return {
            ...item,
            isSelected: true,
            items: item.items.map((itemInclude) => {
              if (itemInclude.item.isHasOption && itemInclude.item.options.length > 0) {
                const optionSelected = itemPerkSelectedFirst.items.find((x) => x.item.name === itemInclude.item.name)
                  .optionsSelected.optionsSelected;
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
            items: item.items.map((itemInclude) => {
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
      setListPerkByCampaignId(arr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListPerksByCampaignId();
  }, []);
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
        perkId: item._id,
        listShippingFee: item.listShippingFee || [],
        perkImage: item.image.url,
        perkTitle: item.title,
        quantity: item.quantityOrder,
        price: item.price,
        options: item.items.reduce((acc, cur) => {
          if (cur.optionsSelected && cur.optionsSelected.length > 0) {
            return [
              ...acc,
              {
                name: cur.item.name,
                optionsString: cur.optionsSelected.map((i) => i.value).join('/'),
              },
            ];
          } else {
            return [
              ...acc,
              {
                name: cur.item.name,
                optionsString: '',
              },
            ];
          }
        }, []),
      };
    });
    let estDelivery = null;
    listSelected.forEach((item) => {
      if (!estDelivery) {
        estDelivery = item.estDelivery;
      }
      estDelivery = item.estDelivery > estDelivery ? item.estDelivery : estDelivery;
    });
    dispatch(
      setPayment({
        total: total,
        listPerkPayment: listPayment,
      }),
    );
    const state = {
      total: total,
      listPerkPayment: listPayment,
      estDelivery,
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
      if (listPerkByCampaignId[i]._id === listSelected[index]._id) {
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
  useEffect(() => {
    setTotal(() => {
      const res = listSelected.reduce((acc, cur) => {
        return acc + cur.quantityOrder * cur.price;
      }, 0);
      return res;
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
                (<span>{quantityContribute}</span> item)
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
        />
      )}
    </div>
  );
}

export default DetailPerk;
