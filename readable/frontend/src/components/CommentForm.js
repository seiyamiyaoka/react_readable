import React, {Component} from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import SelectCategory from './SelectCategory'
import { createComment } from '../actions/comment'
import '../App.css'

class CommentForm extends Component {
  state = {
    body: "",
    author: "",
    id: "",
    parentId: "",
    timestamp: null
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case 'body':
        this.setState({body: e.target.value})
        break
      case 'author':
        this.setState({author: e.target.value})
        break
      default:
        return null
    }
  }

  submitComment = (e, state) => {
    e.preventDefault()
    const uuidv1 = require('uuid/v1')
    const id = uuidv1()
    const newComment = Object.assign({}, state, {
          id: id,
          parentId: state.parentId,
          owner: state.author
        })
    this.props.createComment(newComment)
  }

  handleSelectChange = e => {
    this.setState({category: e.target.value})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        parentId: nextProps.state.detailPost.id,
        timestamp: new Date()
      }
    )
  }

  render() {
    // debugger
    // !if (this.props.state.detailComment === undefined || this.props.state.detailComment.length === 0) {
    //
    // }
    return (
      <div>
        <form onSubmit={(e) => this.submitComment(e, this.state)} className='create-contact-form'>
          <div className='create-contact-details'>
            <input
             type='text'
             name='body'
             value={this.state.body}
             onChange={this.handleChange}
             placeholder='Body'
            />
            <input
             type='text'
             name='author'
             value={this.state.author}
             onChange={this.handleChange}
             placeholder='Author'
            />

            <button>Create Comment</button>
          </div>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: (post) => dispatch(createComment(post))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
