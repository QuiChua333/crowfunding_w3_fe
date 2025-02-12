import classNames from 'classnames/bind';
import styles from './ModalDetailContribution.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import ItemPayment from '~/pages/user/Payment/components/ItemPayment';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ModalDetailContribution({ setIsOpenModalDetail, contribution }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleClose = () => {
    setIsOpenModalDetail(false);
  };

  return (
    <div className={cx('wrapper')} onClick={handleClose}>
      <div className={cx('body')} onClick={(e) => e.stopPropagation()}>
        <h3 className={cx('title')}>PHIÊN ĐÓNG GÓP</h3>
        <p className={cx('description')}>Tên người dùng hệ thống: {currentUser?.fullName}</p>
        <p className={cx('description')}>Email: {currentUser?.email}</p>
        <div style={{ marginBottom: '32px' }}>
          <div className={cx('product-container')}>
            <div className={cx('order-container')}>
              <div style={{ display: 'flex', gap: '48px', marginTop: '8px' }}>
                <div className='w-full flex flex-col'>
                  <div className={cx('form-group')}>
                    <label>Tên: </label>
                    <div className={cx('info-value')}>{contribution.name}</div>
                  </div>
                  <div className={cx('form-group')}>
                    <label>Giá</label>
                    <div className={cx('info-value')}>
                      {
                        contribution.ethPrice
                      } ETH
                    </div>
                  </div>
                </div>
                <div className='w-full flex flex-col'>
                  <div className={cx('form-group')}>
                    <label>Mã: </label>
                    <div className={cx('info-value')}>{contribution.symbol}</div>
                  </div>
                  <div className={cx('form-group')}>
                    <label>Số lượng:</label>
                    <div className={cx('info-value')}>
                      {contribution.nfts.length}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '48px'}}>
                    <div className={cx('form-group', 'single')}>
                      <label>Mã giao dịch: </label>
                      <div className={cx('info-value')}>{contribution.transactionHash}</div>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${contribution.transactionHash}`}
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
                      <label>Địa chỉ hợp đồng: </label>
                      <div className={cx('info-value')}>{contribution.contractAddress}</div>
                    </div>
                  </div>

              <div style={{ display: 'flex', gap: '48px' }}>
                <div
                  className={cx('form-group', 'single', 'w-full')}
                
                >
                  <label style={{ width: '200px' }}>Phương thức thanh toán: </label>
                  <div className={cx('info-value')}>
                  Tiền ảo ETH
                  </div>
                </div>
              </div>
              {contribution.nfts?.length > 0 && (
                <div style={{ display: 'flex', overflow: 'hidden', marginTop: '16px' }}>
                  <div style={{ width: '100%', marginRight: '32px' }}>
                    <label style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                      Danh sách sản phẩm
                    </label>
                    <div className={cx('order-item-wrapper', 'mt-5')}>
                      {contribution.nfts?.map((item, index) => {
                        return (
                          <div className='flex gap-x-5 items-center' key={index}>
                            <img className='w-[140px] h-[140px]' src={contribution.image} alt='img nft'/>
                            <div className='flex flex-col gap-y-1'>
                              <div className='flex flex-row items-center gap-2'>
                                <label className='text-[14px]'>Màu sắc:</label>
                                <span className='text-[14px]'>{contribution.color}</span>
                              </div>
                              <div className='flex flex-row items-center gap-2'>
                                <label className='text-[14px]'>Chất liệu:</label>
                                <span className='text-[14px]'>{contribution.materials}</span>
                              </div>
                              <div className='flex flex-row items-center gap-2'>
                                <label className='text-[14px]'>Phong cách:</label>
                                <span className='text-[14px]'>{contribution.styles}</span>
                              </div>
                              <div className='flex flex-row items-center gap-2'>
                                <label className='text-[14px]'>Token:</label>
                                <span className='text-[14px]'>{item.tokenId}</span>
                              </div>
                              <div className='flex flex-row items-center gap-2'>
                                <label className='text-[14px]'>Địa chỉ chủ sở hữu:</label>
                                <span className='text-[14px]'>{item.ownerAddress}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
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
