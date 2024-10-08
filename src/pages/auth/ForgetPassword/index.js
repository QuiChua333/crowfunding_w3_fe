import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ForgetPassword.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import baseURL from '~/utils/baseURL';
const cx = classNames.bind(styles);

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [showButtonAccept, setShowButtonAccept] = useState(true);
  const validateEmail = (value) => {
    if (value.trim().length === 0 || value.trim() === '') {
      setError('Vui lòng nhập email');
      return false;
    } else {
      let flag = String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
      if (!flag) {
        setError('Email không hợp lệ. Vui lòng nhập lại');
        return false;
      } else {
        setError('');
        return true;
      }
    }
  };
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let flagEmail = validateEmail(email);
    if (flagEmail) {
      dispatch(setLoading(true));
      try {
        const url = `${baseURL}/user/forgot-password`;
        const { data } = await axios.post(url, { email });
        dispatch(setLoading(false));
        setShowButtonAccept(false);
        setMsg(`Một liên kết cập nhật mật khẩu đã được gửi đến ${email}. Liên kết tồn tại trong 5 phút.`);
      } catch (error) {
        dispatch(setLoading(false));

        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
          setMsg('');
        }
      }
    }
  };

  return (
    <div className={cx('responsive')}>
      <div className={cx('container')}>
        <form className={cx('form_container')} onSubmit={handleSubmit}>
          <h1>Quên mật khẩu</h1>
          <span className={cx('title')}>
            Chúng tôi sẽ gửi thông tin đổi mật khẩu đến địa chỉ email của bạn. Vui lòng kiểm tra email để cập nhật lại
            mật khẩu.
          </span>
          <div style={{ display: 'flex', justifyContent: 'center' }} className={cx('input-wrapper')}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Địa chỉ email"
              name="email"
              className={cx('inputInfo')}
            />
          </div>
          {error && <div className={cx('error_msg')}>{error}</div>}
          {msg && <div className={cx('success_msg')}>{msg}</div>}
          {showButtonAccept && (
            <button type="submit" className={cx('green_btn')}>
              Xác nhận
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
