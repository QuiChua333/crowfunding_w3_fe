import classNames from 'classnames/bind';
import TeamMember from './components/TeamMember';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { setMessageBox } from '~/redux/slides/GlobalApp';

import styles from './Teams.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import baseURL from '~/utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';
import { setContentError, setShowErrorDelete, setTab } from '~/redux/slides/UserCampaign';

import { useDeleteMemberMutation, useSendInvitationMutation } from '~/hooks/api/mutations/user/team.mutation';
import { useGetTeamMemberByCampaignId } from '~/hooks/api/queries/user/team.query';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function TeamCampaign() {
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
  const [emailDelete, setEmailDelete] = useState('');
  const { data: response, refetch } = useGetTeamMemberByCampaignId(id);
  useEffect(() => {
    if (response) {
      setMembers(response);
    }
  }, [response]);

  const [invalidEmail, setInvalidEmail] = useState(false);
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
    const isExists = members.some((member) => member.email === email.trim());
    if (isExists) {
      dispatch(setContentError('Email người dùng này đã nằm trong team của bạn!'));
      dispatch(setShowErrorDelete(true));
      dispatch(setLoading(false));
      return;
    }
    dispatch(setLoading(true));
    sendInvitationMutation.mutate(
      {
        campaignId: id,
        email,
        isEdit: isCheckRoleEditing,
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
  };
  const handleRemoveMember = (email) => {
    setEmailDelete(email);
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
  const deleteMemberMutation = useDeleteMemberMutation();
  const deleteMember = async (email) => {
    deleteMemberMutation.mutate(
      {
        campaignId: id,
        email: email,
      },
      {
        onSuccess() {
          toast.success('Xóa thành viên thành công');
          refetch();
        },
        onError(err) {
          toast.error('Xóa thành viên thất bại');
          console.log(err.response.data.message);
        },
      },
    );
  };
  const handleChangeEdit = (email, valueEdit) => {
    setMembers((prev) =>
      [...prev].map((item) => {
        if (item.email === email) {
          return { ...item, isEdit: valueEdit };
        } else return item;
      }),
    );
  };
  const handleChangeRole = (email, role) => {
    setMembers((prev) =>
      [...prev].map((item) => {
        if (item.email === email) {
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
        deleteMember(emailDelete);
      }
    }
  }, [messageBox.result]);

  const handleClickSaveTeam = async () => {
    dispatch(setLoading(true));
    try {
      const res = await CustomAxios.patch(`${baseURL}/team-member/campaign/${id}`, {
        members: members,
      });
      dispatch(setLoading(false));
      navigate(`/campaigns/${id}/edit/funding`);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    dispatch(
      setTab({
        number: 5,
        content: 'Team',
      }),
    );
  }, []);

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
              <div className="w-[400px]">
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
                  <TeamMember member={members?.find((item) => item.isOwner === true)} changeRole={handleChangeRole} />
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
