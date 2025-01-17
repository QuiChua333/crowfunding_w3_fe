import React from 'react';

function ItemStatiscal({ label, value, className }) {
  return (
    <div className={`flex flex-col gap-5 p-3 rounded-xl border-[3px] ${className}`}>
      <span className="text-[16px] font-semibold">{label}</span>
      <span className="text-gray-600">{value} chiến dịch</span>
    </div>
  );
}

export default ItemStatiscal;
