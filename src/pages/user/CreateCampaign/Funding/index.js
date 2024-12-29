import classNames from 'classnames/bind';
import { FaCheck } from 'react-icons/fa6';
import styles from './Funding.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useEditCampaignByIdMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { setTab } from '~/redux/slides/UserCampaign';
import { useQueryClient } from '@tanstack/react-query';
const cx = classNames.bind(styles);

function FundingCampaign() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campaignState, setCampaignState] = useState({});
  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCampaignState((prev) => ({ ...prev, [name]: value }));
  };

  const [isEditComponent, setEditComponent] = useState(true);
  const campaign = useSelector((state) => state.userCampaign.campaign);
  useEffect(() => {
    if (campaign) {
      let infoBasic = {
        goal: campaign.goal || '',
        bankAccountNumber: campaign.bankAccountNumber || '',
        bankName: campaign.bankName || '',
        bankUsername: campaign.bankUsername || '',
        cryptocurrencyMode: campaign.cryptocurrencyMode,
        walletAddress: campaign.walletAddress,
      };

      setCampaignState({ ...infoBasic });

      if (campaign.status === 'Đang gây quỹ') {
        setEditComponent(false);
      }
    }
  }, [campaign]);

  const handleClickVerifyUser = async () => {
    window.location.href = '/givefun/verify';
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

  const [textValidateBankAccountNumber, setTextValidateBankAccountNumber] = useState('');
  const validateBankAccountNumber = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateBankAccountNumber('* Vui lòng nhập số tài khoản ngân hàng của bạn');
      return false;
    } else {
      var vnf_regex = /^\d+$/;
      if (vnf_regex.test(value?.trim()) === false) {
        setTextValidateBankAccountNumber('* Số tài khoản ngân hàng không hợp lệ ');
        return false;
      } else {
        setTextValidateBankAccountNumber('');
        return true;
      }
    }
  };

  const [textValidateWalletAddress, setTextValidateWalletAddress] = useState('');
  const validateWalletAddress = (value) => {
    if (!campaignState.cryptocurrencyMode) {
      setTextValidateWalletAddress('');
      return true;
    }

    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateWalletAddress('* Vui lòng nhập địa chỉ ví ảo');
      return false;
    } else {
      setTextValidateWalletAddress('');
      return true;
    }
  };

  const [textBankName, setTextBankName] = useState('');
  const validateBankName = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextBankName('* Vui lòng nhập tên ngân hàng');
      return false;
    } else {
      setTextBankName('');
      return true;
    }
  };

  const [textBankUsername, setTextBankUsername] = useState('');
  const validateBankUsername = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextBankUsername('* Vui lòng nhập tên tài khoản');
      return false;
    } else {
      setTextBankUsername('');
      return true;
    }
  };

  const editCampaignByIdMutation = useEditCampaignByIdMutation();
  const queryClient = useQueryClient();
  const handleClickSaveContinue = async () => {
    const body = { ...campaignState, goal: Number(campaignState.goal) };

    let flagGoal = validateGoal(body.goal);
    let flagBankAccountNumber = validateBankAccountNumber(body.bankAccountNumber);
    let flagBankName = validateBankName(body.bankName);
    let flagBankUsername = validateBankUsername(body.bankUsername);
    let flagWalletAddress = validateWalletAddress(body.walletAddress);

    if (flagGoal && flagBankAccountNumber && flagBankName && flagBankUsername && flagWalletAddress) {
      dispatch(setLoading(true));
      editCampaignByIdMutation.mutate(
        {
          id: id,
          data: body,
        },
        {
          onSuccess(data) {
            queryClient.invalidateQueries([`getCampaignById`, id]);
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

  const handleCheckOn = () => {
    setCampaignState((prev) => ({ ...prev, cryptocurrencyMode: true }));
  };
  const handleCheckOff = () => {
    setCampaignState((prev) => ({ ...prev, cryptocurrencyMode: false }));
  };
  useEffect(() => {
    dispatch(
      setTab({
        number: 6,
        content: 'Gây quỹ',
      }),
    );
  }, []);

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
              type="number"
              maxlength="50"
              className={cx('itext-field', 'inputCurrencyField-input')}
              value={campaignState.goal}
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
          {campaign.owner?.verifyStatus !== 'Đã xác thực' ? (
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
        <div className={cx('entreField-subHeader')}>Điền thông tin tài khoản ngân hàng của bạn.</div>

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
            className={cx('itext-field', 'account-number-input')}
            placeholder="000000000000"
            value={campaignState.bankAccountNumber}
            onChange={handleChangeInputText}
            name="bankAccountNumber"
            disabled={!isEditComponent}
          />
          <span className={cx('entreField-validationLabel')}>{textValidateBankAccountNumber}</span>
        </div>
        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Tên ngân hàng <span className={cx('entreField-required')}>*</span>
          </label>

          <input
            type="text"
            className={cx('itext-field', 'mt-[10px]')}
            placeholder="Vietcombank"
            value={campaignState.bankName}
            onChange={handleChangeInputText}
            name="bankName"
            disabled={!isEditComponent}
          />
          <span className={cx('entreField-validationLabel')}>{textBankName}</span>
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Tên tài khoản <span className={cx('entreField-required')}>*</span>
          </label>

          <input
            type="text"
            className={cx('itext-field', 'mt-[10px]')}
            placeholder="Nguyễn Văn A"
            value={campaignState.bankUsername}
            onChange={handleChangeInputText}
            name="bankUsername"
            disabled={!isEditComponent}
          />
          <span className={cx('entreField-validationLabel')}>{textBankUsername}</span>
        </div>
        <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
      </div>

      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>Thông tin ví tiền ảo</div>
        <div className={cx('entreField-subHeader')}>
          Điền thông tin ví ảo để các giao dịch có thể thực hiện thanh toán dưới hình thức tiền ảo
        </div>
        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>Chế độ kích hoạt</label>
          <div className={cx('entreField-subLabel')}>
            Bạn có thể thay đổi chế độ kích hoạt thanh toán bằng tiền ảo bất kỳ lúc nào. Thay đổi chế độ thành tắt nếu
            bạn không muốn hoặc chưa sẵn sàng nhận đóng góp bằng tiền ảo.
          </div>
          <div style={{ marginTop: '16px' }}>
            <label className={cx('inputRadioGroup-radio')}>
              <input
                type="radio"
                value={'INVS'}
                name="perkVisibility"
                onChange={handleCheckOff}
                checked={!campaignState.cryptocurrencyMode}
              />
              <span className={cx('inputRadioGroup-radio-button')}></span>
              <span className={cx('inputRadioGroup-radio-label')}>
                <strong>Tắt. </strong> <span>Đặc quyền không thể thanh toán bằng tiền ảo</span>
              </span>
            </label>

            <label className={cx('inputRadioGroup-radio')}>
              <input
                type="radio"
                value={'VSBL'}
                name="perkVisibility"
                defaultChecked
                onChange={handleCheckOn}
                checked={campaignState.cryptocurrencyMode}
              />
              <span className={cx('inputRadioGroup-radio-button')}></span>
              <span className={cx('inputRadioGroup-radio-label')}>
                <strong>Bật. </strong> <span>Đặc quyền có thể thanh toán bằng tiền ảo</span>
              </span>
            </label>
          </div>
        </div>

        {campaignState.cryptocurrencyMode && (
          <>
            <div className={cx('entreField')}>
              <label className={cx('entreField-label')}>
                Địa chỉ ví <span className={cx('entreField-required')}>*</span>
              </label>
              <div className={cx('entreField-subLabel')}>
                Nhập địa chỉ ví nhận tiền đóng góp đặc quyền. Hãy đảm bảo địa chỉ ví thật chính xác, nếu không chúng tôi
                sẽ không thể chuyển tiền cho bạn.
              </div>
              <input
                type="text"
                className={cx('itext-field', 'account-number-input')}
                placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                value={campaignState.walletAddress}
                onChange={handleChangeInputText}
                name="walletAddress"
              />
              <span className={cx('entreField-validationLabel')}>{textValidateWalletAddress}</span>
            </div>
          </>
        )}

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
