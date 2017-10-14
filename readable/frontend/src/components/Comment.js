import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap';

import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchPostComments,
         deleteComment,
         editComment
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
    obj.props.fetchPostComments(nextProps.id)
    obj.setState({receiveComment: true})
  }

  componentWillReceiveProps(nextProps, preventProps) {
    this.state.receiveComment === false ? this.setPostComment(this, nextProps)
                                        : this.setState({receiveComment: false})
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

export default withRouter(connect(mapStateToProps, {fetchPostComments, deleteComment, editComment})(Comment))
