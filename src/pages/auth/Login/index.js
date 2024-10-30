import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { logoTrangNho } from '~/assets/images';
import {
  useLoginGoogleMutation,
  useLogOutMutation,
  useSubmitLoginMutation,
} from '~/hooks/api/mutations/auth/auth.mutation';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      if (value.trim().length < 6) {
        setTextValidatePass('Mật khẩu ít nhất phải có 6 ký tự');
        return false;
      } else {
        setTextValidatePass('');
        return true;
      }
    }
  };

  const submitLogin = useSubmitLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let flagEmail = validateEmail(email);
    let flagPassword = validatePass(pass);
    if (flagEmail && flagPassword) {
      dispatch(setLoading(true));
      const data = {
        email,
        password: pass,
      };
      submitLogin.mutate(data, {
        onSuccess: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          if (response.isAdmin) {
            navigate('/admin');
          } else {
            if (prevLink.includes('@report')) {
              console.log(prevLink.substring(7));
              navigate(prevLink.substring(7));
            } else {
              window.location.href = '/';
              navigate('/');
            }
          }
        },
        onError: (error) => {
          setError(error.response.data.message);
        },
        onSettled: () => {
          dispatch(setLoading(false));
        },
      });
    }
  };

  const handleLoginGoogle = () => {
    window.location.href = `${process.env.REACT_APP_URL_BACKEND_LOGIN_GOOGLE}`;
  };

  return (
    <div className={cx('responsive')}>
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

              <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }} className={cx('form_password')}>
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
              <div
                className="w-[180px] flex justify-center items-center py-2 rounded-[20px] cursor-pointer
              hover:opacity-75  border-[#ccc] border-[1px] mb-5"
                onClick={handleLoginGoogle}
              >
                <FcGoogle className="text-[30px]" />
              </div>
              <Link to="/forgot">
                <span className={cx('text-forgot')}>Quên mật khẩu ?</span>
              </Link>
            </form>
          </div>
          <div className={cx('right')}>
            <img style={{ width: '120px', height: '120px' }} src={logoTrangNho} alt="logo" />
            <span>Bạn chưa có tài khoản?</span>
            <Link to="/sign-up">
              <button type="button" className={cx('white_btn')}>
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
