import classNames from 'classnames/bind';
import styles from './ModalSendSuccess.module.scss';
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
import { useEditRefundStatusMutation } from '~/hooks/api/mutations/user/contribution.mutation';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { HiCamera } from 'react-icons/hi';
import { useEditSendFundStatusMutation } from '~/hooks/api/mutations/admin/admin.campaigns.mutation';

const cx = classNames.bind(styles);
function ModalSendSuccess({ setShowModal, campaign, handleChangeStatus }) {
  const dispatch = useDispatch();
  const [showListStatus, setShowListStatus] = useState(false);
  const [listStatus, setListStatus] = useState(() => {
    let list = ['Chưa gửi', 'Đã gửi'];

    return list;
  });
  const [status, setStatus] = useState(campaign.isSend ? 'Đã gửi' : 'Chưa gửi');
  const statusElement = useRef(null);
  const inputImage = useRef();
  const [file, setFile] = useState();
  const [proofImage, setProofImage] = useState();
  useEffect(() => {
    if (campaign.proofImage) setProofImage(campaign.proofImage);
  }, [campaign.proofImage]);
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

  const editSendFundStatus = useEditSendFundStatusMutation();
  const handleClickSave = async () => {
    const isChangeStatus = status !== (campaign.isSend ? 'Đã gửi' : 'Chưa gửi');
    const fileChange = !!file;

    if (isChangeStatus || fileChange) {
      dispatch(setLoading(true));

      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }

      if (isChangeStatus) {
        formData.append('isSend', status === 'Đã gửi' ? true : false);
      }

      editSendFundStatus.mutate(
        {
          id: campaign.id,
          data: formData,
        },
        {
          onSuccess(data) {
            dispatch(setLoading(false));
            setShowModal(false);
            toast.success('Thay đổi trạng thái gửi tiền thành công!');
            handleChangeStatus(campaign.id, status === 'Đã gửi' ? true : false, data.proofImage);
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
        <h3 className={cx('title')}>CHUYỂN TIỀN CHIẾN DỊCH THÀNH CÔNG</h3>
        <p className={cx('description')}>Tên chủ sỡ hữu: {campaign.owner.fullName}</p>
        <p className={cx('description')}>Email: {campaign.owner.email}</p>
        <div style={{ marginBottom: '32px' }}>
          <div className={cx('product-container')}>
            <div className={cx('order-container')}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d', marginTop: '20px' }}>
                <span style={{ color: '#000' }}>
                  Trạng thái
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

              <div style={{ display: 'flex', overflow: 'hidden' }}>
                <div
                  style={{
                    flex: '1',
                  }}
                >
                  <div style={{ marginTop: '32px' }}>
                    <label
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',

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
                            <span>{campaign.bankName}</span>
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
                            <span>{campaign.bankAccountNumber}</span>
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
                            <span>{campaign.bankUsername}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', overflow: 'hidden', marginTop: '32px' }}>
                <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                  <h3 className={cx('title')}>THÔNG TIN GỬI TIỀN</h3>
                </div>
              </div>
              <div style={{ width: '40%', marginTop: '20px' }}>
                <div className={cx('form-group')}>
                  <label>Tiền gửi </label>
                  <div className={cx('info-value')}>{formatMoney(Number(campaign.currentMoney))} VNĐ </div>
                </div>
                <div className={cx('form-group')}>
                  <label>Phí hệ thống </label>
                  <div className={cx('info-value')}>5 % </div>
                </div>
                <div className={cx('form-group')}>
                  <label>Thực gửi </label>
                  <div className={cx('info-value')}>{formatMoney(Number(campaign.currentMoney) * 0.95)} VNĐ </div>
                </div>
              </div>

              <div style={{ display: 'flex', overflow: 'hidden', marginTop: '32px' }}>
                <div style={{ marginTop: '16px', width: '45%', marginRight: '32px' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Minh chứng gửi tiền
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

export default ModalSendSuccess;
