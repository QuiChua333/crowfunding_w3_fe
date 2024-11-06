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
import baseURL from '~/utils/baseURL';
import Filter from '~/pages/admin/components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import ModalContribution from './components/ModalContribution';
import ModalGivePerk from './components/ModalGivePerk';
import formatMoney from '~/utils/formatMoney';
import ModalGift from './components/ModalGift';
import { arrow, noPerk } from '~/assets/images';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetAllContributionsByCampaignQuery,
  useGetMoneyByCampaignQuery,
  useGetQuantityPeopleByCampaignQuery,
  useGetTopUserContributionByCampaignQuery,
} from '~/hooks/api/queries/user/contribution.query';
import { useGetAllGiftsByCampaignQuery } from '~/hooks/api/queries/user/gift.query';

const cx = classNames.bind(styles);

function ContributionCampaign() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [numberSelected, setNumberSelected] = useState(0);
  const [pathWithQuery, setPathWithQuery] = useState('');
  const [queryStringGift, setQueryStringGift] = useState('');
  const [isOpenDropdownAction, setOpenDropdownAction] = useState(false);
  const [campagin, setCampaign] = useState({});
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

  const [filter, setFilter] = useState({
    textSearch: '',
    status: 'Tất cả',
    money: 'Tất cả',
    time: 'Tất cả',
    timeDelivery: 'Tất cả',
    page: 1,
  });
  const [filterGift, setFilterGift] = useState({
    textSearch: '',
    status: 'Tất cả',
    time: 'Tất cả',
    page: 1,
  });
  const [currentMoney, setCurrentMoney] = useState(0);
  const [backers, setBackers] = useState(0);

  const queryClient = useQueryClient();
  const dataCampaign = queryClient.getQueryData(['getCampaignById']);
  useEffect(() => {
    if (dataCampaign) {
      let infoBasic = {
        id: dataCampaign.data._id,
        title: dataCampaign.data.title || '',
        cardImage: dataCampaign.data.cardImage || { url: '', public_id: '' },
        status: dataCampaign.data.status,
        startDate: dataCampaign.data.startDate,
        goal: dataCampaign.data.goal,
        duration: dataCampaign.data.duration,
        isIndemand: dataCampaign.data.isIndemand || false,
        owner: dataCampaign.data.owner || '',
        team: dataCampaign.data.team || [],
      };
      setCampaign({ ...infoBasic });
    }
  }, [dataCampaign]);

  const { data: dataMoney } = useGetMoneyByCampaignQuery(id);
  useEffect(() => {
    if (dataMoney) {
      setCurrentMoney(dataMoney.data);
    }
  }, [dataMoney]);

  const { data: peoplesData } = useGetQuantityPeopleByCampaignQuery(id);
  useEffect(() => {
    if (peoplesData) {
      setBackers(peoplesData.data);
    }
  }, [peoplesData]);

  useEffect(() => {
    if (campagin.id) {
      let startDateTime = new Date(campagin.startDate);
      let endDateTime = startDateTime.getTime() + campagin.duration * 24 * 60 * 60 * 1000;
      const currentDateTime = new Date().getTime();
      const remainingHours = Math.ceil((endDateTime - currentDateTime) / (1000 * 60 * 60));
      let daysLeft = '';
      if (remainingHours > 24) daysLeft = 'Còn ' + Math.ceil(remainingHours / 24) + ' ngày';
      else if (remainingHours > 0) {
        daysLeft = 'Còn ' + Math.ceil(remainingHours) + ' giờ';
      } else daysLeft = 'Hết hạn';
      setTimeLeft(daysLeft);
    }
  }, [campagin]);
  useEffect(() => {
    if (campagin.goal && currentMoney) {
      setCurrentPercent((currentMoney / campagin.goal) * 100);
    }
  }, [campagin, currentMoney]);

  useEffect(() => {
    const queryParams = {
      page: filter.page,
      searchString: filter.textSearch,
      status: filter.status,
      time: filter.time,
      money: filter.money,
      timeDelivery: filter.timeDelivery,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    // const pathWithQuery = `${baseURL}/contribution/getAllContributionsByCampaign/${id}?${queryString}`;
    getAllContributionsByCampaignMutation.mutate(
      {
        id,
        queryString,
      },
      {
        onSuccess(data) {
          setContributions(data.data.contributions);
          setTotalPages(data.data.totalPages);
        },
      },
    );
  }, [filter]);
  const getAllContributionsByCampaignMutation = useGetAllContributionsByCampaignQuery();
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
    setFilter((prev) => ({ ...prev, textSearch: value }));
  };
  const handleChangeSearchInputGift = (value) => {
    setFilterGift((prev) => ({ ...prev, textSearch: value }));
  };
  const handleClickItemFilterStatus = (item) => {
    setFilter((prev) => ({ ...prev, status: item }));
  };
  const handleClickItemFilterGiftStatus = (item) => {
    setFilterGift((prev) => ({ ...prev, status: item }));
  };
  const handleClickItemFilterGiftTime = (item) => {
    setFilterGift((prev) => ({ ...prev, time: item }));
  };

  const handleClickItemFilterTime = (item) => {
    setFilter((prev) => ({ ...prev, time: item, money: 'Tất cả', timeDelivery: 'Tất cả' }));
  };
  const handleClickItemFilterTimeDelivery = (item) => {
    setFilter((prev) => ({ ...prev, timeDelivery: item, money: 'Tất cả', time: 'Tất cả' }));
  };

  const handleClickItemFilterMoney = (item) => {
    setFilter((prev) => ({ ...prev, money: item, time: 'Tất cả', timeDelivery: 'Tất cả' }));
  };

  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleClickPreviousPageGift = () => {
    if (filterGift.page === 1) return;
    setFilterGift((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleClickNextPage = () => {
    if (filter.page === totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
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

  return (
    <>
      <div className={cx('body')}>
        {campagin.status && campagin.status !== 'Bản nháp' && (
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
                      valueShow={filter.status}
                    />
                  </div>

                  <div>
                    <label style={{ marginBottom: '4px' }}>Tiền</label>
                    <Filter
                      listConditions={['Tất cả', 'Tăng dần', 'Giảm dần']}
                      handleClickItem={handleClickItemFilterMoney}
                      valueShow={filter.money}
                    />
                  </div>
                  <div>
                    <label style={{ marginBottom: '4px' }}>Thời gian đóng góp</label>
                    <Filter
                      listConditions={['Tất cả', 'Gần nhất', 'Sớm nhất']}
                      handleClickItem={handleClickItemFilterTime}
                      valueShow={filter.time}
                    />
                  </div>
                  <div>
                    <label style={{ marginBottom: '4px' }}>Thời gian dự kiến giao</label>
                    <Filter
                      listConditions={['Tất cả', 'Trễ nhất', 'Sớm nhất']}
                      handleClickItem={handleClickItemFilterTimeDelivery}
                      valueShow={filter.timeDelivery}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <div className={cx('table-wrapper')}>
                  <div className={cx('card-progress')}>
                    <div className={cx('money-info')}>
                      <div className={cx('money')}>
                        <span className={cx('current-money')}>{formatMoney(currentMoney || 0)}</span>
                        <span className={cx('unit-money')}>VNĐ</span>
                      </div>
                    </div>
                    <div className={cx('progressbar')}>
                      <div
                        className={cx('progressbar-value')}
                        style={{ width: currentPercent >= 100 ? '100%' : `${currentPercent}%` }}
                      ></div>
                    </div>

                    <div className={cx('days-left')}>
                      <span className={cx('percent')}>
                        {currentPercent % 100 === 0 ? currentPercent : currentPercent.toFixed(2)}%
                      </span>
                      <span className={cx('left')}>
                        <AiFillClockCircle style={{ color: 'rgb(173 172 172)' }} />
                        <span>{timeLeft}</span>
                      </span>
                    </div>
                  </div>
                  {timeLeft === 'Hết hạn' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                      <span style={{ display: 'block', paddingBottom: '2px', borderBottom: '1px dashed #949494' }}>
                        Gây quỹ:
                      </span>
                      {campagin.isSSuccessFunding && (
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
                      {!campagin.isSSuccessFunding && (
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
                    contributions={contributions}
                    onContributionTableChange={handleChangStateListContributions}
                    openDetailContribution={openDetailContribution}
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
        {campagin.status === 'Bản nháp' && (
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
          contribution={contributions[indexContributionActive]}
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
