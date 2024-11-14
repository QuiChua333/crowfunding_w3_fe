import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import InputComment from '~/pages/user/DetailProject/components/InputComment';
import Comments from '~/pages/user/DetailProject/components/Comment';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetCommentsByCampaignIdQuery } from '~/hooks/api/queries/user/comment.query';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function CommentTab({ campaign, members }) {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comments, setComments] = useState([]);
  const { data: commentsData } = useGetCommentsByCampaignIdQuery(id);
  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
  }, [commentsData]);
  return (
    <div className={cx('wrapper')}>
      {currentUser.id && (
        <div>
          <InputComment setComments={setComments} />
        </div>
      )}
      {comments.length > 0 && (
        <div className={cx('comment-wrapper')}>
          <Comments campaign={campaign} comments={comments} setComments={setComments} members={members} />
        </div>
      )}
    </div>
  );
}

export default CommentTab;
