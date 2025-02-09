import classNames from 'classnames/bind';
import styles from './ModalGivePerk.module.scss';
import { useDispatch } from 'react-redux';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import { IoCloseSharp } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import ModalPerkOption from './ModalPerkOption';
import { toast } from 'react-toastify';
import ItemPerk from './ItemPerk';
import ItemSelected from './ItemSelected';
import { useParams } from 'react-router-dom';
import { convertDateFromString } from '~/utils';
import { useAddGiftMutation } from '~/hooks/api/mutations/user/gift.mutation';
import { useGetPerksHasListItemsByCampaignIdQuery } from '~/hooks/api/queries/user/perk.query';
const cx = classNames.bind(styles);
function ModalGivePerk({ setShowModalGivePerk, contribution, getAllGifts, userContributionGivePerk }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [listPerks, setListPerks] = useState([]);
  const [listPerksSelected, setListPerksSelected] = useState([]);
  const convertDate2 = (value) => {
    const tmpArr = value.split('-');
    let date = [];
    for (let i = tmpArr.length - 1; i >= 0; i--) date = [...date, tmpArr[i]];
    const res = date.join('/');
    return res;
  };
  const nowDate = convertDateFromString(new Date()).substring(3);
  const [address, setAddress] = useState({
    fullName: '',
    province: '',
    district: '',
    ward: '',
    detail: '',
    phoneNumber: '',
    estDeliveryDate: nowDate,
  });

  const { data: perksData } = useGetPerksHasListItemsByCampaignIdQuery(id);
  useEffect(() => {
    if (perksData) {
      // let newData = perksData.map((perk) => {
      //   return {
      //     ...perk,
      //     detailPerks: perk.detailPerks?.map((item) => ({
      //       ...item,
      //       item: {
      //         ...item.item,
      //         ...(item.item.isHasOption
      //           ? {
      //               options: item.item.options.map((option) => ({
      //                 ...option,
      //                 values: option.values?.split('|') ?? [],
      //               })),
      //             }
      //           : {}),
      //       },
      //     })),
      //   };
      // });
      setListPerks(perksData);
    }
  }, [perksData]);

  const [perkInModal, setPerkInModal] = useState({});

  const [showModalOption, setShowModalOption] = useState(false);
  const handleShowModalOption = (item) => {
    setPerkInModal({ ...item });
    setShowModalOption(true);
  };
  const handleAddIntoListPerksSelected = (item) => {
    setListPerksSelected((prev) => {
      const state = [...prev];
      state.push({
        id: item.id,
        image: item.image,
        name: item.name,
        quantity: 1,
        price: item.price,
        options: item.detailPerks.reduce((acc, cur) => {
          if (cur.optionsSelected && cur.optionsSelected.length > 0) {
            return [
              ...acc,
              {
                name: cur.item.name,
                quantity: cur.quantity,
                optionsString: cur.optionsSelected.map((i) => i.value).join('|'),
              },
            ];
          } else {
            return [
              ...acc,
              {
                name: cur.item.name,
                quantity: cur.quantity,
                optionsString: '',
              },
            ];
          }
        }, []),
      });
      return state;
    });
    setListPerks((prev) =>
      [...prev].map((item2) => {
        if (item2.id === item.id) {
          return {
            ...item2,
            isSelected: true,
          };
        } else return item2;
      }),
    );
    setShowModalOption(false);
  };
  const handleClickSubItemSelected = (id) => {
    setListPerksSelected((prev) =>
      [...prev].map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1 === 0 ? item.quantity : item.quantity - 1,
          };
        } else return item;
      }),
    );
  };
  const handleClickAddItemSelected = (id) => {
    setListPerksSelected((prev) =>
      [...prev].map((item) => {
        if (item.id === id) {
          const quantityAvailable = listPerks.find((i) => i.id === id).quantity;
          return {
            ...item,
            quantity: item.quantity === quantityAvailable ? item.quantity : item.quantity + 1,
          };
        } else return item;
      }),
    );
  };
  const handleRemoveItemSelected = (id) => {
    setListPerksSelected((prev) => [...prev].filter((item) => item.id !== id));
    console.log('id', id);
    setListPerks((prev) =>
      [...prev].map((item2) => {
        if (item2.id === id) {
          return {
            ...item2,
            isSelected: false,
          };
        } else return item2;
      }),
    );
  };

  const addGiftMutation = useAddGiftMutation();
  const saveGift = async (gift) => {
    dispatch(setLoading(true));
    addGiftMutation.mutate(gift, {
      async onSuccess(data) {
        dispatch(setLoading(false));
        await getAllGifts();
        setShowModalGivePerk(false);
        toast.success('Lưu quà tặng thành công!');
        console.log(data.data);
      },
      onError(error) {
        dispatch(setLoading(false));
        console.log(error.response.data.message);
      },
    });
  };
  const handleClickAccept = () => {
    const dateString = address.estDeliveryDate;
    let dateArray = dateString.split('/');
    let month = parseInt(dateArray[0], 10);
    let year = parseInt(dateArray[1], 10);
    let dateObject = new Date(year, month - 1, 1);
    const gift = {
      email: userContributionGivePerk.email,
      userId: userContributionGivePerk.userId,
      campaignId: id,
      shippingInfo: { ...address, estDeliveryDate: dateObject },
      perks: [...listPerksSelected],
      money: listPerksSelected.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0),
    };
    console.log({ gift });
    saveGift(gift);
  };
  const dateInputElement = useRef(null);
  const handleMouseOverDateFilter = () => {
    dateInputElement.current?.showPicker();
  };

  const handleChangeDateInput = (e) => {
    let value = e.target.value;
    if (!value) {
      setAddress((prev) => ({ ...prev, estDeliveryDate: '' }));
      return;
    }
    const res = convertDate2(value);

    setAddress((prev) => ({ ...prev, estDeliveryDate: res }));
  };
  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('body')}>
          <h3 className={cx('title')}>TẶNG ĐẶC QUYỀN</h3>
          <p className={cx('description')}>
            Tên người dùng hệ thống: {userContributionGivePerk.fullName || 'Khách vãng lai'}
          </p>
          <p className={cx('description')}>Email: {userContributionGivePerk.email}</p>
          <div style={{ marginBottom: '32px' }}>
            <div className={cx('delivery')}>
              <label className={cx('label-delivery')}>Thông tin giao nhận</label>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span>Ngày giao dự kiến:</span>
                <div style={{ position: 'relative', width: 'fit-content' }} onClick={handleMouseOverDateFilter}>
                  <div className={cx('function-button')}>
                    <span className={cx('btn', 'btn-succeed')} style={{ fontSize: '14px' }}>
                      {address.estDeliveryDate}
                      <AiFillCaretDown style={{ marginLeft: '4px' }} />
                    </span>
                  </div>
                  <input
                    onChange={handleChangeDateInput}
                    ref={dateInputElement}
                    type="month"
                    style={{ opacity: '0', top: '6px', left: '6px', right: '0', position: 'absolute' }}
                  />
                </div>
              </div>
              <div className={cx('delivery-info')}>
                <div className={cx('info-row')}>
                  <input
                    className={cx('input-text')}
                    placeholder="Họ và tên"
                    value={address.fullName}
                    name="fullName"
                    onChange={handleChangeInput}
                  />
                  <input
                    className={cx('input-text')}
                    placeholder="Số điện thoại"
                    value={address.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className={cx('info-row')}>
                  <input
                    className={cx('input-text')}
                    placeholder="Tỉnh / Thành phố"
                    value={address.province}
                    name="province"
                    onChange={handleChangeInput}
                  />
                  <input
                    className={cx('input-text')}
                    placeholder="Quận / Huyện"
                    value={address.district}
                    name="district"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className={cx('info-row')}>
                  <input
                    className={cx('input-text')}
                    placeholder="Xã / Phường"
                    value={address.ward}
                    name="ward"
                    onChange={handleChangeInput}
                  />
                  <input
                    className={cx('input-text')}
                    placeholder="Chi tiết"
                    value={address.detail}
                    name="detail"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            </div>
            <div className={cx('perk-inner')}>
              <div className={cx('list-perks-wrapper')}>
                <label className={cx('label')}>Danh sách các đặc quyền</label>
                <div className={cx('list-perks')}>
                  {listPerks.map((perk, index) => {
                    return <ItemPerk key={index} item={perk} handleClickItem={handleShowModalOption} />;
                  })}
                </div>
              </div>

              <div className={cx('list-perks-selected')}>
                <label className={cx('label')}>Danh sách chọn</label>
                <div className={cx('list-perks-selected')}>
                  {listPerksSelected.map((item, index) => {
                    return (
                      <ItemSelected
                        item={item}
                        key={index}
                        handleClickSub={handleClickSubItemSelected}
                        handleClickAdd={handleClickAddItemSelected}
                        handleRemove={handleRemoveItemSelected}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={cx('section-button')}>
            <a onClick={handleClickAccept} className={cx('btn', 'btn-ok')}>
              Xác nhận
            </a>
          </div>
          <span onClick={() => setShowModalGivePerk(false)} className={cx('editFile-icon')}>
            <IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} />
          </span>
        </div>
      </div>
      {showModalOption && (
        <ModalPerkOption
          perk={perkInModal}
          setShowModalOption={setShowModalOption}
          handleAddPerk={handleAddIntoListPerksSelected}
        />
      )}
    </>
  );
}

export default ModalGivePerk;
