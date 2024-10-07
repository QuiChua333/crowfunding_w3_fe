import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import baseURL from '~/utils/baseURL';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';

const cx = classNames.bind(styles);

function ResetPassword() {
    const dispatch = useDispatch()
    const [validUrl, setValidUrl] = useState(null);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [showButtonAccept,setShowButtonAccept] = useState(true)
    const handleShowAndHidePass = () => {
        setShowPass(!showPass);
    };
    const handleShowAndHideConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
    };

    const validatePass = (value) => {
        if (value.trim().length === 0 || value.trim() === '') {
            setError('Vui lòng nhập mật khẩu');
            return false;
        } else {
            if (value.trim().length < 8) {
                setError('Mật khẩu ít nhất phải có 8 ký tự');
                return false;
            } else {
                setError('');
                return true;
            }
        }
    };
    const validateConfirmPass = (value) => {
        if (value.trim().length === 0 || value.trim() === '') {
            setError('Vui lòng nhập lại mật khẩu');
            return false;
        } else {
            if (value.trim() !== pass) {
                setError('Mật khẩu không khớp. Vui lòng nhập lại');
                return false;
            } else {
                setError('');
                return true;
            }
        }
    };

    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const param = useParams();

    useEffect(() => {
        const verifyUrl = async () => {

            try {
                const url = `${baseURL}/user/forgot-password/${param.id}/verify-link/${param.tokenResetPassword}`;
                const { data } = await axios.get(url);


                console.log(data);
                setValidUrl(true);
            } catch (error) {


                console.log(error);
                setValidUrl(false);
            }
        };
        verifyUrl();
    }, [param]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        let flagPassword = validatePass(pass);
        let flagConfirmPass = validateConfirmPass(confirmPass);
        if (flagPassword && flagConfirmPass) {
            // Xử lý submit ở đây..
            dispatch(setLoading(true))
            try {
                const url = `${baseURL}/user/forgot-password/update-new-password`;
                const { data } = await axios.patch(url, { newPassword: pass, id: param.id });
                dispatch(setLoading(false))
                setMsg("Cập nhật mật khẩu mới thành công! Đang chuyển hướng tới trang đăng nhập");
                setShowButtonAccept(false)
                setTimeout(() => {
                    window.location.href = "/login";
                },2000)
            } catch (error) {
                dispatch(setLoading(false))
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                    setMsg("");
                }
            }
        }
    };
    return (
        <div className={cx('container')}>
            {validUrl && (
                <>
                    <form className={cx('form_container')} onSubmit={handleSubmit}>
                        <h2>Cập nhật mật khẩu</h2>
                        <span className={cx('title')}>Hãy nhập mật khẩu mới cho tài khoản của bạn</span>
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
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '70px', marginTop: '10px' }}>
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


                        </div>

                        {error && <div className={cx('error_msg')}>{error}</div>}
                        {msg && <div className={cx('success_msg')}>{msg}</div>}
                        {
                            showButtonAccept &&
                            <button type="submit" className={cx('green_btn')}>
                                Xác nhận
                            </button>
                        }
                    </form>
                </>
            )}

            {validUrl === false && <h1 className={cx('not-found')}>404 Not Found</h1>}
        </div>
    );
}

export default ResetPassword;
