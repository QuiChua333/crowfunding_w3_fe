import classNames from 'classnames/bind';

import styles from '../RefundTable.module.scss';

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function RefundRow({ index, refund, openDetailRefund }) {
  return (
    <tr onClick={() => openDetailRefund(index)}>
      <td className={cx('user')}>{refund.userName}</td>
      <td className={cx('email')}>{refund.email}</td>
      <td className={cx('money')}>{refund.money}</td>
      <td className={cx('date')}>{refund.date}</td>
      <td className={cx('status')}>
        <span className={cx('campaign-status')}>{refund.status}</span>
      </td>
    </tr>
  );
}

export default RefundRow;
