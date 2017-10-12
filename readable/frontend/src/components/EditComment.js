import React, {Component} from 'react';
import { connect } from 'react-redux'
import { updateComment } from '../actions/comment'
import serializeForm from 'form-serialize'
import SelectCategory from './SelectCategory'
import { Link } from 'react-router-dom'
import '../App.css'

class EditComment extends Component {

  state = {
    id: "",
    body: "",
    author: "",
    parentId:"",
    timestamp: new Date(),
    edit: false
  }
  // helperとして定義する(editpostでも同じことをやっている)

  submitUpdateComment = (e, state) => {
    e.preventDefault()
    this.props.updateComment(state)
    // this.props.backPage.push(this.props.backPage.location.pathname)
    this.props.backPage.push('/')
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        ...nextProps.state.detailComment
      })
  }

  handleSelectChange = e => {
    this.setState({category: e.target.value})
  }

  render() {
    const setComment = this.state

    return (
      <div>
        <form onSubmit={(e) => this.submitUpdateComment(e, this.state, this.props.backpage)} className='create-contact-form'>
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

            <button>Update Comment</button>
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
    updateComment: (comment) => dispatch(updateComment(comment))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
// export default connect(mapStateToProps, null)(EditComment)
