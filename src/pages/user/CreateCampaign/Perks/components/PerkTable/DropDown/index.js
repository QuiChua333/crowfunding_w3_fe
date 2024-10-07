import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles)

function DropDown({ menu, onClickItem, index, perk, changeFeatured, isEditComponent, handleCRemovePerk }) {
     const handleClickItem = (item) => {
          onClickItem(item, index)
     }
     const handleClickFeatured = () => {
          changeFeatured(!perk.isFeatured)
     }
     
     const navigate = useNavigate()
     return (
          <div className={cx('wrapper')} style={{pointerEvents: !isEditComponent && 'none'}}>

               {
                    perk.isVisible && !perk.isFeatured && <div onClick={handleClickFeatured} className={cx('action')}>
                         Đặt thành nổi bật
                    </div>
               }
               <div onClick={() => navigate(`/campaigns/${perk.campaign}/edit/perks/${perk._id}`)} className={cx('action')}>
                    Chỉnh sửa đặc quyền
               </div>
               {
                    perk.isFeatured && <div className={cx('action')} onClick={handleClickFeatured}>
                         Dừng làm nổi bật
                    </div>
               }
               <div style={{ height: '1px', background: '#ccc' }}></div>
               <div onClick={handleCRemovePerk} className={cx('action', 'action-delete')}>
                    Xóa đặc quyền
               </div>
          </div>
     );
}

export default DropDown;