import classNames from 'classnames/bind';
import styles from './ConnectWalletModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { eth, momo, stripe } from '~/assets/images';
import { ConnectWalletButton } from '~/components';
const cx = classNames.bind(styles);
function ConnectWalletModal({ setShowConnectWalletModal, handlePaymentCrypto }) {
  const dispatch = useDispatch();
  const metamask = useSelector((state) => state.metamask);
  const handleClickAccept = () => {
    setShowConnectWalletModal(false);
    handlePaymentCrypto();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <h3 className={cx('title')}>CHỌN TÀI KHOẢN THANH TOÁN</h3>
        <div style={{ marginTop: '36px', marginBottom: '20px' }}>
          {!metamask.account && <ConnectWalletButton />}
          {metamask.account && (
            <div>
              <div>
                <span>Tài khoản ví kết nối: </span>
                <span>{metamask.account}</span>
              </div>
              <div>
                <span>Số dư hiện tại: </span>
                <span>{metamask.balance}</span>
              </div>
            </div>
          )}
        </div>
        <div className={cx('section-button')}>
          <a onClick={() => setShowConnectWalletModal(false)} className={cx('btn', 'btn-cancel')}>
            Hủy
          </a>

          <a onClick={handleClickAccept} className={cx('btn', 'btn-ok')}>
            Thanh toán
          </a>
        </div>
      </div>
    </div>
  );
}

export default ConnectWalletModal;
