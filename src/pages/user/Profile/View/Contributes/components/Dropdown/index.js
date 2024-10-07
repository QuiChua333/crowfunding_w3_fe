import classNames from "classnames/bind";
import styles from './Dropdown.module.scss'

const cx = classNames.bind(styles)

function DropDown({contribute, handleView}) {

    return (
        <div className={cx('wrapper')}>
           <div className={cx('action')} onClick={handleView}>
                Xem chi tiết
           </div>
           <div style={{height: '1px', background: '#ccc'}}></div>
           <div className={cx('action')}>
                <a href={`/project/${contribute.campaignInfo._id}/detail`}>Đi đến chiến dịch</a>
           </div>
        </div>
    );
}

export default DropDown;