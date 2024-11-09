import classNames from 'classnames/bind';

import styles from '../PerkTable.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../DropDown';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import axios from 'axios';
import baseURL from '~/utils/baseURL';
import { convertDateFromString } from '~/utils';
import { useEditPerkMutation } from '~/hooks/api/mutations/user/perk.mutation';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function PerkRow({ index, perk, setChecked, getPerksByCampaignId, isEditComponent, handleDeletePerK }) {
  const { id } = useParams();
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
    navigate(`/campaigns/${id}/edit/perks/${perk.id}`);
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
  const editPerkMutation = useEditPerkMutation();
  const changeFeatured = async (isFeatured) => {
    console.log(isFeatured);
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append('isFeatured', isFeatured);
    editPerkMutation.mutate(
      {
        perkId: perk.id,
        formData,
      },
      {
        onSuccess() {
          dispatch(setLoading(false));
          if (isFeatured) {
            toast.success('Đặt nổi bật thành công');
          } else toast.success('Dừng làm nổi bật thành công');

          getPerksByCampaignId();
        },
        onError(err) {
          dispatch(setLoading(false));
          console.log(err.response.data.message);
          if (isFeatured) {
            toast.success('Đặt nổi bật thất bại');
          } else toast.error('Dừng làm nổi bật thất bại');
        },
      },
    );
  };
  return (
    <tr onClick={handleClickPerk}>
      <td className={cx('title')}>
        {perk.name}
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
      <td className={cx('est')}>{perk.estDeliveryDate ? convertDateFromString(perk.estDeliveryDate, 'less') : ''}</td>
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
