import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icons from '../IconComment';
import classNames from 'classnames/bind';
import styles from './InputComment.module.scss';
import { useParams } from 'react-router-dom';
import baseURL from '~/utils/baseURL';
import { setLoading } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';
import { useCreateCommentMutation } from '~/hooks/api/mutations/user/campaign.mutation';
const cx = classNames.bind(styles);
const InputComment = ({ children, setListComments, onReply, setOnReply }) => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const submitComment = useCreateCommentMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: currentUser,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    const data = { ...newComment, campaignId: id, postUserId: currentUser._id };
    dispatch(setLoading(true));
    submitComment.mutate(data, {
      onSuccess(data) {
        setListComments((prev) => [...prev, data?.data?.newComment]);
        if (setOnReply) return setOnReply(false);
      },
      onError(error) {
        console.log(error);
      },
      onSettled() {
        dispatch(setLoading(false));
      },
    });
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('comment_input')} onSubmit={handleSubmit}>
        {children}
        <input
          type="text"
          placeholder="Thêm bình luận của bạn..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className={cx('right')}>
          {content.length > 0 && (
            <button type="submit" className={cx('postBtn')}>
              <span>Đăng</span>
            </button>
          )}
          <Icons setContent={setContent} content={content} />
        </div>
      </form>
    </div>
  );
};

export default InputComment;
