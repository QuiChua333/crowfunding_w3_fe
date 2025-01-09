import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaBars, FaArrowCircleLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '~/redux/slides/UserCampaign';

const cx = classNames.bind(styles);

function SidebarCampaign({ status, title, cardImage, id }) {
  const [downEditor, setDownEditor] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.userCampaign.tab);
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleClickSection = function (event) {
    event.preventDefault();
    setDownEditor(!downEditor);
  };
  const handleToggleOpen = () => {
    const btn = document.getElementById('btn-open');
    const sidebar = document.getElementById('sidebarID');
    sidebar.style.display = 'block';
    btn.style.display = 'none';
  };
  const handleToggleClose = () => {
    const btn = document.getElementById('btn-open');
    const sidebar = document.getElementById('sidebarID');
    sidebar.style.display = 'none';
    btn.style.display = 'block';
  };
  useEffect(() => {
    const handleResize = () => {
      const btn = document.getElementById('btn-open');
      const sidebar = document.getElementById('sidebarID');
      if (window.innerWidth >= 1200) {
        sidebar.style.display = 'block';
        btn.style.display = 'none';
      } else {
        sidebar.style.display = 'none';
        btn.style.display = 'block';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      <button className={cx('toggle-btn')} onClick={handleToggleOpen} id="btn-open">
        <FaBars className="w-10 h-10 text-black" />
      </button>
      <div className={cx('wrapper')} id="sidebarID">
        <button className={cx('toggle-btn-2')} onClick={handleToggleClose} id="btn-close">
          <FaArrowCircleLeft className="w-10 h-10 text-white" />
        </button>
        <div>
          <div
            className={cx('campaignInfo')}
            style={{
              backgroundImage: `linear-gradient(rgba(42, 42, 42, 0.5) 0px, rgb(42, 42, 42) 100%),
                url(${cardImage})`,
            }}
          >
            <div className={cx('campaignPhase')}>
              <span>{status}</span>
            </div>

            <div className={cx('campaignTitle')}>{title || 'Tiêu đề chiến dịch'}</div>
          </div>

          <div className={cx('navItems')}>
            {/* <div className={cx('navItem')}>
              <a href="#" className={cx('navItem-link')}>
                <div>Preview Campaign</div>
              </a>
            </div> */}
            <div className={cx('navSection')}>
              <a href="#" className={cx('navSection-title')} onClick={handleClickSection}>
                <div>Nhập chiến dịch</div>
                {!downEditor && <FaAngleDown className={cx('icon', 'icon-down')} />}
                {downEditor && <FaAngleUp className={cx('icon', 'icon-up')} />}
              </a>

              {downEditor && (
                <div className={cx('navSection-children')}>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 1,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/basic`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>1. Cơ bản</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 2,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/story`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>2. Nội dung</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 3,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/perks/table`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>3. Đặc quyền</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 4,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/items/table`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>4. Vật phẩm</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 5,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/team`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>5. Team</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 6,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/funding`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>6. Gây quỹ</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': tab.number === 7,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/settings`);
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>7. CÀI ĐẶT</div>
                    </div>
                  </div>

                  {status !== 'Bản nháp' && status !== 'Chờ xác nhận' && (
                    <div
                      className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                        'navItem--current': tab.number === 8,
                      })}
                    >
                      <div
                        onClick={() => {
                          navigate(`/campaigns/${id}/edit/contribution`);
                        }}
                        className={cx('navItem-link')}
                      >
                        <div>8. ĐÓNG GÓP</div>
                      </div>
                    </div>
                  )}

                  {(status === 'Thất bại' || status === 'Thành công' || true) && (
                    <div
                      className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                        'navItem--current': tab.number === 9,
                      })}
                    >
                      <div
                        onClick={() => {
                          navigate(`/campaigns/${id}/edit/summary`);
                        }}
                        className={cx('navItem-link')}
                      >
                        <div>9. Tổng kết</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={cx('navItem')}>
              <Link to="/" className={cx('navItem-link')}>
                <div>TRANG CHỦ</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarCampaign;
