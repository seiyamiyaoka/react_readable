import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Form, FormGroup, Col } from 'react-bootstrap'
import { uuid } from 'uuid'
import serializeForm from 'form-serialize'
import SelectCategory from './SelectCategory'
import { Link } from 'react-router-dom'
import '../App.css'

class PostForm extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    author: "",
    category: ""
  }

  handleChange = (e) => {
    // debugger
    switch (e.target.name) {
      case 'title':
        this.setState({title: e.target.value})
        break
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

  handleSelectChange = e => {
    this.setState({category: e.target.value})
  }

  render() {
    const { createPost } = this.props
    return (
      <div>

        <form onSubmit={this.props.postdispatch} className='create-contact-form'>
          <div className='create-contact-details'>
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              placeholder='Title'
             />
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
            <select value={this.state.category} onChange={this.handleSelectChange}>
              {this.props.categories.map(category => (
                <option value={category.name} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <button>Create Post</button>
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
export default connect(mapStateToProps)(PostForm)
