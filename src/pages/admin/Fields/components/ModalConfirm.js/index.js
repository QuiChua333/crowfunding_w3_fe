import React from 'react'


function ModalConfirm({ setOpen, title, content, contentCancel, contentOK, onCancel, onConfirm}) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-[3000] bg-[rgba(38,38,38,0.5)]" onClick={() => setOpen(false)}>
        <div onClick={(e) => e.stopPropagation()} className='absolute top-[20%] left-[50%] font-medium transform -translate-x-1/2 max-w-[480px] p-10 border border-[#dddddd] bg-[#fafafa] text-[#2a2a2a] text-[16px] '>
            <span className='font-medium text-[24px]'>{title}</span>
            <p className='mb-10 mt-5 opacity-80'>{content}</p>
            <div className='flex items-center justify-end'>
                {
                    contentCancel &&
                    <div onClick={onCancel} className='font-semibold text-[13px] p-4 flex items-center justify-center cursor-pointer min-h-10 min-w-[86px] border border-transparent bg-transparent text-[#7A69B3] hover:bg-[#EEE5F2] hover:border-[#EEE5F2] hover:text-[#7A69B3] '>{contentCancel || "HỦY"}</div>
                }
                {
                    contentOK &&
                    <div onClick={onConfirm} className='font-semibold text-[13px] p-4 flex items-center justify-center cursor-pointer min-h-10 min-w-[86px] bg-[#7A69B3] text-white ml-4 border-none hover:bg-[#6653a5]'>{contentOK || "XÁC NHẬN"}</div>
                }
            </div>
        </div>
    </div>
  )
}

export default ModalConfirm