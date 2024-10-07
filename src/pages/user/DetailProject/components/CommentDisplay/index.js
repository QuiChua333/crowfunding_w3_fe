import React, { useState, useEffect } from 'react'
import CommentCard from '../CommentCard'
import classNames from 'classnames/bind'
import styles from './CommentDisplay.module.scss'

const cx = classNames.bind(styles)
const CommentDisplay = ({ comment, replyCm, campaign, setListComments, handleRemoveComment, members }) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(3)

    useEffect(() => {
        // setShowRep(replyCm.slice(replyCm.length - next))
        setShowRep(replyCm.slice(0,next))

    }, [replyCm, next])

    return (
        <div className={cx('wrapper')}>
            <CommentCard comment={comment} campaign={campaign} commentId={comment._id} setListComments={setListComments}
                handleRemoveComment={handleRemoveComment} members={members}>
                <div style={{ paddingLeft: '32px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                                handleRemoveComment={handleRemoveComment}
                                key={index}
                                comment={item}
                                members={members}
                                campaign={campaign}
                                commentId={comment._id}
                                setListComments={setListComments}
                            />
                        ))
                    }

                    {

                        replyCm.length - next > 0
                            ? <div style={{ cursor: 'pointer', color: '#65676b', marginTop: '12px' }}
                                onClick={() => setNext(next + 5)}>
                                Xem thêm bình luận...
                            </div>

                            : replyCm.length > 3 &&
                            <div style={{ cursor: 'pointer', color: 'crimson', marginTop: '12px' }}
                                onClick={() => setNext(3)}>
                                Ẩn bình luận
                            </div>

                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
