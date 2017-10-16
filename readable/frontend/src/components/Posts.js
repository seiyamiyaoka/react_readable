import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Col, Row, Button, Thumbnail } from 'react-bootstrap';

export default class Posts extends Component {
  render() {
    let setPost;
    if(this.props.posts.posts !== undefined) {
      setPost = this.props.posts.posts
    } else {
      setPost = this.props.posts
    }
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div>

                {setPost.filter(post => post.deleted === false).map((post) => (
                  <div>
                  <Thumbnail>
                    <p>{post.title}</p>
                    <p>{post.author}</p>
                    <p>{post.voteScore}</p>
                    <Button bsStyle="primary" value="upVote" onClick={(e) => this.props.updateVote(e, post.id)}>up</Button>
                    <Button bsStyle="warning" value="downVote" onClick={(e) => this.props.updateVote(e, post.id)}>down</Button>
                    <Button bsStyle="danger" onClick={(e) => this.props.handleDelete(e, post.id)}>delete</Button>
                    <div className="_post_link">
                      <Link
                        to={`/detailpost/${post.id}`}
                        onClick={(e) => this.props.handleDetail(e, post.id) }
                      >
                        detail
                      </Link>
                      <Link
                        className="createPost"
                        to={`/edit/post/${post.id}`}
                        onClick={(e) => this.props.handleDetail(e, post.id) }
                      >
                      edit

                      </Link>
                    </div>
                    </Thumbnail>
                  </div>
                ))}

              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
