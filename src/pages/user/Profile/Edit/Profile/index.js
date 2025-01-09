import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { toast } from 'react-toastify';
import { setCurrentUser } from '~/redux/slides/User';
import { defaultAvt } from '~/assets/images';
import { useUpdateProfileUserMutation } from '~/hooks/api/mutations/user/user.mutation';
import { useQueryClient } from '@tanstack/react-query';
const cx = classNames.bind(styles);
function EditProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const queryClient = useQueryClient();
  const refetchUserData = () => {
    queryClient.invalidateQueries('getCurrentUser'); // Key của query
  };
  const [file, setFile] = useState();
  const [userState, setUserState] = useState({});
  useEffect(() => {
    setUserState((prev) => {
      const state = {
        fullName: user.fullName || '',
        address: user.address || '',
        phoneNumber: user.phoneNumber || '',
        story: user.story || '',
        avatar: user.avatar || '',
        facebookLink: user.facebookLink || '',
      };

      return state;
    });
  }, [user]);
  const elementInputProfileImage = useRef(null);
  const elementInputProfileAvt = useRef(null);

  const handleChangeInputBasic = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setUserState((prev) => {
          return { ...prev, avatar: res };
        });
      };
    }
  };

  const updateProfileUserMutation = useUpdateProfileUserMutation();
  const handleSave = async () => {
    dispatch(setLoading(true));
    const body = { ...userState };
    delete body.avatar;

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });

    updateProfileUserMutation.mutate(
      { formData },
      {
        onSuccess(response) {
          refetchUserData();
          toast.success('Cập nhật thông tin thành công');
        },
        onError(err) {
          toast.error('Cập nhật thông tin thất bại', err);
          console.log(err);
        },
        onSettled(response, err) {
          dispatch(setLoading(false));
        },
      },
    );
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
      </div>

      <div className={cx('body')}>
        <h1 className={cx('header-name')}>{user.fullName}</h1>

        <div className={cx('content')}>
          <div className={cx('tabpanel')}>
            <Link to={`/individuals/${id}/edit/profile`} className={cx('tab', 'active')}>
              Hồ sơ
            </Link>
            <Link to={`/individuals/${id}/edit/settings`} className={cx('tab')}>
              Cài đặt
            </Link>
          </div>

          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Thông Tin Cơ Bản</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '600px' }}>
                <label className={cx('field-label')}>Họ và tên</label>
                <input
                  className={cx('itext-field')}
                  value={userState.fullName}
                  onChange={handleChangeInputBasic}
                  name="fullName"
                />
              </div>

              <div className={cx('field')} style={{ maxWidth: '600px', marginTop: '16px' }}>
                <label className={cx('field-label')}>Địa chỉ liên hệ</label>
                <input
                  className={cx('itext-field')}
                  value={userState.address}
                  onChange={handleChangeInputBasic}
                  name="address"
                />
              </div>
              <div className={cx('field')} style={{ maxWidth: '600px', marginTop: '16px' }}>
                <label className={cx('field-label')}>Số điện thoại</label>
                <input
                  className={cx('itext-field')}
                  value={userState.phoneNumber}
                  onChange={handleChangeInputBasic}
                  name="phoneNumber"
                />
              </div>
            </div>
          </div>

          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Câu Chuyện Của Bạn</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '600px' }}>
                <label className={cx('field-label')}>Về tôi</label>
                <textarea
                  className={cx('itext-field')}
                  style={{ minHeight: '100px', marginTop: '4px' }}
                  value={userState.story}
                  onChange={handleChangeInputBasic}
                  name="story"
                />
              </div>
            </div>
          </div>
          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Ảnh của bạn</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '800px', marginTop: '40px' }}>
                <label className={cx('field-label')}>Ảnh đại diện</label>
                <div className={cx('img-wrapper')} style={{ width: '150px', height: '150px' }}>
                  <img src={userState.avatar || defaultAvt} alt="avatar mặc định"></img>

                  <input
                    ref={elementInputProfileAvt}
                    type="file"
                    onChange={handleChangeAvatar}
                    accept="image/jpg, image/jpeg, image/png"
                  />
                </div>
                <div
                  onClick={() => elementInputProfileAvt.current.click()}
                  className={cx('btn')}
                  style={{ marginTop: '32px' }}
                >
                  {userState.avatar?.url ? 'Đổi ảnh' : 'Thêm ảnh'}
                </div>
              </div>
            </div>
          </div>

          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Liên Kết Bên Ngoài</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '800px' }}>
                <label className={cx('field-label')}>Liên kết Facebook</label>
                <input
                  className={cx('itext-field')}
                  value={userState.facebookLink}
                  onChange={handleChangeInputBasic}
                  name="facebookLink"
                />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div onClick={handleSave} className={cx('btn')} style={{ marginTop: '8px' }}>
              Lưu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
