import classNames from 'classnames/bind';

import styles from '../PerkTable.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../DropDown';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import axios from 'axios';
import baseURL from '~/utils/baseURL';
import { convertDateFromString } from '~/utils';
const cx = classNames.bind(styles);
function PerkRow({ index, perk, setChecked, getPerksByCampaignId, isEditComponent, handleDeletePerK }) {
  const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);
  const docElement = useRef(null);
  const navigate = useNavigate();
  const handleClickChecked = (e, index) => {
    e.stopPropagation();
    setChecked(index, !perk.isChecked);
  };
  const handleCRemovePerk = () => {
    handleDeletePerK(perk);
  };
  const handleClickPerk = () => {
    navigate(`/campaigns/${perk.campaign}/edit/perks/${perk._id}`);
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

  const changeFeatured = async (isFeatured) => {
    console.log(isFeatured);
    const body = { isFeatured };
    dispatch(setLoading(true));
    try {
      const res = await axios.patch(`${baseURL}/perk/editPerk/${perk._id}`, body);
      dispatch(setLoading(false));
      getPerksByCampaignId();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <tr onClick={handleClickPerk}>
      <td className={cx('title')}>
        {perk.title}
        {!perk.isVisible && (
          <>
            <br />
            <span>Ẩn</span>
          </>
        )}
      </td>
      <td className={cx('price')}>{perk.price} VNĐ</td>
      <td className={cx('type')}>{perk.isFeatured && <span className={cx('featured')}>NỔI BẬT</span>}</td>
      <td className={cx('quantity')}>{perk.claimed + '/' + perk.quantity}</td>
      <td className={cx('est')}>{perk.estDelivery ? convertDateFromString(perk.estDelivery, 'less') : ''}</td>
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
            <DropDown
              perk={perk}
              changeFeatured={changeFeatured}
              isEditComponent={isEditComponent}
              handleCRemovePerk={handleCRemovePerk}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default PerkRow;
