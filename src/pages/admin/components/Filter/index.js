import classNames from "classnames/bind";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";

import styles from './Filter.module.scss'
const cx = classNames.bind(styles)
function Filter({ listConditions, handleClickItem, valueShow }) {
    const [showDropDown, setShowDropDown] = useState(false)
    const [value, setValue] = useState(() => {
        let state
        if (!valueShow) {
            state = listConditions[0] || 'Lọc'
        }
        else state = valueShow
        return state
    })
    const refElement = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (refElement.current && !refElement.current.contains(event.target)) {
                setShowDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refElement]);
    return (
        <div className={cx('wrapper')}>
            <div ref={refElement} onClick={() => setShowDropDown(prev => !prev)} className={cx('filter')}>
                <span>{valueShow ? valueShow : value} </span>
                {
                    !showDropDown &&
                    <FaAngleDown />
                }
                {
                    showDropDown &&
                    <FaAngleUp />
                }

                {
                    showDropDown &&
                    <div className={cx('conditions-wrapper')}>
                        {
                            listConditions.map((item, index) => {
                                return <div key={index} onClick={() => { setValue(item); handleClickItem(item) }} index={index}>{item}</div>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Filter;