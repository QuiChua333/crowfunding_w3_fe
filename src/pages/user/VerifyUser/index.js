import classNames from 'classnames/bind';
import styles from './VerifyUser.module.scss';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { logoTrangNho } from '~/assets/images';
import { PageNotFound } from '~/pages/common';
import { useGetInfoVerifyUserQuery } from '~/hooks/api/queries/user/user-verify.query';
import { useRequestVerifyUserUserMutation } from '~/hooks/api/mutations/user/user-verify.muatation';

const cx = classNames.bind(styles);

function VerifyUser() {
  const previousLink = useSelector((state) => state.globalApp.previousLink);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputElement = useRef(null);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const handleClickBack = () => {
    if (previousLink.startsWith('@campaignFund')) {
      const link = previousLink.substring(13);
      navigate(link);
    } else if (previousLink.startsWith('@settingInfo')) {
      const link = previousLink.substring(12);
      navigate(link);
    } else {
      navigate('/');
    }
  };
  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      infoVerify: {
        ...prev.infoVerify,
        [name]: value,
      },
    }));
  };
  const handleChangImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setUser((prev) => {
          return {
            ...prev,
            infoVerify: {
              ...prev.infoVerify,
              identifyCardImage: {
                ...prev.infoVerify?.identifyCardImage,
                url: res,
              },
            },
          };
        });
      };
    }
  };

  const [textValidateFullname, setTextValidateFullname] = useState('');
  const validateFullname = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateFullname('* Vui lòng đầy đủ thông tin họ tên');
      return false;
    } else {
      setTextValidateFullname('');
      return true;
    }
  };

  const [textValidateSDT, setTextValidateSDT] = useState('');
  const validateSDT = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateSDT('* Vui lòng đầy đủ thông tin số điện thoại');
      return false;
    } else {
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (vnf_regex.test(value?.trim()) === false) {
        setTextValidateSDT('* Số điện thoại của bạn kậthông hợp lệ ');
        return false;
      } else {
        setTextValidateSDT('');
        return true;
      }
    }
  };

  const [textValidateBirthday, setTextValidateBirthday] = useState('');
  const validateBirthday = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateBirthday('* Vui lòng chọn ngày sinh');
      return false;
    } else {
      setTextValidateBirthday('');
      return true;
    }
  };

  const [textValidateLocation, setTextValidateLocation] = useState('');
  const validateLocation = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateLocation('* Vui lòng đầy đủ thông tin vị trí hoặc nơi ở hiện tại');
      return false;
    } else {
      setTextValidateLocation('');
      return true;
    }
  };

  const [textValidateCCCD, setTextValidateCCCD] = useState('');
  const validateCCCD = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateCCCD('* Vui lòng đầy đủ thông tin số căn cước công dân');
      return false;
    } else {
      const regexCMTND12 = /^\d{12}$/;
      if (regexCMTND12.test(value?.trim()) === false) {
        setTextValidateCCCD('* Số căn cước của bạn không hợp lệ ');
        return false;
      } else {
        setTextValidateCCCD('');
        return true;
      }
    }
  };

  const [textValidateImageUrl, setTextValidateImageUrl] = useState('');
  const validateImageUrl = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateImageUrl('* Vui lòng chọn ảnh căn cước công dân');
      return false;
    } else {
      setTextValidateImageUrl('');
      return true;
    }
  };

  const requestVerifyInfoUser = useRequestVerifyUserUserMutation();
  const handleClickVerify = async () => {
    dispatch(setLoading(true));
    const infoVerify = { ...user.infoVerify };
    let flagFullname = validateFullname(infoVerify.fullName);
    let flagSDT = validateSDT(infoVerify.phoneNumber);
    let flagBirthday = validateBirthday(infoVerify.birthday);
    let flagLocation = validateLocation(infoVerify.detailAddress);
    let flagCCCD = validateCCCD(infoVerify.identifyCode);
    let flagImageUrl = validateImageUrl(infoVerify.identifyCardImage?.url || '');
    if (flagFullname && flagSDT && flagBirthday && flagLocation && flagCCCD && flagImageUrl) {
      requestVerifyInfoUser.mutate(infoVerify, {
        onSuccess: (res) => {
          toast.success('Gửi thông tin xác minh thành công');
          setUser(res.data.data);
        },
        onError: (error) => {
          toast.error('Có lỗi trong quá trình gửi thông tin');
          console.log(error);
        },
        onSettled: () => {
          dispatch(setLoading(false));
        },
      });
    }
  };

  const { data, isError } = useGetInfoVerifyUserQuery(id);
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);
  if (isError) {
    navigate('/not-found');
  }

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('wrap-left-side')}>
          <div className={cx('left-side')}>
            <div className={cx('logo')}>
              <img src={logoTrangNho} alt="img" />
            </div>

            <div className={cx('title')}>
              <h2>Dịch vụ tài chính an toàn</h2>
            </div>

            <div className={cx('return')} style={{ marginTop: '28px' }}>
              <span onClick={handleClickBack} style={{ fontSize: '14px', fontWeight: '500' }}>
                <IoArrowBackSharp style={{ fontSize: '18px', marginBottom: '4px' }} /> Quay về Give Fun
              </span>
            </div>

            <div className={cx('footer')}>
              <p>
                Powered by <strong style={{ fontSize: '16px', marginLeft: '4px' }}>GIVE FUN</strong>
              </p>
              <p>Chính sách</p>
              <p>Tiếng Việt</p>

              <div
                style={{
                  height: '0.5px',
                  background: '#ccc',
                  width: '400px',
                  opacity: '0.4',
                  marginBottom: '16px',
                }}
              ></div>
              <p>Liên hệ với đội ngũ hỗ trợ của Give Fun</p>
              <p>givefunsupport@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={cx('right-side')}>
          <div className={cx('inner')}>
            <div className={cx('box-info')}>
              <h3 className={cx('title')}>Xác minh thông tin cá nhân của bạn</h3>
              <p style={{ color: 'rgb(89, 97, 113)', marginTop: '8px', opacity: '0.8' }}>
                Thông tin này được thu thập để xác minh danh tính của bạn và giữ an toàn cho tài khoản của bạn.
              </p>
              <div className={cx('email')}>
                <span style={{ fontWeight: '600', color: 'rgb(65, 69, 82)' }}>{user.fullName}</span>
                <span>{user.email}</span>
              </div>

              <div className={cx('info')}>
                <h3 className={cx('section')}>Khai báo thông tin</h3>
                <input
                  placeholder="Họ và tên"
                  value={user.infoVerify?.fullName}
                  name="fullName"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateFullname}</span>
                <input
                  placeholder="Số điện thoại"
                  value={user.infoVerify?.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateSDT}</span>
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  value={
                    (user.infoVerify &&
                      user.infoVerify.birthday &&
                      new Date(user.infoVerify?.birthday).toISOString().substring(0, 10)) ||
                    new Date().toISOString().substring(0, 10)
                  }
                  name="birthday"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateBirthday}</span>
                <input
                  placeholder="Quê quán"
                  value={user.infoVerify?.detailAddress}
                  name="detailAddress"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateLocation}</span>
                <input
                  placeholder="Số CCCD/ID Card"
                  value={user.infoVerify?.identifyCode}
                  name="identifyCode"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateCCCD}</span>
              </div>

              <div className={cx('info')}>
                <h3 className={cx('section')}>Ảnh chụp thẻ công dân</h3>

                <div className={cx('img-wrapper')}>
                  {!user.infoVerify?.identifyCardImage?.url && (
                    <div className={cx('no-image')}>
                      <span>Tải ảnh lên</span>
                    </div>
                  )}
                  <input type="file" ref={inputElement} accept="image/png, image/jpeg" onChange={handleChangImage} />
                  {user.infoVerify?.identifyCardImage?.url && (
                    <>
                      <img src={user.infoVerify?.identifyCardImage?.url} alt="CCCD của người dùng" />
                      <span onClick={() => inputElement.current.click()} className={cx('icon-edit')}>
                        <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                      </span>
                    </>
                  )}
                </div>
                <span className={cx('entreField-error')}>{textValidateImageUrl}</span>
              </div>

              {user.isVerifiedUser ? (
                <>
                  <div style={{ marginTop: '48px' }}>
                    <span className={cx('verified')}>
                      <TiTick style={{ color: '#fff', fontSize: '20px' }} /> Tài khoản đã được xác minh
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {(!user.infoVerify || !user.infoVerify?.times || user.infoVerify?.times === 0) && (
                    <div style={{ marginTop: '48px' }}>
                      <div onClick={handleClickVerify} className={cx('btn-ok')}>
                        Xác nhận
                      </div>
                    </div>
                  )}
                  {user.infoVerify && user.infoVerify.times > 0 && (
                    <div
                      style={{
                        marginTop: '48px',
                        gap: '16px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div onClick={handleClickVerify} className={cx('btn-ok')}>
                        Gửi lại
                      </div>
                      <span className={cx('wait')}> Tài khoản đang chờ xác minh</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyUser;
