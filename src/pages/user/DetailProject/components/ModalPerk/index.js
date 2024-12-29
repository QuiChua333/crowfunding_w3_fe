import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalPerk.module.scss';
import PerkItem from '~/components/PerkItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';

const cx = classNames.bind(styles);

function ModalPerk({ close, setIsOpenModalOption, setPerkInModal, listPerk, setItemPerkSelected, cryptocurrencyMode }) {
  const { id } = useParams();
  const [money, setMoney] = useState('');
  const [ethPrice, setETHPrice] = useState(0);
  const navigate = useNavigate();
  const [ethToVnd, setETHToVND] = useState(0);
  useEffect(() => {
    getRateEthToVnd();
  }, []);

  const getRateEthToVnd = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=vnd');
      const ethToVnd = response.data.ethereum.vnd;
      setETHToVND(ethToVnd);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickContinueNoPerk = () => {
    navigate(`/project/${id}/payments/new/checkout`, {
      state: {
        money,
        hasPerk: false,
        ethPrice: ethPrice,
        cryptocurrencyMode,
        ethToVnd,
      },
    });
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setETHPrice((value / ethToVnd).toFixed(6));
    },
    500,
  );
  const handleChangeMoney = (e) => {
    const value = e.target.value;
    debounced(value);
    setMoney(value);
  };

  return (
    <div className={cx('wrapper')} onClick={close}>
      <div onClick={(e) => e.stopPropagation()} className={cx('modal')}>
        <span className={cx('btn-close')} role="button" onClick={close}>
          &times;
        </span>
        <p className={cx('title-modal')}>Quay lại chiến dịch</p>
        <div className={cx('container-body')}>
          <p className={cx('title-contribute')}>Thực hiện đóng góp</p>
          <div className={cx('container-layout-input')}>
            <div className={cx('container-input')}>
              <div className="flex gap-8">
                <input
                  className={cx('input-price')}
                  type="number"
                  name="price"
                  placeholder="Nhập số tiền (VND)"
                  onChange={handleChangeMoney}
                  value={money}
                />
                <button onClick={handleClickContinueNoPerk} className={cx('btn-continue')} type="button">
                  Tiếp tục
                </button>
              </div>

              {cryptocurrencyMode && (
                <input
                  className={cx('input-price')}
                  style={{ fontSize: '16px' }}
                  type="text"
                  value={`${ethPrice} ETH`}
                  disabled={true}
                />
              )}
            </div>
            <p className={cx('title-under-input')}>Đóng góp sẽ không liên quan tới đặc quyền</p>
          </div>
          <p className={cx('title-contribute')}>Chọn một quà</p>

          <div className={cx('container-list-perks')}>
            {listPerk.map((item, index) => {
              return (
                <PerkItem
                  setItemPerkSelected={setItemPerkSelected}
                  item={item}
                  key={index}
                  cryptocurrencyMode={cryptocurrencyMode}
                  setIsOpenModalOption={setIsOpenModalOption}
                  closePerkModal={close}
                  isInModal
                  setPerkInModal={setPerkInModal}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPerk;
