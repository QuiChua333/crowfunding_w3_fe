import classNames from 'classnames/bind';

import styles from './FieldGroupTable.module.scss';
import FieldGroupRow from './FieldGroupRow';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function FieldGroupTable({ getAllFieldGroup, fieldGroup }) {
  const [listFieldGroup, setlistFieldGroup] = useState([]);
  useEffect(() => {
    setlistFieldGroup((prev) => {
      const state = [...fieldGroup].map((item) => {
        return {
          id: item.id,
          name: item.name,
          fieldCount: item.fieldCount,
        };
      });
      return state;
    });
  }, [fieldGroup]);


  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th className={cx('title')}>STT</th>
            <th className={cx('owner')}>TÊN NHÓM LĨNH VỰC</th>
            <th className={cx('endDate')}>SỐ LƯỢNG LĨNH VỰC</th>
            <th className={cx('action')}></th>
          </tr>
        </thead>
        <tbody>
          {listFieldGroup?.map((item, index) => {
            return (
              <FieldGroupRow
                key={index}
                index={index}
                item={item}
                getAllFieldGroup={getAllFieldGroup}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FieldGroupTable;
