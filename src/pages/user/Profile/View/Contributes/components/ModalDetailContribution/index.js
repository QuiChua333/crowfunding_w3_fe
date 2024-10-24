import classNames from 'classnames/bind';
import styles from './ModalDetailContribution.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { BiMap, BiMapPin, BiSitemap, BiPhoneCall, BiMessageSquareDetail } from 'react-icons/bi';
import ItemPayment from '~/pages/user/Payment/components/ItemPayment';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function ModalDetailContribution({ setIsOpenModalDetail, contribution }) {
  const handleClose = () => {
    setIsOpenModalDetail(false);
  };

  return (
    <div className={cx('wrapper')} onClick={handleClose}>
      <div className={cx('body')} onClick={(e) => e.stopPropagation()}>
        <h3 className={cx('title')}>PHIÊN ĐÓNG GÓP</h3>
        <p className={cx('description')}>Tên người dùng hệ thống: {contribution.userInfo.fullName}</p>
        <p className={cx('description')}>Email: {contribution.userInfo.email}</p>
        <div style={{ marginBottom: '32px' }}>
          <div className={cx('product-container')}>
            <div className={cx('order-container')}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4bac4d' }}>
                Trạng thái:
                <span style={{ color: '#4bac4d' }}>{contribution.isFinish ? 'Đã nhận' : 'Chưa nhận'}</span>
              </div>
              <div style={{ display: 'flex', gap: '48px', marginTop: '8px' }}>
                <div style={{ width: '40%' }}>
                  <div className={cx('form-group')}>
                    <label>Ngày đóng góp: </label>
                    <div className={cx('info-value')}>{convertDateFromString(contribution.date)}</div>
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
                      {formatMoney(
                        contribution.money -
                          contribution.perks.reduce((acc, cur) => {
                            return acc + cur.price;
                          }, 0),
                      )}{' '}
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
                  <label>Ngày giao dự kiến: </label>
                  <div className={cx('info-value')}>{convertDateFromString(contribution.date, 'less')}</div>
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
                  <label
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginLeft: '32px',
                      marginBottom: '16px',
                    }}
                  >
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
                              display: 'inline-block',
                              width: '150px',
                              fontWeight: '600',
                            }}
                          >
                            <span>
                              <IoPersonOutline style={{ marginRight: '6px' }} />
                            </span>
                            Người nhận:
                          </span>
                          <span>{contribution.shippingInfo?.fullName || 'Chưa cập nhật'}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '150px',
                              fontWeight: '600',
                            }}
                          >
                            <span>
                              <BiPhoneCall style={{ marginRight: '6px' }} />
                            </span>
                            SĐT:
                          </span>
                          <span>{contribution.shippingInfo?.phoneNumber || 'Chưa cập nhật'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '150px',
                              fontWeight: '600',
                            }}
                          >
                            <span>
                              <BiMap style={{ marginRight: '6px' }} />
                            </span>
                            Tỉnh / TP:
                          </span>

                          <span>{contribution.shippingInfo?.province || 'Chưa cập nhật'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '150px',
                              fontWeight: '600',
                            }}
                          >
                            <span>
                              <BiMapPin style={{ marginRight: '6px' }} />
                            </span>
                            Quận / Huyện:
                          </span>

                          <span>{contribution.shippingInfo?.district || 'Chưa cập nhật'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '150px',
                              fontWeight: '600',
                            }}
                          >
                            <span>
                              <BiSitemap style={{ marginRight: '6px' }} />
                            </span>
                            Xã / Thị trấn:
                          </span>

                          <span>{contribution.shippingInfo?.ward || 'Chưa cập nhật'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '150px',
                              fontWeight: '600',
                            }}
                          >
                            <span>
                              <BiMessageSquareDetail style={{ marginRight: '6px' }} />
                            </span>
                            Chi tiết:
                          </span>

                          <span>{contribution.shippingInfo?.detail || 'Chưa cập nhật'}</span>
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
          <span className={cx('btn', 'btn-cancel')} onClick={handleClose}>
            Đóng
          </span>
        </div>
        <span onClick={handleClose} className={cx('editFile-icon')}>
          <IoCloseSharp style={{ color: '#3F3F3F', fontSize: '22px' }} />
        </span>
      </div>
    </div>
  );
}

export default ModalDetailContribution;
