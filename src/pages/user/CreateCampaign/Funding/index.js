import classNames from 'classnames/bind';
import { FaCheck } from 'react-icons/fa6';
import styles from './Funding.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useQueryClient } from '@tanstack/react-query';
import { useGetLinkVerifyUserMutation } from '~/hooks/api/mutations/user/user.mutation';
import { useEditCampaignByIdMutation } from '~/hooks/api/mutations/user/campaign.mutation';
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
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isEditComponent, setEditComponent] = useState(true);
  const queryClient = useQueryClient();
  const dataCampaign = queryClient.getQueryData(['getCampaignById']);
  useEffect(() => {
    if (dataCampaign) {
      let infoBasic = {
        id: dataCampaign.data._id,
        title: dataCampaign.data.title || '',
        cardImage: dataCampaign.data.cardImage || { url: '', public_id: '' },
        status: dataCampaign.data.status,
        goal: dataCampaign.data.goal || '',
        momoNumber: dataCampaign.data.momoNumber || '',
        momoNumberConfirm: dataCampaign.data.momoNumber || '',
        owner: dataCampaign.data.owner || '',
        team: dataCampaign.data.team || [],
      };
      setCampaign({ ...infoBasic });
      setCampaignState({ ...infoBasic });

      if (dataCampaign.data.status === 'Đang gây quỹ') {
        setEditComponent(false);
      }
    }
  }, [dataCampaign]);

  const getLinkVerifyUserMutation = useGetLinkVerifyUserMutation();
  const handleClickVerifyUser = async () => {
    if (campagin.owner?._id !== currentUser._id) return;
    getLinkVerifyUserMutation.mutate(campagin.owner._id, {
      onSuccess(data) {
        navigate(data.data);
      },
      onError(err) {
        console.log(err);
      },
    });
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

  const editCampaignByIdMutation = useEditCampaignByIdMutation();

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
      editCampaignByIdMutation.mutate(
        {
          id,
          body,
        },
        {
          onSuccess(data) {
            navigate(`/campaigns/${id}/edit/settings`);
          },
          onError(error) {
            console.log(error.message);
          },
          onSettled() {
            dispatch(setLoading(false));
          },
        },
      );
    }
  };

  return (
    <div className={cx('body-content')}>
      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>
          Số Tiền Mục Tiêu Của Chiến Dịch <span className={cx('entreField-required')}>*</span>
        </div>
        <div className={cx('entreField-subHeader')}>
          Bạn muốn quyên góp bao nhiêu tiền cho chiến dịch này? Yêu cầu số tiền mục tiêu tối thiểu là 10 triệu đồng.
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
          Chủ sở hữu chiến dịch phải được xác minh để khởi động chiến dịch. Việc xác minh ID sẽ được thực hiện một cách
          an toàn với bên thứ ba và tạo ra một nền tảng đáng tin cậy hơn cho bạn và những người ủng hộ bạn.
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
          Điền thông tin tài khoản ngân hàng của bạn. Chúng tôi sẽ chỉ có thể gửi tiền cho bạn nếu bạn đã huy động được
          tối thiểu 4 triệu đồng.
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Số tài khoản <span className={cx('entreField-required')}>*</span>
          </label>
          <div className={cx('entreField-subLabel')}>
            Nhập số tài khoản mà bạn muốn nhận tiền. Hãy đảm bảo số tài khoản thật chính xác, nếu không chúng tôi sẽ
            không thể chuyển tiền cho bạn.
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
  );
}

export default FundingCampaign;
