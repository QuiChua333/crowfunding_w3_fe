import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { logoTrangNho } from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '~/hooks/api/mutations/auth/auth.mutation';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function SignUp() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [textValidateName, setTextValidateName] = useState('');
  const [email, setEmail] = useState('');
  const [textValidateEmail, setTextValidateEmail] = useState('');
  const [pass, setPass] = useState('');
  const [textValidatePass, setTextValidatePass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [textValidateConfirmPass, setTextValidateConfirmPass] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const handleShowAndHidePass = () => {
    setShowPass(!showPass);
  };
  const handleShowAndHideConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  const [showButtonRegister, setShowButtonRegister] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const resetField = () => {
    setEmail('');
    setName('');
    setPass('');
    setConfirmPass('');
  };
  const validateName = (value) => {
    if (value.trim().length === 0 || value.trim() === '') {
      setTextValidateName('Vui lòng nhập họ tên');
      return false;
    } else {
      setTextValidateName('');
      return true;
    }
  };
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
  const validateConfirmPass = (value) => {
    if (value.trim().length === 0 || value.trim() === '') {
      setTextValidateConfirmPass('Vui lòng nhập lại mật khẩu');
      return false;
    } else {
      if (value.trim() !== pass) {
        setTextValidateConfirmPass('Mật khẩu không khớp. Vui lòng nhập lại');
        return false;
      } else {
        setTextValidateConfirmPass('');
        return true;
      }
    }
  };
  const registerMutation = useRegisterMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let flagName = validateName(name);
    let flagEmail = validateEmail(email);
    let flagPassword = validatePass(pass);
    let flagConfirmPass = validateConfirmPass(confirmPass);
    if (flagName && flagEmail && flagPassword && flagConfirmPass) {
      // Xử lý submit ở đây..
      const data = {
        fullName: name,
        email,
        password: pass,
      };
      dispatch(setLoading(true));
      registerMutation.mutate(data, {
        onSuccess(response) {
          dispatch(setLoading(false));
          setShowButtonRegister(false);
          resetField();
          setMsg('Một liên kết đã được gửi đến email của bạn. Vui lòng truy cập liên kết để xác nhận tài khoản');
          toast.success('Đăng ký tài khoản thành công.');
        },

        onError(error) {
          console.log(error);
          dispatch(setLoading(false));
          setError(error.response.data.message);
        },
      });
    }
  };

  return (
    <div className={cx('responsive')}>
      <div className={cx('signup_container')}>
        <div className={cx('signup_form_container')}>
          <div className={cx('left')}>
            <img style={{ width: '120px', height: '120px' }} src={logoTrangNho} alt="logo" />
            <h2>Bạn đã có tài khoản?</h2>
            <Link to="/login">
              <button type="button" className={cx('white_btn')}>
                Đăng nhập
              </button>
            </Link>
          </div>
          <div className={cx('right')}>
            <form className={cx('form_container')} onSubmit={handleSubmit}>
              <h1>Đăng ký tài khoản</h1>
              <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cx('inputInfo')}
                />
                <span className={cx('text-validate')}>{textValidateName}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cx('inputInfo')}
                />
                <span className={cx('text-validate')}>{textValidateEmail}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
                <div className={cx('container-pass')}>
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    placeholder="Xác nhận lại mật khẩu"
                    name="confirmPassword"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className={cx('inputInfo')}
                  />
                  {showConfirmPass ? (
                    <FaEye className={cx('eye-icon')} onClick={handleShowAndHideConfirmPass} />
                  ) : (
                    <FaEyeSlash className={cx('eye-icon')} onClick={handleShowAndHideConfirmPass} />
                  )}
                </div>

                <span className={cx('text-validate')}>{textValidateConfirmPass}</span>
              </div>
              {error && <div className={cx('error_msg')}>{error}</div>}
              {msg && <div className={cx('success_msg')}>{msg}</div>}
              {showButtonRegister && (
                <button type="submit" className={cx('green_btn')}>
                  Đăng ký
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
