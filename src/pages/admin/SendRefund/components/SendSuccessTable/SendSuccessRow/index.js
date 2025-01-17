import classNames from 'classnames/bind';

import styles from '../SendSuccessTable.module.scss';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';
import formatMoney from '~/utils/formatMoney';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function SendSuccessRow({ index, campaign, getAllCampaigns, handleClickRow }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const docElement = useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    handleClickRow(index);
  };

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

  return (
    <tr onClick={handleClick}>
      {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}

      <td className={cx('title')}>{campaign.title}</td>
      <td className={cx('owner')}>{campaign.ownerName}</td>

      <td className={cx('endDate')}>{campaign.goal}</td>
      <td className={cx('startDate')}>{campaign.currentMoney}</td>
      <td className={cx('status')}>
        <span
          className={cx('campaign-status', {
            dangGayQuy: campaign.isSend,

            thatBai: !campaign.isSend,
          })}
        >
          {campaign.isSend ? 'Đã gửi' : 'Chưa gửi'}
        </span>
      </td>
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
            <DropDown campaign={campaign} getAllCampaigns={getAllCampaigns} />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default SendSuccessRow;
