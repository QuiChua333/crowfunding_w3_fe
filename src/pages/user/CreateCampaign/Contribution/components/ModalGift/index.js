import classNames from 'classnames/bind';
import styles from './ModalGift.module.scss';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { IoCloseSharp } from 'react-icons/io5';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { BiMap, BiMapPin, BiSitemap, BiPhoneCall, BiMessageSquareDetail } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import ItemPayment from '~/pages/user/Payment/components/ItemPayment';
import DropDown from '../ModalContribution/DropDown';
import { toast } from 'react-toastify';
import { convertDateFromString } from '~/utils';
import { useEditGiftStatusMutation } from '~/hooks/api/mutations/user/gift.mutation';
const cx = classNames.bind(styles);
function ModalGift({ setShowModalGift, gift, handleChangeStatus, isEditComponent }) {
  const dispatch = useDispatch();
  const [showListStatus, setShowListStatus] = useState(false);
  const [listStatus, setListStatus] = useState(() => {
    let list;
    if (!gift.isFinish) {
      list = ['Chưa gửi', 'Đã gửi'];
    } else list = ['Đã gửi'];
    return list;
  });
  const [status, setStatus] = useState(gift.isFinish ? 'Đã gửi' : 'Chưa gửi');
  const statusElement = useRef(null);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (statusElement.current && !statusElement.current.contains(e.target)) {
        setShowListStatus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [statusElement]);
  const handleClickItemStatus = (item) => {
    setStatus(item);
  };

  const editGiftStatusMutation = useEditGiftStatusMutation();
  const handleClickSave = async () => {
    if (status !== (gift.isFinish ? 'Đã gửi' : 'Chưa gửi')) {
      dispatch(setLoading(true));
      editGiftStatusMutation.mutate(
        {
          id: gift.id,
          data: { isFinish: true },
        },
        {
          onSuccess(data) {
            handleChangeStatus(gift.id);
            dispatch(setLoading(false));
            setShowModalGift(false);
            toast.success('Thay đổi trạng thái gửi đặc quyền thành công!');
          },
          onError(error) {
            console.log(error);
            dispatch(setLoading(false));
          },
        },
      );
    } else setShowModalGift(false);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <h3 className={cx('title')}>THÔNG TIN QUÀ TẶNG</h3>
        <p className={cx('description')}>Tên người dùng hệ thống: {gift.fullName || 'Khách vãng lai'}</p>
        <p className={cx('description')}>Email: {gift.email}</p>
        <div style={{ marginBottom: '32px' }}>
          <div className={cx('product-container')}>
            <div className={cx('order-container')}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                <span style={{ color: '#000' }}>
                  Trạng thái
                  <div
                    ref={statusElement}
                    className={cx('product-category-select', { active: showListStatus })}
                    onClick={() => {
                      if (!gift.isFinish) {
                        setShowListStatus((prev) => !prev);
                      }
                    }}
                    style={{ pointerEvents: !isEditComponent && 'none' }}
                  >
                    <span style={{ color: status === 'Chưa gửi' ? 'red' : '#4eb7f5' }}>{status}</span>
                    <span> {!showListStatus ? <AiFillCaretDown /> : <AiFillCaretUp />}</span>
                    {showListStatus && (
                      <DropDown
                        items={listStatus}
                        style={{ width: '100%', left: '0', top: '35px', fontWeight: '500' }}
                        onClick={handleClickItemStatus}
                      />
                    )}
                  </div>
                </span>
                <div className={cx('form-group')} style={{ color: '#212121' }}>
                  <label>Ngày giao dự kiến: </label>
                  <div className={cx('info-value')}>
                    {convertDateFromString(gift.shippingInfo.estDeliveryDate, 'less')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', overflow: 'hidden', marginTop: '16px' }}>
                <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Danh sách sản phẩm
                  </label>
                  <div className={cx('order-item-wrapper')}>
                    {gift.perks.map((item, index) => {
                      return <ItemPayment key={index} index={index} item={item} />;
                    })}
                  </div>
                  <div></div>
                </div>
                <div style={{ marginTop: '16px', marginLeft: '32px', flex: '1' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', marginLeft: '32px', marginBottom: '16px' }}>
                    Thông tin giao hàng
                  </label>
                  <div
                    style={{ borderLeft: '3px solid #4bac4d', height: '100%', paddingLeft: '32px', fontSize: '14px' }}
                  >
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}>
                      <img
                        style={{ width: '100px', height: '100px' }}
                        src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                      />

                      <div style={{ marginLeft: '16px', fontSize: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', width: '150px', fontWeight: '600' }}
                          >
                            <span>
                              <IoPersonOutline style={{ marginRight: '6px' }} />
                            </span>
                            Người nhận:
                          </span>
                          <span>{gift.shippingInfo?.fullName}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', width: '150px', fontWeight: '600' }}
                          >
                            <span>
                              <BiPhoneCall style={{ marginRight: '6px' }} />
                            </span>
                            SĐT:
                          </span>
                          <span>{gift.shippingInfo?.phoneNumber}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', width: '150px', fontWeight: '600' }}
                          >
                            <span>
                              <BiMap style={{ marginRight: '6px' }} />
                            </span>
                            Tỉnh / TP:
                          </span>
                          <span>{gift.shippingInfo?.province}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', width: '150px', fontWeight: '600' }}
                          >
                            <span>
                              <BiMapPin style={{ marginRight: '6px' }} />
                            </span>
                            Quận / Huyện:
                          </span>
                          <span>{gift.shippingInfo?.district}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', width: '150px', fontWeight: '600' }}
                          >
                            <span>
                              <BiSitemap style={{ marginRight: '6px' }} />
                            </span>
                            Xã / Thị trấn:
                          </span>
                          <span>{gift.shippingInfo?.ward}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{ display: 'inline-flex', alignItems: 'center', width: '150px', fontWeight: '600' }}
                          >
                            <span>
                              <BiMessageSquareDetail style={{ marginRight: '6px' }} />
                            </span>
                            Chi tiết:
                          </span>
                          <span>{gift.shippingInfo?.detail}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            {/* Chức năng */}
          </div>
        </div>
        <div className={cx('section-button')}>
          <a onClick={() => setShowModalGift(false)} className={cx('btn', 'btn-cancel')}>
            Đóng
          </a>

          <a onClick={handleClickSave} className={cx('btn', 'btn-ok')}>
            Xác nhận
          </a>
        </div>
        <span onClick={() => setShowModalGift(false)} className={cx('editFile-icon')}>
          <IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} />
        </span>
      </div>
    </div>
  );
}

export default ModalGift;
