import classNames from 'classnames/bind';
import styles from '../../../../Profile.module.scss';
import { useState } from 'react';
import { useGetCampaignsOfOwnerQuery } from '~/hooks/api/queries/user/campaign.query';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemCampaign from '../ItemCampaign';
const cx = classNames.bind(styles);

function OwnerCampaignTab() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [filterOwner, setFilterOwner] = useState({
    searchString: '',
    status: 'Tất cả',
    page: 1,
  });

  const { data: dataCampaignsOwner, isLoading: isLoadingCampaignOwner } = useGetCampaignsOfOwnerQuery({
    id,
    ...filterOwner,
  });
  const handleClickItemFilterOwner = (item) => {
    setFilterOwner((prev) => ({ ...prev, status: item }));
  };

  const handleChangeSearchInputOwner = (value) => {
    setFilterOwner((prev) => ({ ...prev, searchString: value }));
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
              handleChangeInput={handleChangeSearchInputOwner}
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
                  handleClickItem={handleClickItemFilterOwner}
                />
              </div>
            </div>
          </div>
        </div>
        {dataCampaignsOwner?.campaigns.map((item, index) => {
          return <ItemCampaign key={index} item={item} />;
        })}
        {!isLoadingCampaignOwner && dataCampaignsOwner?.campaigns?.length === 0 && id !== currentUser.id && (
          <p>Không có chiến dịch</p>
        )}
        {!isLoadingCampaignOwner && dataCampaignsOwner?.campaigns?.length === 0 && id === currentUser.id && (
          <p>Không có chiến dịch</p>
        )}
      </div>
    </div>
  );
}

export default OwnerCampaignTab;
