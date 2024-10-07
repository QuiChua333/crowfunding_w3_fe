import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import InputComment from '~/pages/user/DetailProject/components/InputComment';
import Comments from '~/pages/user/DetailProject/components/Comment';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function CommentTab({ campaign, comments, setListComments, members }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className={cx('wrapper')}>
      {currentUser._id && (
        <div>
          <InputComment setListComments={setListComments} />
        </div>
      )}
      {comments.length > 0 && (
        <div className={cx('comment-wrapper')}>
          <Comments campaign={campaign} comments={comments} setListComments={setListComments} members={members} />
        </div>
      )}
    </div>
  );
}

export default CommentTab;
