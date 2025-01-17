import classNames from 'classnames/bind';
import styles from '../../../../Profile.module.scss';
import { useState } from 'react';
import { useGetCampaignsOfMemberQuery, useGetCampaignsOfOwnerQuery } from '~/hooks/api/queries/user/campaign.query';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemCampaign from '../ItemCampaign';
import { useGetCampaignsFollowedQuery } from '~/hooks/api/queries/user/follow-campaign.query';
const cx = classNames.bind(styles);

function FollowCampaignTab() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [filterFollow, setFilterFollow] = useState({
    searchString: '',
    status: 'Tất cả',
    page: 1,
  });
  const { data: dataCampaignsFollowed, refetch } = useGetCampaignsFollowedQuery({
    id,
    ...filterFollow,
  });

  const handleClickItemFilterFollow = (item) => {
    setFilterFollow((prev) => ({ ...prev, status: item }));
  };

  const handleChangeSearchInputFollow = (value) => {
    setFilterFollow((prev) => ({ ...prev, searchString: value }));
  };
  return (
    <div className={cx('wrapper')}>
      <div>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div className="w-[600px] max-w-[600px]">
            <Search
              handleChangeInput={handleChangeSearchInputFollow}
              placeholder={'Tìm kiếm tên chiến dịch, chủ sở hữu'}
            />
          </div>
          <div className={cx('table-action')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div>
                <label style={{ marginBottom: '4px' }}>Trạng thái</label>
                <Filter
                  listConditions={[
                    'Tất cả',
                    'Chờ xác nhận',
                    'Đang gây quỹ',
                    'Tạm dừng',
                    'Thành công',
                    'Thất bại',
                    'Bản nháp',
                  ]}
                  handleClickItem={handleClickItemFilterFollow}
                />
              </div>
            </div>
          </div>
        </div>
        {currentUser.id && currentUser.id === id && (
          <div>
            {dataCampaignsFollowed?.campaigns?.length === 0 && <p>Không có chiến dịch</p>}
            {dataCampaignsFollowed?.campaigns?.map((item, index) => {
              return <ItemCampaign key={index} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowCampaignTab;
