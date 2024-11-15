import classNames from 'classnames/bind';
import styles from './ProjectCardItem.module.scss';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiFillClockCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import formatMoney from '~/utils/formatMoney';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import baseURL from '~/utils/baseURL';
import { CustomAxios } from '~/config';
import { defaultCardCampaign } from '~/assets/images';
import { useFollowCampaignMutation } from '~/hooks/api/mutations/user/follow-campaign.mutation';
import { setFollowCampaigns } from '~/redux/slides/User';

const cx = classNames.bind(styles);

function ProjectCardItem({ campaign, refreshCampaign }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  useEffect(() => {
    if (currentUser.followCampaigns?.includes(campaign.id)) {
      setFavourite(true);
    } else setFavourite(false);
  }, [campaign, currentUser.followCampaigns?.length]);
  const handleClickCampaign = () => {
    navigate(`/project/${campaign.id}/detail`);
  };
  const followCampaignMutation = useFollowCampaignMutation();
  const handleClickHeart = async (e) => {
    e.stopPropagation();

    followCampaignMutation.mutate(campaign.id, {
      onSuccess() {
        if (currentUser.followCampaigns.includes(campaign.id)) {
          dispatch(setFollowCampaigns(currentUser.followCampaigns.filter((item) => item !== campaign.id)));
        } else {
          dispatch(setFollowCampaigns([...currentUser.followCampaigns, campaign.id]));
        }
      },
      onError() {},
    });
  };
  return (
    <div className={cx('wrapper')} onClick={handleClickCampaign}>
      <div className={cx('card-image')}>
        <img src={campaign?.cardImage || defaultCardCampaign} alt="project-image" />
      </div>

      <div className={cx('card-info')}>
        <div>
          <div className={cx('card-status')}>
            <span
              className={cx('status', {
                dangGayQuy: campaign?.status === 'Đang gây quỹ',
                daKetThuc: campaign?.status === 'Đã hoàn thành' || campaign?.status === 'Tạm dừng',
              })}
            >
              {campaign?.status}
            </span>

            <span onClick={handleClickHeart}>
              {favourite ? <FaHeart className={cx('heart-active')} /> : <FaRegHeart className={cx('heart')} />}
            </span>
          </div>

          <h2 className={cx('card-title')}>{campaign.title}</h2>
          <p className={cx('card-description')}>{campaign.tagline}</p>
          <p className={cx('card-category')}>{campaign.field?.name}</p>
        </div>

        <div className={cx('card-progress')}>
          <div className={cx('money-info')}>
            <div className={cx('money')}>
              <span className={cx('current-money')}>{formatMoney(campaign.currentMoney)}</span>
              <span className={cx('unit-money')}>VNĐ</span>
            </div>
            <span className={cx('percent')}>
              {campaign.percentProgress % 100 === 0 ? campaign.percentProgress : campaign.percentProgress?.toFixed(2)}%
            </span>
          </div>
          <div className={cx('progressbar')}>
            <div
              className={cx('progressbar-value')}
              style={{ width: campaign.percentProgress >= 100 ? '100%' : `${campaign.percentProgress}%` }}
            ></div>
          </div>

          <div className={cx('days-left')}>
            <AiFillClockCircle style={{ color: 'rgb(173 172 172)' }} />
            <span>{campaign.daysLeft === 'Hết hạn' ? 'Hết hạn' : 'Còn ' + campaign.daysLeft}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardItem;
