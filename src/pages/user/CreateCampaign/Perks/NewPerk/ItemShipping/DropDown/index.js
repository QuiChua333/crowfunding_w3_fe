import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ listItem, onClickItem, index, style, listLocationShipChoosen }) {

     const handleClickItem = (item,e) => {
          if (listLocationShipChoosen.includes(item)) {
               e.stopPropagation();
          }
          else   onClickItem(item)
        
     }
     return (
          <div className={cx('wrapper')} style={style}>
               {
                    listItem.map((item, index) => {
                         return <div onClick={(e) => handleClickItem(item,e)} className={cx('item',{disabled: listLocationShipChoosen.includes(item)})} key={index} >
                              <span>{item}</span>
                         </div>
                    })
               }
               
          </div>
     );
}

export default DropDown;