import classNames from 'classnames/bind';
import styles from './ItemCampaign.module.scss';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setLoading } from '~/redux/slides/GlobalApp';
import baseURL from '~/utils/baseURL';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);

function ItemCampaign({ item, getCampaignsFollowed }) {
  const { id } = useParams();
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
      window.location.href = `/project/${item._id}/detail`;
    }
  };
  const handleClickImg = () => {
    if (item.status !== 'Bản nháp' && item.status !== 'Đang tạm ngưng' && item.status !== 'Chờ xác nhận') {
      window.location.href = `/project/${item._id}/detail`;
    }
  };
  const handleDeleteCampaign = async () => {
    if (item.status === 'Đang gây quỹ') {
      toast.error('Chiến dịch đang gây quỹ! Không thể xóa');
    } else {
      dispatch(setLoading(true));
      try {
        const res = await CustomAxios.delete(`${baseURL}/campaign/delete/userDeleteCampaign/${item._id}`);
        dispatch(setLoading(false));
        toast.success(res.data.message);
        getCampaignsFollowed();
      } catch (error) {
        dispatch(setLoading(false));
        toast.error('Có lỗi trong quá trình xóa chiến dịch');
      }
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('campaign')}>
        <img src={item.cardImage?.url} style={{ cursor: 'pointer' }} onClick={handleClickImg} />
        <div className={cx('campaign-info')}>
          <div className={cx('campaign-title-wrapper')}>
            <h2 onClick={handleClickTitleCampaign} className={cx('campaign-title')}>
              {item.title}
            </h2>{' '}
            <span
              className={cx({
                banNhap: item.status === 'Bản nháp' || item.status === 'Đã kết thúc',
                choXacNhan: item.status === 'Chờ xác nhận',
                dangGayQuy: item.status === 'Đang gây quỹ',
              })}
            >
              {' '}
              {item.status}
            </span>
          </div>
          <span className={cx('campaign-author')}>
            by <a href={`/individuals/${item.owner?._id}/profile`}>{item.owner?.fullName}</a>
          </span>

          <p className={cx('campaign-tagline')}>{item.fullName}</p>
          <span className={cx('campaign-id')}>Mã chiến dịch: {item._id?.substring(10)}</span>
        </div>
      </div>
      <div>
        {currentUser._id &&
          (item.team?.some((x) => {
            return x.user === currentUser._id && x.isAccepted === true;
          }) ||
            item.owner?._id === currentUser._id) && (
            <div onClick={() => setShowDropDown((prev) => !prev)} className={cx('action')} ref={dropdownElement}>
              <span>Hành động </span>
              {!showDropDown && <FaAngleDown />}
              {showDropDown && <FaAngleUp />}

              <div className={cx('action-dropdown', { show: showDropDown })}>
                {currentUser._id &&
                  (item.owner?._id === currentUser._id ||
                    item.team?.some(
                      (x) => x.user === currentUser._id && x.canEdit === true && x.isAccepted === true,
                    )) && <a href={`/campaigns/${item._id}/edit/basic`}>Chỉnh sửa chiến dịch</a>}
                {currentUser._id &&
                  item.team?.some(
                    (x) => x.user === currentUser._id && x.canEdit === false && x.isAccepted === true,
                  ) && <a href={`/campaigns/${item._id}/edit/basic`}>Xem chiến dịch</a>}
                <div style={{ height: '1px', background: '#ccc' }}></div>
                {currentUser._id && item.owner?._id === currentUser._id && (
                  <a onClick={handleDeleteCampaign}>Xóa chiến dịch</a>
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
