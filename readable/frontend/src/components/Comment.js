import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap';

import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchPostComments,
         deleteComment,
         editComment,
         detailComment
        } from '../actions/comment'
import EditComment from './EditComment'

class Comment extends Component {
  state = {
    receiveComment: false,
    comments: []
  }

  handledeleteComment = (e, id) => {
    e.preventDefault()
    this.props.deleteComment(id)
  }

  handleEditComment = (e, id) => {
    this.props.editComment(id)
  }

  setPostComment = (obj, nextProps) => {
    obj.props.fetchPostComment(nextProps.id)
    obj.setState({receiveComment: true})
  }

  componentWillReceiveProps(nextProps, preventProps) {
    this.state.receiveComment === false ? this.setPostComment(this, nextProps)
                                        : this.setState({receiveComment: false})
    // if(this.state.receiveComment === false) {
    //   this.props.fetchPostComment(nextProps.id)
    //   this.setState({receiveComment: true})
    //   return
    // }
    // this.setState({receiveComment: false})
    // 無限ループしてしまうので明示的にreturnしてcommentを取得したら処理を終了
    // Since it loops infinitely, returning explicitly and acquiring comment terminates processing
  }

  render() {
    const comments = this.props.comment
    return(
      <div>
        {this.props.comment.filter(comment => comment.deleted === false).map((comment) => (

          <div>
            <Panel header={comment.author}>
              <p>{comment.body}</p>
              <button onClick={(e) => this.handledeleteComment(e, comment.id)}>delete</button>
              <Link
                to={`/comment/${comment.id}`}
                onClick={(e) => this.handleEditComment(e, comment.id) }
              >
              edit
              </Link>
            </Panel>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    depost: state.detailPost,
    comment: state.fetchComment,
    detailComment: state.detailComment
  }
}

function mapDispatchToProps(dispatch) {
  // delete, update, editのアクションを用意してdispathに入れる
  return {
    fetchPostComment: (id) => dispatch(fetchPostComments(id)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    editComment: (commentId) => dispatch(editComment(commentId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))
