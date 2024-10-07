import classNames from "classnames/bind";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import styles from './Search.module.scss'
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles)

function Search({placeholder, handleChangeInput}) {
    const inputRef = useRef(null)    
    const [value,setValue] = useState('');
    useEffect(() => {
        handleChangeInput(value)
    },[value])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-search')}>
                <span className={cx('main-icon-search')}><AiOutlineSearch /></span>
                <input onChange={(e) => setValue(e.target.value)} ref={inputRef} type="text" placeholder={placeholder} className={cx('main-input')} value={value}/>
                <span onClick={() => setValue('')} className={cx('main-icon-close')}><AiOutlineClose /></span>
            </div>
        </div>
    );
}

export default Search;