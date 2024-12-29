import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ConnectWalletButton.module.scss';
import formatMoney from '~/utils/formatMoney';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { connectMetaMask, resetMetaMask } from '~/redux/slides/Web3';

const cx = classNames.bind(styles);

function ConnectWalletButton() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Lắng nghe sự kiện thay đổi tài khoản
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        dispatch(resetMetaMask()); // Reset trạng thái trước
        dispatch(connectMetaMask()); // Kết nối lại với tài khoản mới
      });

      window.ethereum.on('disconnect', () => {
        dispatch(resetMetaMask());
        console.log('MetaMask disconnected');
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      }
    };
  }, [dispatch]);

  return (
    <div className={cx('wrapper')}>
      <a
        onClick={() => dispatch(connectMetaMask())}
        className={cx('btn', 'btn-ok')}
        style={{ marginLeft: '0px', marginTop: '12px', display: 'inline-block' }}
      >
        KẾT NỐI VÍ
      </a>
    </div>
  );
}

export default ConnectWalletButton;
