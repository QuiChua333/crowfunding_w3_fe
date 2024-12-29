import classNames from 'classnames/bind';
import SidebarCampaign from '../../components/Sidebar';
import { useDebouncedCallback } from 'use-debounce';
import Footer from '~/layout/components/Footer';
import ModalItem from './ModalItem';
import { TiCancel } from 'react-icons/ti';

import { AiOutlinePlus } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { HiCamera } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';

import styles from './NewPerk.module.scss';
import ItemShipping from './ItemShipping';
import ItemInclude from './ItemInclude';
import { convertDateFromString } from '~/utils';
import { useGetPerk } from '~/hooks/api/queries/user/perk.query';
import { useGetItemsByCampaignIdQuery } from '~/hooks/api/queries/user/item.query';
import { useAddPerkMutation, useEditPerkMutation } from '~/hooks/api/mutations/user/perk.mutation';
import { useAddItemMutation } from '~/hooks/api/mutations/user/item.mutation';
import { toast } from 'react-toastify';
import { setContentError, setErrofOf, setShowErrorDelete, setTab } from '~/redux/slides/UserCampaign';
import { ConnectWalletButton } from '~/components';
import { factoryContract } from '~/redux/slides/Web3';
import { useCreateNFTMutation } from '~/hooks/api/mutations/user/nft.mutation';
import { ethers, formatEther, parseEther } from 'ethers';
import { FaExternalLinkAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function NewPerk() {
  const { id, idPerk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [perkState, setPerkState] = useState({});
  const [campaign, setCampaign] = useState({});
  const [file, setFile] = useState();
  const [perk, setPerk] = useState({});
  const showErrorDelete = useSelector((state) => state.userCampaign.showErrorDelete);
  const contentError = useSelector((state) => state.userCampaign.contentError);
  const errorOf = useSelector((state) => state.userCampaign.errorOf);
  const [listLocationShip, setListLocationShip] = useState([]);
  const [listLocationShipOrigin, setListLocationShipOrigin] = useState([]);
  const [listLocationShipChoosen, setListLocationShipChoosen] = useState([]);
  const [listItemChoosen, setListItemChoosen] = useState([]);
  const [listItemsAvailable, setListItemsAvailable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [optionEdit, setOptionEdit] = useState({});
  const inputimageWrapperElement = useRef();
  const imageElement = useRef();
  const dateInputElement = useRef(null);
  const [showBtnAddShip, setShowBtnAddShip] = useState(true);
  const [isCreateNFT, setCreateNFT] = useState(false);
  const [ethToVnd, setETHToVND] = useState(0);

  const [nftData, setNFTData] = useState({});
  const metamask = useSelector((state) => state.metamask);
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setPerkState((prev) => ({
        ...prev,
        ethPrice: (value / ethToVnd).toFixed(6),
      }));
    },
    500,
  );
  const handleMouseOverDateFilter = () => {
    dateInputElement.current?.showPicker();
  };
  const campaignRoot = useSelector((state) => state.userCampaign.campaign);
  const currentUser = useSelector((state) => state.user.currentUser);
  const messageBox = useSelector((state) => state.globalApp.messageBox);

  useEffect(() => {
    getRateEthToVnd();
  }, []);

  const getRateEthToVnd = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=vnd');
      const ethToVnd = response.data.ethereum.vnd;
      setETHToVND(ethToVnd);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(
      setTab({
        number: 3,
        content: 'Đặc quyền',
      }),
    );
  }, []);

  useEffect(() => {
    if (campaignRoot) {
      let infoBasic = {
        id: campaignRoot.id,
        walletAddress: campaignRoot.walletAddress,
        status: campaignRoot.status,
      };
      setCampaign({ ...infoBasic });
    }
  }, [campaignRoot]);
  const { data: response } = useGetPerk(idPerk);
  useEffect(() => {
    if (response && idPerk !== 'new') {
      setPerkState({
        id: response.id,
        name: response.name || '',
        price: response.price || '',
        isVisible: response.isVisible || false,
        detailPerks:
          response?.detailPerks.map((item) => ({
            name: item.item?.name,
            quantity: item.quantity,
            id: item.item?.id,
          })) || [],
        description: response.description || '',
        image: response.image || '',
        quantity: response.quantity || '',
        estDeliveryDate: response.estDeliveryDate
          ? convertDateFromString(response.estDeliveryDate, 'less')
          : convertDateFromString(new Date(), 'less'),
        isShipping: response.isShipping || false,
        shippingFees: response.shippingFees || [],
        isNFT: response.isNFT || false,
        ethPrice: response.ethPrice,
      });
      setPerk({
        id: response.id,
        name: response.name || '',
        price: response.price || '',
        isVisible: response.isVisible || false,
        detailPerks:
          response?.detailPerks.map((item) => ({
            name: item.item?.name,
            quantity: item.quantity,
            id: item.item?.id,
          })) || [],
        description: response.description || '',
        image: response.image || '',
        quantity: response.quantity || '',
        estDeliveryDate: response.estDeliveryDate
          ? convertDateFromString(response.estDeliveryDate)
          : convertDateFromString(new Date()),
        isShipping: response.isShipping || false,
        shippingFees: response.shippingFees || [],
        isNFT: response.isNFT || false,
        ethPrice: response.ethPrice,
      });

      setCreateNFT(response.isNFT);

      if (response.isNFT) {
        setNFTData({
          nftName: response.nftCreation.name,
          nftSymbol: response.nftCreation.symbol,
          nftAddress: response.nftCreation.nftContractAddress,
          nftTransactionHash: response.nftCreation.transactionHash,
          nftContractAddress: response.nftCreation.nftContractAddress,
        });
      } else {
        setNFTData({});
      }
    } else {
      setPerkState({
        name: '',
        description: '',
        price: '',
        isVisible: true,
        isShipping: false,
        quantity: '',
        image: '',
        detailPerks: [],
        estDeliveryDate: '',
        shippingFees: [],
        isNFT: false,
        ethPrice: 0,
      });
      setNFTData({});
    }
  }, [response]);

  const getListLocationShip = async () => {
    try {
      const res = await axios.get('https://provinces.open-api.vn/api/p');
      setListLocationShip(res.data.map((item) => item.name));
      setListLocationShipOrigin(res.data.map((item) => item.name));
    } catch (error) {}
  };
  const { data: responseItems, refetch: refetchItems } = useGetItemsByCampaignIdQuery(id);
  useEffect(() => {
    if (responseItems) {
      setListItemsAvailable(
        responseItems.map((item) => {
          return {
            name: item.name,
            isHasOption: item.isHasOption,
            options: item.options,
            id: item.id,
          };
        }) || [],
      );
    }
  }, [responseItems]);

  useEffect(() => {
    if (listItemsAvailable.length > 0) {
      if (perkState.detailPerks?.length === 0) {
        setPerkState((prev) => ({
          ...prev,
          detailPerks: [{ name: '', quantity: 1 }],
        }));
      }
    }
  }, [listItemsAvailable]);
  useEffect(() => {
    getListLocationShip();
  }, []);
  const handleCheckVisible = () => {
    setPerkState((prev) => ({ ...prev, isVisible: true }));
  };
  const handleCheckHidden = () => {
    setPerkState((prev) => ({ ...prev, isVisible: false }));
  };
  const handleCheckShipping = () => {
    setPerkState((prev) => ({
      ...prev,
      isShipping: true,
      shippingFees:
        [...prev.shippingFees].length === 0 ? [{ location: 'Tất cả các tỉnh thành', fee: '' }] : prev.shippingFees,
    }));
  };
  const handleCheckNoShipping = () => {
    setPerkState((prev) => ({ ...prev, isShipping: false }));
  };
  useEffect(() => {
    console.log(perkState);
  }, [perkState]);
  const handleChangeDateInput = (e) => {
    let value = e.target.value;
    console.log(value);
    if (!value) {
      setPerkState((prev) => ({ ...prev, estDeliveryDate: '' }));
      return;
    }
    const res = convertDateFromString(value, 'less');

    setPerkState((prev) => ({ ...prev, estDeliveryDate: res }));
  };
  const handleChangeInputText = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'price') {
      debounced(value);
    }
    setPerkState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewItemMutation = useAddItemMutation();
  const addNewItem = async (item) => {
    addNewItemMutation.mutate(
      { ...item, campaignId: id },
      {
        onSuccess() {
          refetchItems();

          setShowModal(false);
          toast.success('Thêm vật phẩm thành công');
        },
        onError(err) {
          console.log(err);
        },
      },
    );
  };
  const updateItem = (item, index) => {
    handleChangeItemInclude(item, index);
    setListItemsAvailable((prev) => [...prev, { ...item, quantity: null }]);
  };
  const handleClickAddItem = () => {
    if (listItemsAvailable?.length === 0) {
      setOptionEdit({ type: 'add' });
      setShowModal(true);
    } else {
      setPerkState((prev) => ({
        ...prev,
        detailPerks: [...prev.detailPerks, { name: '', quantity: 1 }],
      }));
    }
  };
  const handleChangeimage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setPerkState((prev) => {
          return { ...prev, image: res };
        });
      };
    }
  };
  const handleRemoveimage = () => {
    setPerkState((prev) => {
      return { ...prev, image: '' };
    });
    setFile(null);
  };
  const handleClickAddShip = () => {
    setPerkState((prev) => ({
      ...prev,
      shippingFees: [...prev.shippingFees, { location: '', fee: '' }],
    }));
  };
  useEffect(() => {
    const lengthshippingFees = perkState.shippingFees?.length;
    if (lengthshippingFees === 0 || lengthshippingFees === 1) {
      setListLocationShip(['Tất cả các tỉnh thành', ...listLocationShipOrigin]);
      setPerkState((prev) => ({
        ...prev,
        shippingFees: [...prev.shippingFees].map((item) => {
          if (item.location === 'Các tỉnh thành còn lại')
            return {
              ...item,
              location: 'Tất cả các tỉnh thành',
            };
          else return item;
        }),
      }));
    } else if (lengthshippingFees >= 2) {
      setListLocationShip(['Các tỉnh thành còn lại', ...listLocationShipOrigin]);
      setPerkState((prev) => ({
        ...prev,
        shippingFees: [...prev.shippingFees].map((item) => {
          if (item.location === 'Tất cả các tỉnh thành')
            return {
              ...item,
              location: 'Các tỉnh thành còn lại',
            };
          else return item;
        }),
      }));
    }
  }, [perkState.shippingFees?.length]);
  useEffect(() => {
    const list = perkState.shippingFees?.filter((item) => item.location !== '');
    setListLocationShipChoosen(list?.map((item) => item.location));
  }, [perkState.shippingFees]);
  useEffect(() => {
    const list = perkState.detailPerks?.filter((item) => item.name !== '');
    setListItemChoosen(list?.map((item) => item.name));
  }, [perkState.detailPerks]);
  const handleChangeItemShipping = (itemChange, indexChange) => {
    setPerkState((prev) => ({
      ...prev,
      shippingFees: [...prev.shippingFees].map((item, index) => {
        if (index === indexChange) {
          return { ...itemChange };
        } else return item;
      }),
    }));
  };
  const handleRemoveItemShipping = (index) => {
    setPerkState((prev) => ({
      ...prev,
      shippingFees: [...prev.shippingFees].filter((item, index2) => index2 !== index),
    }));
  };
  const handleChangeItemInclude = (itemChange, indexChange) => {
    setPerkState((prev) => ({
      ...prev,
      detailPerks: [...prev.detailPerks].map((item, index) => {
        if (index === indexChange) {
          return { ...itemChange };
        } else return item;
      }),
    }));
  };
  const handleRemoveItemInclude = (index) => {
    setPerkState((prev) => ({
      ...prev,
      detailPerks: [...prev.detailPerks].filter((item, index2) => index2 !== index),
    }));
  };

  const addPerkMutation = useAddPerkMutation();
  const editPerkMutation = useEditPerkMutation();
  const handleClickSavePerk = async () => {
    // const dateString = perkState.estDeliveryDate;
    // let dateArray = dateString.split('/');
    // let month = parseInt(dateArray[0], 10);
    // let year = parseInt(dateArray[1], 10);
    // let dateObject = new Date(year, month - 1, 1);
    // perkState.estDeliveryDate = dateObject;
    const body = {
      ...perkState,
      detailPerks: perkState.detailPerks.map((item) => ({ itemId: item.id, quantity: item.quantity })),
    };
    delete body.image;
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (key === 'detailPerks' || key === 'shippingFees') {
        formData.append(key, JSON.stringify(value));
      } else formData.append(key, value);
    });

    if (file) {
      formData.append('file', file);
    }

    if (idPerk === 'new') {
      formData.append('campaignId', id);
      dispatch(setLoading(true));
      addPerkMutation.mutate(
        { formData },
        {
          onSuccess(data) {
            navigate(`/campaigns/${id}/edit/perks/table`);
          },
          onError(err) {
            console.log(err);
          },
          onSettled() {
            dispatch(setLoading(false));
          },
        },
      );
    } else {
      dispatch(setLoading(true));
      editPerkMutation.mutate(
        { perkId: perkState.id, formData },
        {
          onSuccess(data) {
            navigate(`/campaigns/${id}/edit/perks/table`);
          },
          onError(err) {
            console.log(err);
          },
          onSettled() {
            dispatch(setLoading(false));
          },
        },
      );
    }
  };

  const handleClickCreateNFT = () => {
    if (!campaign.walletAddress) {
      dispatch(
        setMessageBox({
          title: 'Thông báo',
          content: 'Vui lòng cài đặt thông tin địa chỉ ví của chiến dịch',
          contentOK: 'XÁC NHẬN',
          contentCancel: 'HỦY',
          isShow: true,
          type: 'createWallet',
        }),
      );
    } else {
      dispatch(
        setMessageBox({
          title: 'Thông báo',
          content: 'Khi đặc quyền chuyển đổi thành NFT, một số thông tin của đặc quyền sẽ không còn quyền chỉnh sửa!',
          contentOK: 'XÁC NHẬN',
          contentCancel: 'HỦY',
          isShow: true,
          type: 'transferNFT',
        }),
      );
    }
  };

  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === 'createWallet') {
        if (messageBox.result === true) {
          navigate(`/campaigns/${id}/edit/funding`);
          dispatch(setMessageBox({ result: null, isShow: false, type: '' }));
        }
      }
    }
  }, [messageBox.result]);

  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === 'transferNFT') {
        if (messageBox.result === true) {
          setCreateNFT(true);
          dispatch(setMessageBox({ result: null, isShow: false, type: '' }));
        }
      }
    }
  }, [messageBox.result]);

  const handleChangeInfoNft = (e) => {
    setNFTData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createNFTMutation = useCreateNFTMutation();

  const handleClickSaveNft = () => {
    if (!metamask.account) {
      dispatch(setContentError('Vui lòng kết nối ví Metamask'));
      dispatch(setShowErrorDelete(true));
      dispatch(setErrofOf('connectWallet'));
    } else {
      if (!perkState.isNFT) {
        const data = {
          perkId: idPerk,
          authorAddress: metamask.account,
          name: nftData.nftName,
          symbol: nftData.nftSymbol,
          nftPrice: perkState.ethPrice,
        };
        dispatch(setLoading(true));
        createNFTMutation.mutate(data, {
          onSuccess(data) {
            dispatch(setLoading(false));
            toast.success('Chuyển đổi NFT thành công');
            navigate(`/campaigns/${id}/edit/perks/table`);
          },
          onError(error) {
            console.log(error);
            dispatch(setLoading(false));
            toast.error('Có lỗi xảy ra trong quá trình tạo NFT');
          },
        });
      } else {
        return;
      }
    }
  };

  const setPriceNFTContract = async () => {
    try {
      const priceWei = parseEther(nftData.nftPrice);

      const tx = await factoryContract.setPriceNFT(metamask.account, nftData.nftAddress, priceWei);
      console.log('Transaction sent:', tx);
      tx.wait();
      toast.success('Cập nhật giá thành công');
    } catch (error) {
      console.log(error);
      toast.error('Lỗi khi cập nhật giá');
    }
  };

  useEffect(() => {
    if (errorOf === 'connectWallet' && metamask.account) {
      dispatch(setContentError(''));
      dispatch(setShowErrorDelete(false));
      dispatch(setErrofOf(''));
    }
  }, [errorOf, metamask.account]);

  return (
    <>
      <div className={cx('controlBar')}>
        <div className={cx('controlBar-container')}>
          <div className={cx('controlBar-content')}>
            Đặc quyền / {idPerk === 'new' ? 'Tạo đặc quyền' : perkState.name}
          </div>
          <div className={cx('controlBar-controls')}>
            <Link to={`/campaigns/${id}/edit/perks/table`} className={cx('btn', 'btn-cancel')}>
              Hủy
            </Link>
            <a onClick={handleClickSavePerk} className={cx('btn', 'btn-ok')}>
              Lưu
            </a>
          </div>
        </div>
        {showErrorDelete && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ff324b',
              paddingLeft: '40px',
              height: '80px',
            }}
          >
            <span style={{ color: '#fff' }}>
              <TiCancel style={{ color: '#fff', fontSize: '48px' }} />
            </span>
            <span className="text-white">{contentError}</span>
          </div>
        )}
      </div>

      <div className={cx('body')}>
        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Chi tiết Đặc quyền</div>
          <div className={cx('entreField-subHeader')}>
            Đặc quyền là những ưu đãi được cung cấp cho những người ủng hộ để đổi lấy sự hỗ trợ của họ. Hãy chắc chắn
            rằng đặc quyền của bạn không bị cấm.
          </div>

          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>Chế độ hiển thị</label>
            <div className={cx('entreField-subLabel')}>
              Bạn có thể thay đổi mức độ hiển thị của các đặc quyền của mình bất kỳ lúc nào. Thay đổi chế độ hiển thị
              thành ẩn nếu bạn đang làm việc với một đặc quyền chưa sẵn sàng hoặc nếu bạn không muốn người ủng hộ yêu
              cầu đặc quyền đó nữa.
            </div>
            <div style={{ marginTop: '16px' }}>
              <label className={cx('inputRadioGroup-radio')}>
                <input
                  type="radio"
                  value={'VSBL'}
                  name="perkVisibility"
                  defaultChecked
                  onChange={handleCheckVisible}
                  checked={perkState.isVisible}
                />
                <span className={cx('inputRadioGroup-radio-button')}></span>
                <span className={cx('inputRadioGroup-radio-label')}>
                  <strong>Hiển thị. </strong> <span>Đặc quyền có sẵn để yêu cầu</span>
                </span>
              </label>

              <label className={cx('inputRadioGroup-radio')}>
                <input
                  type="radio"
                  value={'INVS'}
                  name="perkVisibility"
                  onChange={handleCheckHidden}
                  checked={!perkState.isVisible}
                />
                <span className={cx('inputRadioGroup-radio-button')}></span>
                <span className={cx('inputRadioGroup-radio-label')}>
                  <strong>Ẩn. </strong> <span>Đặc quyền không có sẵn để yêu cầu</span>
                </span>
              </label>
            </div>
          </div>

          <div className={cx('entreField', `${perkState.isNFT && 'pointer-events-none'}`)}>
            <label className={cx('entreField-label')}>
              Trị giá<span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Đặt số tiền bạn muốn thu từ những người ủng hộ yêu cầu đặc quyền này. Số tiền này sẽ thể hiện số tiền bạn
              muốn nhận cho tất cả các vật phẩm có trong đặc quyền này.
            </div>
            <div className={cx('inputCurrencyField')}>
              <span className={cx('inputCurrencyField-symbol')}>$</span>
              <input
                type="text"
                maxLength="50"
                className={cx('itext-field', 'inputCurrencyField-input')}
                name="price"
                value={perkState.price}
                onChange={handleChangeInputText}
              />
              <span className={cx('inputCurrencyField-isoCode')}>VNĐ</span>
            </div>

            <div className={cx('inputCurrencyField', 'crypto')} style={{ marginTop: '8px' }}>
              <span className={cx('inputCurrencyField-symbol')}>$</span>
              <input
                type="text"
                maxLength="50"
                className={cx('itext-field', 'inputCurrencyField-input')}
                name="price"
                value={perkState.ethPrice}
                disabled={true}
              />
              <span className={cx('inputCurrencyField-isoCode')}>ETH</span>
            </div>
          </div>

          <div className={cx('entreField', `${perkState.isNFT && 'pointer-events-none'}`)}>
            <label className={cx('entreField-label')}>
              Tiêu đề <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Tiêu đề cho đặc quyền của bạn là tiêu đề sẽ xuất hiện trên trang chiến dịch của bạn và trên khắp GIVE -
              FUN. Tạo tiêu đề mô tả đúng nhất nội dung của đặc quyền này.
            </div>
            <input
              type="text"
              className={cx('itext-field')}
              name="name"
              value={perkState.name}
              onChange={handleChangeInputText}
            />
            {/* <div className={cx('entreField-validationLabel')}>50</div> */}
          </div>

          <div className={cx('entreField', `${perkState.isNFT && 'pointer-events-none'}`)}>
            <label className={cx('entreField-label')}>
              Các vật phẩm <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Thêm các vật phẩm có trong đặc quyền này. Vật phẩm có thể có giá trị vật chất, tinh thần, sự trải nghiệm
              hoặc thậm chí chỉ là một lời cảm ơn. Chỉ định số lượng mặt hàng và thêm các mặt hàng bổ sung để tạo gói
              đặc quyền.
            </div>

            {listItemsAvailable.length > 0 && (
              <>
                {perkState.detailPerks?.length > 0 && (
                  <div style={{ width: '90%' }}>
                    <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                      <div style={{ padding: '6px' }} className="w-[70%]">
                        <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                          Lựa chọn vật phẩm
                        </label>
                      </div>
                      <div style={{ padding: '6px' }} className="w-[30%]">
                        <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                          Số lượng
                        </label>
                      </div>
                    </div>

                    {perkState.detailPerks.map((item, index) => {
                      return (
                        <ItemInclude
                          key={index}
                          index={index}
                          onChangeItem={handleChangeItemInclude}
                          removeItem={handleRemoveItemInclude}
                          listItemsAvailable={listItemsAvailable}
                          itemData={item}
                          lengthListItem={perkState.detailPerks?.length}
                          setOpenModalItem={setShowModal}
                          setOptionEdit={setOptionEdit}
                          listItemChoosen={listItemChoosen}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}

            <div
              onClick={handleClickAddItem}
              style={{ padding: '16px 0', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#eee5f2',
                  color: '#7a69b3',
                  borderRadius: '50%',
                  marginRight: '12px',
                }}
              >
                <AiOutlinePlus />
              </span>
              <span style={{ color: '#7a69b3', fontWeight: '500', letterSpacing: '1px' }}>THÊM VẬT PHẨM</span>
            </div>
          </div>

          <div className={cx('entreField', `${perkState.isNFT && 'pointer-events-none'}`)}>
            <label className={cx('entreField-label')}>
              Mô tả <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Mô tả chi tiết về đặc quyền này. Hãy sáng tạo, đây là cơ hội để bạn thu hút những người ủng hộ bằng cách
              cho họ biết về những gì họ sẽ nhận được sau khi yêu cầu đặc quyền này.
            </div>
            <textarea
              className={cx('itext-field')}
              style={{ minHeight: '275px' }}
              name="description"
              value={perkState.description}
              onChange={handleChangeInputText}
            ></textarea>
            {/* <div className={cx('entreField-validationLabel')}>350</div> */}
          </div>

          <div className={cx('entreField', `${perkState.isNFT && 'pointer-events-none'}`)}>
            <label className={cx('entreField-label')}>Ảnh đặc quyền</label>
            <div className={cx('entreField-subLabel')}>
              Vui lòng không sử dụng hình ảnh có chứa văn bản như giá cả và mức giảm giá hoặc màu sắc của thương hiệu
              GIVE - FUN. Kích thước được đề xuất: 660x440 pixel. Hỗ trợ PNG hoặc JPG.
            </div>
            <div>
              <div
                onClick={() => {
                  imageElement.current.click();
                }}
                className={cx('entreField-input-image')}
                ref={inputimageWrapperElement}
              >
                {!perkState.image && (
                  <div className={cx('tertiaryAction')}>
                    <span className={cx('tertiaryAction-icon')}>
                      <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                    </span>

                    <span className={cx('tertiaryAction-text')}>Upload image</span>
                  </div>
                )}

                {perkState.image && (
                  <div>
                    <img className={cx('img-copntainer-perk')} src={perkState.image} accept="image/png, image/jpeg" />
                    <div className={cx('editFile')}>
                      <span className={cx('editFile-icon')}>
                        <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          imageElement.current.value = null;
                          handleRemoveimage();
                        }}
                        className={cx('editFile-icon')}
                      >
                        <IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <input
                onChange={handleChangeimage}
                className={cx('entreImage-file')}
                ref={imageElement}
                name="file"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
              />
            </div>
          </div>

          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>Số lượng hiện có sẵn </label>
            <div className={cx('entreField-subLabel')}>
              Bạn có thể giới hạn số lượng có sẵn cho người ủng hộ dựa trên khối lượng sản xuất. Để trống trường này có
              nghĩa là không có giới hạn số lượng.
            </div>
            <input
              type="text"
              className={cx('itext-field-2')}
              name="quantity"
              value={perkState.quantity}
              onChange={handleChangeInputText}
            />
          </div>
        </div>

        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Ngày giao dự kiến</div>
          <div className={cx('entreField-subHeader')}>
            Ước tính ngày giao đặc quyền này cho những người ủng hộ bạn. Ngày này và những thay đổi về ngày giao trong
            tương lai sẽ xuất hiện trên thẻ đặc quyền để những người ủng hộ bạn có thể xem. Chúng tôi khuyên bạn nên
            đăng bản cập nhật cho những người ủng hộ bất cứ khi nào bạn thay đổi ngày này.
          </div>
          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>Ngày dự kiến </label>

            <div style={{ position: 'relative', width: 'fit-content' }}>
              <input
                type="text"
                className={cx('itext-field-2')}
                name="estDeliveryDate"
                value={perkState.estDeliveryDate}
                disabled
              />
              <div
                style={{
                  position: 'absolute',
                  width: 'fit-content',
                  right: '12px',
                  top: '8px',
                  cursor: 'pointer',
                }}
                onClick={handleMouseOverDateFilter}
              >
                <div
                  className={cx('function-button')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <AiFillCaretDown />
                </div>
                <input
                  onChange={handleChangeDateInput}
                  ref={dateInputElement}
                  type="month"
                  style={{ opacity: '0', top: '6px', left: '6px', right: '0', position: 'absolute' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
        </div>

        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Giao hàng</div>
          <div className={cx('entreField-subHeader')}>
            <div>Đặc quyền này có chứa các mặt hàng mà bạn cần vận chuyển không?</div>
            <div>
              <span className={cx('entreField-required')}>* </span>Lưu ý: Không áp dụng cho phương thức thanh toán bằng
              tiền ảo.
            </div>
          </div>
          <div style={{ marginTop: '32px' }}>
            <label onClick={handleCheckNoShipping} className={cx('inputRadioGroup-radio')}>
              <input
                type="radio"
                value={'VSBL'}
                name="shippingAddressRequired"
                defaultChecked
                checked={!perkState.isShipping}
              />
              <span className={cx('inputRadioGroup-radio-button')}></span>
              <span className={cx('inputRadioGroup-radio-label')}>
                Không. Đặc quyền này không chứa các mặt hàng cần vận chuyển
              </span>
            </label>

            <label onClick={handleCheckShipping} className={cx('inputRadioGroup-radio')}>
              <input type="radio" value={'INVS'} name="shippingAddressRequired" checked={perkState.isShipping} />
              <span className={cx('inputRadioGroup-radio-button')}></span>
              <span className={cx('inputRadioGroup-radio-label')}>
                Có. Đặc quyền này chứa các mặt hàng cần vận chuyển
              </span>
            </label>
          </div>
          {perkState.isShipping && (
            <>
              {perkState.shippingFees?.length > 0 && (
                <div className={cx('entreField')}>
                  <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                    <div style={{ padding: '6px' }} className="w-8/12">
                      <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                        Địa điểm vận chuyển
                      </label>
                    </div>
                    <div style={{ padding: '6px' }} className="w-4/12">
                      <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                        Phí vận chuyển
                      </label>
                    </div>
                    <di className="w-1/12"></di>
                  </div>
                  {perkState.shippingFees.map((item, index) => {
                    return (
                      <ItemShipping
                        key={index}
                        index={index}
                        onChangeItem={handleChangeItemShipping}
                        removeItem={handleRemoveItemShipping}
                        listLocationShip={listLocationShip}
                        lengthListItemShiping={perkState.shippingFees.length}
                        itemData={item}
                        listLocationShipChoosen={listLocationShipChoosen}
                      />
                    );
                  })}
                </div>
              )}
              {showBtnAddShip && (
                <div
                  onClick={handleClickAddShip}
                  style={{ padding: '16px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#eee5f2',
                      color: '#7a69b3',
                      borderRadius: '50%',
                      marginRight: '12px',
                      fontSize: '16px',
                    }}
                  >
                    <AiOutlinePlus />
                  </span>
                  <span style={{ color: '#7a69b3', fontWeight: '600' }}>THÊM ĐỊA ĐIỂM</span>
                </div>
              )}
            </>
          )}
          <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
        </div>

        {idPerk !== 'new' && campaign.status === 'Đang gây quỹ' && (
          <div className={cx('entreSection')}>
            <div className={cx('entreField-header')}>NFT</div>
            <div className={cx('entreField-subHeader')}>
              Chuyển đổi đặc quyền thành NFT - Tạo tài khoản kỹ thuật số trên không gian Blockchain.
            </div>

            {!isCreateNFT && (
              <a
                onClick={handleClickCreateNFT}
                className={cx('btn', 'btn-ok')}
                style={{ marginLeft: '0px', marginTop: '12px', display: 'inline-block' }}
              >
                CHUYỂN ĐỔI THÀNH NFT
              </a>
            )}
            {isCreateNFT && (
              <>
                {!metamask.account && <ConnectWalletButton />}
                {metamask.account && (
                  <div>
                    <div>
                      <span>Tài khoản ví kết nối: </span>
                      <span>{metamask.account}</span>
                    </div>
                    <div>
                      <span>Số dư hiện tại: </span>
                      <span>{metamask.balance}</span>
                    </div>
                  </div>
                )}
                <div className={cx('entreField')}>
                  <label className={cx('entreField-label')}>
                    Tên NFT <span className={cx('entreField-required')}>*</span>
                  </label>
                  <div className={cx('entreField-subLabel')}>
                    Là tiêu đề đại diện cho NFT mà bạn tạo ra, giúp người khác dễ dàng nhận biết và hiểu về giá trị, nội
                    dung hoặc ý nghĩa của NFT đó.
                  </div>
                  <input
                    type="text"
                    className={cx('itext-field')}
                    name="nftName"
                    value={nftData.nftName}
                    onChange={handleChangeInfoNft}
                    disabled={perkState.isNFT}
                  />
                </div>
                <div className={cx('entreField')}>
                  <label className={cx('entreField-label')}>
                    Mã Symbol <span className={cx('entreField-required')}>*</span>
                  </label>
                  <div className={cx('entreField-subLabel')}>
                    Symbol là một chuỗi ký tự ngắn (thường giống như một mã token) dùng để đại diện cho loại NFT của
                    bạn.
                  </div>
                  <input
                    type="text"
                    className={cx('itext-field')}
                    name="nftSymbol"
                    value={nftData.nftSymbol}
                    onChange={handleChangeInfoNft}
                    disabled={perkState.isNFT}
                  />
                </div>
                {perkState.isNFT && (
                  <>
                    <div className={cx('entreField')}>
                      <label className={cx('entreField-label')}>Mã giao dịch</label>
                      <div className={cx('entreField-subLabel')}>
                        Mã giao dịch tạo hợp đồng NFT. Bạn có thể dùng mã này tra cứu lịch sử giao dịch trên các nền
                        tảng Blockchain Explorer.
                      </div>

                      <div className="flex gap-5 items-center">
                        <input
                          type="text"
                          className={cx('itext-field')}
                          name="nftSymbol"
                          value={nftData.nftTransactionHash}
                          onChange={handleChangeInfoNft}
                          disabled={perkState.isNFT}
                        />

                        <a
                          href={`https://sepolia.etherscan.io/tx/${nftData.nftTransactionHash}`}
                          target="_blank"
                          title="Khám phá"
                        >
                          <FaExternalLinkAlt className="text-[24px] cursor-pointer hover:opacity-80" />
                        </a>
                      </div>
                    </div>
                    <div className={cx('entreField')}>
                      <label className={cx('entreField-label')}>Địa chỉ hợp đồng NFT</label>
                      <div className={cx('entreField-subLabel')}>
                        Dùng địa chỉ này để tra cứu các giao dịch liên quan đến NFT của bạn trên các nền tảng Blockchain
                        Explorer
                      </div>

                      <div className="flex gap-5 items-center">
                        <input
                          type="text"
                          className={cx('itext-field')}
                          name="nftSymbol"
                          value={nftData.nftContractAddress}
                          onChange={handleChangeInfoNft}
                          disabled={perkState.isNFT}
                        />

                        <a
                          href={`https://sepolia.etherscan.io/tx/0x3634b65be53cfb400cabdb3635652918f1932a029cee9e00ff3ecb6db5fa2595`}
                          target="_blank"
                          title="Khám phá"
                        >
                          <FaExternalLinkAlt className="text-[24px] cursor-pointer hover:opacity-80" />
                        </a>
                      </div>
                    </div>
                  </>
                )}
                {!perkState.isNFT && (
                  <a
                    onClick={handleClickSaveNft}
                    className={cx('btn', 'btn-ok')}
                    style={{ marginLeft: '0px', marginTop: '12px', display: 'inline-block' }}
                  >
                    LƯU NFT
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {showModal && (
        <ModalItem
          setShowModal={setShowModal}
          addNewItem={addNewItem}
          updateItem={updateItem}
          optionEdit={optionEdit}
        />
      )}
    </>
  );
}

export default NewPerk;
