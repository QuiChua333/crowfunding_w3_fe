import classNames from 'classnames/bind';
import styles from './SendRefund.module.scss';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setTabAdmin } from '~/redux/slides/Admin';
import { SendSuccessTab } from './components';
import RefundFailedTab from './components/RefundFailedTab';

const cx = classNames.bind(styles);
function SendRefund() {
  const dispatch = useDispatch();
  const [tabActive, setTabActive] = useState(1);
  useEffect(() => {
    dispatch(
      setTabAdmin({
        number: 4,
        content: 'Gửi - trả tiền chiến dịch',
      }),
    );
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tabpanel')}>
        <div
          onClick={() => setTabActive(1)}
          className={cx('tab', {
            active: tabActive === 1,
          })}
        >
          Gửi chiến dịch thành công
        </div>
        <div
          onClick={() => setTabActive(2)}
          className={cx('tab', {
            active: tabActive === 2,
          })}
        >
          Hoàn trả chiến dịch thất bại
        </div>
      </div>

      <div className="mt-[20px]">
        {tabActive === 1 && <SendSuccessTab />}
        {tabActive === 2 && <RefundFailedTab />}
      </div>
    </div>
  );
}

export default SendRefund;
