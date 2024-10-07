import classNames from "classnames/bind";
import styles from './DropDown.module.scss'
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)

function DropDown({ listItemInclude, onClickItem, index, setOpenModalItem, setOptionEdit, listItemChoosen }) {
     const handleClickItem = (item,e) => {
          if (listItemChoosen?.includes(item.name)) {
               e.stopPropagation();
          }
          else  onClickItem(item)
     }
     return (
          <div className={cx('wrapper')}>
               {
                    listItemInclude.map((item, index) => {
                         return <div onClick={(e) => handleClickItem(item,e)} className={cx('item',{disabled: listItemChoosen?.includes(item.name)})} key={index}>
                              <span>{item.name}</span>
                         </div>
                    })
               }

               <div style={{padding: '20px 0', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center'}}>
                    <div onClick={() => {setOptionEdit({type:'add', index: index});setOpenModalItem(true)}} className={cx('btn','btn-ok')}>CREATE NEW ITEM</div>
               </div>

          </div>
     );
}

export default DropDown;