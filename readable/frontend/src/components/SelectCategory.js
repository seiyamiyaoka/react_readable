import React, { Component } from 'react'
export default class SelectCategory extends Component {
  state = {
    voteHigh: "voteHigh",
    voteLow: "voteLow",
    timeStampHigh: "timeHigh",
    timeStampLow: "timeLow",
    posts: []
  }

  // handleChange = (e) => {
  //   this.setState({category: e.target.value})
  // }
  componentWillReceiveProps(nextProps) {
    // debugger
    this.state.posts = nextProps.posts
  }

  render() {
    return(
      <div className="_select_search">
      <span>
        <select value={this.state.category} onChange={this.props.handleSelect}>
        　　<option value="moveTo" disabled>Move to...</option>
            {this.props.categories.map(category => (

              <option value={category.name} key={category.name}>
                {category.name}
              </option>
            ))}
        </select>

        <select value="selectTo" onChange={(e) => this.props.vortSort(e, this.state.posts)}>
          <option value="selectTo" disabled>select to...</option>
          <option value={this.state.voteHigh}>
            {this.state.voteHigh}
          </option>
          <option value={this.state.voteLow}>
            {this.state.voteLow}
          </option>

          <option value={this.state.timeStampHigh}>
            {this.state.timeStampHigh}
          </option>
          <option value={this.state.timeStampLow}>
            {this.state.timeStampLow}
          </option>
        </select>
      </span>
      </div>
    )
  }
}
//
// function SelectCategory(dispatch) {
//   return
// }
//
// export default connect(null, mapDispatchToProps)(SelectCategory)
