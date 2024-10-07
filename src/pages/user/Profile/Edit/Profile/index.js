import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { toast } from 'react-toastify';
import { setCurrentUser } from '~/redux/slides/User';
import { defaultAvt } from '~/assets/images';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);
function EditProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    setUserState((prev) => {
      const state = {
        fullName: user.fullName || '',
        address: user.address || {
          province: '',
          district: '',
          ward: '',
          phoneNumber: '',
        },
        story: user.story || {
          shortDescription: '',
          aboutMe: '',
        },
        avatar: user.avatar || {
          url: '',
          public_id: '',
        },
        profileImage: user.profileImage || {
          url: '',
          public_id: '',
        },
        linkFacebook: user.linkFacebook || '',
      };

      return state;
    });
  }, [user]);
  const elementInputProfileImage = useRef(null);
  const elementInputProfileAvt = useRef(null);

  const handleChangeInputBasic = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name.startsWith('address') || name.startsWith('story')) {
      const name1 = name.split('/')[0];
      const name2 = name.split('/')[1];
      setUserState((prev) => ({
        ...prev,
        [name1]: {
          ...prev[`${name1}`],
          [name2]: value,
        },
      }));
    } else {
      setUserState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  // useEffect(() => {
  //     console.log(userState)
  // },[userState])
  const handleChangeProfileImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setUserState((prev) => {
          return { ...prev, profileImage: { ...prev.profileImage, url: res } };
        });
      };
    }
  };
  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setUserState((prev) => {
          return { ...prev, avatar: { ...prev.avatar, url: res } };
        });
      };
    }
  };
  const handleSave = async () => {
    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.patch(`${baseURL}/user/editUser/${id}`, userState);
      dispatch(setLoading(false));
      dispatch(setCurrentUser(res.data.data));
      toast.success('Cập nhật thông tin thành công');
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
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
            <a href={`/individuals/${id}/edit/profile`} className={cx('tab', 'active')}>
              Hồ sơ
            </a>
            <a href={`/individuals/${id}/edit/settings`} className={cx('tab')}>
              Cài đặt
            </a>
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

              <div style={{ display: 'flex', gap: '32px', maxWidth: '700px', marginTop: '24px' }}>
                <div className={cx('field')} style={{ flex: '3' }}>
                  <label className={cx('field-label')}>Tỉnh/Thành phố</label>
                  <input
                    className={cx('itext-field')}
                    value={userState.address?.province}
                    onChange={handleChangeInputBasic}
                    name="address/province"
                  />
                </div>
                <div className={cx('field')} style={{ flex: '2' }}>
                  <label className={cx('field-label')}>Quận/Huyện</label>
                  <input
                    className={cx('itext-field')}
                    value={userState.address?.district}
                    onChange={handleChangeInputBasic}
                    name="address/district"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '32px', maxWidth: '700px', marginTop: '16px' }}>
                <div className={cx('field')} style={{ flex: '3' }}>
                  <label className={cx('field-label')}>Xã/Phường</label>
                  <input
                    className={cx('itext-field')}
                    value={userState.address?.ward}
                    onChange={handleChangeInputBasic}
                    name="address/ward"
                  />
                </div>
                <div className={cx('field')} style={{ flex: '2' }}>
                  <label className={cx('field-label')}>Số điện thoại</label>
                  <input
                    className={cx('itext-field')}
                    value={userState.address?.phoneNumber}
                    onChange={handleChangeInputBasic}
                    name="address/phoneNumber"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Câu Chuyện Của Bạn</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '800px' }}>
                <label className={cx('field-label')}>Mô tả ngắn gọn</label>
                <input
                  className={cx('itext-field')}
                  value={userState.story?.shortDescription}
                  onChange={handleChangeInputBasic}
                  name="story/shortDescription"
                />
              </div>
              <div className={cx('field')} style={{ maxWidth: '600px' }}>
                <label className={cx('field-label')}>Về tôi</label>
                <textarea
                  className={cx('itext-field')}
                  style={{ minHeight: '200px' }}
                  value={userState.story?.aboutMe}
                  onChange={handleChangeInputBasic}
                  name="story/aboutMe"
                />
              </div>
            </div>
          </div>
          <div className={cx('section-info')} style={{ marginTop: '32px' }}>
            <h1 className={cx('section-title')}>Ảnh của bạn</h1>

            <div style={{ marginTop: '24px' }}>
              <div className={cx('field')} style={{ maxWidth: '800px' }}>
                <label className={cx('field-label')}>Ảnh hồ sơ</label>
                <div className={cx('img-wrapper')}>
                  <img src={userState.profileImage?.url || defaultAvt}></img>

                  <input
                    ref={elementInputProfileImage}
                    type="file"
                    onChange={handleChangeProfileImage}
                    accept="image/jpg, image/jpeg, image/png"
                  />
                </div>
                <div
                  onClick={() => elementInputProfileImage.current.click()}
                  className={cx('btn')}
                  style={{ marginTop: '32px' }}
                >
                  {userState.profileImage?.url ? 'Đổi ảnh' : 'Thêm ảnh'}
                </div>
              </div>
              <div className={cx('field')} style={{ maxWidth: '800px', marginTop: '40px' }}>
                <label className={cx('field-label')}>Ảnh đại diện</label>
                <div className={cx('img-wrapper')} style={{ width: '150px', height: '150px' }}>
                  <img src={userState.avatar?.url || defaultAvt}></img>

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
                  value={userState.linkFacebook}
                  onChange={handleChangeInputBasic}
                  name="linkFacebook"
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
