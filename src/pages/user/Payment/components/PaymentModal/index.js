import classNames from 'classnames/bind';
import styles from './PaymentModal.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { eth, momo, stripe } from '~/assets/images';
const cx = classNames.bind(styles);
function PaymentModal({ setShowPaymentModal, handlePaymentMethod, cryptocurrencyMode }) {
  const dispatch = useDispatch();
  const [method, setMethod] = useState('stripe');
  const handleClickAccept = () => {
    setShowPaymentModal(false);
    handlePaymentMethod(method);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <h3 className={cx('title')}>CHỌN CÁCH THỨC THANH TOÁN</h3>
        <div style={{ marginTop: '36px' }}>
          <label className={cx('inputRadioGroup-radio')} onClick={() => setMethod('stripe')}>
            <input type="radio" value={'stripe'} name="paymentMethod" defaultChecked />
            <span className={cx('inputRadioGroup-radio-button')}></span>
            <div className={cx('inputRadioGroup-radio-label')}>
              <img src={stripe} className={cx('img')} />
              <span>Thanh toán qua cổng thanh toán Stripe</span>
            </div>
          </label>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label className={cx('inputRadioGroup-radio')} onClick={() => setMethod('momo')}>
            <input type="radio" value={'momo'} name="paymentMethod" />
            <span className={cx('inputRadioGroup-radio-button')}></span>
            <div className={cx('inputRadioGroup-radio-label')}>
              <img src={momo} className={cx('img')} />
              <span>Thanh toán qua Momo</span>
            </div>
          </label>
        </div>
        {cryptocurrencyMode && (
          <div style={{ marginBottom: '32px', marginTop: '16px' }}>
            <label className={cx('inputRadioGroup-radio')} onClick={() => setMethod('crypto')}>
              <input type="radio" value={'crypto'} name="paymentMethod" />
              <span className={cx('inputRadioGroup-radio-button')}></span>
              <div className={cx('inputRadioGroup-radio-label')}>
                <img src={eth} className={cx('img')} />
                <span>Thanh toán bằng Ethereum</span>
              </div>
            </label>
          </div>
        )}
        <div className={cx('section-button')}>
          <a onClick={() => setShowPaymentModal(false)} className={cx('btn', 'btn-cancel')}>
            Đóng
          </a>

          <a onClick={handleClickAccept} className={cx('btn', 'btn-ok')}>
            Xác nhận
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
