import classNames from 'classnames/bind';

import styles from './Items.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemTable from './components/ItemTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { arrow, noItem } from '~/assets/images';
import { useGetItemsContainPerksByCampaignIdQuery } from '~/hooks/api/queries/user/item.query';
import { setTab } from '~/redux/slides/UserCampaign';

const cx = classNames.bind(styles);

function ItemsCampaign() {
  const { id } = useParams();
  const [isHasItem, setHasItem] = useState(true);
  const dispatch = useDispatch();
  const [listItems, setListItems] = useState();
  const { data: response, refetch } = useGetItemsContainPerksByCampaignIdQuery(id);
  useEffect(() => {
    if (response) {
      setListItems(response || []);
    }
  }, [response]);

  const isEditComponent = useSelector((state) => state.userCampaign.isEditAll);
  useEffect(() => {
    dispatch(
      setTab({
        number: 4,
        content: 'Vật phẩm',
      }),
    );
  }, []);
  return (
    <div className={cx('body')}>
      {listItems?.length > 0 && (
        <div>
          <div className={cx('entreSection')} style={{ width: '80%' }}>
            <div className={cx('entreField-header')}>Vật phẩm</div>
            <div className={cx('entreField-subHeader')}>
              Bạn đang cung cấp những gì trong các đặc quyền được yêu cầu bởi những người ủng hộ?
            </div>
          </div>
          <div className={cx('perkTable-action')}>
            <div>
              <div style={{ display: 'inline-block', pointerEvents: !isEditComponent && 'none' }}>
                <Link to={`/campaigns/${id}/edit/items/new`} className={cx('btn-ok')} style={{ marginLeft: '0' }}>
                  TẠO MỚI VẬT PHẨM
                </Link>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <ItemTable listItems={listItems} />
          </div>
        </div>
      )}
      {listItems?.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={cx('container-layout')}>
            <div style={{ fontSize: '24px', fontWeight: '400', marginTop: '32px' }}>
              Xem tất cả các vật phẩm của bạn và quản lý chúng ở đây.{' '}
            </div>
            <div style={{ marginTop: '12px' }}>
              <span>Vật phẩm là những gì bạn cung cấp cho người ủng hộ khi họ yêu cầu đặc quyền.</span>
            </div>
            <img src={noItem} className={cx('img-frame')} />

            <div style={{ marginTop: '40px' }}>Bạn chưa có bất kỳ vật phẩm nào.</div>
            <div style={{ fontSize: '14px', color: '#a8a8a8' }}>
              Hãy chuyển đến trang đặc quyền để tạo đặc quyền trước rồi thêm các vật phẩm vào.
            </div>
            <img src={arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

            <div style={{ marginTop: '40px' }}>
              <Link to={`/campaigns/${id}/edit/perks/table`} className={cx('btn-ok')} style={{ fontSize: '16px' }}>
                ĐI ĐẾN TRANG ĐẶC QUYỀN{' '}
              </Link>
            </div>
          </div>
        </div>
      )}

      {listItems?.length > 0 && (
        <div className={cx('btn-final')}>
          <Link to={`/campaigns/${id}/edit/items/team`} className={cx('btn', 'btn-ok')}>
            TIẾP TỤC
          </Link>
        </div>
      )}
    </div>
  );
}

export default ItemsCampaign;
