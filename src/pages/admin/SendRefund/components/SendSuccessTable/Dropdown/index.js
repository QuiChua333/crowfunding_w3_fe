import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function DropDown({ campaign }) {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('action')} onClick={() => navigate(`/campaigns/${campaign.id}/edit/basic`)}>
        Xem chiến dịch
      </div>
    </div>
  );
}

export default DropDown;
