import classNames from 'classnames/bind';
import styles from './ItemCampaign.module.scss';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDeleteCampaignMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { defaultCardCampaign } from '~/assets/images';
const cx = classNames.bind(styles);

function ItemCampaign({ item, getCampaignsFollowed }) {
  console.log(item.teamMembers);
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownElement = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownElement.current && !dropdownElement.current.contains(event.target)) {
        setShowDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownElement]);
  const handleClickTitleCampaign = () => {
    if (item.status !== 'Bản nháp' && item.status !== 'Đang tạm ngưng' && item.status !== 'Chờ xác nhận') {
      navigate(`/project/${item.id}/detail`);
    }
  };
  const handleClickImg = () => {
    if (item.status !== 'Bản nháp' && item.status !== 'Đang tạm ngưng' && item.status !== 'Chờ xác nhận') {
      navigate(`/project/${item.id}/detail`);
    }
  };

  const deleteCampaign = useDeleteCampaignMutation();
  const handleDeleteCampaign = async () => {
    if (item.status === 'Đang gây quỹ') {
      toast.error('Chiến dịch đang gây quỹ! Không thể xóa');
    } else {
      dispatch(setLoading(true));
      deleteCampaign.mutate(item.id, {
        onSuccess: (res) => {
          toast.success(res?.data?.message);
          getCampaignsFollowed();
        },
        onError: () => {
          toast.error('Có lỗi trong quá trình xóa chiến dịch');
        },
        onSettled: () => {
          dispatch(setLoading(false));
        },
      });
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('campaign')}>
        <img
          src={item.cardImage || defaultCardCampaign}
          style={{ cursor: 'pointer' }}
          onClick={handleClickImg}
          alt="Ảnh card"
        />
        <div className={cx('campaign-info')}>
          <div className={cx('campaign-title-wrapper')}>
            <h2 onClick={handleClickTitleCampaign} className={cx('campaign-title')}>
              {item.title}
            </h2>{' '}
            <span
              className={cx({
                banNhap: item.status === 'Bản nháp' || item.status === 'Đã hoàn thành' || item.status === 'Thất bại',
                choXacNhan: item.status === 'Chờ xác nhận',
                dangGayQuy: item.status === 'Đang gây quỹ',
              })}
            >
              {' '}
              {item.status}
            </span>
          </div>
          <span className={cx('campaign-author')}>
            by <Link to={`/individuals/${item.ownerId}/profile`}>{item.owner?.fullName}</Link>
          </span>

          <p className={cx('campaign-tagline')}>{item.title}</p>
          <span className={cx('campaign-id')}>Mã chiến dịch: {item.id?.substring(10)}</span>
        </div>
      </div>
      <div>
        {currentUser.id &&
          (item.teamMembers?.some((x) => {
            return x.user.id === currentUser.id && x.confirmStatus === 'Đã xác nhận';
          }) ||
            item.ownerId === currentUser.id) && (
            <div onClick={() => setShowDropDown((prev) => !prev)} className={cx('action')} ref={dropdownElement}>
              <span>Hành động </span>
              {!showDropDown && <FaAngleDown />}
              {showDropDown && <FaAngleUp />}

              <div className={cx('action-dropdown', { show: showDropDown })}>
                {currentUser.id &&
                  (item.ownerId === currentUser.id ||
                    item.teamMembers?.some((x) => {
                      return x.user.id === currentUser.id && x.confirmStatus === 'Đã xác nhận' && x.isEdit === true;
                    })) && (
                    <a className={cx('item-dropdown')} href={`/campaigns/${item.id}/edit/basic`}>
                      Chỉnh sửa chiến dịch
                    </a>
                  )}

                {currentUser.id &&
                  (item.ownerId === currentUser.id ||
                    item.teamMembers?.some((x) => {
                      return x.user.id === currentUser.id && x.confirmStatus === 'Đã xác nhận';
                    })) && (
                    <a className={cx('item-dropdown')} href={`/campaigns/${item.id}/edit/basic`}>
                      Xem chiến dịch
                    </a>
                  )}
                <div style={{ height: '1px', background: '#ccc' }}></div>
                {currentUser.id && item.ownerIid === currentUser.id && (
                  <span className={cx('item-dropdown')} onClick={handleDeleteCampaign}>
                    Xóa chiến dịch
                  </span>
                )}

                <div style={{ height: '1px', background: '#ccc' }}></div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default ItemCampaign;
