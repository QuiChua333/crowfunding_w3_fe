import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaBars, FaArrowCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarCampaign({ status, title, cardImage, id, current, setCurrent, setContentTag }) {
  const [downEditor, setDownEditor] = useState(true);

  const navigate = useNavigate();

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
            <div className={cx('navItem')}>
              <a href="#" className={cx('navItem-link')}>
                <div>Preview Campaign</div>
              </a>
            </div>
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
                      'navItem--current': current === 1,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/basic`);
                        setCurrent(1);
                        setContentTag('Cơ bản');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>1. Cơ bản</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 2,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/story`);
                        setCurrent(2);
                        setContentTag('Nội dung');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>2. Nội dung</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 3,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/perks/table`);
                        setCurrent(3);
                        setContentTag('Đặc quyền');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>3. Đặc quyền</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 4,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/items/table`);
                        setCurrent(4);
                        setContentTag('Vật phẩm');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>4. Vật phẩm</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 5,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/team`);
                        setCurrent(5);
                        setContentTag('Team');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>5. Team</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 6,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/funding`);
                        setCurrent(6);
                        setContentTag('Gây quỹ');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>6. Gây quỹ</div>
                    </div>
                  </div>
                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 7,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/settings`);
                        setCurrent(7);
                        setContentTag('CÀI ĐẶT');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>7. CÀI ĐẶT</div>
                    </div>
                  </div>

                  <div
                    className={cx('navItem--child', 'navItem', 'cursor-pointer', {
                      'navItem--current': current === 8,
                    })}
                  >
                    <div
                      onClick={() => {
                        navigate(`/campaigns/${id}/edit/contribution`);
                        setCurrent(8);
                        setContentTag('ĐÓNG GÓP');
                      }}
                      className={cx('navItem-link')}
                    >
                      <div>8. ĐÓNG GÓP</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={cx('navItem')}>
              <a href="/" className={cx('navItem-link')}>
                <div>TRANG CHỦ</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarCampaign;
