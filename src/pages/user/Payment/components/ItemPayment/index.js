import { useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import styles from './ItemPayment.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ItemPayment({ item, cryptocurrencyMode, modalContribution }) {
  return (
    <div
      className={cx('wrapper')}
      style={{ paddingTop: '24px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex' }}>
        <img style={{ width: '72px', height: '48px', objectFit: 'cover', marginRight: '16px' }} src={item.image} />
        <div style={{ marginTop: '-6px' }}>
          <div style={{ fontSize: '16px', margin: 'auto 0', fontWeight: '600', display: 'flex', gap: '6px' }}>
            {item.isNFT && (
              <div className={cx('nft')} style={{ fontSize: '12px' }}>
                NFT
              </div>
            )}

            <span> {item.name}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
            {item.options.map((option, index) => {
              return (
                <span key={index}>
                  {`${option.quantity} ${option.name}`}
                  {option.optionsString && ':'} {option.optionsString}
                </span>
              );
            })}
          </div>
          {modalContribution && item.isNFT && (
            <div className="text-[14px]">
              <div>
                <span>Uri JSON Data: </span>
                <a target="_blank" href={item.uri} style={{ color: '#4bac4d' }}>
                  Xem tại đây
                </a>
              </div>
              <div>
                <span>Token Ids: </span>
                <span>[{item.tokenIds?.join(',')}]</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
        <div style={{ fontWeight: '600', textAlign: 'right' }}>{formatMoney(item.price)}VNĐ</div>
        {cryptocurrencyMode && (
          <>
            <span className="font-[600] mr-1">{`${item.ethPrice}`} ETH </span>
          </>
        )}
        {modalContribution && item.isNFT && (
          <>
            <span className="font-[600] mr-1">{`${item.ethPrice}`} ETH </span>
          </>
        )}
        <span style={{ alignSelf: 'flex-end' }}>x{item.quantity}</span>
      </div>
    </div>
  );
}

export default ItemPayment;
