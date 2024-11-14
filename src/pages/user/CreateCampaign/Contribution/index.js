import classNames from 'classnames/bind';
import { AiFillClockCircle } from 'react-icons/ai';
import ContributionTable from './components/ContributionTable';
import TopContributionTable from './components/TopContributionTable';
import GiftTable from './components/GiftTable';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import styles from './Contribution.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Search from '~/pages/admin/components/Search';
import Filter from '~/pages/admin/components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import ModalContribution from './components/ModalContribution';
import ModalGivePerk from './components/ModalGivePerk';
import formatMoney from '~/utils/formatMoney';
import ModalGift from './components/ModalGift';
import { arrow, noPerk } from '~/assets/images';
import {
  useGetAllContributionsByCampaignQuery,
  useGetTopUserContributionByCampaignQuery,
} from '~/hooks/api/queries/user/contribution.query';
import { useGetAllGiftsByCampaignQuery } from '~/hooks/api/queries/user/gift.query';

const cx = classNames.bind(styles);

function ContributionCampaign() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [numberSelected, setNumberSelected] = useState(0);
  const [queryStringGift, setQueryStringGift] = useState('');
  const [isOpenDropdownAction, setOpenDropdownAction] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [indexContributionActive, setIndexContributionActive] = useState(-1);
  const [indexGiftActive, setIndexGiftActive] = useState(-1);
  const [contributions, setContributions] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [listUserContribution, setListUserContribution] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPagesGift, setTotalPagesGift] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [currentPercent, setCurrentPercent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalGift, setShowModalGift] = useState(false);
  const [showModalGivePerk, setShowModalGivePerk] = useState(false);

  const [filterContribution, setFilterContribution] = useState({
    searchString: '',
    status: 'Tất cả',
    sortMoney: 'Tất cả',
    sortContributionDate: 'Tất cả',
    page: 1,
  });
  const [filterGift, setFilterGift] = useState({
    textSearch: '',
    status: 'Tất cả',
    time: 'Tất cả',
    page: 1,
  });

  const campaignData = useSelector((state) => state.userCampaign.campaign);
  useEffect(() => {
    if (campaignData) {
      let infoBasic = {
        status: campaignData.status,
        startDate: campaignData.startDate,
        goal: campaignData.goal,
        duration: campaignData.duration,
        currentMoney: campaignData.currentMoney,
        daysLeft: campaignData.daysLeft,
        percentProgress: campaignData.percentProgress,
        totalContributions: campaignData.totalContributions,
        owner: campaignData.owner || '',
      };
      setCampaign({ ...infoBasic });
    }
  }, [campaignData]);

  const { data: dataContributions } = useGetAllContributionsByCampaignQuery({
    ...filterContribution,
    campaignId: id,
  });

  const handleClickPreviousPageContribution = () => {
    if (filterContribution.page === 1) return;
    setFilterContribution((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleClickNextPageContribution = () => {
    if (filterContribution.page === dataContributions?.totalPages) return;
    setFilterContribution((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const getAllGiftsByCampaignMutation = useGetAllGiftsByCampaignQuery();
  const getAllGiftsByCampaign = () => {
    getAllGiftsByCampaignMutation.mutate(
      {
        id,
        queryString: queryStringGift,
      },
      {
        onSuccess(data) {
          setGifts(data.data.gifts);
          setTotalPagesGift(data.data.totalPages);
        },
      },
    );
  };
  useEffect(() => {
    const queryParams = {
      page: filterGift.page,
      searchString: filterGift.textSearch,
      status: filterGift.status,
      time: filterGift.time,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    setQueryStringGift(queryString);
    // const pathWithQueryGift = `${baseURL}/gift/getAllGiftsByCampaign/${id}?${queryString}`;
  }, [filterGift]);
  useEffect(() => {
    getAllGiftsByCampaign();
  }, [queryStringGift]);

  const handleChangStateListContributions = (listCampaign) => {
    setNumberSelected((prev) => {
      const num = listCampaign.reduce((acc, cur) => (acc + cur.isChecked ? 1 : 0), 0);
      return num;
    });
  };

  const handleChangeSearchInput = (value) => {
    setFilterContribution((prev) => ({ ...prev, searchString: value }));
  };
  const handleChangeSearchInputGift = (value) => {
    setFilterGift((prev) => ({ ...prev, textSearch: value }));
  };
  const handleClickItemFilterStatus = (item) => {
    setFilterContribution((prev) => ({ ...prev, status: item }));
  };
  const handleClickItemFilterGiftStatus = (item) => {
    setFilterGift((prev) => ({ ...prev, status: item }));
  };
  const handleClickItemFilterGiftTime = (item) => {
    setFilterGift((prev) => ({ ...prev, time: item }));
  };

  const handleClickItemFilterTime = (item) => {
    setFilterContribution((prev) => ({
      ...prev,
      sortContributionDate: item,
      sortMoney: 'Tất cả',
    }));
  };

  const handleClickItemFilterMoney = (item) => {
    setFilterContribution((prev) => ({
      ...prev,
      sortMoney: item,
      sortContributionDate: 'Tất cả',
    }));
  };

  const handleClickPreviousPageGift = () => {
    if (filterGift.page === 1) return;
    setFilterGift((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleClickNextPageGift = () => {
    if (filterGift.page === totalPages) return;
    setFilterGift((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  const openDetailContribution = (index) => {
    setIndexContributionActive(index);
    setShowModal(true);
  };
  const openDetailGift = (index) => {
    setIndexGiftActive(index);
    setShowModalGift(true);
  };
  const handleChangeStatus = (id) => {
    setContributions((prev) =>
      [...prev].map((item) => {
        if (item._id === id) {
          return { ...item, isFinish: true };
        } else return item;
      }),
    );
  };
  const handleChangeStatusGift = (id) => {
    setGifts((prev) =>
      [...prev].map((item) => {
        if (item._id === id) {
          return { ...item, isFinish: true };
        } else return item;
      }),
    );
  };
  const { data: topUsersData } = useGetTopUserContributionByCampaignQuery(id);
  useEffect(() => {
    if (topUsersData) {
      setListUserContribution(topUsersData.data);
    }
  }, [topUsersData]);

  const [userContributionGivePerk, setUserContributionGivePerk] = useState({});

  const isEditComponent = useSelector((state) => state.userCampaign.isEditAll);

  useEffect(() => {
    console.log({ campaign });
  }, [campaign]);
  return (
    <>
      <div className={cx('body')}>
        {campaign.status && campaign.status !== 'Bản nháp' && (
          <>
            <div>
              <div className={cx('entreSection')}>
                <div className={cx('entreField-header')}>Đóng góp</div>
                <div className={cx('entreField-subHeader')}>
                  Xem các đóng góp mà người ủng hộ đã đóng góp cho chiến dịch của bạn. Cùng với việc xem xét các đặc
                  quyền để gửi đúng thời hạn!
                </div>
              </div>
              <div style={{ marginBottom: '24px', maxWidth: '600px' }}>
                <Search handleChangeInput={handleChangeSearchInput} />
              </div>
              <div className={cx('table-action')}>
                <div style={{ opacity: numberSelected === 0 && '0' }}>
                  <span>
                    <strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> dự án đang
                    được chọn
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
                <div className={cx('filter-wrapper')}>
                  <div>
                    <label style={{ marginBottom: '4px' }}>Trạng thái</label>
                    <Filter
                      listConditions={['Tất cả', 'Đã gửi', 'Chưa gửi']}
                      handleClickItem={handleClickItemFilterStatus}
                      valueShow={filterContribution.status}
                    />
                  </div>

                  <div>
                    <label style={{ marginBottom: '4px' }}>Tiền</label>
                    <Filter
                      listConditions={['Tất cả', 'Tăng dần', 'Giảm dần']}
                      handleClickItem={handleClickItemFilterMoney}
                      valueShow={filterContribution.sortMoney}
                    />
                  </div>
                  <div>
                    <label style={{ marginBottom: '4px' }}>Thời gian đóng góp</label>
                    <Filter
                      listConditions={['Tất cả', 'Gần đây nhất', 'Sớm nhất']}
                      handleClickItem={handleClickItemFilterTime}
                      valueShow={filterContribution.sortContributionDate}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <div className={cx('table-wrapper')}>
                  <div className={cx('card-progress')}>
                    <div className={cx('money-info')}>
                      <div className={cx('money')}>
                        <span className={cx('current-money')}>{formatMoney(campaign.currentMoney)}</span>
                        <span className={cx('unit-money')}>VNĐ</span>
                      </div>
                      <div className={cx('money')}>
                        <span className={cx('current-money')}>{formatMoney(Number(campaign.goal))}</span>
                        <span className={cx('unit-money')}>VNĐ</span>
                      </div>
                    </div>
                    <div className={cx('progressbar')}>
                      <div
                        className={cx('progressbar-value')}
                        style={{
                          width: campaign.percentProgress >= 100 ? '100%' : `${campaign.percentProgress}%`,
                        }}
                      ></div>
                    </div>

                    <div className={cx('days-left')}>
                      <span className={cx('percent')}>
                        {campaign.percentProgress % 100 === 0
                          ? campaign.percentProgress
                          : campaign.percentProgress?.toFixed(2)}
                        %
                      </span>
                      <span className={cx('left')}>
                        <AiFillClockCircle style={{ color: 'rgb(173 172 172)' }} />
                        <span>{campaign.daysLeft}</span>
                      </span>
                    </div>
                  </div>
                  {campaign.daysLeft === 'Hết hạn' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                      <span style={{ display: 'block', paddingBottom: '2px', borderBottom: '1px dashed #949494' }}>
                        Gây quỹ:
                      </span>
                      {campaign.status === 'Đã hoàn thành' && (
                        <div
                          style={{
                            padding: '4px 16px',
                            background: '#34ca96',
                            color: '#fff',
                            borderRadius: '4px',
                          }}
                        >
                          Thành công
                        </div>
                      )}
                      {campaign.status !== 'Đã hoàn thành' && (
                        <div
                          style={{
                            padding: '4px 16px',
                            background: '#a8a8a8',
                            color: '#fff',
                            borderRadius: '8px',
                          }}
                        >
                          Thất bại
                        </div>
                      )}
                    </div>
                  )}
                  <ContributionTable
                    contributions={dataContributions?.contributions || []}
                    onContributionTableChange={handleChangStateListContributions}
                    openDetailContribution={openDetailContribution}
                  />
                  {dataContributions?.totalPages > 0 && (
                    <div className={cx('pagination-wrapper')}>
                      <div className={cx('pagination')}>
                        <span
                          className={cx(
                            'icon',
                            `${
                              filterContribution.page <= dataContributions?.totalPages &&
                              dataContributions.totalPages !== 1 &&
                              filterContribution.page > 1 &&
                              'hover:bg-[#ebe8f1] hover:cursor-pointer'
                            }`,
                          )}
                          onClick={handleClickPreviousPageContribution}
                        >
                          <FaAngleLeft
                            style={{ color: '#7a69b3', opacity: filterContribution.page === 1 ? '0.3' : '1' }}
                          />
                        </span>

                        <span
                          className={cx('curent')}
                        >{`${filterContribution.page} của ${dataContributions?.totalPages}`}</span>
                        <span
                          className={cx(
                            'icon',
                            `${
                              filterContribution.page < dataContributions?.totalPages &&
                              'hover:bg-[#ebe8f1] hover:cursor-pointer'
                            }`,
                          )}
                          onClick={handleClickNextPageContribution}
                        >
                          <FaAngleRight
                            style={{
                              color: '#7a69b3',
                              opacity: filterContribution.page === dataContributions?.totalPages ? '0.3' : '1',
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '30px', textAlign: 'left' }}>
              <div className={cx('entreSection')} style={{ marginBottom: '20px' }}>
                <div className={cx('entreField-header')}>Đóng góp nhiều nhất</div>
                <div className={cx('entreField-subHeader')}>
                  Tính năng xem top những người đóng góp nhiều nhất. Kèm theo tùy chọn tặng thêm các đặc quyền cho những
                  người đóng góp này.
                </div>
              </div>
              <div style={{ marginTop: '40px' }}>
                <div className={cx('table-wrapper-2')}>
                  <TopContributionTable
                    isEditComponent={isEditComponent}
                    listUserContribution={listUserContribution}
                    setShowModalGivePerk={setShowModalGivePerk}
                    setUserContributionGivePerk={setUserContributionGivePerk}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '30px', textAlign: 'left' }}>
              <div className={cx('entreSection')} style={{ marginBottom: '20px' }}>
                <div className={cx('entreField-header')}>Đặc quyền đã tặng</div>
                <div className={cx('entreField-subHeader')}>
                  Xem và kiểm soát những đặc quyền bạn đã từng tặng cho người đóng góp tại đây.
                </div>
              </div>
              <div style={{ marginBottom: '24px', maxWidth: '600px' }}>
                <Search handleChangeInput={handleChangeSearchInputGift} />
              </div>
              <div className={cx('table-action')}>
                <div style={{ opacity: numberSelected === 0 && '0' }}>
                  <span>
                    <strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> dự án đang
                    được chọn
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
                <div className={cx('filter-wrapper')}>
                  <div>
                    <label style={{ marginBottom: '4px' }}>Trạng thái</label>
                    <Filter
                      listConditions={['Tất cả', 'Đã gửi', 'Chưa gửi']}
                      handleClickItem={handleClickItemFilterGiftStatus}
                      valueShow={filterGift.status}
                    />
                  </div>
                  <div>
                    <label style={{ marginBottom: '4px' }}>Thời gian dự kiến giao</label>
                    <Filter
                      listConditions={['Tất cả', 'Trễ nhất', 'Sớm nhất']}
                      handleClickItem={handleClickItemFilterGiftTime}
                      valueShow={filterGift.time}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <div className={cx('table-wrapper')}>
                  <GiftTable gifts={gifts} openDetailGift={openDetailGift} />
                </div>
                {totalPagesGift > 0 && (
                  <div className={cx('pagination-wrapper')}>
                    <div className={cx('pagination')}>
                      <span className={cx('icon')} onClick={handleClickPreviousPageGift}>
                        <FaAngleLeft style={{ color: '#7a69b3' }} />
                      </span>
                      <span className={cx('curent')}>{`${filterGift.page} của ${totalPagesGift}`}</span>
                      <span className={cx('icon')} onClick={handleClickNextPageGift}>
                        <FaAngleRight style={{ color: '#7a69b3' }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {campaign.status === 'Bản nháp' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={cx('container-layout')}>
              <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>
                CHIẾN DỊCH CỦA BẠN CHƯA ĐƯỢC PHÁT HÀNH{' '}
              </div>
              <div style={{ marginTop: '12px' }}>
                <span>Mục này ghi nhận lại lịch sử đóng góp của người ủng hộ cho chiến dịch của bạn</span>
              </div>
              <img src={noPerk} className={cx('img-frame')} alt="Không có vật phẩm" />

              <div style={{ marginTop: '40px' }}>Phát hành chiến dịch thôi nào!</div>
              <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Phát hành ở đây.</div>
              <img
                src={arrow}
                style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }}
                alt="phát hành"
              />

              <div style={{ marginTop: '40px' }}>
                <Link
                  to={`/campaigns/${id}/edit/settings`}
                  className={cx('btn', 'btn-ok')}
                  style={{ fontSize: '16px' }}
                >
                  PHÁT HÀNH{' '}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ModalContribution
          isEditComponent={isEditComponent}
          setShowModal={setShowModal}
          contribution={dataContributions?.contributions[indexContributionActive]}
          handleChangeStatus={handleChangeStatus}
        />
      )}
      {showModalGivePerk && (
        <ModalGivePerk
          setShowModalGivePerk={setShowModalGivePerk}
          userContributionGivePerk={userContributionGivePerk}
          getAllGifts={getAllGiftsByCampaign}
        />
      )}
      {showModalGift && (
        <ModalGift
          isEditComponent={isEditComponent}
          setShowModalGift={setShowModalGift}
          gift={gifts[indexGiftActive]}
          handleChangeStatus={handleChangeStatusGift}
        />
      )}
    </>
  );
}

export default ContributionCampaign;
