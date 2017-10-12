import {
  ALL_POST,
  FILTER_POST,
  DELETE_POST,
  EDIT_POST,
  CREATE_POST,
  UPDATE_POST,
  DETAIL_POST,
  CATEGORY_POST,
  VOTE_UP_SORT
} from '../actions/post'

const initialPostState = {
  detailPost: {
    id: "",
    author: "",
    title: "",
    body: "",
    category: ""
  }
}
export function fetchPosts(state=[], action) {
  switch (action.type) {
    case ALL_POST:
      return action.posts
    case CATEGORY_POST:
      return action.posts
    case VOTE_UP_SORT:
      return Object.assign({}, {
      posts: action.sortedPost })
    default:
      return state
  }
}

export function detailPost(state=[], action) {
  switch (action.type) {
    case DETAIL_POST:
      return action.post
    default:
      return state
  }
}

export function createPost(state=[], action) {
  switch (action.type) {
    case CREATE_POST:
      return action.posts
    default:
      return state
  }
}

export function fetchCategoryPosts(state=[], action) {
  switch (action.type) {
    case FILTER_POST:
      return action.posts
    default:
      return state
  }
}

export function deletePost(state=[], action) {
  switch (action.type) {
    case DELETE_POST:
      return action.posts
    default:
      return state
  }
}
