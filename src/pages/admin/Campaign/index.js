import classNames from 'classnames/bind';
import styles from './Campaign.module.scss';
import { useEffect, useState } from 'react';
import CampaignTable from './components/CampaignTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import baseURL from '~/utils/baseURL';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);
function CampaignManagement() {
  const [isLoadingData, setLoadingData] = useState(false);
  const [isOpenDropdownAction, setOpenDropdownAction] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pathWithQuery, setPathWithQuery] = useState('');
  const [numberSelected, setNumberSelected] = useState(0);
  const [filter, setFilter] = useState({
    textSearch: '',
    status: 'Tất cả',
    result: 'Tất cả',
    page: 1,
  });
  const handleClickItemFilter = (item) => {
    setFilter((prev) => ({ ...prev, status: item }));
  };
  const handleClickItemFilterResult = (item) => {
    setFilter((prev) => ({ ...prev, result: item }));
  };

  const handleChangeSearchInput = (value) => {
    setFilter((prev) => ({ ...prev, textSearch: value }));
  };
  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleClickNextPage = () => {
    if (filter.page === totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  useEffect(() => {
    const queryParams = {
      page: filter.page,
      searchString: filter.textSearch,
      status: filter.status,
      result: filter.result,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    const pathWithQuery = `${baseURL}/campaign/getAllCampaigns?${queryString}`;
    setPathWithQuery(pathWithQuery);
  }, [filter]);
  useEffect(() => {
    if (pathWithQuery) {
      getAllCampaigns();
    }
  }, [pathWithQuery]);
  const [campaigns, setCampaigns] = useState([]);

  const getAllCampaigns = async () => {
    // setLoadingData(true)
    try {
      const res = await CustomAxios.get(pathWithQuery);
      // setLoadingData(false)
      setCampaigns(res.data.data.campaigns);
      // setCampaignsOrigin(res.data.data.campaigns)
      setTotalPages(res.data.data.totalPages);
    } catch (error) {}
  };

  const handleChangStateListCampaign = (listCampaign) => {
    setNumberSelected((prev) => {
      const num = listCampaign.reduce((acc, cur) => (acc + cur.isChecked ? 1 : 0), 0);
      return num;
    });
  };

  return (
    <div className={cx('wrapper')}>
      <div style={{ marginBottom: '24px', maxWidth: '600px' }}>
        <Search handleChangeInput={handleChangeSearchInput} />
      </div>
      <div className={cx('table-action')}>
        <div style={{ opacity: numberSelected == 0 && '0' }}>
          <span>
            <strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> dự án đang được chọn
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div>
            <label style={{ marginBottom: '4px' }}>Trạng thái</label>
            <Filter
              listConditions={['Tất cả', 'Chờ xác nhận', 'Đang gây quỹ', 'Đang tạm ngưng', 'Đã kết thúc']}
              handleClickItem={handleClickItemFilter}
            />
          </div>
          <div>
            <label style={{ marginBottom: '4px' }}>Kết quả gây quỹ hiện tại</label>
            <Filter
              listConditions={['Tất cả', 'Thành công', 'Thất bại']}
              handleClickItem={handleClickItemFilterResult}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        {/* {
                isLoadingData &&
                <CampaignTableSkeleton rows={8}/>
            } */}
        <div className={cx('table-wrapper')}>
          <CampaignTable
            campaigns={campaigns}
            onCampaignTableChange={handleChangStateListCampaign}
            getAllCampaigns={getAllCampaigns}
          />
        </div>
        {totalPages > 0 && (
          <div className={cx('pagination-wrapper')}>
            <div className={cx('pagination')}>
              <span className={cx('icon')} onClick={handleClickPreviousPage}>
                <FaAngleLeft style={{ color: '#7a69b3' }} />
              </span>
              <span className={cx('curent')}>{`${filter.page} của ${totalPages}`}</span>
              <span className={cx('icon')} onClick={handleClickNextPage}>
                <FaAngleRight style={{ color: '#7a69b3' }} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampaignManagement;
