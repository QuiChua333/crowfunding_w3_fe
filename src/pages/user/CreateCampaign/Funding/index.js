import classNames from 'classnames/bind';
import SidebarCampaign from '../components/Sidebar';

import Footer from '~/layout/components/Footer';
import { FaCheck } from 'react-icons/fa6';
import styles from './Funding.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiCancel } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setPreviousLink } from '~/redux/slides/GlobalApp';
import { HeaderCreateCampaign } from '~/layout/components';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);

function FundingCampaign() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campagin, setCampaign] = useState({});
  const [campaginState, setCampaignState] = useState({});
  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCampaignState((prev) => ({ ...prev, [name]: value }));
  };
  const getCampaign = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/campaign/getCampaignById/${id}`);
      let infoBasic = {
        id: res.data.data._id,
        title: res.data.data.title || '',
        cardImage: res.data.data.cardImage || { url: '', public_id: '' },
        status: res.data.data.status,
        goal: res.data.data.goal || '',
        momoNumber: res.data.data.momoNumber || '',
        momoNumberConfirm: res.data.data.momoNumber || '',
        owner: res.data.data.owner || '',
        team: res.data.data.team || [],
      };
      setCampaign({ ...infoBasic });
      setCampaignState({ ...infoBasic });
    } catch (error) {}
  };
  useEffect(() => {
    getCampaign();
  }, []);

  const handleClickVerifyUser = async () => {
    if (campagin.owner?._id !== currentUser._id) return;
    try {
      dispatch(setPreviousLink('@campaignFund' + window.location.href));
      const res = await CustomAxios.get(`${baseURL}/user/getLinkVerifyUser/${campagin.owner._id}`);
      navigate(res.data.data);
    } catch (error) {}
  };

  const [textValidateGoal, setTextValidateGoal] = useState('');
  const validateGoal = (value) => {
    value = value.toString();
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateGoal('* Vui lòng nhập số tiền mục tiêu của chiến dịch');
      return false;
    } else {
      if (!/^\d+$/.test(value)) {
        if (value[0] === '-' && /^\d+$/.test(value.split('-').join(''))) {
          setTextValidateGoal('* Số tiền phải là một số nguyên lớn hơn 0');
          return false;
        } else {
          setTextValidateGoal('* Số tiền phải là một số nguyên');
          return false;
        }
      } else {
        if (value <= 0) {
          setTextValidateGoal('* Số tiền phải là một số nguyên lớn hơn 0');
          return false;
        } else {
          setTextValidateGoal('');
          return true;
        }
      }
    }
  };

  const [textValidateMomo, setTextValidateMomo] = useState('');
  const validateMomo = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateMomo('* Vui lòng nhập số tài khoản momo của bạn');
      return false;
    } else {
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (vnf_regex.test(value?.trim()) === false) {
        setTextValidateMomo('* Số tài khoản momo không hợp lệ ');
        return false;
      } else {
        setTextValidateMomo('');
        return true;
      }
    }
  };

  const [textValidateMomoConfirm, setTextValidateMomoConfirm] = useState('');
  const validateMomoConfirm = (value, sdt) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateMomoConfirm('* Vui lòng nhập lại số tài khoản momo của bạn');
      return false;
    } else {
      if (value?.trim() !== sdt) {
        setTextValidateMomoConfirm('* Số tài khoản momo không khớp');
        return false;
      } else {
        setTextValidateMomoConfirm('');
        return true;
      }
    }
  };

  const handleClickSaveContinue = async () => {
    const body = { ...campaginState };
    const id = body.id;
    delete body.id;
    delete body.status;
    delete body.title;
    delete body.cardImage;
    delete body.owner;
    delete body.team;

    let flagGoal = validateGoal(body.goal);
    let flagMomo = validateMomo(body.momoNumber);
    let flagMomoConfirm = validateMomoConfirm(body.momoNumberConfirm, body.momoNumber);

    if (flagGoal && flagMomo && flagMomoConfirm) {
      dispatch(setLoading(true));
      try {
        await CustomAxios.patch(`${baseURL}/campaign/editCampaign/${id}`, body);
        dispatch(setLoading(false));
        window.location.href = `/campaigns/${id}/edit/settings`;
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error.message);
      }
    }
  };
  const [isEditAll, setEditAll] = useState(null);
  const [isEditComponent, setEditComponent] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (JSON.stringify(campagin) !== '{}') {
      let edit = false;
      if (currentUser.isAdmin) edit = true;
      else {
        if (campagin.owner?._id === currentUser._id) edit = true;

        if (
          campagin.team?.some((x) => {
            return x.user === currentUser._id && x.isAccepted === true && x.canEdit === true;
          })
        ) {
          edit = true;
        }
      }
      if (edit === true) {
        setShowErrorDelete(false);
      } else {
        setContentError('Bạn không có quyền chỉnh sửa lúc này!');
        setShowErrorDelete(true);
      }
      setEditAll(edit);
      if (campagin.status === 'Đang gây quỹ') {
        setEditComponent(false);
      }
    }
  }, [campagin]);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const [contentError, setContentError] = useState('');

  return (
    <>
      <div className={cx('wrapper')}>
        <SidebarCampaign
          current={6}
          status={campagin.status}
          title={campagin.title}
          cardImage={campagin.cardImage?.url}
          id={id}
        />
        <div style={{ flex: '1' }}>
          <HeaderCreateCampaign />

          <div className={cx('content')} style={{ pointerEvents: !isEditAll && 'none' }}>
            <div className={cx('controlBar')}>
              <div className={cx('controlBar-container')}>
                <div className={cx('controlBar-content')}>Chiến dịch / Gây quỹ</div>
              </div>
              {showErrorDelete && (
                <div className={cx('container-error')}>
                  <TiCancel className={cx('icon-error')} />
                  <span>{contentError}</span>
                </div>
              )}
            </div>
            <div className={cx('body-content')}>
              <div className={cx('entreSection')}>
                <div className={cx('entreField-header')}>
                  Số Tiền Mục Tiêu Của Chiến Dịch <span className={cx('entreField-required')}>*</span>
                </div>
                <div className={cx('entreField-subHeader')}>
                  Bạn muốn quyên góp bao nhiêu tiền cho chiến dịch này? Yêu cầu số tiền mục tiêu tối thiểu là 10 triệu
                  đồng.
                </div>

                <div className={cx('entreField')}>
                  <div className={cx('inputCurrencyField')}>
                    <input
                      placeholder={'Ví dụ: 10000000'}
                      type="text"
                      maxlength="50"
                      className={cx('itext-field', 'inputCurrencyField-input')}
                      value={campaginState.goal}
                      onChange={handleChangeInputText}
                      name="goal"
                      disabled={!isEditComponent}
                    />
                    <span className={cx('inputCurrencyField-isoCode')}>VNĐ</span>
                  </div>
                  <span className={cx('entreField-validationLabel')}>{textValidateGoal}</span>
                </div>

                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
              </div>

              <div className={cx('entreSection')}>
                <div className={cx('entreField-header')}>Xác minh người nhận tiền</div>
                <div className={cx('entreField-subHeader')}>
                  Chủ sở hữu chiến dịch phải được xác minh để khởi động chiến dịch. Việc xác minh ID sẽ được thực hiện
                  một cách an toàn với bên thứ ba và tạo ra một nền tảng đáng tin cậy hơn cho bạn và những người ủng hộ
                  bạn.
                </div>

                <div className={cx('entreField')}>
                  {!campagin.owner?.isVerifiedUser ? (
                    <span onClick={handleClickVerifyUser} className={cx('btn-ok')} style={{ marginLeft: '0' }}>
                      XÁC MINH ID
                    </span>
                  ) : (
                    <div
                      onClick={handleClickVerifyUser}
                      className={cx('btn-green', 'inline-flex items-center gap-2')}
                      style={{ marginLeft: '0' }}
                    >
                      TÀI KHOẢN ĐÃ XÁC MINH
                      <span style={{ marginBottom: '2px', fontSize: '16px' }}>
                        <FaCheck />
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
              </div>

              <div className={cx('entreSection')}>
                <div className={cx('entreField-header')}>Thông Tin Ngân Hàng</div>
                <div className={cx('entreField-subHeader')}>
                  Điền thông tin tài khoản ngân hàng của bạn. Chúng tôi sẽ chỉ có thể gửi tiền cho bạn nếu bạn đã huy
                  động được tối thiểu 4 triệu đồng.
                </div>

                <div className={cx('entreField')}>
                  <label className={cx('entreField-label')}>
                    Số tài khoản <span className={cx('entreField-required')}>*</span>
                  </label>
                  <div className={cx('entreField-subLabel')}>
                    Nhập số tài khoản mà bạn muốn nhận tiền. Hãy đảm bảo số tài khoản thật chính xác, nếu không chúng
                    tôi sẽ không thể chuyển tiền cho bạn.
                  </div>
                  <input
                    type="text"
                    className={cx('itext-field')}
                    placeholder="000000000000"
                    value={campaginState.momoNumber}
                    onChange={handleChangeInputText}
                    name="momoNumber"
                    disabled={!isEditComponent}
                  />
                  <span className={cx('entreField-validationLabel')}>{textValidateMomo}</span>

                  <div className={cx('entreField-subLabel')} style={{ marginTop: '16px' }}>
                    Nhập lại số tài khoản.
                  </div>
                  <input
                    type="text"
                    className={cx('itext-field')}
                    placeholder="000000000000"
                    value={campaginState.momoNumberConfirm}
                    onChange={handleChangeInputText}
                    name="momoNumberConfirm"
                    disabled={!isEditComponent}
                  />
                  <span className={cx('entreField-validationLabel')}>{textValidateMomoConfirm}</span>
                </div>
                <div className={cx('container-btn')}>
                  <span onClick={handleClickSaveContinue} className={cx('btn-ok')}>
                    LƯU VÀ TIẾP TỤC
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default FundingCampaign;
