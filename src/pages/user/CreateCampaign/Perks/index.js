import classNames from 'classnames/bind';
import PerkTable from './components/PerkTable';

import styles from './Perks.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { arrow, noPerk } from '~/assets/images';
import { useDeletePerkMutation } from '~/hooks/api/mutations/user/perk.mutation';
import { useGetPerksByCampaignIdQuery } from '~/hooks/api/queries/user/perk.query';
import { setContentError, setEditAll, setEditComponent, setShowErrorDelete, setTab } from '~/redux/slides/UserCampaign';

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
  const campaign = useSelector((state) => state.userCampaign.campaign);
  useEffect(() => {
    if (campaign) {
      let infoBasic = {
        id: campaign.id,
      };
      setCampaign({ ...infoBasic });
    }
  }, [campaign]);
  const { data: perks, refetch, isLoading } = useGetPerksByCampaignIdQuery(id);
  useEffect(() => {
    if (perks) {
      setListPerks(perks);
    } else setListPerks([]);
  }, [perks]);

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
  const deletePerkMutation = useDeletePerkMutation();
  const deletePerk = async (perk) => {
    dispatch(setLoading(true));
    deletePerkMutation.mutate(perk.id, {
      onSuccess(data) {
        // setShowErrorDelete(true);
        dispatch(setMessageBox({ result: null, isShow: false }));
        toast.success('Xóa đặc quyền thành công');
        refetch();
      },
      onError(error) {
        setContentError(error.response.data.message);
        dispatch(setMessageBox({ result: null, isShow: false }));
        setShowErrorDelete(true);
      },
      onSettled() {
        dispatch(setLoading(false));
      },
    });
  };

  const isEditAll = useSelector((state) => state.userCampaign.isEditAll);
  const isEditComponent = useSelector((state) => state.userCampaign.isEditComponent);

  useEffect(() => {
    dispatch(
      setTab({
        number: 3,
        content: 'Đặc quyền',
      }),
    );
  }, []);

  return (
    <div className={cx('body')}>
      {!isLoading && listPerks?.length > 0 && (
        <div>
          <div className={cx('entreSection')}>
            <div className={cx('entreField-header')}>Đặc quyền</div>
            <div className={cx('entreField-subHeader')}>
              Đặc quyền là những ưu đãi được cung cấp cho những người ủng hộ để đổi lấy sự hỗ trợ của họ. Có nhiều loại
              đặc quyền khác nhau mà bạn có thể tạo.
            </div>
          </div>
          <div className={cx('perkTable-action')}>
            <div
              style={{
                display: 'inline-block',

                pointerEvents: !isEditComponent && 'none',
                width: '100%',
              }}
            >
              <Link to={`/campaigns/${id}/edit/perks/new`} className={cx('btn', 'btn-ok', 'ml-0')}>
                TẠO ĐẶC QUYỀN
              </Link>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <PerkTable
              onPerkTableChange={handlePerkChange}
              listPerks={listPerks}
              getPerksByCampaignId={refetch}
              isEditAll={isEditAll}
              isEditComponent={isEditComponent}
              handleDeletePerK={handleDeletePerK}
            />
          </div>
        </div>
      )}
      {!isLoading && listPerks?.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={cx('container-body')}>
            <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>
              Bạn chưa tạo bất kỳ đặc quyền nào{' '}
            </div>
            <div style={{ marginTop: '12px' }}>
              <span>
                Đặc quyền là những ưu đãi được cung cấp cho những người ủng hộ để đổi lấy sự hỗ trợ của họ. Chúng tôi
                nhận thấy rằng các chiến dịch cung cấp đặc quyền kiếm được nhiều tiền hơn 143% so với những chiến dịch
                không cung cấp đặc quyền. Đặc quyền giúp bạn thu hút lượng khán giả lớn hơn, khiến mọi người cảm thấy
                được đánh giá cao hơn vì những đóng góp của họ và giúp bạn quảng bá về chiến dịch của mình.
              </span>
            </div>
            <img src={noPerk} className={cx('img-no-perk')} />

            <div style={{ marginTop: '40px' }}>Bắt đầu nào!</div>
            <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Tạo đặc quyền của bạn ở đây.</div>
            <img src={arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

            <div style={{ marginTop: '40px', pointerEvents: !isEditComponent && 'none' }}>
              <Link to={`/campaigns/${id}/edit/perks/new`} className={cx('btn', 'btn-ok')} style={{ fontSize: '16px' }}>
                TẠO ĐẶC QUYỀN{' '}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}

      {!isLoading && listPerks?.length > 0 && (
        <div className={cx('btn-final')}>
          <Link to={`/campaigns/${id}/edit/items/table`} className={cx('btn', 'btn-ok')}>
            TIẾP TỤC
          </Link>
        </div>
      )}
    </div>
  );
}

export default PerksCampaign;
