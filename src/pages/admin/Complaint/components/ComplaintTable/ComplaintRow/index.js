import classNames from 'classnames/bind';
import styles from '../ComplaintTable.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);
function ComplaintRow({ index, report, handleViewReport }) {
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
    handleViewReport(index);
  };

  return (
    <tr>
      <td
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '250px',
          padding: '0 30px',
        }}
      >
        {report.campaignInfo.title}
      </td>
      <td style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '150px' }}>
        {report.title}
      </td>
      <td>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className={cx('avatar')} src={report.userInfo.avatar.url} alt="avt" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '14px' }}>{report.userInfo.fullName}</span>
            <span style={{ fontSize: '10px', fontStyle: 'italic' }}>{report.userInfo.email}</span>
          </div>
        </div>
      </td>
      <td>{convertDateFromString(report.date)}</td>
      {report.isResponsed === false ? (
        <td>
          <div className={cx('un-response')}>Chưa phản hồi</div>
        </td>
      ) : (
        <td>
          <div className={cx('responsed')}>Đã phản hồi</div>
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
            <DropDown handleView={handleView} report={report} />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default ComplaintRow;
