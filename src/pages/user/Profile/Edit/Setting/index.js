import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdAddchart, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { toast } from 'react-toastify';
import { useUpdatePasswordMutation } from '~/hooks/api/mutations/user/user.mutation';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const cx = classNames.bind(styles);
function EditSetting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    setUserState((prev) => {
      const state = {
        fullName: user.fullName || '',
        isVerifiedEmail: user.isVerifiedEmail || false,
        verifyStatus: user.verifyStatus,
        email: user.email || '',
      };

      return state;
    });
  }, [user]);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [msgValidateCurrentPass, setMsgValidateCurrentPass] = useState('');
  const [msgValidateNewPass, setMsgValidateNewPass] = useState('');
  const [msgValidateConfirmNewPass, setMsgValidateConfirmNewPass] = useState('');

  const validatePass = (pass) => {
    const value = pass?.trim();
    return value.length >= 6;
  }

  const validateConfirmPass = (newPass, confirmPass) => {
    return (newPass?.trim() === confirmPass?.trim());
  }

  const setMsgValidate = () => {
    if (!validatePass(currentPassword)) {
      setMsgValidateCurrentPass("Mật khẩu phải có tối thiểu 6 ký tự.");
    } else {
      setMsgValidateCurrentPass("");
    }

    if (!validatePass(newPassword)) {
      setMsgValidateNewPass("Mật khẩu mới phải có tối thiểu 6 ký tự.");
    } else {
      setMsgValidateNewPass("");
    }

    if (confirmNewPassword?.toString().trim().length > 0) {
      if (!validateConfirmPass(newPassword, confirmNewPassword)) {
        setMsgValidateConfirmNewPass("Xác nhận mật khẩu mới không trùng khớp.");
      } else {
        setMsgValidateConfirmNewPass("")
      }
    } else {
      if (confirmNewPassword?.toString().trim().length === 0) {
        setMsgValidateConfirmNewPass("Vui lòng xác nhận mật khẩu mới.");
      }
    }

  }
  
  const handleChangeInputCurrentPassword = (e) => {
    const value = e.target.value.trim();
    setCurrentPassword(value);
  };
  const handleChangeInputNewPassword = (e) => {
    const value = e.target.value.trim();
    setNewPassword(value);
  };
  const handleChangeInputConfirmNewPassword = (e) => {
    const value = e.target.value.trim();
    setConfirmNewPassword(value);
  };

  const handleClickVerify = async () => {
    navigate('/givefun/verify');
  };

  const updatePasswordUser = useUpdatePasswordMutation();
  const handleClickSavePassword = async () => {
    setMsgValidate();
    if (validatePass(currentPassword) && validatePass(newPassword) && validateConfirmPass(newPassword, confirmNewPassword)) {
      savePassword();
    }
  }
  const savePassword = async () => {
    dispatch(setLoading(true));
    const body = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    updatePasswordUser.mutate(body, {
      onSuccess: (res) => {
        localStorage.setItem('accessToken', res.accessToken); 
        localStorage.setItem('refreshToken', res.refreshToken);
        toast.success('Cập nhật mật khẩu thành công!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSettled: () => {
        dispatch(setLoading(false));
      },
    });
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('navbar')}>
        <Link to={`/individuals/${id}/profile`} className={cx('nav-item')}>
          <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
          <span>Xem hồ sơ</span>
        </Link>
        <Link to={`/individuals/${id}/edit/profile`} className={cx('nav-item', 'active')}>
          <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
          <span>Chỉnh sửa hồ sơ & Cài đặt</span>
        </Link>
        <Link to={`/individuals/${id}/statistic`} className={cx('nav-item')}>
          <MdAddchart  style={{ fontSize: '24px', marginRight: '8px' }} />
          <span>Thống kê</span>
        </Link>
      </div>

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <Link to={`/individuals/${id}/edit/profile`} className={cx('tab')}>
              Hồ sơ
            </Link>
            <Link to={`/individuals/${id}/edit/settings`} className={cx('tab', 'active')}>
              Cài đặt
            </Link>
          </div>

          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')} style={{ display: 'flex', alignItems: 'center' }}>
              <span> Email của bạn</span>
              {userState.isVerifiedEmail && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 6px',
                    fontSize: '11px',
                    fontWeight: '400',
                    lineHeight: '1.3',
                    color: '#fff',
                    backgroundColor: '#0eb4b6',
                    borderRadius: '2px',
                    marginLeft: '20px',
                  }}
                >
                  Email đã xác thực
                </span>
              )}
            </h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')}>
                <label className={cx('field-label')}>Địa chỉ Email</label>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '400' }}>{userState.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')} style={{ display: 'flex', alignItems: 'center' }}>
              <span> Xác thực người dùng</span>
              {userState.verifyStatus === 'Đã xác thực' && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 6px',
                    fontSize: '11px',
                    fontWeight: '400',
                    lineHeight: '1.3',
                    color: '#fff',
                    backgroundColor: '#0eb4b6',
                    borderRadius: '2px',
                    marginLeft: '20px',
                  }}
                >
                  Người dùng đã xác minh
                </span>
              )}
              {userState.verifyStatus !== 'Đã xác thực' && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 6px',
                    fontSize: '11px',
                    fontWeight: '400',
                    lineHeight: '1.3',
                    color: '#fff',
                    backgroundColor: '#a8a8a8',
                    borderRadius: '2px',
                    marginLeft: '20px',
                  }}
                >
                  Người dùng chưa xác minh
                </span>
              )}
            </h1>

            <div style={{ marginTop: '24px' }}>
              {userState.verifyStatus === 'Đã xác thực' && (
                <div className={cx('entreField')} onClick={handleClickVerify}>
                  <a className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }}>
                    XEM THÔNG TIN XÁC MINH
                  </a>
                </div>
              )}

              {userState.verifyStatus !== 'Đã xác thực' && (
                <div className={cx('entreField')} onClick={handleClickVerify}>
                  <a onClick={handleClickVerify} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }}>
                    XÁC MINH NGƯỜI DÙNG
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Cập Nhật Mật Khẩu</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '400px' }}>
                <label className={cx('field-label')}>Mật khẩu hiện tại</label>
                <div className="flex items-center gap-4 bg-white border border-[#c8c8c8] px-4 py-3 focus-within:border-[#767272]">
                  <input
                    className="border-none w-full flex flex-grow outline-none"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    onChange={handleChangeInputCurrentPassword}
                    value={currentPassword}
                  />
                  {
                    showCurrentPassword ? <FaEye onClick={() => setShowCurrentPassword(prev => !prev)} className='hover:cursor-pointer' /> : <FaEyeSlash onClick={() => setShowCurrentPassword(prev => !prev)} className='hover:cursor-pointer' />
                  }
                </div>
                {
                  msgValidateCurrentPass.length > 0 && (
                    <div className='flex items-center gap-2 text-red-500 mt-2'>
                      <RiErrorWarningLine/>
                      <span className='text-sm'>{msgValidateCurrentPass}</span>
                    </div>
                  )
                }
              </div>
              <div className={cx('field')} style={{ maxWidth: '400px' }}>
                <label className={cx('field-label')}>Mật khẩu mới</label>
                <div className="flex items-center gap-4 bg-white border border-[#c8c8c8] px-4 py-3 focus-within:border-[#767272]">
                  <input
                    className="border-none w-full flex flex-grow outline-none"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    onChange={handleChangeInputNewPassword}
                    value={newPassword}
                  />
                  {
                    showNewPassword ? <FaEye onClick={() => setShowNewPassword(prev => !prev)} className='hover:cursor-pointer' /> : <FaEyeSlash onClick={() => setShowNewPassword(prev => !prev)} className='hover:cursor-pointer' />
                  }
                </div>
                {
                  msgValidateNewPass.length > 0 && (
                    <div className='flex items-center gap-2 text-red-500 mt-2'>
                      <RiErrorWarningLine/>
                      <span className='text-sm'>{msgValidateNewPass}</span>
                    </div>
                  )
                }
              </div>
              <div className={cx('field')} style={{ maxWidth: '400px' }}>
                <label className={cx('field-label')}>Nhập lại mật khẩu mới</label>
                <div className="flex items-center gap-4 bg-white border border-[#c8c8c8] px-4 py-3 focus-within:border-[#767272]">
                  <input
                    className="border-none w-full flex flex-grow outline-none"
                    name="confirmNewPassword"
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleChangeInputConfirmNewPassword}
                    value={confirmNewPassword}
                  />
                  {
                    showConfirmNewPassword ? <FaEye onClick={() => setShowConfirmNewPassword(prev => !prev)} className='hover:cursor-pointer' /> : <FaEyeSlash onClick={() => setShowConfirmNewPassword(prev => !prev)} className='hover:cursor-pointer' />
                  }
                </div>
                {
                  msgValidateConfirmNewPass.length > 0 && (
                    <div className='flex items-center gap-2 text-red-500 mt-2'>
                      <RiErrorWarningLine/>
                      <span className='text-sm'>{msgValidateConfirmNewPass}</span>
                    </div>
                  )
                }
              </div>

              <div onClick={handleClickSavePassword} className={cx('btn')} style={{ marginTop: '16px' }}>
                Lưu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSetting;
