import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setPreviousLink } from '~/redux/slides/GlobalApp';
import { toast } from 'react-toastify';
import {
  useGetInfoVerifyUserMutation,
  useUpdatePasswordMutation,
} from '~/hooks/api/mutations/user/user.profile.mutation';
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
        isVerifiedUser: user.isVerifiedUser || false,
        email: user.email || '',
      };

      return state;
    });
  }, [user]);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const handleChangeInputPassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getInfoVerifyUser = useGetInfoVerifyUserMutation();
  const handleClickVerify = async () => {
    dispatch(setPreviousLink('@settingInfo' + window.location.href));
    getInfoVerifyUser.mutate(user._id, {
      onSuccess: (res) => {
        navigate(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const updatePasswordUser = useUpdatePasswordMutation();
  const handleClickSavePassword = async () => {
    dispatch(setLoading(true));
    const body = {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
    };
    updatePasswordUser.mutate(body, {
      onSuccess: (res) => {
        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        toast.success('Cập nhật mật khẩu thành công!');
        setPassword({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      },
      onError: (error) => {
        setPassword((prev) => ({ ...prev, currentPassword: '' }));
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
        <a href={`/individuals/${id}/profile`} className={cx('nav-item')}>
          <span>
            <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
            Xem hồ sơ
          </span>
        </a>
        <a href={`/individuals/${id}/edit/profile`} className={cx('nav-item', 'active')}>
          <span>
            {' '}
            <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
            Chỉnh sửa hồ sơ & Cài đặt
          </span>
        </a>
      </div>

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <a href={`/individuals/${id}/edit/profile`} className={cx('tab')}>
              Hồ sơ
            </a>
            <a href={`/individuals/${id}/edit/settings`} className={cx('tab', 'active')}>
              Cài đặt
            </a>
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
              {userState.isVerifiedUser && (
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
              {!userState.isVerifiedUser && (
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
              {userState.isVerifiedUser && (
                <div className={cx('entreField')} onClick={handleClickVerify}>
                  <a className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }}>
                    XEM THÔNG TIN XÁC MINH
                  </a>
                </div>
              )}

              {!userState.isVerifiedUser && (
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
                <input
                  className={cx('itext-field')}
                  name="currentPassword"
                  onChange={handleChangeInputPassword}
                  value={password.currentPassword}
                />
              </div>
              <div className={cx('field')} style={{ maxWidth: '400px' }}>
                <label className={cx('field-label')}>Mật khẩu mới</label>
                <input
                  className={cx('itext-field')}
                  name="newPassword"
                  onChange={handleChangeInputPassword}
                  value={password.newPassword}
                />
              </div>
              <div className={cx('field')} style={{ maxWidth: '400px' }}>
                <label className={cx('field-label')}>Nhập lại mật khẩu mới</label>
                <input
                  className={cx('itext-field')}
                  name="confirmNewPassword"
                  onChange={handleChangeInputPassword}
                  value={password.confirmNewPassword}
                />
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
