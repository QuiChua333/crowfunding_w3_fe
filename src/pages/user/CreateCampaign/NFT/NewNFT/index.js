import classNames from 'classnames/bind';
import SidebarCampaign from '../../components/Sidebar';
import { useDebouncedCallback } from 'use-debounce';
import Footer from '~/layout/components/Footer';

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

import styles from './NewNFT.module.scss';

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
import { PiTextbox } from 'react-icons/pi';
import { useGetNFT } from '~/hooks/api/queries/user/nft.query';

const cx = classNames.bind(styles);

function NewNFT() {
  const { id, idNFT } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nftState, setNFTState] = useState({});
  const [campaign, setCampaign] = useState({});
  const [file, setFile] = useState();
  const [nft, setNFT] = useState({});
  const showErrorDelete = useSelector((state) => state.userCampaign.showErrorDelete);
  const contentError = useSelector((state) => state.userCampaign.contentError);
  const errorOf = useSelector((state) => state.userCampaign.errorOf);
  const inputimageWrapperElement = useRef();
  const imageElement = useRef();
  const dateInputElement = useRef(null);
  const [showBtnAddShip, setShowBtnAddShip] = useState(true);
  const [isCreateNFT, setCreateNFT] = useState(false);
  const [ethToVnd, setETHToVND] = useState(0);

  const [nftData, setNFTData] = useState({});
  const metamask = useSelector((state) => state.metamask);

  const [materials, setMaterials] = useState([]);
  const [styles, setStyles] = useState([]);
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setNFTState((prev) => ({
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
        number: 5,
        content: 'NFT',
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

  const { data: response } = useGetNFT(idNFT);
  useEffect(() => {
    if (response && idNFT !== 'new') {
      setNFTState({
        id: response.id,
        name: response.name || '',
        symbol: response.symbol || '',
        price: response.price || '',
        ethPrice: response.ethPrice,
        description: response.description || '',
        image: response.image || '',
        color: response.color || '',
        materials: response.materials?.split('|') || [],
        styles: response.styles?.split('|') || [],
        supply: response.supply || '',
        transactionHash: response.transactionHash || '',
        contractAddress: response.contractAddress || '',
        authorAddress: response.authorAddress || '',
      });
      setNFT({
        id: response.id,
        name: response.name || '',
        symbol: response.symbol || '',
        price: response.price || '',
        ethPrice: response.ethPrice,
        description: response.description || '',
        image: response.image || '',
        color: response.color || '',
        materials: response.materials?.split('|') || [],
        styles: response.styles?.split('|') || [],
        supply: response.supply || '',
        transactionHash: response.transactionHash || '',
        contractAddress: response.contractAddress || '',
        authorAddress: response.authorAddress || '',
      });
    } else {
      setNFTState({
        name: '',
        symbol: '',
        price: '',
        ethPrice: 0,
        description: '',
        image: '',
        color: '',
        materials: [],
        styles: [],
        supply: '',
        transactionHash: '',
        contractAddress: '',
        authorAddress: '',
      });
    }
  }, [response]);

  useEffect(() => {
    console.log(nftState);
  }, [nftState]);

  const handleChangeInputText = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'price' || name === 'supply') {
      if (value !== '' && !/^\d*$/.test(value)) {
        return;
      }
    }
    if (name === 'price') {
      debounced(value);
    }
    setNFTState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeimage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setNFTState((prev) => {
          return { ...prev, image: res };
        });
      };
    }
  };
  const handleRemoveimage = () => {
    setNFTState((prev) => {
      return { ...prev, image: '' };
    });
    setFile(null);
  };

  const handleClickRemoveMiniValueMaterial = (index) => {
    setNFTState((prev) => ({
      ...prev,
      materials: prev.materials.filter((item, index2) => index2 !== index),
    }));
  };

  const handleKeyUpInputTagMaterial = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        const newValue = e.target.value;
        e.target.value = '';
        setNFTState((prev) => ({
          ...prev,
          materials: [...prev.materials, newValue],
        }));
      }
    }
  };

  const handleClickRemoveMiniValueStyle = (index) => {
    setNFTState((prev) => ({
      ...prev,
      styles: prev.styles.filter((item, index2) => index2 !== index),
    }));
  };

  const handleKeyUpInputTagStyle = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        const newValue = e.target.value;
        e.target.value = '';
        setNFTState((prev) => ({
          ...prev,
          styles: [...prev.styles, newValue],
        }));
      }
    }
  };

  const editPerkMutation = useEditPerkMutation();

  // const handleClickCreateNFT = () => {
  //   if (!campaign.walletAddress) {
  //     dispatch(
  //       setMessageBox({
  //         title: 'Thông báo',
  //         content: 'Vui lòng cài đặt thông tin địa chỉ ví của chiến dịch',
  //         contentOK: 'XÁC NHẬN',
  //         contentCancel: 'HỦY',
  //         isShow: true,
  //         type: 'createWallet',
  //       }),
  //     );
  //   } else {
  //     dispatch(
  //       setMessageBox({
  //         title: 'Thông báo',
  //         content: 'Khi đặc quyền chuyển đổi thành NFT, một số thông tin của đặc quyền sẽ không còn quyền chỉnh sửa!',
  //         contentOK: 'XÁC NHẬN',
  //         contentCancel: 'HỦY',
  //         isShow: true,
  //         type: 'transferNFT',
  //       }),
  //     );
  //   }
  // };

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

  const handleClickCreateNFT = async () => {
    if (!metamask.account) {
      dispatch(setContentError('Vui lòng kết nối ví Metamask'));
      dispatch(setShowErrorDelete(true));
      dispatch(setErrofOf('connectWallet'));
    } else {
      dispatch(setLoading(true));
      const body = {
        ...nftState,
      };
      delete body.image;
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (key === 'materials' || key === 'styles') {
          formData.append(key, value.join('|'));
        } else formData.append(key, value);
      });

      if (file) {
        formData.append('file', file);
      }

      formData.append('campaignId', id);
      createNFTMutation.mutate(
        { formData },
        {
          async onSuccess(data) {
            const uri = data.uri;
            const nftCreationId = data.id;
            try {
              const valuePriceInWei = ethers.parseEther(nftState.ethPrice);
              const tx = await factoryContract.createNFT(
                nftState.name,
                nftState.symbol,
                uri,
                valuePriceInWei,
                Number(nftState.supply),
                nftCreationId,
              );
              const receipt = await tx.wait();
              console.log(receipt);
              dispatch(setLoading(false));
              toast.success('Tạo NFT thành công');
              navigate(`/campaigns/${id}/edit/nfts/table`);
            } catch (error) {
              dispatch(setLoading(false));
              console.log(error);
            }
          },
          onError(err) {
            console.log(err);
            dispatch(setLoading(false));
            toast.error('Có lỗi xảy ra trong quá trình tạo NFT');
          },
        },
      );
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <div className={cx('controlBar')}>
        <div className={cx('controlBar-container')}>
          <div className={cx('controlBar-content')}>NFT / {idNFT === 'new' ? 'Tạo NFT' : nftState.name}</div>
          <div className={cx('controlBar-controls')}>
            {idNFT !== 'new' && (
              <Link to={`/campaigns/${id}/edit/nfts/table`} className={cx('btn', 'btn-cancel')}>
                Quay về
              </Link>
            )}
            {idNFT === 'new' && (
              <Link to={`/campaigns/${id}/edit/nfts/table`} className={cx('btn', 'btn-cancel')}>
                Hủy
              </Link>
            )}
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
          <div className={cx('entreField-header')}>Chi tiết NFT</div>
          <div className={cx('entreField-subHeader')}>
            NFT là một loại tài sản kỹ thuật số trên blockchain có tính duy nhất và không thể thay thế bằng thứ khác.
            Hãy đản bảo rằng các thông tin của NFT là hợp lệ vì nó không thể chỉnh sửa.
          </div>

          <div className={cx('entreField')} style={{ pointerEvents: idNFT !== 'new' && 'none' }}>
            <label className={cx('entreField-label')}>
              Trị giá<span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Đặt số tiền bạn muốn thu từ những người ủng hộ yêu cầu NFT này.
            </div>
            <div className={cx('inputCurrencyField')}>
              <span className={cx('inputCurrencyField-symbol')}>$</span>
              <input
                type="text"
                maxLength="50"
                className={cx('itext-field', 'inputCurrencyField-input')}
                name="price"
                value={nftState.price}
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
                value={nftState.ethPrice}
                disabled={true}
              />
              <span className={cx('inputCurrencyField-isoCode')}>ETH</span>
            </div>
          </div>

          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>
              Tên NFT <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Là tiêu đề đại diện cho NFT mà bạn tạo ra, giúp người khác dễ dàng nhận biết và hiểu về giá trị, nội dung
              hoặc ý nghĩa của NFT đó.
            </div>
            <input
              type="text"
              className={cx('itext-field')}
              name="name"
              value={nftState.name}
              onChange={handleChangeInputText}
              disabled={idNFT !== 'new'}
            />
            {/* <div className={cx('entreField-validationLabel')}>50</div> */}
          </div>
          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>
              Mã Symbol <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Symbol là một chuỗi ký tự ngắn (thường giống như một mã token) dùng để đại diện cho loại NFT của bạn.
            </div>
            <input
              type="text"
              className={cx('itext-field')}
              name="symbol"
              value={nftState.symbol}
              onChange={handleChangeInputText}
              disabled={idNFT !== 'new'}
            />
          </div>
          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>
              Mô tả <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Mô tả chi tiết về NFT này. Hãy sáng tạo, đây là cơ hội để bạn thu hút những người ủng hộ bằng cách cho họ
              biết về những gì họ sẽ nhận được sau khi yêu cầu NFT này.
            </div>
            <textarea
              className={cx('itext-field')}
              style={{ minHeight: '275px' }}
              name="description"
              value={nftState.description}
              onChange={handleChangeInputText}
              disabled={idNFT !== 'new'}
            ></textarea>
          </div>

          <div className={cx('entreField')} style={{ pointerEvents: idNFT !== 'new' && 'none' }}>
            <label className={cx('entreField-label')}>
              Ảnh NFT <span className={cx('entreField-required')}>*</span>
            </label>
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
                {!nftState.image && (
                  <div className={cx('tertiaryAction')}>
                    <span className={cx('tertiaryAction-icon')}>
                      <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                    </span>

                    <span className={cx('tertiaryAction-text')}>Upload image</span>
                  </div>
                )}

                {nftState.image && (
                  <div>
                    <img className={cx('img-copntainer-perk')} src={nftState.image} accept="image/png, image/jpeg" />
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
          <div className={cx('entreField')} style={{ pointerEvents: idNFT !== 'new' && 'none' }}>
            <label className={cx('entreField-label')}>
              Màu sắc <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>Màu chủ đạo của NFT.</div>
            <input
              type="text"
              className={cx('itext-field')}
              name="color"
              value={nftState.color}
              onChange={handleChangeInputText}
              disabled={idNFT !== 'new'}
            />
          </div>
          <div className={cx('entreField')} style={{ pointerEvents: idNFT !== 'new' && 'none' }}>
            <label className={cx('entreField-label')}>
              Chất liệu (Materials) <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>Mô tả chất liệu hoặc thành phần tạo nên NFT.</div>
            <div style={{ padding: '6px', paddingLeft: '0px' }}>
              <div className={cx('inputTags')}>
                {nftState.materials?.map((material, index) => {
                  return (
                    <span key={index} className={cx('inputTags-tag')}>
                      {material}
                      <span
                        onClick={() => handleClickRemoveMiniValueMaterial(index)}
                        style={{
                          color: '#7a69b3',
                          marginLeft: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          marginTop: '-2px',
                        }}
                      >
                        <IoCloseSharp />
                      </span>
                    </span>
                  );
                })}

                <input
                  onKeyUp={(e) => handleKeyUpInputTagMaterial(e)}
                  onFocus={(e) => (e.target.parentElement.style.border = '1px solid #000')}
                  onBlur={(e) => (e.target.parentElement.style.border = '1px solid #ddd')}
                  placeholder={nftState.materials?.length === 0 && 'Vàng, Bạc, Kim cương, Gỗ'}
                  maxlength="30"
                  className={cx('input-value-option')}
                />
              </div>
            </div>
          </div>
          <div className={cx('entreField')} style={{ pointerEvents: idNFT !== 'new' && 'none' }}>
            <label className={cx('entreField-label')}>
              Phong cách (Styles) <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>Mô tả phong cách của NFT.</div>
            <div style={{ padding: '6px', paddingLeft: '0px' }}>
              <div className={cx('inputTags')}>
                {nftState.styles?.map((style, index) => {
                  return (
                    <span key={index} className={cx('inputTags-tag')}>
                      {style}
                      <span
                        onClick={() => handleClickRemoveMiniValueStyle(index)}
                        style={{
                          color: '#7a69b3',
                          marginLeft: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          marginTop: '-2px',
                        }}
                      >
                        <IoCloseSharp />
                      </span>
                    </span>
                  );
                })}

                <input
                  onKeyUp={(e) => handleKeyUpInputTagStyle(e)}
                  onFocus={(e) => (e.target.parentElement.style.border = '1px solid #000')}
                  onBlur={(e) => (e.target.parentElement.style.border = '1px solid #ddd')}
                  placeholder={nftState.materials?.length === 0 && 'Pixel Art, Cyberpunk, Anime'}
                  maxlength="30"
                  className={cx('input-value-option')}
                />
              </div>
            </div>
          </div>
          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>
              Số lượng cung cấp <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>Số lượng tối đa mà bạn cung cấp cho NFT này.</div>
            <input
              type="text"
              className={cx('itext-field-2')}
              name="supply"
              value={nftState.supply}
              onChange={handleChangeInputText}
              disabled={idNFT !== 'new'}
            />
          </div>
        </div>

        <>
          {idNFT !== 'new' && (
            <>
              <div className={cx('entreField')}>
                <label className={cx('entreField-label')}>Mã giao dịch</label>
                <div className={cx('entreField-subLabel')}>
                  Mã giao dịch tạo hợp đồng NFT. Bạn có thể dùng mã này tra cứu lịch sử giao dịch trên các nền tảng
                  Blockchain Explorer.
                </div>

                <div className="flex gap-5 items-center">
                  <input
                    type="text"
                    className={cx('itext-field')}
                    value={nftState.transactionHash}
                    disabled={idNFT !== 'new'}
                  />

                  <a
                    href={`https://sepolia.etherscan.io/tx/${nftState.transactionHash}`}
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
                    value={nftState.contractAddress}
                    disabled={idNFT !== 'new'}
                  />

                  <a
                    href={`https://sepolia.etherscan.io/address/${nftState.contractAddress}`}
                    target="_blank"
                    title="Khám phá"
                  >
                    <FaExternalLinkAlt className="text-[24px] cursor-pointer hover:opacity-80" />
                  </a>
                </div>
              </div>
              <div className={cx('entreField')}>
                <label className={cx('entreField-label')}>Địa chỉ chủ sở hữu hợp đồng NFT</label>
                <div className={cx('entreField-subLabel')}>Địa chỉ ví tạo hợp đồng NFT.</div>

                <div className="flex gap-5 items-center">
                  <input
                    type="text"
                    className={cx('itext-field')}
                    value={nftState.authorAddress}
                    disabled={idNFT !== 'new'}
                  />

                  <a
                    href={`https://sepolia.etherscan.io/address/${nftState.authorAddress}`}
                    target="_blank"
                    title="Khám phá"
                  >
                    <FaExternalLinkAlt className="text-[24px] cursor-pointer hover:opacity-80" />
                  </a>
                </div>
              </div>
            </>
          )}

          {!metamask.account && idNFT === 'new' && <ConnectWalletButton />}
          {metamask.account && idNFT === 'new' && (
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
          {idNFT === 'new' && (
            <a
              onClick={handleClickCreateNFT}
              className={cx('btn', 'btn-ok')}
              style={{ marginLeft: '0px', marginTop: '12px', display: 'inline-block' }}
            >
              TẠO NFT
            </a>
          )}
        </>
      </div>
    </>
  );
}

export default NewNFT;
