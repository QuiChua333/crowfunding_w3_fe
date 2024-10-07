import classNames from "classnames/bind";
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import styles from './ItemShipping.module.scss'
import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
const cx = classNames.bind(styles)

function ItemInclude({ index, onChangeItem, removeItem, listItemsAvailable, itemData, lengthListItem, setOpenModalItem, setOptionEdit, listItemChoosen}) {

    const [showListItemInclude, setShowListItemInclude] = useState(false);
    const element = useRef(null)
    const handleClickItemInclude = (item) => {
        onChangeItem({...itemData, name: item.name, quantity: itemData.quantity, id: item.id},index)
        
    }
    const handleChangeItem = (e) => {
        const quantity = e.target.value;
        onChangeItem({...itemData, quantity: quantity },index)
    }
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (element.current && !element.current.contains(event.target)) {
                setShowListItemInclude(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className={cx('wrapper')}>

            <div class='col-8' style={{ padding: '6px' }}>
                {/* <input onChange={(e) => handleChangeInputTagName(e, index)} type="text" className={cx('itext-field')} placeholder="Size" /> */}
                <div className={cx('entreField-select')}>
                    <a className={cx('entreDropdown-select', 'itext-field', {
                        borderInput: showListItemInclude
                    })} onClick={() => setShowListItemInclude(prev => !prev)} ref={element}>
                        <span>
                            {itemData.name || 'Chọn một vật phẩm'}
                        </span>

                        <FaAngleDown className={cx('icon', 'icon-down')} />
                        {
                            showListItemInclude &&
                            <div className={cx('dropdown-outer')}>
                                <DropDown listItemInclude={listItemsAvailable} onClickItem={handleClickItemInclude} index={index} setOpenModalItem={setOpenModalItem} setOptionEdit={setOptionEdit} listItemChoosen={listItemChoosen}/>
                            </div>
                        }

                    </a>

                </div>
            </div>
            <div class='col-3' style={{ padding: '6px' }} >

                <div className={cx('inputCurrencyField')} style={{ width: '100%' }}>
                    
                    <input onChange={(e) => handleChangeItem(e)} value={itemData.quantity} placeholder={"20000"} type="text" maxlength="50" className={cx('itext-field', 'inputCurrencyField-input')} disabled={!itemData.name} />
            
                </div>



            </div>

            
           {
            lengthListItem > 1 &&
            <div class='col'>
                <div onClick={() => removeItem(index)} style={{ cursor: 'pointer', marginTop: '12px' }}>
                    <span style={{  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                </div>
            </div>
           }


        </div>
    );
}

export default ItemInclude;