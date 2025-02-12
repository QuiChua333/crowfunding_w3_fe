import classNames from 'classnames/bind';

import styles from './NFTTable.module.scss';
import PerkRow from './NFTRow';
import { useEffect, useState } from 'react';
import NFTRow from './NFTRow';

const cx = classNames.bind(styles);

function NFTTable({ listNFTs, getNFTsByCampaignId, isEditAll, isEditComponent }) {
  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th className={cx('image')}></th>
            <th className={cx('name')}>Tên NFT</th>
            <th className={cx('symbol')}>Mã Symbol</th>
            <th className={cx('quantity')}>Số lượng</th>
            <th className={cx('sold')}>Đã bán</th>
            <th className={cx('price')}>Giá</th>
          </tr>
        </thead>
        <tbody>
          {listNFTs.map((item, index) => {
            return (
              <NFTRow
                key={index}
                nft={item}
                index={index}
                getNFTsByCampaignId={getNFTsByCampaignId}
                isEditComponent={isEditComponent}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default NFTTable;
