import React from 'react'

function ItemDropdown({className, item, onselect}) {

    const handleSelect = () => {
        onselect(item)
    }
    return (
        <div onClick={handleSelect} className={`z-50 hover:cursor-pointer hover:bg-slate-100 border-b border-b-[#c8c8c8] bg-white text-[14px] font-bold text-[#6a6a6a] py-[13px] px-[15px] ${className}`} >
            {item.label}
        </div>
    )
}

export default ItemDropdown