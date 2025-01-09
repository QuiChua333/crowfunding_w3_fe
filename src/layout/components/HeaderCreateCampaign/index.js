import classNames from 'classnames/bind';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa6';
import styles from './HeaderCreateCampaign.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '~/redux/slides/User';
import { HeaderDropdown } from './components';
import { RiMenu3Line } from 'react-icons/ri';
import MenuDropdown from './components/MenuDropdown';
import { IoMdClose } from 'react-icons/io';
import { useQueryClient } from '@tanstack/react-query';
import { useGetFieldGroupByCategoryQuery } from '~/hooks/api/queries/user/field.query';
import { useLogOutMutation } from '~/hooks/api/mutations/auth/auth.mutation';
import avt from '~/assets/images/png/default-avt.png';
import { defaultAvt, logoHongNho, logoTrangNho, paypal } from '~/assets/images';
import { Bell } from '../Header/components';
const cx = classNames.bind(styles);
// Component dùng chung
function HeaderCreateCampaign() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdownUser, setShowDropdownUser] = useState(false);
  const [fullHeader, setFullHeader] = useState(false);
  const [activeExplore, setActiveExplore] = useState(false);
  useEffect(() => {
    const changeBackgroundHeader = () => {
      if (window.scrollY >= 40) {
        setFullHeader(true);
      } else {
        setFullHeader(false);
      }
    };
    window.addEventListener('scroll', changeBackgroundHeader);

    return () => {
      window.removeEventListener('scroll', changeBackgroundHeader);
    };
  }, []);
  const boxFilterElement = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxFilterElement.current && !boxFilterElement.current.contains(event.target)) {
        setShowDropdownUser(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [boxFilterElement]);
  const [listFieldGrouByCategory, setListFieldGrouByCategory] = useState([]);
  const { data: dataField } = useGetFieldGroupByCategoryQuery();
  useEffect(() => {
    if (dataField) setListFieldGrouByCategory(dataField);
  }, [dataField]);
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['getCurrentUser']);
  useEffect(() => {
    if (userData) {
      dispatch(setCurrentUser(userData));
    }
  }, [userData]);
  const logOutMutation = useLogOutMutation();
  const handleClickLogout = () => {
    logOutMutation.mutate(null, {
      onSuccess() {
        window.location.href = '/';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setCurrentUser({}));
        // queryClient.removeQueries('getCurrentUser');
      },
      onError(err) {
        console.log(err.response.data.message);
      },
    });
  };

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={cx('responsive')}>
      <div
        className={cx('wrapper', {
          activeExplore,
          activeShowMenu: showMenu,
        })}
      >
        <div className={cx('inner')}>
          <div className={cx('group')}>
            <div className={cx('button-search')}>
              <Link href="/explore">
                <AiOutlineSearch className={cx('icon-search')} />
              </Link>
            </div>

            <div className={cx('nav-list')}>
              <div onClick={() => setActiveExplore((prev) => !prev)} className={cx('explore')}>
                <a className={cx('flex items-center gap-[2px]')}>
                  Khám phá <FaAngleDown className={cx('icon', { active: activeExplore })} />
                </a>
              </div>
              <div>
                <Link href="/about-us">Về chúng tôi</Link>
              </div>
            </div>
          </div>

          <div className={cx('logo')}>
            <Link to="/" className={cx('icon-logo')}>
              GIVE - FUN
            </Link>
          </div>
          <div className={cx('group', 'group2')}>
            <div className={cx('nav-list')}>
              <div className={cx('create-campaign')}>
                <Link to={!user.isAdmin ? '/start-a-campaign' : '/'}>Tạo chiến dịch</Link>
              </div>
              {!user && (
                <>
                  <div className={cx('sign-in')}>
                    <Link href="/login">Đăng nhập</Link>
                  </div>
                  <div>
                    <Link href="/sign-up">Đăng ký</Link>
                  </div>
                </>
              )}
              {user && (
                <div className="flex items-center">
                  {!user.isAdmin && <Bell />}
                  <div
                    className={cx('user-section')}
                    onClick={() => setShowDropdownUser((prev) => !prev)}
                    ref={boxFilterElement}
                  >
                    <img className={cx('user-avatar')} src={user.avatar || defaultAvt} />
                    <span className={cx('user-name')}>
                      {user.fullName} <FaAngleDown className={cx('icon', { active: showDropdownUser })} />
                    </span>
                    {showDropdownUser && (
                      <div className={cx('dropdownBoxFilter')}>
                        {!user.isAdmin && (
                          <>
                            <span onClick={() => navigate(`/individuals/${user.id}/campaigns`)}>
                              Chiến dịch của tôi
                            </span>
                            <span onClick={() => navigate(`/individuals/${user.id}/contributions`)}>
                              Đóng góp của tôi
                            </span>
                            <span onClick={() => navigate(`/individuals/${user.id}/profile`)}>Hồ sơ</span>
                            <span onClick={() => navigate(`/individuals/${user.id}/edit/settings`)}>Cài đặt</span>
                          </>
                        )}
                        {user.isAdmin && <span onClick={() => navigate(`/admin`)}>Đến trang quản lý</span>}
                        <span onClick={handleClickLogout} style={{ paddingBottom: '16px' }}>
                          Đăng xuất
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={cx('group', 'menu-tablet')} onClick={() => setShowMenu((prev) => !prev)}>
            {showMenu ? <IoMdClose className={cx('icon-menu')} /> : <RiMenu3Line className={cx('icon-menu')} />}
          </div>
        </div>
        {activeExplore && <HeaderDropdown listFieldGrouByCategory={listFieldGrouByCategory} />}
        {showMenu && (
          <div className={cx('absolute left-0 w-full top-full z-[101]')}>
            <MenuDropdown fullHeader={fullHeader} isLogin={!!user} user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderCreateCampaign;
