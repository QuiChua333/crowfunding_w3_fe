import classNames from 'classnames/bind';
import PerkTable from './components/NFTTable';

import styles from './NFT.module.scss';
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
import NFTTable from './components/NFTTable';
import { useGetNFTsByCampaignIdQuery } from '~/hooks/api/queries/user/nft.query';

const cx = classNames.bind(styles);

function NFTCampaign() {
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [perkDelete, setPerkDelete] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const [listNFTs, setListNFTs] = useState({});

  const { data: nfts, refetch, isLoading } = useGetNFTsByCampaignIdQuery(id);
  useEffect(() => {
    if (nfts) {
      setListNFTs(nfts);
    } else setListNFTs([]);
  }, [nfts]);

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
        number: 5,
        content: 'NFT',
      }),
    );
  }, []);

  return (
    <div className={cx('body')}>
      {!isLoading && listNFTs?.length > 0 && (
        <div>
          <div className={cx('entreSection')}>
            <div className={cx('entreField-header')}>NFT</div>
            <div className={cx('entreField-subHeader')}>
              NFT là một loại tài sản kỹ thuật số trên blockchain có tính duy nhất và không thể thay thế bằng thứ khác.
              Mỗi NFT có một mã định danh riêng, giúp xác minh quyền sở hữu và tính xác thực của tài sản.
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
              <Link to={`/campaigns/${id}/edit/nfts/new`} className={cx('btn', 'btn-ok', 'ml-0')}>
                TẠO NFT
              </Link>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <NFTTable
              listNFTs={listNFTs}
              getNFTsByCampaignId={refetch}
              isEditAll={isEditAll}
              isEditComponent={isEditComponent}
            />
          </div>
        </div>
      )}
      {!isLoading && listNFTs?.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={cx('container-body')}>
            <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>Bạn chưa tạo bất kỳ NFT nào.</div>
            <div style={{ marginTop: '12px' }}>
              <span>
                NFT là một loại tài sản kỹ thuật số trên blockchain có tính duy nhất và không thể thay thế bằng thứ
                khác. Mỗi NFT có một mã định danh riêng, giúp xác minh quyền sở hữu và tính xác thực của tài sản.
              </span>
            </div>
            <img src={noPerk} className={cx('img-no-perk')} />
            <div style={{ marginTop: '40px' }}>Bắt đầu nào</div>
            <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Tạo NFT của bạn ở đây</div>
            <img src={arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

            <div style={{ marginTop: '40px', pointerEvents: !isEditComponent && 'none' }}>
              <Link to={`/campaigns/${id}/edit/nfts/new`} className={cx('btn', 'btn-ok')} style={{ fontSize: '16px' }}>
                TẠO NFT
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}

      {!isLoading && listNFTs?.length > 0 && (
        <div className={cx('btn-final')}>
          <Link to={`/campaigns/${id}/edit/team`} className={cx('btn', 'btn-ok')}>
            TIẾP TỤC
          </Link>
        </div>
      )}
    </div>
  );
}

export default NFTCampaign;
