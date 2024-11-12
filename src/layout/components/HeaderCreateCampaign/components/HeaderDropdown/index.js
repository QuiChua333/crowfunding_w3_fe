import classNames from 'classnames/bind';
import styles from './HeaderDropdown.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilterExplore } from '~/redux/slides/GlobalApp';
const cx = classNames.bind(styles);
function HeaderDropdown({ active, activeHeader, listFieldGrouByCategory, style }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickField = (field) => {
    dispatch(
      setFilterExplore({
        field,
      }),
    );
    navigate('/explore');
  };
  const handleClickCategory = (category) => {
    dispatch(
      setFilterExplore({
        category,
      }),
    );
    navigate('/explore');
  };
  return (
    <div className={cx('wrapper', 'responsive')} style={style}>
      <div className={cx('inner')}>
        <div className={cx('banner-wrapper')}>
          <a onClick={() => handleClickCategory('Tất cả')} className={cx('label-banner')}>
            Khám Phá Toàn Bộ Dự Án
          </a>
          <div className={cx('banner')}>
            <img src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_auto,g_center,q_auto:best,dpr_1.3,f_auto/homepage/cf-bg-desktop-lg.jpg" />
            <p className={cx('description')}>GIVE FUN</p>
          </div>
        </div>
        <div className={cx('categories')}>
          {listFieldGrouByCategory?.map((item, index) => {
            return (
              <div
                key={index}
                className={cx('category', { third: index === 2, second: index === 1, first: index === 0 })}
              >
                <a onClick={() => handleClickCategory(item.category)} className={cx('label')}>
                  {item.name}
                </a>

                <div className={cx('list-field', { first: index === 0 })}>
                  {item.fields.map((item2, index2) => {
                    return (
                      <div onClick={() => handleClickField(item2)} key={index2} className={cx('field-item')}>
                        <span>
                          <a>{item2.name}</a>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
