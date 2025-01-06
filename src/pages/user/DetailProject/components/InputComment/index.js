import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icons from '../IconComment';
import classNames from 'classnames/bind';
import styles from './InputComment.module.scss';
import { useParams } from 'react-router-dom';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useCreateCommentMutation } from '~/hooks/api/mutations/user/comment.mutation';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const InputComment = ({ children, setComments, onReply, setOnReply }) => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [isLoadingSend, setLoadingSend] = useState(false);

  const submitComment = useCreateCommentMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    const newComment = {
      content,
      replyId: onReply && onReply.id,
      tagId: onReply && onReply.author.id,
      campaignId: id,
    };

    setLoadingSend(true);
    submitComment.mutate(newComment, {
      onSuccess(data) {
        setComments((prev) => [...prev, data]);
        if (setOnReply) return setOnReply(false);
      },
      onError(error) {
        console.log(error);
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      },
      onSettled() {
        setLoadingSend(false);
        setContent('');
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
            <>
              {isLoadingSend === true && <ClipLoader size={20} color="#299899" />}
              {isLoadingSend === false && (
                <button type="submit" className={cx('postBtn')}>
                  <span>Đăng</span>
                </button>
              )}
            </>
          )}
          <Icons setContent={setContent} content={content} />
        </div>
      </form>
    </div>
  );
};

export default InputComment;
