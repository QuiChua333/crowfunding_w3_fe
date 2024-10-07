import classNames from "classnames/bind";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";


import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles);

function SidebarCampaign({ current, status, title, cardImage, id }) {
    const [downEditor, setDownEditor] = useState(true);
    const handleClickSection = function (event) {
        event.preventDefault();
        setDownEditor(!downEditor)
    }
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('campaignInfo')}
                    style={{
                        backgroundImage: `linear-gradient(rgba(42, 42, 42, 0.5) 0px, rgb(42, 42, 42) 100%),
                url(${cardImage})`
                    }}>
                    <div className={cx('campaignPhase')}>
                        <span>{status}</span>
                    </div>

                    <div className={cx('campaignTitle')}>
                        {
                            title || 'Tiêu đề chiến dịch'
                        }
                    </div>
                </div>

                <div className={cx('navItems')}>
                    <div className={cx('navItem')}>
                        <a href="#" className={cx('navItem-link')}>
                            <div>
                                Preview Campaign
                            </div>
                        </a>
                    </div>
                    <div className={cx('navSection')}>
                        <a href="#" className={cx('navSection-title')} onClick={handleClickSection}>
                            <div>
                                Nhập chiến dịch
                            </div>
                            {!downEditor && <FaAngleDown className={cx('icon', 'icon-down')} />}
                            {downEditor && <FaAngleUp className={cx('icon', 'icon-up')} />}


                        </a>

                        {
                            downEditor &&
                            <div className={cx('navSection-children')}>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 1
                                })}>
                                    <Link to={`/campaigns/${id}/edit/basic`} className={cx('navItem-link')}>
                                        <div>
                                            1. Cơ bản
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 2
                                })}>
                                    <Link to={`/campaigns/${id}/edit/story`} className={cx('navItem-link')}>
                                        <div>
                                            2. Nội dung
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 3
                                })}>
                                    <Link to={`/campaigns/${id}/edit/perks/table`} className={cx('navItem-link')}>
                                        <div>
                                            3. Đặc quyền
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 4
                                })}>
                                    <Link to={`/campaigns/${id}/edit/items/table`} className={cx('navItem-link')}>
                                        <div>
                                            4. Vật phẩm
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 5
                                })}>
                                    <Link to={`/campaigns/${id}/edit/team`} className={cx('navItem-link')}>
                                        <div>
                                            5. Team
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 6
                                })}>
                                    <Link to={`/campaigns/${id}/edit/funding`} className={cx('navItem-link')}>
                                        <div>
                                            6. Gây quỹ
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 7
                                })}>
                                    <Link to={`/campaigns/${id}/edit/settings`} className={cx('navItem-link')}>
                                        <div>
                                            7. CÀI ĐẶT
                                        </div>
                                    </Link>
                                </div>


                                <div className={cx('navItem--child', 'navItem', {
                                    'navItem--current': current === 8
                                })}>
                                    <Link to={`/campaigns/${id}/edit/contribution`} className={cx('navItem-link')}>
                                        <div>
                                            8. ĐÓNG GÓP
                                        </div>
                                    </Link>
                                </div>
                                

                            </div>
                        }
                    </div>

                    <div className={cx('navItem')}>
                        <a href="/" className={cx('navItem-link')}>
                            <div>
                                TRANG CHỦ
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );



}

export default SidebarCampaign;