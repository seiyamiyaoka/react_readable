import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
        <div>
          {setPost.filter(post => post.deleted === false).map((post) => (
            <div>
              <p>{post.title}</p>
              <p>{post.author}</p>
              <p>{post.voteScore}</p>
              <button value="upVote" onClick={(e) => this.props.updateVote(e, post.id)}>up</button>
              <button value="downVote" onClick={(e) => this.props.updateVote(e, post.id)}>down</button>
              <button onClick={(e) => this.props.handleDelete(e, post.id)}>delete</button>
              <Link
                to={`/detailpost/${post.id}`}
                onClick={(e) => this.props.handleDetail(e, post.id) }
              >
                detail
              </Link>
              <Link
                to={`/edit/post/${post.id}`}
                onClick={(e) => this.props.handleDetail(e, post.id) }
              >
              edit
              </Link>

            </div>
          ))}
        </div>
      </div>
    )
  }
}
