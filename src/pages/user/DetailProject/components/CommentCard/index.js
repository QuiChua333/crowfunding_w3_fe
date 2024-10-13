import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames/bind';
import LikeButton from '../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from '../CommentMenu';
import InputComment from '../InputComment';
import styles from './CommenCard.module.scss';
import { setLoading } from '~/redux/slides/GlobalApp';
import baseURL from '~/utils/baseURL';
import { CustomAxios } from '~/config';
const cx = classNames.bind(styles);
const CommentCard = ({ children, comment, campaign, commentId, setListComments, handleRemoveComment, members }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [role, setRole] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === currentUser._id)) {
      setIsLike(true);
    }
  }, [comment, currentUser._id]);

  const handleUpdate = async () => {
    if (comment.content !== content) {
      dispatch(setLoading(true));
      try {
        const res = await CustomAxios.patch(`${baseURL}/comment/updateComment/${comment._id}`, { content });
        setListComments((prev) =>
          [...prev].map((item) => {
            if (item._id === comment._id) {
              return {
                ...item,
                content,
              };
            } else return item;
          }),
        );
        setOnEdit(false);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (!currentUser._id) return;
    if (loadLike) return;
    setLoadLike(true);

    try {
      const res = await CustomAxios.patch(`${baseURL}/comment/likeComment/${comment._id}`, {});

      setListComments((prev) =>
        [...prev].map((item) => {
          if (item._id === comment._id) {
            return { ...item, likes: [...item.likes, currentUser] };
          } else return item;
        }),
      );
      setLoadLike(false);
    } catch (error) {}
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);

    try {
      const res = await CustomAxios.patch(`${baseURL}/comment/unLikeComment/${comment._id}`, {});

      setListComments((prev) =>
        [...prev].map((item) => {
          if (item._id === comment._id) {
            return { ...item, likes: [...item.likes].filter((i) => i._id !== currentUser._id) };
          } else return item;
        }),
      );
      setLoadLike(false);
    } catch (error) {}
  };

  const handleReply = () => {
    if (!currentUser._id) return;
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none',
  };
  const inputElement = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputElement.current && !inputElement.current.contains(event.target)) {
        setContent(comment.content);
        setOnEdit(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputElement]);
  useEffect(() => {
    let role = '';
    console.log('hello', members);
    console.log(comment.user._id);
    members.forEach((mem) => {
      if (mem.user._id === comment.user._id && mem.isAccepted === true) {
        role = 'Member';
      }
      if (mem.user._id === comment.user._id && mem.isOwner === true) {
        role = 'Owner';
      }
    });

    setRole(role);
  }, [comment]);
  return (
    <div className={cx('wrapper')} style={styleCard}>
      <div className={cx('inner')}>
        <Link to={`/individuals/${comment.user._id}/profile`} className={cx('avatar')}>
          <img
            src={comment.user.avatar?.url}
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
            alt="avatar user"
          />
        </Link>

        <div className={cx('content-wrapper')} ref={inputElement}>
          <div className={cx('commen-action')}>
            <div className={cx('comment_content')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={cx('fullName')} style={{ marginRight: '8px' }}>
                  {comment.user.fullName}
                </span>
                {role === 'Owner' && (
                  <span
                    style={{
                      color: '#fff',
                      backgroundColor: 'rgb(8, 131, 102)',
                      display: 'inline-block',
                      padding: '2px 5px',
                      fontSize: '10px',
                      letterSpacing: '1px',
                      borderRadius: '4px',
                    }}
                  >
                    CHỦ DỰ ÁN
                  </span>
                )}
                {role === 'Member' && (
                  <span
                    style={{
                      color: 'rgb(42, 42, 42)',
                      backgroundColor: '#fdde86',
                      display: 'inline-block',
                      padding: '2px 5px',
                      fontSize: '12px',
                      letterSpacing: '1px',
                      borderRadius: '4px',
                    }}
                  >
                    THÀNH VIÊN
                  </span>
                )}
              </div>
              <div>
                {onEdit ? (
                  <input value={content} className={cx('input-edit')} onChange={(e) => setContent(e.target.value)} />
                ) : (
                  <div>
                    {comment.tag && comment.tag._id !== comment.user._id && (
                      <Link to={`/profile/${comment.tag._id}`} style={{ marginRight: '4px' }}>
                        @{comment.tag.fullName}
                      </Link>
                    )}
                    <span style={{ color: '#555' }}>
                      {content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '....'}
                    </span>
                    {content.length > 100 && (
                      <span className={cx('readMore')} onClick={() => setReadMore(!readMore)}>
                        {readMore ? (
                          <span style={{ color: 'crimson', marginLeft: '8px', cursor: 'pointer' }}>Ẩn nội dung</span>
                        ) : (
                          <span style={{ color: '#65676b', marginLeft: '8px', cursor: 'pointer' }}>Xem thêm</span>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={cx('action')}>
              <CommentMenu
                campaign={campaign}
                comment={comment}
                setOnEdit={setOnEdit}
                handleRemoveComment={handleRemoveComment}
                members={members}
              />
            </div>
          </div>
          <div className={cx('like-action')}>
            <div>
              <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
              <small style={{ fontWeight: 'bold', marginLeft: '4px' }}>{comment.likes.length}</small>
            </div>

            {onEdit ? (
              <>
                <small style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleUpdate}>
                  Cập nhật
                </small>
                <small
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => {
                    setContent(comment.content);
                    setOnEdit(false);
                  }}
                >
                  Hủy
                </small>
              </>
            ) : (
              <small style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleReply}>
                {onReply ? 'Hủy' : 'Phản hồi'}
              </small>
            )}
            <small style={{ color: 'grey' }}>{moment(comment.createdAt).fromNow()}</small>
          </div>
          {onReply && (
            <div style={{ marginTop: '8px', marginLeft: '8px' }}>
              <InputComment
                onReply={onReply}
                setOnReply={setOnReply}
                campaign={campaign}
                setListComments={setListComments}
              >
                <Link to={`/profile/${onReply.user._id}`} style={{ marginRight: '4px', color: '#5c9aff' }}>
                  @{onReply.user.fullName}:
                </Link>
              </InputComment>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default CommentCard;
