import classNames from 'classnames/bind';
import styles from '../../../../Profile.module.scss';
import { useState } from 'react';
import { useGetCampaignsOfMemberQuery, useGetCampaignsOfOwnerQuery } from '~/hooks/api/queries/user/campaign.query';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemCampaign from '../ItemCampaign';
const cx = classNames.bind(styles);

function MemberCampaignTab() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [filterMember, setFilterMember] = useState({
    searchString: '',
    status: 'Tất cả',
    page: 1,
  });
  const { data: dataCampaignsMember } = useGetCampaignsOfMemberQuery({ id, ...filterMember });
  const handleClickItemFilterMember = (item) => {
    setFilterMember((prev) => ({ ...prev, status: item }));
  };

  const handleChangeSearchInputMember = (value) => {
    setFilterMember((prev) => ({ ...prev, searchString: value }));
  };
  return (
    <div className={cx('wrapper')}>
      <div>
        {dataCampaignsMember?.campaigns?.length > 0 && (
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
                handleChangeInput={handleChangeSearchInputMember}
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
                    handleClickItem={handleClickItemFilterMember}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {dataCampaignsMember?.campaigns?.length === 0 && !currentUser.id && <p>Không có chiến dịch</p>}
        {dataCampaignsMember?.campaigns?.length === 0 && currentUser.id && currentUser.id === id && (
          <p>Không có chiến dịch</p>
        )}
        {dataCampaignsMember?.campaigns?.length === 0 && currentUser.id && currentUser.id !== id && (
          <p>Không có chiến dịch</p>
        )}
        {dataCampaignsMember?.campaigns?.length > 0 &&
          currentUser.id &&
          currentUser.id === id &&
          dataCampaignsMember?.campaigns?.map((item, index) => {
            return <ItemCampaign key={index} item={item} />;
          })}

        {dataCampaignsMember?.campaigns?.length > 0 &&
          currentUser.id &&
          currentUser.id !== id &&
          dataCampaignsMember?.campaigns
            ?.filter((campaign) => campaign.status !== 'Bản nháp')
            .map((item, index) => {
              return <ItemCampaign key={index} item={item} />;
            })}

        {dataCampaignsMember?.campaigns?.length > 0 &&
          !currentUser.id &&
          dataCampaignsMember?.campaigns
            ?.filter((campaign) => campaign.status !== 'Bản nháp')
            .map((item, index) => {
              return <ItemCampaign key={index} item={item} />;
            })}
      </div>
    </div>
  );
}

export default MemberCampaignTab;
