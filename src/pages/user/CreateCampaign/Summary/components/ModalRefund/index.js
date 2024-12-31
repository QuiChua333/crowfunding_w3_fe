import classNames from 'classnames/bind';
import styles from './ModalRefund.module.scss';
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
import {
  useEditContributionStatusMutation,
  useEditRefundStatusMutation,
} from '~/hooks/api/mutations/user/contribution.mutation';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { HiCamera } from 'react-icons/hi';
const cx = classNames.bind(styles);
function ModalRefund({ setShowModal, refund, handleChangeStatus }) {
  const dispatch = useDispatch();
  const [showListStatus, setShowListStatus] = useState(false);
  const [listStatus, setListStatus] = useState(() => {
    let list = ['Chưa hoàn trả', 'Đã hoàn trả'];

    return list;
  });
  const [status, setStatus] = useState(refund.isRefund ? 'Đã hoàn trả' : 'Chưa hoàn trả');
  const statusElement = useRef(null);
  const inputImage = useRef();
  const [file, setFile] = useState();
  const [proofImage, setProofImage] = useState();
  useEffect(() => {
    if (refund.proofImage) setProofImage(refund.proofImage);
  }, [refund.proofImage]);
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

  const editRefundStatusMutation = useEditRefundStatusMutation();
  const handleClickSave = async () => {
    const isChangeStatus = status !== (refund.isRefund ? 'Đã hoàn trả' : 'Chưa hoàn trả');
    const fileChange = !!file;

    if (isChangeStatus || fileChange) {
      dispatch(setLoading(true));

      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }

      if (isChangeStatus) {
        formData.append('isRefund', status === 'Đã hoàn trả' ? true : false);
      }

      editRefundStatusMutation.mutate(
        {
          id: refund.id,
          data: formData,
        },
        {
          onSuccess(data) {
            dispatch(setLoading(false));
            setShowModal(false);
            toast.success('Thay đổi trạng thái hoàn trả thành công!');
            handleChangeStatus(refund.id, status === 'Đã hoàn trả' ? true : false, data.proofImage);
          },
          onError() {
            dispatch(setLoading(false));
          },
        },
      );
    } else {
      setShowModal(false);
    }
  };

  const handleChangeProofImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setProofImage(res);
      };
    }
  };
  const handleRemoveProofImage = () => {
    setProofImage(null);
    setFile(null);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <h3 className={cx('title')}>PHIÊN ĐÓNG GÓP</h3>
        <p className={cx('description')}>Tên người dùng hệ thống: {refund.fullName || 'Khách vãng lai'}</p>
        <p className={cx('description')}>Email: {refund.email}</p>
        <div style={{ marginBottom: '32px' }}>
          <div className={cx('product-container')}>
            <div className={cx('order-container')}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                Mã đóng góp {`#${refund.id.substring(14)}`}
                <span style={{ color: '#000' }}>
                  / Trạng thái
                  <div
                    ref={statusElement}
                    className={cx('product-category-select', { active: showListStatus })}
                    onClick={() => {
                      setShowListStatus((prev) => !prev);
                    }}
                  >
                    <span style={{ color: status === 'Chưa hoàn trả' ? 'red' : '#4eb7f5' }}>{status}</span>
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
              </div>
              <div style={{ display: 'flex', gap: '48px', marginTop: '8px' }}>
                <div style={{ width: '40%' }}>
                  <div className={cx('form-group')}>
                    <label>Ngày đóng góp: </label>
                    <div className={cx('info-value')}>{convertDateFromString(refund.date, 'full')}</div>
                  </div>
                  <div className={cx('form-group')}>
                    <label>{refund.perks?.length > 0 ? 'Tiền đặc quyền: ' : 'Tiền thanh toán: '} </label>
                    <div className={cx('info-value')}>
                      {formatMoney(Number(refund.amount))} VNĐ{' '}
                      {refund.method === 'crypto' && `(${refund.amountCrypto} ETH)`}
                    </div>
                  </div>
                </div>
                <div style={{ width: '40%' }}>
                  <div className={cx('form-group')}>
                    <label>Số đặc quyền: </label>
                    <div className={cx('info-value')}>{refund.perks?.length || 0}</div>
                  </div>
                  <div className={cx('form-group')}>
                    <label>Phí ship:</label>
                    <div className={cx('info-value')}>{formatMoney(refund.totalPayment - refund.amount)}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '48px' }}>
                <div className={cx('form-group', 'single')} style={{ width: '40%' }}>
                  <label>Tổng tiền: </label>
                  <div className={cx('info-value')}>{formatMoney(refund.totalPayment)} VNĐ</div>
                </div>

                <div className={cx('form-group', 'single')} style={{ width: '40%' }}>
                  {refund.perks && refund.perks.length > 0 && (
                    <>
                      <label>Ngày giao dự kiến: </label>
                      <div className={cx('info-value')}>{convertDateFromString(refund.date)}</div>
                    </>
                  )}
                </div>
              </div>
              {refund.method === 'crypto' && (
                <>
                  <div style={{ display: 'flex', gap: '48px' }}>
                    <div className={cx('form-group', 'single')}>
                      <label>Mã giao dịch: </label>
                      <div className={cx('info-value')}>{refund.transactionHash}</div>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${refund.transactionHash}`}
                        target="_blank"
                        title="Khám phá"
                        style={{ marginLeft: '8px' }}
                      >
                        <FaExternalLinkAlt className="text-[20px] cursor-pointer hover:opacity-80" />
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '48px' }}>
                    <div className={cx('form-group', 'single')}>
                      <label>Ví giao dịch: </label>
                      <div className={cx('info-value')}>{refund.customerWalletAddress}</div>
                    </div>
                  </div>
                </>
              )}
              <div style={{ display: 'flex', gap: '48px' }}>
                <div
                  className={cx('form-group', 'single')}
                  style={{ width: refund.method !== 'crypto' ? '40%' : '100%' }}
                >
                  <label style={{ width: '200px' }}>Phương thức thanh toán: </label>
                  <div className={cx('info-value')}>
                    {refund.method === 'momo' ? 'Momo' : refund.method === 'stripe' ? 'Stripe' : 'Tiền ảo ETH'}{' '}
                  </div>
                </div>
              </div>
              <div
                style={{ display: 'flex', overflow: 'hidden', marginTop: refund.perks?.length > 0 ? '16px' : '0px' }}
              >
                {refund.perks?.length > 0 && (
                  <>
                    <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                      <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                        Danh sách sản phẩm
                      </label>
                      <div className={cx('order-item-wrapper')}>
                        {refund.perks?.map((item, index) => {
                          return <ItemPayment key={index} index={index} item={item} modalContribution={true} />;
                        })}
                      </div>
                    </div>
                  </>
                )}
                <div
                  style={{
                    marginTop: refund.perks?.length > 0 ? '16px' : '0px',
                    marginLeft: refund.perks?.length > 0 ? '32px' : '0px',
                    flex: '1',
                  }}
                >
                  {refund.perks && refund.perks.length > 0 && (
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
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: '150px',
                                  fontWeight: '600',
                                }}
                              >
                                <span>
                                  <IoPersonOutline style={{ marginRight: '6px' }} />
                                </span>
                                Người nhận:
                              </span>
                              <span>{refund.shippingInfo?.fullName}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: '150px',
                                  fontWeight: '600',
                                }}
                              >
                                <span>
                                  <BiPhoneCall style={{ marginRight: '6px' }} />
                                </span>
                                SĐT:
                              </span>
                              <span>{refund.shippingInfo?.phoneNumber}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: '150px',
                                  fontWeight: '600',
                                }}
                              >
                                <span>
                                  <BiMap style={{ marginRight: '6px' }} />
                                </span>
                                Tỉnh / TP:
                              </span>
                              <span>{refund.shippingInfo?.province}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: '150px',
                                  fontWeight: '600',
                                }}
                              >
                                <span>
                                  <BiMapPin style={{ marginRight: '6px' }} />
                                </span>
                                Quận / Huyện:
                              </span>
                              <span>{refund.shippingInfo?.district}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: '150px',
                                  fontWeight: '600',
                                }}
                              >
                                <span>
                                  <BiSitemap style={{ marginRight: '6px' }} />
                                </span>
                                Xã / Thị trấn:
                              </span>
                              <span>{refund.shippingInfo?.ward}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  width: '150px',
                                  fontWeight: '600',
                                }}
                              >
                                <span>
                                  <BiMessageSquareDetail style={{ marginRight: '6px' }} />
                                </span>
                                Chi tiết:
                              </span>
                              <span>{refund.shippingInfo?.detail}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: refund.perks?.length > 0 ? '48px' : '32px' }}>
                    <label
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        marginLeft: refund.perks?.length > 0 ? '32px' : '0px',
                        marginBottom: '16px',
                      }}
                    >
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
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                width: '150px',
                                fontWeight: '600',
                              }}
                            >
                              <span>
                                <IoPersonOutline style={{ marginRight: '6px' }} />
                              </span>
                              Tên ngân hàng:
                            </span>
                            <span>{refund.bankName}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                width: '150px',
                                fontWeight: '600',
                              }}
                            >
                              <span>
                                <BiPhoneCall style={{ marginRight: '6px' }} />
                              </span>
                              Số tài khoản:
                            </span>
                            <span>{refund.bankAccountNumber}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                width: '150px',
                                fontWeight: '600',
                              }}
                            >
                              <span>
                                <BiPhoneCall style={{ marginRight: '6px' }} />
                              </span>
                              Tên tài khoản:
                            </span>
                            <span>{refund.bankUsername}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', overflow: 'hidden', marginTop: '32px' }}>
                <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                  <h3 className={cx('title')}>THÔNG TIN HOÀN TRẢ</h3>
                </div>
              </div>
              <div style={{ width: '40%', marginTop: '20px' }}>
                <div className={cx('form-group')}>
                  <label>Tiền hoàn trả </label>
                  <div className={cx('info-value')}>
                    {formatMoney(Number(refund.totalPayment))} VNĐ{' '}
                    {refund.method === 'crypto' && `(${refund.amountCrypto} ETH)`}
                  </div>
                </div>
                <div className={cx('form-group')}>
                  <label>Phí hệ thống </label>
                  <div className={cx('info-value')}>10 % </div>
                </div>
                <div className={cx('form-group')}>
                  <label>Thực trả </label>
                  <div className={cx('info-value')}>
                    {formatMoney(Number(refund.totalPayment) * 0.9)} VNĐ{' '}
                    {refund.method === 'crypto' && `(${(Number(refund.amountCrypto) * 1000000 * 0.9) / 1000000} ETH)`}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', overflow: 'hidden', marginTop: '32px' }}>
                <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Minh chứng hoàn trả
                  </label>
                  <div>
                    <div
                      onClick={() => {
                        inputImage.current.click();
                      }}
                      className={cx('entreField-input-image')}
                    >
                      {!proofImage && (
                        <div className={cx('tertiaryAction')}>
                          <span className={cx('tertiaryAction-icon')}>
                            <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                          </span>

                          <span className={cx('tertiaryAction-text')}>Tải ảnh minh chứng</span>
                        </div>
                      )}

                      {proofImage && (
                        <div className={cx('image-upload')}>
                          <img className={cx('container-image-upload')} src={proofImage} />
                          <div className={cx('editFile')}>
                            <span className={cx('editFile-icon')}>
                              <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                inputImage.current.value = null;
                                handleRemoveProofImage();
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
                      onChange={handleChangeProofImage}
                      className={cx('entreImage-file')}
                      ref={inputImage}
                      name="file"
                      hidden
                      type="file"
                      accept="image/jpg, image/jpeg, image/png"
                    />
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
        <span onClick={() => setShowModal(false)} className={cx('editFile-icon-modal')}>
          <IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} />
        </span>
      </div>
    </div>
  );
}

export default ModalRefund;
