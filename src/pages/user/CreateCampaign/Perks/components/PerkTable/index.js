import classNames from "classnames/bind";

import styles from './PerkTable.module.scss'
import PerkRow from "./PerkRow";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { useEffect, useState } from "react";


const cx = classNames.bind(styles)

function PerkTable({onPerkTableChange, listPerks, getPerksByCampaignId, isEditAll, isEditComponent, handleDeletePerK}) {
   
    const [listPerkState,setListPerkState] = useState([...listPerks].map(item => ({...item, isChecked: false})));
    const [isCheckAll,setCheckAll] = useState(false) 

    useEffect(() => {
        setListPerkState([...listPerks].map(item => ({...item, isChecked: false})))
    },[listPerks])
    const handleClickCheckALl = () => {
        setCheckAll(prev => !prev);
        setListPerkState(prev => {
            const nextState = [...prev].map((item,index) => {
                    return {...item, isChecked: !isCheckAll}
            })
            return nextState;
        })
    }
    const handleSetChecked = (indexChange,checked) => {
        setListPerkState(prev => {
            const nextState = [...prev].map((item,index) => {
                if (index===indexChange) {
                    return {...item, isChecked: checked}
                }
                else return {...item}
            })  
            return nextState;
        })
    }
    useEffect(()=> {
        const checkAll = listPerkState.every(item => item.isChecked === true);
        setCheckAll(checkAll)
  
        onPerkTableChange([...listPerkState])

    },[listPerkState])

    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                
                        <th className={cx('title')}>Tiêu đề</th>
                        <th className={cx('price')}>Trị giá</th>
                        <th className={cx('type')}>Loại</th>
                        <th className={cx('quantity')}>Số lượng yêu cầu</th>
                        <th className={cx('est')}>Ngày giao dự kiến</th>
                        <th className={cx('action')}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listPerkState.map((item, index) => {
                            return <PerkRow key={index} perk={item} index={index} setChecked={handleSetChecked} getPerksByCampaignId={getPerksByCampaignId} isEditComponent={isEditComponent} handleDeletePerK={handleDeletePerK}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PerkTable;