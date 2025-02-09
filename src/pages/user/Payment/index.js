import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { IoChevronBack } from 'react-icons/io5';
import { FaAngleDown } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import DropDown from '../CreateCampaign/Perks/NewPerk/ItemShipping/DropDown';
import Footer from '~/layout/components/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import formatMoney from '~/utils/formatMoney';
import axios from 'axios';
import { PaymentModal, ItemPayment } from './components';
import { useGetCampaignByIdQuery } from '~/hooks/api/queries/user/campaign.query';
import { useGetCurrentUserQuery } from '~/hooks/api/queries/user/user.query';
import {
  usePaymentCryptoMutation,
  usePaymentMomoMutation,
  usePaymentStripeMutation,
} from '~/hooks/api/mutations/user/contribution.mutation';
import { defaultAvt } from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDebouncedCallback } from 'use-debounce';
import ConnectWalletModal from './components/ConnectWalletModal';
import { parseEther } from 'ethers';
import { toast } from 'react-toastify';
import { factoryContract } from '~/redux/slides/Web3';
import { useMintNFTMutation } from '~/hooks/api/mutations/user/nft.mutation';

const cx = classNames.bind(styles);

function Payment() {
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lct = useLocation();
  let payment = null;
  let money = null;
  let ethPrice = null;
  let cryptocurrencyMode = false;
  let ethToVnd = 0;
  if (lct.state.hasPerk) {
    payment = lct.state.res;
  } else {
    money = lct.state.money;
    ethPrice = lct.state.ethPrice;
    cryptocurrencyMode = lct.state.cryptocurrencyMode;
    ethToVnd = lct.state.ethToVnd;
  }
  const { id } = useParams();
  const [campaign, setCampaign] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [listLocationShip, setListLocationShip] = useState([]);
  const [shipFee, setShipFee] = useState(0);
  const [location, setLocation] = useState('');
  const [isAcceptRule, setAcceptRule] = useState(false);
  const element = useRef(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);

  const [contribution, setContribution] = useState(() => {
    return {
      shippingInfo: {
        estDeliveryDate: payment?.estDeliveryDate,
      },
      email: '',
      bankName: '',
      bankAccountNumber: '',
      bankUsername: '',
      campaignId: id,
      money: payment ? payment.total : money,
      perks: payment?.listPerkPayment.map((item) => {
        const newItem = { ...item };
        delete newItem.shippingFees;
        return {
          ...newItem,
          price: Number(newItem.price),
        };
      }),
    };
  });
  useEffect(() => {
    console.log(contribution);
  }, [contribution]);
  const [moneyState, setMoneyState] = useState('');
  const [ethPriceState, setETHPriceState] = useState('');
  useEffect(() => {
    setMoneyState(money);
  }, [money]);

  useEffect(() => {
    setETHPriceState(ethPrice);
  }, [ethPrice]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (element.current && !element.current.contains(event.target)) {
        setShowLocation(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [element]);

  const { data: responseUser } = useGetCurrentUserQuery();
  useEffect(() => {
    if (responseUser) {
      setCurrentUser(responseUser);
    }
  }, [responseUser]);
  const { data: dataCampaign } = useGetCampaignByIdQuery(id);
  useEffect(() => {
    if (dataCampaign) {
      setCampaign(dataCampaign);
    }
  }, [dataCampaign]);

  const getListLocationShip = async () => {
    try {
      const res = await axios.get('https://provinces.open-api.vn/api/p');
      setListLocationShip(res.data.map((item) => item.name));
    } catch (error) {}
  };
  useEffect(() => {
    getListLocationShip();
  }, []);
  useEffect(() => {
    if (!payment) return;
    let max = 0;
    if (location) {
      console.log(location);
      for (let i = 0; i < payment.listPerkPayment.length; i++) {
        const perk = payment.listPerkPayment[i];

        let fee = perk.shippingFees.find((x) => x.location === location)?.fee || 0;
        if (!fee) {
          fee = perk.shippingFees.find(
            (x) => x.location === 'Các tỉnh thành còn lại' || x.location === 'Tất cả các tỉnh thành',
          )?.fee;
        }
        fee = Number(fee);
        max = fee > max ? fee : max;
      }
      setShipFee(max);
      setContribution((prev) => ({
        ...prev,
        shippingInfo: {
          ...prev.shippingInfo,
          province: location,
        },
      }));
    }
  }, [location]);
  useEffect(() => {
    if (!payment) return;
    setContribution((prev) => ({ ...prev, money: prev.money + shipFee }));
  }, [shipFee]);

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContribution((prev) => ({
      ...prev,
      shippingInfo: {
        ...prev.shippingInfo,
        [name]: value,
      },
    }));
  };
  const handleChangeInputBank = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContribution((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethod = (method) => {
    if (method === 'stripe') {
      stripeMethod();
    } else if (method === 'momo') {
      momoMethod();
    } else if (method === 'crypto') {
      CryptoMethod();
    }
  };
  const paymentStripeMutation = usePaymentStripeMutation();
  const stripeMethod = async () => {
    contribution.userId = currentUser.id ?? '';
    contribution.shippingFee = shipFee;
    if (currentUser.id) contribution.email = currentUser.email;
    console.log(JSON.stringify(contribution));

    dispatch(setLoading(true));
    paymentStripeMutation.mutate(contribution, {
      onSuccess(data) {
        window.location.href = data.url;
      },
      onError(error) {
        console.log(error);
      },
      onSettled() {
        dispatch(setLoading(false));
      },
    });
  };

  const paymentMomoMutation = usePaymentMomoMutation();
  const momoMethod = async () => {
    contribution.userId = currentUser.id ?? '';
    contribution.shippingFee = shipFee;
    if (currentUser.id) contribution.email = currentUser.email;
    console.log(JSON.stringify(contribution));

    dispatch(setLoading(true));
    paymentMomoMutation.mutate(contribution, {
      onSuccess(data) {
        window.location.href = data.payUrl;
      },
      onError(error) {
        console.log(error);
      },
      onSettled() {
        dispatch(setLoading(false));
      },
    });
  };

  const CryptoMethod = () => {
    setShowConnectWalletModal(true);
  };

  const metamask = useSelector((state) => state.metamask);
  const paymentCryptoMutation = usePaymentCryptoMutation();
  const handlePaymentCrypto = async () => {
    contribution.userId = currentUser.id ?? '';
    contribution.shippingFee = shipFee;
    contribution.amountCrypto = money ? ethPriceState : payment.totalETH.toString();
    contribution.customerWalletAddress = metamask.account;
    if (currentUser.id) contribution.email = currentUser.email;
    console.log(contribution);

    if (!contribution.perks) {
      transferFund();
    } else if (contribution.perks?.length > 0) {
      transferPerk();
    }
  };

  const transferFund = async () => {
    dispatch(setLoading(true));
    try {
      const priceWei = parseEther(ethPriceState);
      const tx = await factoryContract.transferFund({ value: priceWei });
      console.log('Transaction sent:', tx);
      const receipt = await tx.wait();
      const transactionHash = tx.hash;
      contribution.transactionHash = transactionHash;

      if (receipt.status === 1) {
        paymentCryptoMutation.mutate(contribution, {
          onSuccess(data) {
            navigate('/payment/thanks');
            dispatch(setLoading(false));
          },
          onError(error) {
            console.log(error);
            toast.error('Giao dịch không thành công');
            dispatch(setLoading(false));
          },
        });
      } else {
        toast.error('Có lỗi khi thanh toán');
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.error('Có lỗi khi thanh toán');
      dispatch(setLoading(false));
    }
  };

  const mintNFTMutation = useMintNFTMutation();

  const transferPerk = async () => {
    const userId = currentUser.id ?? '';
    const mintPerks = contribution.perks
      .filter((item) => item.isNFT)
      .map((item) => ({
        perkId: item.id,
        quantity: item.quantity,
      }));
    dispatch(setLoading(true));
    mintNFTMutation.mutate(
      {
        userId,
        perks: mintPerks,
      },
      {
        async onSuccess(data) {
          const perks = contribution.perks.map((perk) => {
            const perkResponse = data.find((item) => item.perkId === perk.id);
            return {
              quantity: perk.quantity,
              isNFT: perk.isNFT,
              priceWhenNotNFT: parseEther(perk.ethPrice),
              nftContractAddress: perkResponse?.nftContractAddress ?? '0x0000000000000000000000000000000000000000',
              tokenIds: perkResponse?.tokenIds ?? [],
            };
          });
          console.log(payment.totalETH.toString());
          try {
            const totalAmountWei = parseEther(payment.totalETH.toString());
            console.log(perks);
            const tx = await factoryContract.transferPerk(perks, { value: totalAmountWei });
            console.log('Transaction sent:', tx);
            const receipt = await tx.wait();

            const transactionHash = tx.hash;
            contribution.transactionHash = transactionHash;

            if (receipt.status === 1) {
              const newContribution = {
                ...contribution,
                perks: contribution.perks.map((perk) => {
                  const perkResponse = data.find((item) => item.perkId === perk.id);
                  return {
                    ...perk,
                    uri: perkResponse?.uri ?? '',
                    tokenIds: perkResponse?.tokenIds ?? [],
                  };
                }),
              };
              paymentCryptoMutation.mutate(newContribution, {
                onSuccess(data) {
                  navigate('/payment/thanks');
                  dispatch(setLoading(false));
                },
                onError(error) {
                  console.log(error);
                  toast.error('Giao dịch không thành công');
                  dispatch(setLoading(false));
                },
              });
            } else {
              toast.error('Có lỗi khi thanh toán');
              dispatch(setLoading(false));
            }
          } catch (error) {
            console.log(error);
          }
        },
        onError(error) {
          console.log(error);
          dispatch(setLoading(false));
          toast.error('Có lỗi trong quá trình thanh toán');
        },
      },
    );
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setETHPriceState((value / ethToVnd).toFixed(6));
    },
    500,
  );
  const handleChangeMoney = (e) => {
    const value = e.target.value;
    debounced(value);
    setMoneyState(value);
  };
  const [textValidateFullname, setTextValidateFullname] = useState('');
  const validateFullname = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateFullname('* Vui lòng nhập đầy đủ thông tin họ tên');
      return false;
    } else {
      setTextValidateFullname('');
      return true;
    }
  };

  const [textValidateEmail, setTextValidateEmail] = useState('');
  const validateEmail = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateEmail('* Vui lòng nhập email');
      return false;
    }
    if (
      !value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setTextValidateEmail('* Định dạng email không hợp lệ');
      return false;
    }
    setTextValidateEmail('');
    return true;
  };

  const [textValidateProvince, setTextValidateProvince] = useState('');
  const validateProvince = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateProvince('* Vui lòng chọn tỉnh hoặc thành phố');
      return false;
    } else {
      setTextValidateProvince('');
      return true;
    }
  };
  const [textValidateDistrict, setTextValidateDistrict] = useState('');
  const validateDistrict = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateDistrict('* Vui lòng nhập huyện');
      return false;
    } else {
      setTextValidateDistrict('');
      return true;
    }
  };
  const [textValidateCommune, setTextValidateCommune] = useState('');
  const validateCommune = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateCommune('* Vui lòng nhập xã');
      return false;
    } else {
      setTextValidateCommune('');
      return true;
    }
  };
  const [textValidateDetailAddress, setTextValidateDetailAddress] = useState('');
  const validateDetailAddress = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateDetailAddress('* Vui lòng nhập địa chỉ chi tiết');
      return false;
    } else {
      setTextValidateDetailAddress('');
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

  const [textValidateBankName, setTextValidateBankName] = useState('');
  const validateBankName = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateBankName('* Vui lòng nhập tên ngân hàng');
      return false;
    } else {
      setTextValidateBankName('');
      return true;
    }
  };

  const [textValidateBankAccountNumber, setTextValidateBankAccountNumber] = useState('');
  const validateBankAccountNumber = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateBankAccountNumber('* Vui lòng nhập số tài khoản ngân hàng');
      return false;
    } else {
      setTextValidateBankAccountNumber('');
      return true;
    }
  };

  const [textValidateBankUsername, setTextValidateBankUsername] = useState('');
  const validateBankUsername = (value) => {
    if (!value || value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateBankUsername('* Vui lòng nhập tên tài khoản ngân hàng');
      return false;
    } else {
      setTextValidateBankUsername('');
      return true;
    }
  };

  const handlePayment = () => {
    // validate
    if (payment) {
      let flagFullname = validateFullname(contribution.shippingInfo?.fullName);
      let flagProvince = validateProvince(contribution.shippingInfo?.province);
      let flagDistrict = validateDistrict(contribution.shippingInfo?.district);
      let flagCommune = validateCommune(contribution.shippingInfo?.ward);
      let flagAddressDetail = validateDetailAddress(contribution.shippingInfo?.detail);
      let flagSDT = validateSDT(contribution.shippingInfo?.phoneNumber);

      if (!(flagFullname && flagProvince && flagDistrict && flagCommune && flagAddressDetail && flagSDT)) {
        return;
      }
    }
    if (!currentUser.id) {
      if (!validateEmail(contribution.email)) return;
    }
    const flagBankName = validateBankName(contribution.bankName);
    const flagBankAccountNumber = validateBankAccountNumber(contribution.bankAccountNumber);
    const flagBankUserName = validateBankUsername(contribution.bankUsername);
    if (!(flagBankName && flagBankAccountNumber && flagBankUserName)) return;
    setShowPaymentModal(true);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <a href="/" className={cx('logo')}>
          GIVEFUN
        </a>
      </div>

      <div className={cx('inner')}>
        <div className={cx('payment-info')}>
          <div className={cx('payment-backIcon')} onClick={() => navigate(-1)}>
            <span>
              <IoChevronBack style={{ fontSize: '24px', fontWeight: 'bold' }} />
            </span>
            <span>Back</span>
          </div>
          <div
            style={{
              color: '#6a6a6a',
              fontWeight: '700',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            BẠN ĐANG ĐÓNG GÓP CHO
          </div>
          <div style={{ fontSize: '24px', fontWeight: '600' }}>{campaign.title}</div>

          <div className="mt-[20px]">
            <span className="text-[#e51075] font-semibold">Chủ sở hữu</span>
          </div>
          <div className={cx('user-info')}>
            <img className={cx('user-img')} src={campaign.owner?.avatar || defaultAvt}></img>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={cx('user-name')}>{campaign.owner?.fullName}</div>
              <span className={cx('user-detail')}>
                <span>{campaign.owner?.email}</span>
              </span>
            </div>
          </div>

          {currentUser.id && (
            <>
              <div className="mt-[28px]">
                <span className="text-[#e51075] font-semibold">Người dùng đóng góp</span>
              </div>
              <div className={cx('my-user-info')}>
                <img className={cx('user-img')} src={currentUser.avatar || defaultAvt}></img>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'inline-block', fontWeight: '700' }}>{currentUser.fullName}</div>
                  <div style={{ display: 'inline-block' }}>{currentUser.email}</div>
                </div>
              </div>
            </>
          )}

          {!currentUser.id && !payment && (
            <div className={cx('shipping-address')}>
              <div className={cx('title')}>Thông tin liên hệ</div>

              <div className={cx('entreField')}>
                <label className={cx('entreField-label')}>
                  Email <span className={cx('entreField-required')}>*</span>
                </label>

                <input
                  type="text"
                  className={cx('itext-field')}
                  name="email"
                  value={contribution.email}
                  onChange={handleChangeInputBank}
                />
                <span className={cx('entreField-error')}>{textValidateEmail}</span>
              </div>
            </div>
          )}
          {payment && (
            <div className={cx('shipping-address')}>
              <div className={cx('title')}>Thông tin giao nhận</div>
              <div className={cx('entreField')}>
                <label className={cx('entreField-label')}>
                  Họ và tên <span className={cx('entreField-required')}>*</span>
                </label>

                <input
                  type="text"
                  className={cx('itext-field')}
                  name="fullName"
                  value={contribution.shippingInfo?.fullName}
                  onChange={handleChangeInput}
                />
                <span className={cx('entreField-error')}>{textValidateFullname}</span>
              </div>
              {!currentUser.id && (
                <div className={cx('entreField')}>
                  <label className={cx('entreField-label')}>
                    Email <span className={cx('entreField-required')}>*</span>
                  </label>

                  <input
                    type="text"
                    className={cx('itext-field')}
                    name="email"
                    value={contribution.email}
                    onChange={handleChangeInputBank}
                  />
                  <span className={cx('entreField-error')}>{textValidateEmail}</span>
                </div>
              )}

              <div className={cx('entreField')}>
                <label className={cx('entreField-label')}>
                  Tỉnh / Thành phố <span className={cx('entreField-required')}>*</span>
                </label>

                <div className={cx('entreField-select')}>
                  <a
                    className={cx('entreDropdown-select', 'itext-field', {
                      borderInput: showLocation,
                    })}
                    onClick={() => setShowLocation((prev) => !prev)}
                    ref={element}
                  >
                    <span>{contribution.shippingInfo?.province || 'Chọn Tỉnh / Thành phố'}</span>

                    <FaAngleDown className={cx('icon', 'icon-down')} />
                    {showLocation && (
                      <div className={cx('dropdown-outer')} style={{ top: '-8px', transform: 'translateY(-100%)' }}>
                        <DropDown
                          listItem={listLocationShip}
                          onClickItem={(item) => setLocation(item)}
                          listLocationShipChoosen={[contribution.shippingInfo?.province]}
                        />
                      </div>
                    )}
                  </a>
                </div>
                <span className={cx('entreField-error')}>{textValidateProvince}</span>
              </div>

              <div className={cx('entreField')}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: '1' }}>
                    <label className={cx('entreField-label')}>
                      Quận / Huyện<span className={cx('entreField-required')}> *</span>
                    </label>
                    <input
                      type="text"
                      maxLength="50"
                      className={cx('itext-field')}
                      name="district"
                      value={contribution.shippingInfo?.district}
                      onChange={handleChangeInput}
                    />
                    <span className={cx('entreField-error')}>{textValidateDistrict}</span>
                  </div>
                  <div style={{ flex: '1' }}>
                    <label className={cx('entreField-label')}>
                      Xã / Phường<span className={cx('entreField-required')}> *</span>
                    </label>
                    <input
                      type="text"
                      maxLength="50"
                      className={cx('itext-field')}
                      name="ward"
                      value={contribution.shippingInfo?.ward}
                      onChange={handleChangeInput}
                    />
                    <span className={cx('entreField-error')}>{textValidateCommune}</span>
                  </div>
                </div>
              </div>
              <div className={cx('entreField')}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: '1' }}>
                    <label className={cx('entreField-label')}>
                      Chi tiết địa chỉ<span className={cx('entreField-required')}> *</span>
                    </label>
                    <input
                      type="text"
                      maxLength="50"
                      className={cx('itext-field')}
                      name="detail"
                      value={contribution.shippingInfo?.detail}
                      onChange={handleChangeInput}
                    />
                    <span className={cx('entreField-error')}>{textValidateDetailAddress}</span>
                  </div>
                  <div style={{ flex: '1' }}>
                    <label className={cx('entreField-label')}>
                      Số điện thoại<span className={cx('entreField-required')}> *</span>
                    </label>
                    <input
                      type="text"
                      maxLength="50"
                      className={cx('itext-field')}
                      name="phoneNumber"
                      value={contribution.shippingInfo?.phoneNumber}
                      onChange={handleChangeInput}
                    />
                    <span className={cx('entreField-error')}>{textValidateSDT}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={cx('shipping-address')}>
            <div className={cx('title')}>Thông tin tài khoản ngân hàng</div>
            <div className={cx('.entreField-subLabel')} style={{ marginBottom: '16px' }}>
              Cung cấp cho chúng tôi phương thức liên lạc cũng như cách hoàn trả nếu chiến dịch gây quỹ thất bại. Tất
              nhiên, bạn sẽ phải trả một khoản phí nhất định.
            </div>
            <div className={cx('entreField')}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: '1' }}>
                  <label className={cx('entreField-label')}>
                    Tên ngân hàng<span className={cx('entreField-required')}> *</span>
                  </label>
                  <input
                    type="text"
                    maxLength="50"
                    className={cx('itext-field')}
                    name="bankName"
                    value={contribution.bankName}
                    onChange={handleChangeInputBank}
                  />
                  <span className={cx('entreField-error')}>{textValidateBankName}</span>
                </div>
                <div style={{ flex: '1' }}>
                  <label className={cx('entreField-label')}>
                    Số tài khoản ngân hàng<span className={cx('entreField-required')}> *</span>
                  </label>
                  <input
                    type="text"
                    maxLength="50"
                    className={cx('itext-field')}
                    name="bankAccountNumber"
                    value={contribution.bankAccountNumber}
                    onChange={handleChangeInputBank}
                  />
                  <span className={cx('entreField-error')}>{textValidateBankAccountNumber}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <div style={{ flex: '1' }}>
                  <label className={cx('entreField-label')}>
                    Tên tài khoản ngân hàng<span className={cx('entreField-required')}> *</span>
                  </label>
                  <input
                    type="text"
                    maxLength="50"
                    className={cx('itext-field')}
                    name="bankUsername"
                    value={contribution.bankUsername}
                    onChange={handleChangeInputBank}
                  />
                  <span className={cx('entreField-error')}>{textValidateBankUsername}</span>
                </div>
                <div style={{ flex: '1' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('payment-summary')}>
          <div className={cx('shipping-address')}>
            <div className={cx('title')}>Tóm tắt đóng góp</div>

            {!payment && (
              <div className="mt-6">
                <div className={cx('inputCurrencyField')}>
                  <span className={cx('inputCurrencyField-symbol')}>$</span>
                  <input
                    type="text"
                    maxLength="50"
                    className={cx('inputCurrencyField-input')}
                    value={moneyState}
                    onChange={handleChangeMoney}
                  />
                  <span className={cx('inputCurrencyField-isoCode')}>VNĐ</span>
                </div>
              </div>
            )}
            {payment && (
              <>
                <div style={{ marginTop: '32px' }}>
                  {payment?.listPerkPayment.map((item, index) => {
                    return <ItemPayment item={item} key={index} cryptocurrencyMode={payment.cryptocurrencyMode} />;
                  })}
                </div>

                <div className={cx('separate')}></div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                  }}
                >
                  <span>Tiền đặc quyền</span>
                  <span>{formatMoney(payment.total)}VNĐ</span>
                </div>
                <div>
                  {payment.cryptocurrencyMode && (
                    <div className="text-right text-[16px]">{`${payment.totalETH}`} ETH </div>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                    marginTop: '6px',
                  }}
                >
                  <span>Tiền ship</span>
                  <span>{formatMoney(shipFee)}VNĐ</span>
                </div>
              </>
            )}
            <div
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Tổng tiền</span>
              {payment && <span>{formatMoney(payment.total + shipFee)}VNĐ</span>}
              {money && (
                <>
                  <span>{formatMoney(Number(moneyState))}VNĐ</span>
                </>
              )}
            </div>

            {money && cryptocurrencyMode && <div className="text-right text-[16px]">{`~ ${ethPriceState} `}ETH</div>}
            {payment && payment.cryptocurrencyMode && (
              <div className="text-right text-[16px]">{`~ ${payment.totalETH} `}ETH</div>
            )}

            <div
              style={{
                padding: '16px',
                marginTop: '24px',
                border: '1px solid #c8c8c8',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '14px' }}>Give Fun không phải là nơi mua sắm.</div>
              <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '11px 0' }}>
                Đóng góp của bạn là một cách để hỗ trợ một cá nhân/tổ chức là chủ sở hữu chiến dịch nhưng không đảm bảo
                rằng bạn sẽ nhận được phần thưởng.
              </p>
            </div>

            <label
              onClick={() => setAcceptRule((prev) => !prev)}
              style={{ display: 'flex', alignItems: 'center', margin: '24px 0', marginLeft: '-2px' }}
            >
              <span>
                {!isAcceptRule ? (
                  <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} />
                ) : (
                  <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                )}
              </span>
              <span style={{ marginLeft: '8px', color: '#777', fontSize: '13px' }}>
                Tôi đồng ý với Điều khoản sử dụng và đã đọc và hiểu Chính sách quyền riêng tư
              </span>
            </label>

            {isAcceptRule ? (
              <button type="button" onClick={handlePayment} className={cx('btn-payment')}>
                Thanh Toán
              </button>
            ) : (
              <button type="button" disabled onClick={handlePayment} className={cx('btn-payment-dis')}>
                Thanh Toán
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          handlePaymentMethod={handlePaymentMethod}
          cryptocurrencyMode={cryptocurrencyMode || payment.cryptocurrencyMode}
        />
      )}

      {showConnectWalletModal && (
        <ConnectWalletModal
          setShowConnectWalletModal={setShowConnectWalletModal}
          handlePaymentCrypto={handlePaymentCrypto}
        />
      )}
    </div>
  );
}

export default Payment;
