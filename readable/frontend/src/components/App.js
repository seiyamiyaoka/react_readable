import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { PageHeader } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link, Switch } from 'react-router-dom'
import { uuid } from 'uuid'
import serializeForm from 'form-serialize'
import SelectCategory from './SelectCategory'
import Posts from './Posts'
import Post from './Post'
import PostForm from './PostForm'
import EditPost from './EditPost'
import EditComment from './EditComment'
import { fetchCategory } from '../actions/category'
import { createPost,
         deletePost,
         fetchPosts,
         fetchCategoryPosts,
         detailPost,
         updatePost,
         voteSort,
         updateVote
        } from '../actions/post'
import '../App.css';


class App extends Component {
  state = {
    posts: []
  }
  handlePost = (e) => {
    e.preventDefault()
    this.props.dispatch(fetchPosts())
  }

  setBodyData = (e, value) => {
    const timestamp = new Date()
    const category = e.target.elements[3].value
    const uuidv1 = require('uuid/v1')
    const id = uuidv1()
    value.id = value.id === undefined ? id : value.id
    value.timestamp = timestamp
    value.category = category
    return value
  }

  submitPost = (e) => {
    e.preventDefault()
    // debugger

    const values = serializeForm(e.target, {hash: true})
    const data = this.setBodyData(e, values)
    this.props.createPost(data)
  }

  SubmitUpdatePost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const data = this.setBodyData(e, values)
    this.props.updatePost(data)

  }

  submitDeletePost = (e, id) => {
    e.preventDefault()
    this.props.deletePost(id)
  }

  handleDetail = (e, id) => {
    this.props.detailPost(id)
  }

  handleSelectCategory = (e) => {
    const categoryName = e.target.value
    e.preventDefault()
    // debugger
    this.props.fetchCategoryPosts(categoryName)
  }

  // sort by votecount

  sortVoteCount = (e, state) => {
    // let sortState = state.posts || state
    let sortedState = state.posts || state
    const sortType = e.target.value
    switch (sortType) {
      case 'voteHigh':
        sortedState = sortedState.sort(function(a,b) {
          return (a.voteScore < b.voteScore ? 1 : -1);
        });
        break
      case 'voteLow':
        sortedState = sortedState.sort(function(a,b) {
          return (a.voteScore > b.voteScore ? 1 : -1);
        });
        break
      case 'timeHigh':
        sortedState = sortedState.sort(function(a, b) {
          return (a.timestamp < b.timestamp ? 1 : -1);
        });
        break
      case 'timeLow':
        sortedState = sortedState.sort(function(a, b) {
          return (a.timestamp > b.timestamp ? 1 : -1);
        });
        break
      default:
        sortedState
        break
    }
    this.props.voteSort(sortType, sortedState)
  }

  updateVoto = (e, id) => {
    const voteResult = e.target.value
    this.props.updateVote(id, voteResult)
  }

  componentDidMount() {
    this.props.fetchCategory()
    this.props.fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    this.state.posts = nextProps.posts
  }


  render() {

    const postsState  = this.props

    return (
      <div>
      <PageHeader>Readable <small>test app</small></PageHeader>
        <Route exact path='/posts/new' render={({history}) => (
          <PostForm
            postdispatch={(post) => {
              this.submitPost(post)
              history.push('/')
            }}
            categories={postsState.categories}
          />
        )} />

        <Route exact path='/' render={() =>(
          <div className='nav'>
            <SelectCategory
              posts={postsState.posts}
              categories={postsState.categories}
              handleSelect={this.handleSelectCategory}
              vortSort={this.sortVoteCount}
            />
            <Posts
              posts={this.props.posts}
              updateVote={this.updateVoto}
              categories={postsState.categories}
              handleDelete={this.submitDeletePost}
              handleDetail={this.handleDetail}
            />
          </div>
          )} />

        <Route exact path='/detailpost/:id' render={() => (
          <Post
            post={this.props.post}
          />
        )} />

        <Route exact path='/edit/post/:id' render={({ history }) => (
          <EditPost
            postdispatch={(post) => {
              this.SubmitUpdatePost(post)
              history.push('/')
            }}
            categories={postsState.categories}
            post={this.props.post}
          />
        )} />
        <Route exact path='/comment/:id' render={({ history }) => (
          <EditComment
            backPage={history}
           />
        )} />

        <Link to='/posts/new' className="post-new">post-new</Link>
        <Link to='/' className="post-new">top</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.fetchCategory,
    posts: state.fetchPosts,
    post: state.detailPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategory: () => dispatch(fetchCategory()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
    createPost: (post) => dispatch(createPost(post)),
    deletePost: (id) => dispatch(deletePost(id)),
    detailPost: (id) => dispatch(detailPost(id)),
    updatePost: (post) => dispatch(updatePost(post)),
    voteSort: (type, status) => dispatch(voteSort(type, status)),
    updateVote: (id, voteResult) => dispatch(updateVote(id, voteResult))

    // fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
