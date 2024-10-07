import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { logoTrangNho } from '~/assets/images';

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const prevLink = useSelector((state) => state.globalApp.previousLink);
  const [email, setEmail] = useState('');
  const [textValidateEmail, setTextValidateEmail] = useState('');
  const [pass, setPass] = useState('');
  const [textValidatePass, setTextValidatePass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const handleShowAndHidePass = () => {
    setShowPass(!showPass);
  };

  const [error, setError] = useState('');

  const validateEmail = (value) => {
    if (value.trim().length === 0 || value.trim() === '') {
      setTextValidateEmail('Vui lòng nhập email');
      return false;
    } else {
      let flag = String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
      if (!flag) {
        setTextValidateEmail('Email không hợp lệ. Vui lòng nhập lại');
        return false;
      } else {
        setTextValidateEmail('');
        return true;
      }
    }
  };
  const validatePass = (value) => {
    if (value.trim().length === 0 || value.trim() === '') {
      setTextValidatePass('Vui lòng nhập mật khẩu');
      return false;
    } else {
      if (value.trim().length < 8) {
        setTextValidatePass('Mật khẩu ít nhất phải có 8 ký tự');
        return false;
      } else {
        setTextValidatePass('');
        return true;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let flagEmail = validateEmail(email);
    let flagPassword = validatePass(pass);
    if (flagEmail && flagPassword) {
      // Xử lý submit ở đây
      dispatch(setLoading(true));
      try {
        const data = {
          email,
          password: pass,
        };
        const { data: res } = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/login`, data);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        dispatch(setLoading(false));

        if (res.data.isAdmin) {
          window.location.href = '/admin';
        } else {
          if (prevLink.includes('@report')) {
            console.log(prevLink.substring(7));
            window.location.href = prevLink.substring(7);
          } else {
            window.location.href = '/';
          }
        }
      } catch (error) {
        dispatch(setLoading(false));

        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className={cx('login_container')}>
      <div className={cx('login_form_container')}>
        <div className={cx('left')}>
          <form className={cx('form_container')} onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Địa chỉ email"
                name="email"
                className={cx('inputInfo')}
              />
              <span className={cx('text-validate')}>{textValidateEmail}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', height: '70px', marginTop: '10px' }}>
              <div className={cx('container-pass')}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  name="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className={cx('inputInfo')}
                />
                {showPass ? (
                  <FaEye className={cx('eye-icon')} onClick={handleShowAndHidePass} />
                ) : (
                  <FaEyeSlash className={cx('eye-icon')} onClick={handleShowAndHidePass} />
                )}
              </div>
              <span className={cx('text-validate')}>{textValidatePass}</span>
            </div>

            {error && <div className={cx('error_msg')}>{error}</div>}
            <button type="submit" className={cx('green_btn')}>
              Đăng nhập
            </button>
            <Link to="/forgot">
              <span className={cx('text-forgot')}>Quên mật khẩu ?</span>
            </Link>
          </form>
        </div>
        <div className={cx('right')}>
          <img style={{ width: '120px', height: '120px' }} src={logoTrangNho} alt="logo" />
          <span>Bạn chưa có tài khoản ?</span>
          <Link to="/sign-up">
            <button type="button" className={cx('white_btn')}>
              Đăng ký
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
