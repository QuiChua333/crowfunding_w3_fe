import classNames from 'classnames/bind';

import styles from './TeamMember.module.scss';
import { useState } from 'react';

import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';
import { defaultAvt } from '~/assets/images';

const cx = classNames.bind(styles);

function TeamMember({ changeRole, member, removeMember, changeEdit }) {
  const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
  const handleRemoveMember = () => {
    removeMember(member.email);
  };
  const handleChangeEdit = () => {
    if (member?.confirmStatus === 'Chờ xác nhận') {
      return;
    }
    changeEdit(member.email, !member.isEdit);
  };

  const handleChangeRole = (e) => {
    const role = e.target.value;
    changeRole(member.email, role);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className="w-3/12" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className={cx('avt')}>
            <img src={member?.avatar || defaultAvt} />
          </div>

          <div>
            {!member?.isOwner && (
              <>
                {member?.confirmStatus === 'Chờ xác nhận' && (
                  <div
                    style={{
                      padding: '1px 6px',
                      fontWeight: '300',
                      backgroundColor: '#fdde86',
                      display: 'inline-block',
                      color: '#2a2a2a',
                      fontSize: '13px',
                      borderRadius: '2px',
                    }}
                  >
                    CHỜ XÁC NHẬN
                  </div>
                )}
                {member?.confirmStatus === 'Đã xác nhận' && (
                  <div
                    style={{
                      padding: '1px 6px',
                      fontWeight: '300',
                      backgroundColor: '#35ca97',
                      display: 'inline-block',
                      color: '#fff',
                      fontSize: '13px',
                      borderRadius: '2px',
                    }}
                  >
                    ĐÃ XÁC NHẬN
                  </div>
                )}
              </>
            )}
            <div style={{ marginTop: '8px' }}>{member?.name} </div>
            <div>{member?.email} </div>

            {!member?.isOwner && (
              <label
                onClick={handleChangeEdit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '8px 0',
                  marginLeft: '-2px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span>
                  {!member?.isEdit ? (
                    <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} />
                  ) : (
                    <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                  )}
                </span>
                <span style={{ marginLeft: '8px', color: '#777', fontWeight: '200' }}>Toàn quyền chỉnh sửa</span>
              </label>
            )}
          </div>
        </div>
        {!member?.isOwner && (
          <div className="w-3/12">
            <label className={cx('entreField-label')}>Vai trò</label>
            <input
              type="text"
              maxLength="50"
              className={cx('itext-field')}
              value={member?.role}
              onChange={handleChangeRole}
            />
          </div>
        )}

        {!member?.isOwner && (
          <div class="w-1/12 ml-4">
            <div style={{ cursor: 'pointer', marginTop: '32px' }}>
              <span
                onClick={handleRemoveMember}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#eee5f2',
                  color: '#7a69b3',
                  borderRadius: '50%',
                  marginLeft: '12px',
                }}
              >
                <IoCloseSharp />
              </span>
            </div>
          </div>
        )}
        {member?.isOwner && <div className="w-1/12"></div>}
      </div>
    </div>
  );
}

export default TeamMember;
