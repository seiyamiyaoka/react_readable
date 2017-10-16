import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Grid, Col, Row, Button, Thumbnail } from 'react-bootstrap';
import Comment from './Comment'
import CommentForm from './CommentForm'
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
              <Button bsStyle="danger" onClick={(e) => this.props.handleDelete(e, id)}>delete</Button>

              <Link
                className="createPost"
                to={`/edit/post/${id}`}
                onClick={(e) => this.props.handleDetail(e, id) }
              >
              edit
              </Link>
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

function mapStateToProps({post}) {
  return {
    post
  }
}
export default connect(mapStateToProps)(Post)
