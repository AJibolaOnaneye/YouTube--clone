import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

const ReplyComment = (props) => {
    const [ChildCommentNumber, SetChildCommentNumber] =  useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0
        props.CommentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        SetChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) => 
    props.CommentLists && props.CommentLists.map((comment, index) => (
        <React.Fragment key={index}>
            {comment.responseTo === parentCommentId &&
            <div style={{ width: '80%', marginLeft: '40px' }}>
                <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
            </div>
                }
        </React.Fragment>
    ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    return (
        <div>
            {ChildCommentNumber > 0 && 
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
            onClick={handleChange}
            >
                view {ChildCommentNumber} more comment(s)
            </p>
            }

            {OpenReplyComments && 
            renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment