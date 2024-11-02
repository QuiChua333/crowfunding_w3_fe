import React, { useState, useEffect } from 'react';
import CommentDisplay from '../CommentDisplay';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';

const Comments = ({ campaign, comments, setListComments, members }) => {
  const [commentsOrigin, setCommentsOrigin] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(10);
  const dispatch = useDispatch();
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = comments.filter((cm) => !cm.reply);
    setCommentsOrigin(newCm);
    setShowComments(newCm.slice(0, next));
  }, [comments, next]);

  useEffect(() => {
    const newRep = comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [comments]);

  const removeComment = useDeleteCommentMutation();
  const handleRemoveComment = async (comment) => {
    dispatch(setLoading(true));
    const deleteArr = [...comments.filter((cm) => cm.reply === comment._id), comment];
    for (let i = 0; i < deleteArr.length; i++) {
      removeComment.mutate(deleteArr[i]._id, {
        onSuccess: () => {
          console.log('Xóa comment thành công');
        },
        onError: (error) => {
          console.log('Lỗi khi xóa comment', error);
        },
      });
    }
    setListComments((prev) => [...prev].filter((cm) => !deleteArr.find((da) => cm._id === da._id)));
    dispatch(setLoading(false));
  };
  return (
    <div className="comments">
      {showComments.map((comment, index) => (
        <CommentDisplay
          key={index}
          comment={comment}
          campaign={campaign}
          setListComments={setListComments}
          handleRemoveComment={handleRemoveComment}
          members={members}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}

      {commentsOrigin.length - next > 0 ? (
        <div
          style={{ cursor: 'pointer', color: '#65676b', padding: '8px', borderTop: '1px solid #eee' }}
          onClick={() => setNext(next + 10)}
        >
          Xem thêm bình luận...
        </div>
      ) : (
        commentsOrigin.length > 10 && (
          <div
            style={{ cursor: 'pointer', color: 'crimson', padding: '8px', borderTop: '1px solid #ccc' }}
            onClick={() => setNext(10)}
          >
            Ẩn bình luận
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
