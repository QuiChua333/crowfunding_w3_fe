import classNames from "classnames/bind";

import styles from './MenuDropDown.module.scss'
const cx = classNames.bind(styles)

function MenuDropDown({ listFieldGrouByCategory, onClickItem }) {
    const handleClickItem = (field,category) => {
        onClickItem(field,category)
    }
    return (
        <div className={cx('category-menu')}>
            {
                listFieldGrouByCategory.map((item, index) => {
                    return (
                        <div className={cx('categoryMenu-sub')} key={index}>
                            <div className={cx('categoryMenu-sub-header')}>
                                {item.category}
                            </div>

                            {
                                item.listFields.map((item2, index2) => {
                                    return (
                                        <div onClick={() => handleClickItem(item2,item.category)} key={index2} className={cx('categoryMenu-sub-item')}>
                                            {item2}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MenuDropDown;