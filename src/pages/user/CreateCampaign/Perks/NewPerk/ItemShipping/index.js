import classNames from "classnames/bind";
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import styles from './ItemShipping.module.scss'
import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
const cx = classNames.bind(styles)

function ItemShipping({ index, onChangeItem, removeItem, listLocationShip, lengthListItemShiping, itemData, listLocationShipChoosen }) {

    const [showLocation, setShowLocation] = useState(false);
    const element = useRef(null)
    const handleChangeLocation = (location) => {
        onChangeItem({...itemData, location},index)
    }
    const handleChangeValue = (e) => {
        const value = e.target.value;
        onChangeItem({...itemData, fee: value},index)
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (element.current && !element.current.contains(event.target)) {
                setShowLocation(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [element]);

    
    return (
        <div className={cx('wrapper')}>

            <div class='col-8' style={{ padding: '6px' }}>
                {/* <input onChange={(e) => handleChangeInputTagName(e, index)} type="text" className={cx('itext-field')} placeholder="Size" /> */}
                <div className={cx('entreField-select')}>
                    <a className={cx('entreDropdown-select', 'itext-field', {
                        borderInput: showLocation
                    })} onClick={() => setShowLocation(prev => !prev)} ref={element}>
                        <span>
                            {itemData.location ||  'Chọn địa điểm'}
                        </span>

                        <FaAngleDown className={cx('icon', 'icon-down')} />
                        {
                            showLocation &&
                            <div className={cx('dropdown-outer')}>
                                <DropDown listItem={listLocationShip} onClickItem={location => handleChangeLocation(location)}  listLocationShipChoosen={listLocationShipChoosen} />
                            </div>
                        }

                    </a>

                </div>
            </div>
            <div class='col-3' style={{ padding: '6px' }} >

                <div className={cx('inputCurrencyField')} style={{ width: '100%' }}>
                    <span className={cx('inputCurrencyField-symbol')}>$</span>
                    <input onChange={(e) => handleChangeValue(e)} value={itemData.fee} placeholder={"20000"} type="text" maxlength="50" className={cx('itext-field', 'inputCurrencyField-input')} />
                    <span className={cx('inputCurrencyField-isoCode')}>VNĐ</span>
                </div>



            </div>

            {
                lengthListItemShiping > 1 &&
                <div class='col'>
                    <div onClick={() => removeItem(index)} style={{ cursor: 'pointer', marginTop: '12px' }}>
                        <span style={{  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                    </div>
                </div>
            }


        </div>
    );
}

export default ItemShipping;