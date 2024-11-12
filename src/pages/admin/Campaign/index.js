import classNames from 'classnames/bind';
import styles from './Campaign.module.scss';
import { useEffect, useState } from 'react';
import CampaignTable from './components/CampaignTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { useDispatch } from 'react-redux';
import { setTabAdmin } from '~/redux/slides/Admin';
import { useGetAllCampaignsQuery } from '~/hooks/api/queries/admin/admin.campaigns.query';

const cx = classNames.bind(styles);
function CampaignManagement() {
  const dispatch = useDispatch();
  const [isOpenDropdownAction, setOpenDropdownAction] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [filter, setFilter] = useState({
    searchString: '',
    status: 'Tất cả',
    page: 1,
  });
  const handleClickItemFilter = (item) => {
    setFilter((prev) => ({ ...prev, status: item }));
  };

  const handleChangeSearchInput = (value) => {
    setFilter((prev) => ({ ...prev, searchString: value }));
  };
  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleClickNextPage = () => {
    if (filter.page === data?.totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const { data, refetch } = useGetAllCampaignsQuery(filter);

  const handleChangStateListCampaign = (listCampaign) => {
    setNumberSelected((prev) => {
      const num = listCampaign.reduce((acc, cur) => (acc + cur.isChecked ? 1 : 0), 0);
      return num;
    });
  };
  useEffect(() => {
    dispatch(
      setTabAdmin({
        number: 1,
        content: 'Quản lý chiến dịch',
      }),
    );
  }, []);
  return (
    <div className={cx('wrapper')}>
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
          <Search handleChangeInput={handleChangeSearchInput} />
        </div>
        <div className={cx('table-action')}>
          {/* <div style={{ opacity: numberSelected == 0 && '0' }}>
            <span>
              <strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> dự án đang được
              chọn
            </span>
            <div style={{ display: 'inline-block', marginLeft: '24px', position: 'relative' }}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDropdownAction((prev) => !prev);
                }}
                href="#"
                className={cx('btn', 'btn-ok')}
              >
                Xóa
              </a>
            </div>
          </div> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div>
              <label style={{ marginBottom: '4px' }}>Trạng thái</label>
              <Filter
                listConditions={['Tất cả', 'Chờ xác nhận', 'Đang gây quỹ', 'Tạm dừng', 'Đã hoàn thành', 'Thất bại']}
                handleClickItem={handleClickItemFilter}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div className={cx('table-wrapper')}>
          {data?.campaigns?.length > 0 && (
            <CampaignTable
              campaigns={data?.campaigns || []}
              onCampaignTableChange={handleChangStateListCampaign}
              getAllCampaigns={refetch}
            />
          )}
          {data?.campaigns?.length === 0 && (
            <div className="text-center text-gray-500 font-medium text-[20px] mt-[100px]">Dữ liệu trống</div>
          )}
        </div>
        {data?.totalPages > 0 && (
          <div className={cx('pagination-wrapper')}>
            <div className={cx('pagination')}>
              <span
                className={cx(
                  'icon',
                  `${
                    filter.page <= data?.totalPages &&
                    data?.totalPages !== 1 &&
                    filter.page > 1 &&
                    'hover:bg-[#ebe8f1] hover:cursor-pointer'
                  }`,
                )}
                onClick={handleClickPreviousPage}
              >
                <FaAngleLeft style={{ color: '#7a69b3', opacity: filter.page === 1 ? '0.3' : '1' }} />
              </span>

              <span className={cx('curent')}>{`${filter.page} của ${data?.totalPages}`}</span>
              <span
                className={cx('icon', `${filter.page < data?.totalPages && 'hover:bg-[#ebe8f1] hover:cursor-pointer'}`)}
                onClick={handleClickNextPage}
              >
                <FaAngleRight style={{ color: '#7a69b3', opacity: filter.page === data?.totalPages ? '0.3' : '1' }} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampaignManagement;
