import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailNFTCheckout.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import formatMoney from '~/utils/formatMoney';
import { useDispatch } from 'react-redux';
import { setPayment } from '~/redux/slides/Payment';
import { useGetNFTsByCampaignIdQuery } from '~/hooks/api/queries/user/nft.query';
import ItemDetailNFT from '~/components/ItemDetailNFT';
import ItemDetailNFTSelect from '~/components/ItemDetailNFTSelect';
const cx = classNames.bind(styles);

function DetailNFTCheckout() {
  const { id } = useParams();
  const location = useLocation();

  const itemNFTSelectedFirst = location.state.nftSelected;

  const cryptocurrencyMode = location.state.cryptocurrencyMode;
  const [quantityContribute, setQuantityContribute] = useState(0);
  const [listSelected, setListSelected] = useState([]);
  const [listNFTs, setListNFTs] = useState([]);
  const [nftSelected, setNFTSelected] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: listNFTsData } = useGetNFTsByCampaignIdQuery(id);
  useEffect(() => {
    if (listNFTsData) {
      let arr = listNFTsData.map((item) => {
        if (item.id === itemNFTSelectedFirst.id) {
          return {
            ...item,
            isSelected: true,
          };
        } else {
          return {
            ...item,
            isSelected: false,
          };
        }
      });

      setListNFTs(arr);
    }
  }, [listNFTsData]);

  const handleSelectedItem = (index, newItem) => {
    setListNFTs((prev) => {
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
    for (let i = 0; i < listNFTs.length; i++) {
      if (listNFTs[i].isSelected === true) {
        addItemIntoListSelected(listNFTs[i], i);
      }
    }
  }, [listNFTs.length]);

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
        image: item.image,
        name: item.name,
        symbol: item.symbol,
        quantity: item.quantityOrder,
        ethPrice: item.ethPrice,
        price: item.price,
        color: item.color,
        materials: item.materials,
        styles: item.styles,
        isNFT: true,
        transactionHash: item.transactionHash,
        contractAddress: item.contractAddress,
      };
    });

    dispatch(
      setPayment({
        total: total,
        listNFTPayment: listPayment,
      }),
    );
    const state = {
      total: total,
      totalETH,
      listNFTPayment: listPayment,
      cryptocurrencyMode,
    };
    navigate(`/project/${id}/payments/new/checkout`, {
      state: {
        res: state,
        hasPerk: false,
        hasNFT: true,
      },
    });
  };
  const handleClickRemoveItem = (index) => {
    for (let i = 0; i < listNFTs.length; i++) {
      if (listNFTs[i].id === listSelected[index].id) {
        listNFTs[i].isSelected = false;
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
          <p className={cx('title')}>Danh sách NFT có thể thêm</p>
          <div className={cx('custom-scroll')}>
            {listNFTs.map((item, index) => {
              return (
                <ItemDetailNFT
                  index={index}
                  key={index}
                  item={item}
                  setNFTSelected={setNFTSelected}
                  cryptocurrencyMode={cryptocurrencyMode}
                  handleSelectedItem={handleSelectedItem}
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
                (<span>{quantityContribute}</span> NFT)
              </span>
            </span>
            <div className={cx('custom-scroll-2')}>
              {listSelected.map((item, index) => {
                return (
                  <ItemDetailNFTSelect
                    setNFTSelected={setNFTSelected}
                    item={item}
                    key={index}
                    index={index}
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
    </div>
  );
}

export default DetailNFTCheckout;
