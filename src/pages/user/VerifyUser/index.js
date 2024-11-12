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
import { useGetInfoVerifyUserQuery } from '~/hooks/api/queries/user/user-verify.query';
import {
  useRequestVerifyUserUserMutation,
  useUpdateVerifyUserUserMutation,
} from '~/hooks/api/mutations/user/user-verify.muatation';

const cx = classNames.bind(styles);

function VerifyUser() {
  const previousLink = useSelector((state) => state.globalApp.previousLink);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputElementFront = useRef(null);
  const inputElementBack = useRef(null);
  const [fileIdentifyCardImageFront, setFileIdentifyCardImageFront] = useState();
  const [fileIdentifyCardImageBack, setFileIdentifyCardImageBack] = useState();

  const { id } = useParams();
  const [user, setUser] = useState({});
  const handleClickBack = () => {
    window.history.back();
  };
  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangImageFront = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFileIdentifyCardImageFront(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setUser((prev) => {
          return {
            ...prev,
            identifyCardImageFront: res,
          };
        });
      };
    }
  };

  const handleChangImageBack = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFileIdentifyCardImageBack(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setUser((prev) => {
          return {
            ...prev,
            identifyCardImageBack: res,
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
        setTextValidateSDT('* Số điện thoại của bạn không hợp lệ ');
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

  const [textValidateImageUrlFront, setTextValidateImageUrlFront] = useState('');
  const validateImageUrlFront = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateImageUrlFront('* Vui lòng chọn ảnh căn cước công dân');
      return false;
    } else {
      setTextValidateImageUrlFront('');
      return true;
    }
  };

  const [textValidateImageUrlBack, setTextValidateImageUrlBack] = useState('');
  const validateImageUrlBack = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateImageUrlBack('* Vui lòng chọn ảnh căn cước công dân');
      return false;
    } else {
      setTextValidateImageUrlBack('');
      return true;
    }
  };
  const requestVerifyInfoUser = useRequestVerifyUserUserMutation();
  const handleClickVerify = async () => {
    const infoVerify = { ...user };
    let flagFullname = validateFullname(infoVerify.fullName);
    let flagSDT = validateSDT(infoVerify.phoneNumber);
    let flagBirthday = validateBirthday(infoVerify.bod);
    let flagLocation = validateLocation(infoVerify.address);
    let flagCCCD = validateCCCD(infoVerify.identifyNumber);
    let flagImageUrlFront = validateImageUrlFront(infoVerify.identifyCardImageFront || '');
    let flagImageUrlBack = validateImageUrlBack(infoVerify.identifyCardImageBack || '');

    if (flagFullname && flagSDT && flagBirthday && flagLocation && flagCCCD && flagImageUrlFront && flagImageUrlBack) {
      delete infoVerify.verifyStatus;
      delete infoVerify.email;
      delete infoVerify.verifyStatus;
      delete infoVerify.identifyCardImageFront;
      delete infoVerify.identifyCardImageBack;
      const formData = new FormData();
      formData.append('files', fileIdentifyCardImageFront);
      formData.append('files', fileIdentifyCardImageBack);

      Object.entries(infoVerify).forEach(([key, value]) => {
        formData.append(key, value);
      });
      dispatch(setLoading(true));

      requestVerifyInfoUser.mutate(formData, {
        onSuccess: (data) => {
          setTextValidateBirthday('');
          setTextValidateCCCD('');
          setTextValidateFullname('');
          setTextValidateImageUrlFront('');
          setTextValidateImageUrlBack('');
          setTextValidateLocation('');
          setTextValidateSDT('');

          toast.success('Gửi thông tin xác minh thành công');
          setUser({
            ...data,
            bod:
              (data.bod && new Date(data.bod).toISOString().substring(0, 10)) ||
              new Date().toISOString().substring(0, 10),
          });
          // setUser(data);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        },
        onSettled: () => {
          dispatch(setLoading(false));
        },
      });
    }
  };

  const updateVerifyInfoUser = useUpdateVerifyUserUserMutation();
  const handleClickUpdateVerify = async () => {
    const infoVerify = { ...user };
    let flagFullname = validateFullname(infoVerify.fullName);
    let flagSDT = validateSDT(infoVerify.phoneNumber);
    let flagBirthday = validateBirthday(infoVerify.bod);
    let flagLocation = validateLocation(infoVerify.address);
    let flagCCCD = validateCCCD(infoVerify.identifyNumber);
    let flagImageUrlFront = validateImageUrlFront(infoVerify.identifyCardImageFront || '');
    let flagImageUrlBack = validateImageUrlBack(infoVerify.identifyCardImageBack || '');

    if (flagFullname && flagSDT && flagBirthday && flagLocation && flagCCCD && flagImageUrlFront && flagImageUrlBack) {
      delete infoVerify.verifyStatus;
      delete infoVerify.email;
      delete infoVerify.verifyStatus;
      delete infoVerify.identifyCardImageFront;
      delete infoVerify.identifyCardImageBack;
      const formData = new FormData();

      if (fileIdentifyCardImageFront && fileIdentifyCardImageBack) {
        formData.append('files', fileIdentifyCardImageFront);
        formData.append('files', fileIdentifyCardImageBack);
        formData.append('filePresence', 'front');
        formData.append('filePresence', 'back');
      } else if (fileIdentifyCardImageFront) {
        formData.append('files', fileIdentifyCardImageFront);
        formData.append('filePresence', 'front');
      } else if (fileIdentifyCardImageBack) {
        formData.append('filePresence', 'back');
        formData.append('files', fileIdentifyCardImageBack);
      }

      Object.entries(infoVerify).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(setLoading(true));
      updateVerifyInfoUser.mutate(formData, {
        onSuccess: (data) => {
          setTextValidateBirthday('');
          setTextValidateCCCD('');
          setTextValidateFullname('');
          setTextValidateImageUrlFront('');
          setTextValidateImageUrlBack('');
          setTextValidateLocation('');
          setTextValidateSDT('');

          toast.success('Cập nhật thông tin xác minh thành công');
          setUser({
            ...data,
            bod:
              (data.bod && new Date(data.bod).toISOString().substring(0, 10)) ||
              new Date().toISOString().substring(0, 10),
          });
          // setUser(data);
        },
        onError: (error) => {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        },
        onSettled: () => {
          dispatch(setLoading(false));
        },
      });
    }
  };

  const { data } = useGetInfoVerifyUserQuery(id);
  useEffect(() => {
    if (data) {
      setUser({
        ...data,
        bod:
          (data.bod && new Date(data.bod).toISOString().substring(0, 10)) || new Date().toISOString().substring(0, 10),
      });
    }
  }, [data]);

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
              <span onClick={handleClickBack} style={{ fontSize: '14px', fontWeight: '500', display: 'flex' }}>
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
                <span>Email: {user.email}</span>
              </div>
              <div className={cx('info')}>
                <h3 className={cx('section')}>Khai báo thông tin</h3>
                <input placeholder="Họ và tên" value={user.fullName} name="fullName" onChange={handleChangeInputText} />
                <span className={cx('entreField-error')}>{textValidateFullname}</span>
                <input
                  placeholder="Số điện thoại"
                  value={user.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateSDT}</span>
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  value={user.bod}
                  name="bod"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateBirthday}</span>
                <input placeholder="Quê quán" value={user.address} name="address" onChange={handleChangeInputText} />
                <span className={cx('entreField-error')}>{textValidateLocation}</span>
                <input
                  placeholder="Số CCCD/ID Card"
                  value={user.identifyNumber}
                  name="identifyNumber"
                  onChange={handleChangeInputText}
                />
                <span className={cx('entreField-error')}>{textValidateCCCD}</span>
              </div>
              <div className={cx('info', 'mt-[40px]')}>
                <h3 className={cx('section')}>{`Ảnh chụp CCCD (mặt trước)`}</h3>

                <div className={cx('img-wrapper')}>
                  {!user.identifyCardImageFront && (
                    <div className={cx('no-image')}>
                      <span>Tải ảnh lên</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={inputElementFront}
                    accept="image/png, image/jpeg"
                    onChange={handleChangImageFront}
                  />
                  {user.identifyCardImageFront && (
                    <>
                      <img src={user.identifyCardImageFront} alt="CCCD của người dùng" />
                      <span onClick={() => inputElementFront.current.click()} className={cx('icon-edit')}>
                        <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                      </span>
                    </>
                  )}
                </div>
                <span className={cx('entreField-error')}>{textValidateImageUrlFront}</span>
              </div>
              <div className={cx('info')}>
                <h3 className={cx('section')}>{`Ảnh chụp CCCD (mặt sau)`}</h3>

                <div className={cx('img-wrapper')}>
                  {!user.identifyCardImageBack && (
                    <div className={cx('no-image')}>
                      <span>Tải ảnh lên</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={inputElementBack}
                    accept="image/png, image/jpeg"
                    onChange={handleChangImageBack}
                  />
                  {user.identifyCardImageBack && (
                    <>
                      <img src={user.identifyCardImageBack} alt="CCCD của người dùng" />
                      <span onClick={() => inputElementBack.current.click()} className={cx('icon-edit')}>
                        <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                      </span>
                    </>
                  )}
                </div>
                <span className={cx('entreField-error')}>{textValidateImageUrlBack}</span>
              </div>
              {user.verifyStatus === 'Đã xác thực' && (
                <>
                  <div style={{ marginTop: '48px' }}>
                    <span className={cx('verified')}>
                      <TiTick style={{ color: '#fff', fontSize: '20px' }} /> Tài khoản đã được xác minh
                    </span>
                  </div>
                </>
              )}
              {user.verifyStatus === 'Chờ xác thực' && (
                <div
                  style={{
                    marginTop: '48px',
                    gap: '16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div onClick={handleClickUpdateVerify} className={cx('btn-ok')}>
                    Gửi lại
                  </div>
                  <span className={cx('wait')}> Tài khoản đang chờ xác minh</span>
                </div>
              )}
              {user.verifyStatus === 'Chưa xác thực' && (
                <div style={{ marginTop: '48px' }}>
                  <div onClick={handleClickVerify} className={cx('btn-ok')}>
                    Xác nhận
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyUser;
