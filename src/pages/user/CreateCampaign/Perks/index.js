import classNames from 'classnames/bind';
import SidebarCampaign from '../components/Sidebar';

import Footer from '~/layout/components/Footer';
import PerkTable from './components/PerkTable';

import { TiCancel } from 'react-icons/ti';

import styles from './Perks.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import baseURL from '~/utils/baseURL';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CustomAxios } from '~/config';
import { arrow, noPerk } from '~/assets/images';
import { HeaderCreateCampaign } from '~/layout/components';

const cx = classNames.bind(styles);

function PerksCampaign() {
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [perkDelete, setPerkDelete] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [campagin, setCampaign] = useState({});
  const [listPerks, setListPerks] = useState({});
  const [numberSelected, setNumberSelected] = useState(0);
  const handlePerkChange = (listPerk) => {
    const num = listPerk.reduce((acc, item) => {
      if (item.isChecked) return acc + 1;
      else return acc + 0;
    }, 0);
    setNumberSelected(num);
  };
  const getCampaign = async () => {
    try {
      const res = await CustomAxios.get(`${baseURL}/campaign/getCampaignById/${id}`);
      let infoBasic = {
        id: res.data.data._id,
        title: res.data.data.title || '',
        cardImage: res.data.data.cardImage || { url: '', public_id: '' },
        status: res.data.data.status,
        owner: res.data.data.owner || '',
        team: res.data.data.team || [],
      };
      setCampaign({ ...infoBasic });
    } catch (error) {}
  };
  const getPerksByCampaignId = async () => {
    console.log('nổi bật');
    try {
      const res = await CustomAxios.get(`${baseURL}/perk/getPerksByCampaignId/${id}`);
      setListPerks(res.data.data);
    } catch (error) {
      setListPerks([]);
    }
  };
  const handleDeletePerK = async (perk) => {
    setPerkDelete(perk);
    dispatch(
      setMessageBox({
        title: 'Xóa đặc quyền này?',
        content: 'Thao tác này sẽ xóa hoàn toàn mục này khỏi chiến dịch của bạn và không thể hoàn tác được.',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: 'deletePerk',
      }),
    );
  };
  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === 'deletePerk') {
        if (messageBox.result === true) {
          deletePerk(perkDelete);
        }
      }
    }
  }, [messageBox.result]);
  const deletePerk = async (perk) => {
    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.delete(`${baseURL}/perk/delete/${perk._id}`);
      dispatch(setLoading(false));
      setShowErrorDelete(true);
      dispatch(setMessageBox({ result: null, isShow: false }));
      toast.success(res.data.message);
    } catch (error) {
      dispatch(setLoading(false));
      setContentError(error.response.data.message);
      dispatch(setMessageBox({ result: null, isShow: false }));
      setShowErrorDelete(true);
    }
  };
  useEffect(() => {
    getCampaign();
    getPerksByCampaignId();
  }, []);
  const [isEditAll, setEditAll] = useState(null);
  const [isEditComponent, setEditComponent] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (JSON.stringify(campagin) !== '{}') {
      let edit = false;
      if (currentUser.isAdmin) edit = true;
      else {
        if (campagin.owner?._id === currentUser._id) edit = true;
        if (
          campagin.team?.some((x) => {
            return x.user === currentUser._id && x.isAccepted === true && x.canEdit === true;
          })
        ) {
          edit = true;
        }
      }
      if (edit === true) {
        setShowErrorDelete(false);
      } else {
        setContentError('Bạn không có quyền chỉnh sửa lúc này!');
        setShowErrorDelete(true);
      }
      setEditAll(edit);
      setEditComponent(edit);
    }
  }, [campagin]);
  useEffect(() => {
    let edit = false;
  }, [campagin]);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const [contentError, setContentError] = useState('');
  return (
    <div>
      <div className={cx('wrapper')}>
        <SidebarCampaign
          current={3}
          status={campagin.status}
          title={campagin.title}
          cardImage={campagin.cardImage?.url}
          id={id}
        />
        <div style={{ flex: '1' }}>
          <HeaderCreateCampaign />

          <div className={cx('content')}>
            <div className={cx('controlBar')}>
              <div className={cx('controlBar-container')}>
                <div className={cx('controlBar-content')}>Chiến dịch / Đặc quyền</div>
              </div>
              {showErrorDelete && (
                <div className={cx('container-error')}>
                  <TiCancel className={cx('icon-error')} />
                  <span>{contentError}</span>
                </div>
              )}
            </div>
            <div className={cx('body')}>
              {listPerks?.length > 0 && (
                <div>
                  <div className={cx('entreSection')}>
                    <div className={cx('entreField-header')}>Đặc quyền</div>
                    <div className={cx('entreField-subHeader')}>
                      Đặc quyền là những ưu đãi được cung cấp cho những người ủng hộ để đổi lấy sự hỗ trợ của họ. Có
                      nhiều loại đặc quyền khác nhau mà bạn có thể tạo.
                    </div>
                  </div>
                  <div className={cx('perkTable-action')}>
                    {
                      <div style={{ opacity: numberSelected === 0 && '0' }}>
                        <span>
                          <strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> đặc
                          quyền được chọn
                        </span>
                        <div style={{ display: 'inline-block', marginLeft: '24px', position: 'relative' }}>
                          <a className={cx('btn', 'btn-ok')}>Xóa</a>
                        </div>
                      </div>
                    }

                    <div
                      style={{
                        display: 'inline-block',
                        marginLeft: '24px',
                        pointerEvents: !isEditComponent && 'none',
                        width: '100%',
                        textAlign: 'right',
                      }}
                    >
                      <Link to={`/campaigns/${id}/edit/perks/new`} className={cx('btn', 'btn-ok')}>
                        TẠO ĐẶC QUYỀN
                      </Link>
                    </div>
                  </div>
                  <div style={{ marginTop: '40px' }}>
                    <PerkTable
                      onPerkTableChange={handlePerkChange}
                      listPerks={listPerks}
                      getPerksByCampaignId={getPerksByCampaignId}
                      isEditAll={isEditAll}
                      isEditComponent={isEditComponent}
                      handleDeletePerK={handleDeletePerK}
                    />
                  </div>
                </div>
              )}
              {listPerks?.length === 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className={cx('container-body')}>
                    <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>
                      Bạn chưa tạo bất kỳ đặc quyền nào{' '}
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <span>
                        Đặc quyền là những ưu đãi được cung cấp cho những người ủng hộ để đổi lấy sự hỗ trợ của họ.
                        Chúng tôi nhận thấy rằng các chiến dịch cung cấp đặc quyền kiếm được nhiều tiền hơn 143% so với
                        những chiến dịch không cung cấp đặc quyền. Đặc quyền giúp bạn thu hút lượng khán giả lớn hơn,
                        khiến mọi người cảm thấy được đánh giá cao hơn vì những đóng góp của họ và giúp bạn quảng bá về
                        chiến dịch của mình.
                      </span>
                    </div>
                    <img src={noPerk} className={cx('img-no-perk')} />

                    <div style={{ marginTop: '40px' }}>Bắt đầu nào!</div>
                    <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Tạo đặc quyền của bạn ở đây.</div>
                    <img src={arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

                    <div style={{ marginTop: '40px', pointerEvents: !isEditComponent && 'none' }}>
                      <Link
                        to={`/campaigns/${id}/edit/perks/new`}
                        className={cx('btn', 'btn-ok')}
                        style={{ fontSize: '16px' }}
                      >
                        TẠO ĐẶC QUYỀN{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              {listPerks?.length === 0 && (
                <div className={cx('btn-final')}>
                  <a href="#" className={cx('btn', 'btn-ok')}>
                    TIẾP TỤC
                  </a>
                </div>
              )}

              {listPerks?.length > 0 && (
                <div className={cx('btn-final')}>
                  <Link to={`/campaigns/${id}/edit/items/table`} className={cx('btn', 'btn-ok')}>
                    TIẾP TỤC
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PerksCampaign;
