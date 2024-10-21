import classNames from 'classnames/bind';
import styles from './ModalContribution.module.scss';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { IoCloseSharp } from 'react-icons/io5';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { BiMap, BiMapPin, BiSitemap, BiPhoneCall, BiMessageSquareDetail } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import ItemPayment from '~/pages/user/Payment/components/ItemPayment';
import DropDown from './DropDown';
import formatMoney from '~/utils/formatMoney';
import { toast } from 'react-toastify';
import { convertDateFromString } from '~/utils';
import { useEditContributionStatusMutation } from '~/hooks/api/mutations/user/contribution.mutation';
const cx = classNames.bind(styles);
function ModalContribution({ setShowModal, contribution, handleChangeStatus, isEditComponent }) {
  const dispatch = useDispatch();
  const [showListStatus, setShowListStatus] = useState(false);
  const [listStatus, setListStatus] = useState(() => {
    let list;
    if (!contribution.isFinish) {
      list = ['Chưa gửi', 'Đã gửi'];
    } else list = ['Đã gửi'];
    return list;
  });
  const [status, setStatus] = useState(contribution.isFinish ? 'Đã gửi' : 'Chưa gửi');
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
    // dispatch(handleChangeOrderStatus({index, status: item}))
  };

  const editContributionStatusMutation = useEditContributionStatusMutation();
  const handleClickSave = async () => {
    if (status !== (contribution.isFinish ? 'Đã gửi' : 'Chưa gửi')) {
      dispatch(setLoading(true));
      editContributionStatusMutation.mutate(
        {
          id: contribution._id,
          data: {
            isFinish: true,
          },
        },
        {
          onSuccess(data) {
            console.log(data.data);
            handleChangeStatus(contribution._id);
            dispatch(setLoading(false));
            setShowModal(false);
            toast.success('Thay đổi trạng thái gửi đặc quyền thành công!');
          },
          onError() {
            dispatch(setLoading(false));
          },
        },
      );
    } else setShowModal(false);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <h3 className={cx('title')}>PHIÊN ĐÓNG GÓP</h3>
        <p className={cx('description')}>
          Tên người dùng hệ thống: {contribution.email ? contribution.user[0].fullName : 'Khách vãng lai'}
        </p>
        <p className={cx('description')}>Email: {contribution.email ? contribution.email : 'Không'}</p>
        <div style={{ marginBottom: '32px' }}>
          <div className={cx('product-container')}>
            <div className={cx('order-container')}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                Mã đóng góp {`#${contribution.contributionId.substring(4)}`}
                {contribution.perks && contribution.perks.length > 0 && (
                  <span style={{ color: '#000' }}>
                    / Trạng thái
                    <div
                      ref={statusElement}
                      className={cx('product-category-select', { active: showListStatus })}
                      onClick={() => {
                        if (!contribution.isFinish) {
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
                )}
              </div>
              <div style={{ display: 'flex', gap: '48px', marginTop: '8px' }}>
                <div style={{ width: '40%' }}>
                  <div className={cx('form-group')}>
                    <label>Ngày đóng góp: </label>
                    <div className={cx('info-value')}>{convertDateFromString(contribution.date, 'full')}</div>
                  </div>
                  <div className={cx('form-group')}>
                    <label>Tiền đặc quyền: </label>
                    <div className={cx('info-value')}>
                      {formatMoney(
                        contribution.perks.reduce((acc, cur) => {
                          return acc + cur.price;
                        }, 0),
                      )}{' '}
                      VNĐ
                    </div>
                  </div>
                </div>
                <div style={{ width: '40%' }}>
                  <div className={cx('form-group')}>
                    <label>Số đặc quyền: </label>
                    <div className={cx('info-value')}>{contribution.perks.length}</div>
                  </div>
                  <div className={cx('form-group')}>
                    <label>Phí ship:</label>
                    <div className={cx('info-value')}>
                      {contribution.perks && contribution.perks.length > 0
                        ? formatMoney(
                            contribution.money -
                              contribution.perks.reduce((acc, cur) => {
                                return acc + cur.price;
                              }, 0),
                          )
                        : 0}{' '}
                      VNĐ
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '48px' }}>
                <div className={cx('form-group', 'single')} style={{ width: '40%' }}>
                  <label>Tổng tiền: </label>
                  <div className={cx('info-value')}>{formatMoney(contribution.money)} VNĐ</div>
                </div>

                <div className={cx('form-group', 'single')} style={{ width: '40%' }}>
                  {contribution.perks && contribution.perks.length > 0 && (
                    <>
                      <label>Ngày giao dự kiến: </label>
                      <div className={cx('info-value')}>{convertDateFromString(contribution.date)}</div>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', overflow: 'hidden', marginTop: '16px' }}>
                <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Danh sách sản phẩm
                  </label>
                  <div className={cx('order-item-wrapper')}>
                    {contribution.perks.map((item, index) => {
                      return <ItemPayment key={index} index={index} item={item} />;
                    })}
                  </div>
                  <div></div>
                </div>
                <div style={{ marginTop: '16px', marginLeft: '32px', flex: '1' }}>
                  {contribution.perks && contribution.perks.length > 0 && (
                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', marginLeft: '32px', marginBottom: '16px' }}>
                        Thông tin giao hàng
                      </label>
                      <div
                        style={{
                          borderLeft: '3px solid #4bac4d',
                          height: '100%',
                          paddingLeft: '32px',
                          fontSize: '14px',
                        }}
                      >
                        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}>
                          <img
                            style={{ width: '100px', height: '100px' }}
                            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                          />

                          <div style={{ marginLeft: '16px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                <span>
                                  <IoPersonOutline style={{ marginRight: '6px' }} />
                                </span>
                                Người nhận:
                              </span>
                              <span>{contribution.shippingInfo?.fullName}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                <span>
                                  <BiPhoneCall style={{ marginRight: '6px' }} />
                                </span>
                                SĐT:
                              </span>
                              <span>{contribution.shippingInfo?.phoneNumber}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                <span>
                                  <BiMap style={{ marginRight: '6px' }} />
                                </span>
                                Tỉnh / TP:
                              </span>
                              <span>{contribution.shippingInfo?.province}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                <span>
                                  <BiMapPin style={{ marginRight: '6px' }} />
                                </span>
                                Quận / Huyện:
                              </span>
                              <span>{contribution.shippingInfo?.district}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                <span>
                                  <BiSitemap style={{ marginRight: '6px' }} />
                                </span>
                                Xã / Thị trấn:
                              </span>
                              <span>{contribution.shippingInfo?.ward}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                                <span>
                                  <BiMessageSquareDetail style={{ marginRight: '6px' }} />
                                </span>
                                Chi tiết:
                              </span>
                              <span>{contribution.shippingInfo?.detail}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: '48px' }}>
                    <label style={{ fontSize: '16px', fontWeight: '600', marginLeft: '32px', marginBottom: '16px' }}>
                      Thông tin tài khoản ngân hàng
                    </label>
                    <div
                      style={{ borderLeft: '3px solid #4bac4d', height: '100%', paddingLeft: '32px', fontSize: '14px' }}
                    >
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}>
                        <img
                          style={{ width: '100px', height: '100px' }}
                          src="https://cdn-icons-png.flaticon.com/512/8634/8634075.png"
                        />

                        <div style={{ marginLeft: '16px', fontSize: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                              <span>
                                <IoPersonOutline style={{ marginRight: '6px' }} />
                              </span>
                              Tên ngân hàng:
                            </span>
                            <span>{contribution.bankAccount?.bank}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-block', width: '150px', fontWeight: '600' }}>
                              <span>
                                <BiPhoneCall style={{ marginRight: '6px' }} />
                              </span>
                              Số tài khoản:
                            </span>
                            <span>{contribution.bankAccount?.numberAccount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Chức năng */}
          </div>
        </div>
        <div className={cx('section-button')}>
          <a onClick={() => setShowModal(false)} className={cx('btn', 'btn-cancel')}>
            Đóng
          </a>

          <a onClick={handleClickSave} className={cx('btn', 'btn-ok')}>
            Xác nhận
          </a>
        </div>
        <span onClick={() => setShowModal(false)} className={cx('editFile-icon')}>
          <IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} />
        </span>
      </div>
    </div>
  );
}

export default ModalContribution;
