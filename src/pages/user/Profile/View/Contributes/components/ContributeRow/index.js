import classNames from 'classnames/bind';
import styles from './ContributeRow.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function ContributeRow({ index, contribute, handleViewContribution }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const docElement = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (docElement.current && !docElement.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [docElement]);

  const handleView = () => {
    handleViewContribution(index);
  };

  return (
    <tr>
      <td>{convertDateFromString(contribute.date)}</td>
      <td
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '350px',
          padding: '0 30px',
        }}
      >
        {contribute.campaignInfo.title}
      </td>
      <td>{formatMoney(contribute.money)} VND</td>

      {contribute.isFinish ? (
        <td>
          <div className={cx('responsed')}>Đã nhận</div>
        </td>
      ) : (
        <td>
          <div className={cx('un-response')}>Chưa nhận</div>
        </td>
      )}

      <td className={cx('action')}>
        <div
          className={cx('action-doc')}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropDown((prev) => !prev);
          }}
          ref={docElement}
        >
          <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
          <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
            <DropDown contribute={contribute} handleView={handleView} />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default ContributeRow;
