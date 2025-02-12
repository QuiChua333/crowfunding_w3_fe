import classNames from 'classnames/bind';

import styles from './FieldTable.module.scss';
import { useEffect, useState } from 'react';
import FieldRow from './FieldRow';

const cx = classNames.bind(styles);

function FieldTable({ getAllFieldByGroup, fields }) {
  const [listField, setlistField] = useState([]);
  useEffect(() => {
    setlistField((prev) => {
      const state = [...fields].map((item) => {
        return {
          id: item.id,
          name: item.name,
          campaignCount: item.campaignCount
        };
      });
      return state;
    });
  }, [fields]);

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th className={cx('title')}>STT</th>
            <th className={cx('owner')}>TÊN LĨNH VỰC</th>
            <th className={cx('owner')}>SỐ LƯỢNG CHIẾN DỊCH</th>
            <th className={cx('action')}></th>
          </tr>
        </thead>
        <tbody>
          {listField?.map((item, index) => {
            return (
              <FieldRow
                key={index}
                index={index}
                item={item}
                getAllFieldByGroup={getAllFieldByGroup}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FieldTable;
