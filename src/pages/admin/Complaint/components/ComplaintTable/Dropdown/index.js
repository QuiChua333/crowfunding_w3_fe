import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function DropDown({ handleView, report }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('action')} onClick={handleView}>
        Xem chi tiết
      </div>
      <div style={{ height: '1px', background: '#ccc' }}></div>
      <div className={cx('action')}>
        <Link to={`/project/${report.campaignInfo._id}/detail`}>Đi đến chiến dịch</Link>
      </div>
    </div>
  );
}

export default DropDown;
