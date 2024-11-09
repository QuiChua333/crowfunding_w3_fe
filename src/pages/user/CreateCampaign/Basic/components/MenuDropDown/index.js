import classNames from 'classnames/bind';

import styles from './MenuDropDown.module.scss';
const cx = classNames.bind(styles);

function MenuDropDown({ listFieldGrouByCategory, onClickItem }) {
  const handleClickItem = (fieldId, fieldName) => {
    onClickItem(fieldId, fieldName);
  };
  return (
    <div className={cx('category-menu')}>
      {listFieldGrouByCategory.map((item, index) => {
        return (
          <div className={cx('categoryMenu-sub')} key={index}>
            <div className={cx('categoryMenu-sub-header')}>{item.name}</div>

            {item.fields.map((item2, index2) => {
              return (
                <div
                  onClick={() => handleClickItem(item2.id, item2.name)}
                  key={index2}
                  className={cx('categoryMenu-sub-item')}
                >
                  {item2.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default MenuDropDown;
