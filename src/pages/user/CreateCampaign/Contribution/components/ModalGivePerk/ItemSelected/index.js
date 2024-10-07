import { useEffect } from "react";
import formatMoney from "~/utils/formatMoney";
import { BiPlus } from 'react-icons/bi';
import { HiOutlineMinusSm } from 'react-icons/hi';
function ItemSelected({ item, handleClickSub, handleClickAdd, handleRemove}) {
    return (

        <div style={{ paddingTop: '24px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
                <img style={{ width: '72px', height: '48px', objectFit: 'cover', marginRight: '16px' }} src={item.perkImage} />
                <div style={{ marginTop: '-6px' }}>
                    <div style={{ fontSize: '16px', margin: 'auto 0', fontWeight: '600' }}>
                        {item.perkTitle}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                        {
                            item.options.map((option, index) => {
                                return <span key={index}>{option.name}{option.optionsString && ':'} {option.optionsString}</span>
                            })
                        }
                    </div>

                    <div style={{marginTop: '12px'}}>
                        <div style={{
                            width: '100px',
                            height: '30px',
                            border: '1px solid #262626',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            padding: '2px 10px',
                            userSelect: 'none'
                        }}>
                            <HiOutlineMinusSm
                                
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleClickSub(item.perkId)}
                            />
                            <span style={{fontWeight: '600'}}>{item.quantity}</span>
                            <BiPlus
                                
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleClickAdd(item.perkId)}
                            />
                        </div>
                       
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
                <span style={{ fontWeight: '600' }}>{formatMoney(item.price)}VNĐ</span>
                <span style={{ alignSelf: 'flex-end' }}>x{item.quantity}</span>
                <span onClick={() => handleRemove(item.perkId)} style={{color: 'red', fontWeight: '600', display: 'block', justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: '16px', cursor: 'pointer'}}>Xóa</span>
            </div>
        </div>


    );
}

export default ItemSelected;