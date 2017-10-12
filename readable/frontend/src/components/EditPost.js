import React, {Component} from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import SelectCategory from './SelectCategory'
import { Link } from 'react-router-dom'
import '../App.css'

class EditPost extends Component {

  state = {
    id: "",
    title: "",
    body: "",
    author: "",
    category: "",
    edit: false
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
        ...nextProps.post
      })
  }

  handleSelectChange = e => {
    this.setState({category: e.target.value})
  }

  render() {
    const setPost = this.state
    return (
      <div>
        <form onSubmit={this.props.postdispatch} className='create-contact-form'>
          <div className='create-contact-details'>
            <input
              type='text'
              name='title'
              value={setPost.title}
              onChange={this.handleChange}
              placeholder='Title'
             />
            <input
             type='text'
             name='body'
             value={setPost.body}
             onChange={this.handleChange}
             placeholder='Body'
            />
            <input
             type='text'
             name='author'
             value={setPost.author}
             onChange={this.handleChange}
             placeholder='Author'
            />
            <input
             type='hidden'
             name='id'
             value={setPost.id}
            />
            <select value={setPost.category} onChange={this.handleSelectChange}>
              {this.props.categories.map(category => (
                <option value={category.name} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <button>Update Post</button>
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
export default connect(mapStateToProps)(EditPost)
