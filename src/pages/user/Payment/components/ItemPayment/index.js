import { useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';

function ItemPayment({ item }) {
  return (
    <div style={{ paddingTop: '24px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        <img style={{ width: '72px', height: '48px', objectFit: 'cover', marginRight: '16px' }} src={item.perkImage} />
        <div style={{ marginTop: '-6px' }}>
          <div style={{ fontSize: '16px', margin: 'auto 0', fontWeight: '600' }}>{item.perkTitle}</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
            {item.options.map((option, index) => {
              return (
                <span key={index}>
                  {option.name}
                  {option.optionsString && ':'} {option.optionsString}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
        <span style={{ fontWeight: '600' }}>{formatMoney(item.price)}VNĐ</span>
        <span style={{ alignSelf: 'flex-end' }}>x{item.quantity}</span>
      </div>
    </div>
  );
}

export default ItemPayment;
