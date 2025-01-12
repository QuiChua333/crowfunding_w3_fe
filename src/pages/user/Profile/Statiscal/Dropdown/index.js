import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRef, useState } from 'react';

import ItemDropdown from './ItemDropdown';
import useClickOutside from '~/hooks/dom/useClickOutside';

const cx = classNames.bind(styles);

function DropDown({items, onSelected}) {
  const [open, setOpen] = useState(false);
  const [valueSelected, setValueSelected] = useState(items[0])
  const refDropdown = useRef(null);
  useClickOutside(refDropdown, () => {
    setOpen(false);
  })

  const handleToggle = () => {
    setOpen(!open)
  }
  const handleSelected = (item) => {
    setValueSelected(item);
    setOpen(false);
    onSelected(item.value);
  }
  return (
    <div className={cx('z-50 relative select-none w-[170px]')} ref={refDropdown}>
      <div onClick={handleToggle} className='hover:cursor-pointer flex items-center justify-between gap-5 border border-[#c8c8c8] bg-white text-[14px] font-bold text-[#6a6a6a] py-[13px] px-[15px]'>
        <span>{valueSelected.label}</span>
        <div onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }} className='text-[20px]'>
          {open ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowUp/>}
        </div>
      </div>
      <div className={`z-50 absolute ${open && "border border-[#c8c8c8]"} h-auto right-0 left-0 mt-[2px] transition-all duration-100 overflow-y-auto ${open ? "max-h-[200px]" : "max-h-0"}`}>
        {
          items.map((item, index) => {
            return (
              <ItemDropdown onselect={handleSelected} key={index} item={item} className={index === items.length - 1 && "border-b-0"} />
            )
          })
        }
      </div>
    </div>
  );
}

export default DropDown;
