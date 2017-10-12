import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Grid, Col, Row, Button, Thumbnail } from 'react-bootstrap';
import Comment from './Comment'
import CommentForm from './CommentForm'
import { fetchPostComment } from '../actions/comment'
class Post extends Component {

  render() {
    const {author, body, category, timestamp, title, voteScore, id} = this.props.post
    return(
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <p>{author}</p>
              <p>{title}</p>
              <p>{body}</p>
              <p>{category}</p>
              <p>{timestamp}</p>
              <p>{voteScore}</p>
              <Comment id={id}/>
              <Route exact path='/detailpost/:id' render={() => (
                <CommentForm />
              )} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comment: state.fetchPostComment,
    post: state.detailPost
  }
}
export default connect(mapStateToProps)(Post)
