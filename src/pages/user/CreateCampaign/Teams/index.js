import classNames from 'classnames/bind';
import SidebarCampaign from '../components/Sidebar';

import Footer from '~/layout/components/Footer';
import TeamMember from './components/TeamMember';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { TiCancel } from 'react-icons/ti';
import { setMessageBox } from '~/redux/slides/GlobalApp';

import styles from './Teams.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';
import { setContentError, setShowErrorDelete } from '~/redux/slides/UserCampaign';
import { useGetTeamMemberByCampaignId } from '~/hooks/api/queries/user/campaign.query';
import { useGetUserByEmailMutation } from '~/hooks/api/mutations/user/user.mutation';
import { useSendInvitationMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { useDeleteItemMutation } from '~/hooks/api/mutations/user/item.mutation';
const cx = classNames.bind(styles);

function TeamCampaign() {
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
  const [memberId, setMemberId] = useState('');
  const { data: response, refetch } = useGetTeamMemberByCampaignId(id);
  useEffect(() => {
    if (response) {
      setMembers(response.data);
    }
  }, [response]);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const getUserByEmailMutation = useGetUserByEmailMutation();
  const sendInvitationMutation = useSendInvitationMutation();
  const handleClickSendInvitation = async () => {
    // check validate email
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setInvalidEmail(true);
      dispatch(setShowErrorDelete(false));

      return;
    }
    setInvalidEmail(false);
    dispatch(setShowErrorDelete(false));
    dispatch(setLoading(true));
    getUserByEmailMutation.mutate(email, {
      onSuccess(data) {
        if (!data.data) {
          dispatch(setContentError('Email người dùng này không tồn tại trong hệ thống'));
          dispatch(setShowErrorDelete(true));
          dispatch(setLoading(false));

          return;
        }

        if (members?.some((item) => item.user.email === email)) {
          dispatch(setContentError('Email người dùng này đã nằm trong team của bạn!'));
          dispatch(setShowErrorDelete(true));
          dispatch(setLoading(false));

          return;
        }

        sendInvitationMutation.mutate(
          {
            campaignId: id,
            email,
            canEdit: isCheckRoleEditing,
          },
          {
            onSuccess() {
              dispatch(setLoading(false));
              dispatch(setShowErrorDelete(false));
              setEmail('');
              setCheckRoleEditng(false);
              refetch();
            },
            onError(error) {
              console.log(error.message);
            },
          },
        );
      },
      onError(err) {
        console.log(console.log(err));
      },
    });
  };
  const handleRemoveMember = (memberId) => {
    setMemberId(memberId);
    dispatch(
      setMessageBox({
        title: 'Xóa thành viên?',
        content: 'Xóa thành viên nhóm sẽ thu hồi quyền truy cập của họ vào chiến dịch.',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: 'deleteMember',
      }),
    );
  };
  const deleteMemberMutation = useDeleteItemMutation();
  const deleteMember = async (memberId) => {
    deleteMemberMutation.mutate(
      {
        campaignId: id,
        memberId: memberId,
      },
      {
        onSuccess() {
          refetch();
        },
        onError(err) {
          console.log(err.message);
        },
      },
    );
  };
  const handleChangeEdit = (memberId, valueEdit) => {
    setMembers((prev) =>
      [...prev].map((item) => {
        if (item.user._id === memberId) {
          return { ...item, canEdit: valueEdit };
        } else return item;
      }),
    );
  };
  const handleChangeRole = (memberId, role) => {
    setMembers((prev) =>
      [...prev].map((item) => {
        if (item.user._id === memberId) {
          return { ...item, role: role };
        } else return item;
      }),
    );
  };
  useEffect(() => {
    console.log(members);
  }, [members]);

  useEffect(() => {
    if (messageBox.type === 'deleteMember') {
      if (messageBox.result === true) {
        deleteMember(memberId);
      }
    }
  }, [messageBox.result]);

  const handleClickSaveTeam = async () => {
    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.patch(`${baseURL}/campaign/editCampaign/${id}`, {
        team: [...members].map((item) => ({ ...item, user: item.user._id })),
      });
      dispatch(setLoading(false));
      window.location.href = `/campaigns/${id}/edit/funding`;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={cx('body')}>
        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Team chiến dịch</div>
          <div className={cx('entreField-subHeader')}>
            Nếu những người khác đang giúp bạn thực hiện chiến dịch, hãy gửi cho họ lời mời qua email bên dưới. Khi họ
            chấp nhận lời mời, họ sẽ được đại diện trên trang chiến dịch của bạn với tư cách là thành viên trong nhóm
            của bạn.
          </div>

          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>Email Thành Viên Mới</label>
            <div className={cx('container-input')}>
              <div style={{ flex: '1' }} class>
                <input
                  type="email"
                  className={cx('itext-field')}
                  style={{ flex: '1' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {invalidEmail && (
                  <p style={{ color: 'red', fontSize: '12px', marginTop: '6px' }}>Định dạng email không hợp lệ</p>
                )}
              </div>
              <a onClick={handleClickSendInvitation} className={cx('btn-add-video')}>
                GỬI LỜI MỜI
              </a>
            </div>
            <div>
              <label
                onClick={() => setCheckRoleEditng((prev) => !prev)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '16px 0',
                  marginLeft: '-2px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span>
                  {!isCheckRoleEditing ? (
                    <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} />
                  ) : (
                    <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                  )}
                </span>
                <span style={{ marginLeft: '8px' }}>Cấp cho thành viên này toàn quyền chỉnh sửa chiến dịch.</span>
              </label>

              <div style={{ marginTop: '32px' }}>
                <div className={cx('team-owner')}>
                  <label className={cx('entreField-label')}>Chủ sỡ hữu</label>
                  <div style={{ borderTop: '1px solid #C8C8C8' }}></div>
                  <TeamMember
                    isOwner
                    member={members?.find((item) => item.isOwner === true)}
                    changeRole={handleChangeRole}
                  />
                </div>
                <div className={cx('team-members')}>
                  <label className={cx('entreField-label')}>Thành viên</label>
                  <div style={{ borderTop: '1px solid #C8C8C8' }}></div>
                  {members
                    ?.filter((item) => item.isOwner === false)
                    .map((item2, index) => {
                      return (
                        <TeamMember
                          key={index}
                          member={item2}
                          removeMember={handleRemoveMember}
                          changeEdit={handleChangeEdit}
                          changeRole={handleChangeRole}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '60px',
              borderTop: members?.length > 1 && '1px solid #C8C8C8',
              paddingTop: '60px',
              textAlign: 'right',
            }}
          >
            <a onClick={handleClickSaveTeam} className={cx('btn', 'btn-ok')}>
              LƯU VÀ TIẾP TỤC
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamCampaign;
