import classNames from 'classnames/bind';
import SidebarCampaign from '../../components/Sidebar';

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
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';

import styles from './NewPerk.module.scss';
import ItemShipping from './ItemShipping';
import ItemInclude from './ItemInclude';
import { convertDateFromString } from '~/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useGetPerk, useGetPerksByCampaignIdQuery } from '~/hooks/api/queries/perk.query';
import { useGetItemsByCampaignIdQuery } from '~/hooks/api/queries/item.query';
import { useAddPerkMutation, useEditPerkMutation } from '~/hooks/api/mutations/perk.mutation';
import { useAddItemMutation } from '~/hooks/api/mutations/item.mutation';

const cx = classNames.bind(styles);

function NewPerk() {
  const { id, idPerk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [perkState, setPerkState] = useState({});
  const [campaign, setCampaign] = useState({});
  const [perk, setPerk] = useState({});
  const showErrorDelete = useSelector((state) => state.userCampaign.showErrorDelete);
  const contentError = useSelector((state) => state.userCampaign.contentError);
  const [listLocationShip, setListLocationShip] = useState([]);
  const [listLocationShipOrigin, setListLocationShipOrigin] = useState([]);
  const [listLocationShipChoosen, setListLocationShipChoosen] = useState([]);
  const [listItemChoosen, setListItemChoosen] = useState([]);
  const [listItemsAvailable, setListItemsAvailable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [optionEdit, setOptionEdit] = useState({});
  const inputPerkImageWrapperElement = useRef();
  const perkImageElement = useRef();
  const dateInputElement = useRef(null);
  const [showBtnAddShip, setShowBtnAddShip] = useState(true);

  const handleMouseOverDateFilter = () => {
    dateInputElement.current?.showPicker();
  };
  const queryClient = useQueryClient();
  const dataCampaign = queryClient.getQueryData(['getCampaignById']);
  useEffect(() => {
    if (dataCampaign) {
      let infoBasic = {
        id: dataCampaign.data._id,
        title: dataCampaign.data.title || '',
        cardImage: dataCampaign.data.cardImage || { url: '', public_id: '' },
        status: dataCampaign.data.status,
        owner: dataCampaign.data.owner || '',
        team: dataCampaign.data.team || [],
      };
      setCampaign({ ...infoBasic });
    }
  }, [dataCampaign]);
  const { data: response } = useGetPerk(idPerk);
  useEffect(() => {
    if (response) {
      setPerkState({
        id: response.data._id,
        title: response.data.title || '',
        price: response.data.price || '',
        isVisible: response.data.isVisible || false,
        items:
          response.data?.items.map((item) => ({ name: item.item.name, quantity: item.quantity, id: item.item._id })) ||
          [],
        description: response.data.description || '',
        perkImage: response.data.image || {
          url: '',
          public_id: '',
        },
        quantity: response.data.quantity || '',
        estDelivery: response.data.estDelivery
          ? convertDateFromString(response.data.estDelivery, 'less')
          : convertDateFromString(new Date(), 'less'),
        isShipping: response.data.isShipping || false,
        listShippingFee: response.data.listShippingFee || [],
      });
      setPerk({
        id: response.data._id,
        title: response.data.title || '',
        price: response.data.price || '',
        isVisible: response.data.isVisible || false,
        items:
          response.data?.items.map((item) => ({ name: item.item.name, quantity: item.quantity, id: item.item._id })) ||
          [],
        description: response.data.description || '',
        perkImage: response.data.image || {
          url: '',
          public_id: '',
        },
        quantity: response.data.quantity || '',
        estDelivery: response.data.estDelivery
          ? convertDateFromString(response.data.estDelivery)
          : convertDateFromString(new Date()),
        isShipping: response.data.isShipping || false,
        listShippingFee: response.data.listShippingFee || [],
      });
    } else {
      setPerkState({
        title: '',
        price: '',
        isVisible: true,
        items: [],
        description: '',
        perkImage: {
          url: '',
          public_id: '',
        },
        quantity: '',
        estDelivery: '',
        isShipping: false,
        listShippingFee: [],
      });
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
        responseItems.data.map((item) => {
          return {
            name: item.name,
            isHasOption: item.isHasOption,
            options: item.options,
            id: item._id,
          };
        }) || [],
      );
    }
  }, [responseItems]);

  useEffect(() => {
    if (listItemsAvailable.length > 0) {
      if (perkState.items?.length === 0) {
        setPerkState((prev) => ({
          ...prev,
          items: [{ name: '', quantity: 1 }],
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
      listShippingFee:
        [...prev.listShippingFee].length === 0
          ? [{ location: 'Tất cả các tỉnh thành', fee: '' }]
          : prev.listShippingFee,
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
    if (!value) {
      setPerkState((prev) => ({ ...prev, estDelivery: '' }));
      return;
    }
    const res = convertDateFromString(value);

    setPerkState((prev) => ({ ...prev, estDelivery: res }));
  };
  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerkState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewItemMutation = useAddItemMutation();
  const addNewItem = async (item) => {
    addNewItemMutation.mutate(
      { ...item, campaign: id },
      {
        onSuccess() {
          refetchItems();

          setShowModal(false);
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
    if (perkState.items?.length === 0) {
      setOptionEdit({ type: 'add' });
      setShowModal(true);
    } else {
      setPerkState((prev) => ({
        ...prev,
        items: [...prev.items, { name: '', quantity: 1 }],
      }));
    }
  };
  const handleChangePerkImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setPerkState((prev) => {
          return { ...prev, perkImage: { ...prev.perkImage, url: res } };
        });
      };
    }
  };
  const handleRemovePerkImage = () => {
    setPerkState((prev) => {
      return { ...prev, perkImage: { ...prev.perkImage, url: '' } };
    });
  };
  const handleClickAddShip = () => {
    setPerkState((prev) => ({
      ...prev,
      listShippingFee: [...prev.listShippingFee, { location: '', fee: '' }],
    }));
  };
  useEffect(() => {
    const lengthListShippingFee = perkState.listShippingFee?.length;
    if (lengthListShippingFee === 0 || lengthListShippingFee === 1) {
      setListLocationShip(['Tất cả các tỉnh thành', ...listLocationShipOrigin]);
      setPerkState((prev) => ({
        ...prev,
        listShippingFee: [...prev.listShippingFee].map((item) => {
          if (item.location === 'Các tỉnh thành còn lại')
            return {
              ...item,
              location: 'Tất cả các tỉnh thành',
            };
          else return item;
        }),
      }));
    } else if (lengthListShippingFee >= 2) {
      setListLocationShip(['Các tỉnh thành còn lại', ...listLocationShipOrigin]);
      setPerkState((prev) => ({
        ...prev,
        listShippingFee: [...prev.listShippingFee].map((item) => {
          if (item.location === 'Tất cả các tỉnh thành')
            return {
              ...item,
              location: 'Các tỉnh thành còn lại',
            };
          else return item;
        }),
      }));
    }
  }, [perkState.listShippingFee?.length]);
  useEffect(() => {
    const list = perkState.listShippingFee?.filter((item) => item.location !== '');
    setListLocationShipChoosen(list?.map((item) => item.location));
  }, [perkState.listShippingFee]);
  useEffect(() => {
    const list = perkState.items?.filter((item) => item.name !== '');
    setListItemChoosen(list?.map((item) => item.name));
  }, [perkState.items]);
  const handleChangeItemShipping = (itemChange, indexChange) => {
    setPerkState((prev) => ({
      ...prev,
      listShippingFee: [...prev.listShippingFee].map((item, index) => {
        if (index === indexChange) {
          return { ...itemChange };
        } else return item;
      }),
    }));
  };
  const handleRemoveItemShipping = (index) => {
    setPerkState((prev) => ({
      ...prev,
      listShippingFee: [...prev.listShippingFee].filter((item, index2) => index2 !== index),
    }));
  };
  const handleChangeItemInclude = (itemChange, indexChange) => {
    setPerkState((prev) => ({
      ...prev,
      items: [...prev.items].map((item, index) => {
        if (index === indexChange) {
          return { ...itemChange };
        } else return item;
      }),
    }));
  };
  const handleRemoveItemInclude = (index) => {
    setPerkState((prev) => ({
      ...prev,
      items: [...prev.items].filter((item, index2) => index2 !== index),
    }));
  };

  const addPerkMutation = useAddPerkMutation();
  const editPerkMutation = useEditPerkMutation();
  const handleClickSavePerk = async () => {
    const dateString = perkState.estDelivery;
    let dateArray = dateString.split('/');
    let month = parseInt(dateArray[0], 10);
    let year = parseInt(dateArray[1], 10);
    let dateObject = new Date(year, month - 1, 1);
    perkState.estDelivery = dateObject;
    if (idPerk === 'new') {
      const body = {
        ...perkState,
        image: perkState.perkImage,
        items: perkState.items.map((item) => ({ item: item.id, quantity: item.quantity })),
      };
      dispatch(setLoading(true));
      addPerkMutation.mutate(
        { perk: body, campaignId: id },
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
      const body = {
        ...perkState,
        image: perkState.perkImage,
        items: perkState.items.map((item) => ({ item: item.id, quantity: item.quantity })),
      };
      dispatch(setLoading(true));
      editPerkMutation.mutate(
        { id: perkState.id, perk: body },
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

  return (
    <>
      <div className={cx('controlBar')}>
        <div className={cx('controlBar-container')}>
          <div className={cx('controlBar-content')}>Đặc quyền / {idPerk === 'new' ? 'Tạo đặc quyền' : perk.title}</div>
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
              <TiCancel style={{ color: '#fff', fontSize: '48px' }} /> {contentError}
            </span>
          </div>
        )}
      </div>
      ;
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

          <div className={cx('entreField')}>
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
          </div>

          <div className={cx('entreField')}>
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
              name="title"
              value={perkState.title}
              onChange={handleChangeInputText}
            />
            <div className={cx('entreField-validationLabel')}>50</div>
          </div>

          <div className={cx('entreField')}>
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
                {perkState.items?.length > 0 && (
                  <div style={{ width: '90%' }}>
                    <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                      <div style={{ padding: '6px' }} class="col-8">
                        <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                          Item Selection
                        </label>
                      </div>
                      <div style={{ padding: '6px' }} class="col-3">
                        <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                          Quantity
                        </label>
                      </div>
                    </div>

                    {perkState.items.map((item, index) => {
                      return (
                        <ItemInclude
                          key={index}
                          index={index}
                          onChangeItem={handleChangeItemInclude}
                          removeItem={handleRemoveItemInclude}
                          listItemsAvailable={listItemsAvailable}
                          itemData={item}
                          lengthListItem={perkState.items?.length}
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

          <div className={cx('entreField')}>
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
            <div className={cx('entreField-validationLabel')}>350</div>
          </div>

          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>Ảnh đặc quyền</label>
            <div className={cx('entreField-subLabel')}>
              Vui lòng không sử dụng hình ảnh có chứa văn bản như giá cả và mức giảm giá hoặc màu sắc của thương hiệu
              GIVE - FUN. Kích thước được đề xuất: 660x440 pixel. Hỗ trợ PNG hoặc JPG.
            </div>
            <div>
              <div
                onClick={() => {
                  perkImageElement.current.click();
                }}
                className={cx('entreField-input-image')}
                ref={inputPerkImageWrapperElement}
              >
                {!perkState.perkImage?.url && (
                  <div className={cx('tertiaryAction')}>
                    <span className={cx('tertiaryAction-icon')}>
                      <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                    </span>

                    <span className={cx('tertiaryAction-text')}>Upload image</span>
                  </div>
                )}

                {perkState.perkImage?.url && (
                  <div>
                    <img className={cx('img-copntainer-perk')} src={perkState.perkImage?.url} />
                    <div className={cx('editFile')}>
                      <span className={cx('editFile-icon')}>
                        <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          perkImageElement.current.value = null;
                          handleRemovePerkImage();
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
                onChange={handleChangePerkImage}
                className={cx('entreImage-file')}
                ref={perkImageElement}
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
                name="estDelivery"
                value={perkState.estDelivery}
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
            Đặc quyền này có chứa các mặt hàng mà bạn cần vận chuyển không?
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
              {perkState.listShippingFee?.length > 0 && (
                <div className={cx('entreField')}>
                  <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                    <div style={{ padding: '6px' }} class="col-8">
                      <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                        Địa điểm vận chuyển
                      </label>
                    </div>
                    <div style={{ padding: '6px' }} class="col-4">
                      <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                        Phí vận chuyển
                      </label>
                    </div>
                  </div>
                  {perkState.listShippingFee.map((item, index) => {
                    return (
                      <ItemShipping
                        key={index}
                        index={index}
                        onChangeItem={handleChangeItemShipping}
                        removeItem={handleRemoveItemShipping}
                        listLocationShip={listLocationShip}
                        lengthListItemShiping={perkState.listShippingFee.length}
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
        </div>
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
