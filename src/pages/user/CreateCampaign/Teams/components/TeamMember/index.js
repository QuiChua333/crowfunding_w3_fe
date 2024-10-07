import classNames from "classnames/bind";

import styles from './TeamMember.module.scss'
import { useState } from "react";

import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const cx = classNames.bind(styles)

function TeamMember({changeRole, member, isOwner, removeMember, changeEdit }) {
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    const handleRemoveMember = () => {
        removeMember(member.user._id)
    }
    const handleChangeEdit = () => {
        if (!member.isAccepted) {
            return;
        }
        changeEdit(member.user._id, !member.canEdit)
    }
   
    const handleChangeRole = (e) => {
        const role = e.target.value;
        changeRole(member.user._id,role)
    }
    return (

        <div className={cx('wrapper')}>
            {/* <label className={cx('entreField-label')}>Team Owner</label>
            <div style={{ borderTop: '1px solid #C8C8C8' }}></div> */}
            <div style={{ padding: '32px 0 32px 15px', display: 'flex', alignItems: 'center' }}>
                <div className="col-6" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>

                    <div className={cx('avt')} style={{ opacity: !member?.user?.avatar?.url && '0' }}>

                        <img src={member?.user?.avatar?.url} />
                    </div>

                    <div>
                        {
                            !isOwner &&
                            <>
                                {
                                    !member?.isAccepted &&
                                    <div style={{ padding: '1px 6px', fontWeight: '300', backgroundColor: '#fdde86', display: 'inline-block', color: '#2a2a2a', fontSize: '13px', borderRadius: '2px' }}>
                                        CHỜ CHẤP NHẬN
                                    </div>
                                }
                                {
                                    member?.isAccepted &&
                                    <div style={{ padding: '1px 6px', fontWeight: '300', backgroundColor: '#35ca97', display: 'inline-block', color: '#fff', fontSize: '13px',  borderRadius: '2px' }}>
                                        ĐÃ CHẤP NHẬN
                                    </div>
                                }
                            </>
                        }
                        <div style={{marginTop: '8px'}}>{member?.user?.fullName} </div>
                        <div>{member?.user?.email} </div>
                       

                        {
                            !isOwner &&
                            <label onClick={handleChangeEdit} style={{ display: 'flex', alignItems: 'center', margin: '8px 0', marginLeft: '-2px', cursor: 'pointer', userSelect: 'none' }}>
                                <span >
                                    {
                                        !member?.canEdit ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                    }
                                </span>
                                <span style={{ marginLeft: '8px', color: '#777', fontWeight: '200' }}>Toàn quyền chỉnh sửa</span>
                            </label>
                        }
                    </div>
                </div>
                <div className="col-5">
                    <label className={cx('entreField-label')}>Vai trò</label>
                    <input type="text" maxLength="50" className={cx('itext-field')} value={member?.role} onChange={handleChangeRole} />
                </div>

                {
                    !isOwner &&
                    <div class='col'>
                        <div style={{ cursor: 'pointer', marginTop: '32px' }}>
                            <span onClick={handleRemoveMember} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                        </div>
                    </div>
                }


            </div>
        </div>
    );
}

export default TeamMember;