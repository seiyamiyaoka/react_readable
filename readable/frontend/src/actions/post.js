export const ALL_POST = "ALL_POST"
export const DETAIL_POST = "DETAIL_POST"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const FILTER_POST = "FILTER_POST"
export const CREATE_POST = "CREATE_POST"
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS"
export const DELETE_POST = "DELETE_POST"
export const EDIT_POST = "EDIT_POST"
export const UPDATE_POST = "UPDATE_POST"
export const CATEGORY_POST = "CATEGORY_POST"
export const VOTE_UP_SORT = "VOTE_UP_SORT"
export const NOT_FOUND = "NOT_FOUND"

const url = `${process.env.REACT_APP_BACKEND}`

export function requestPosts(posts) {
  return {
    type: ALL_POST,
    posts
  }
}

export function fetchPosts(posts) {
  return dispatch => {
    return fetch(`${url}/posts`, {headers: {'Authorization': 'test123'}})
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
  }
}

export function fetchCategoryPosts(category) {
  return dispatch => {
    return fetch(`${url}/${category}/posts`, {headers: {'Authorization': 'test123'}})
    .then(res => res.json())
    .then(json => {
      dispatch(receiveCategoryPost(json))})
  }
}

export function createPost(post) {
  // debugger
  return dispatch => {
    return fetch(`${url}/posts`, {method: 'POST', body: JSON.stringify(post),  headers: { 'Content-Type': 'application/json', 'Authorization': 'test123'}})
    .then(response => {response.json()})
    .then(json => {
      dispatch(fetchPosts(json))})
  }
}
  export function deletePost(id) {
    return dispatch => {
      return fetch(`${url}/posts/${id}`, {method: 'DELETE', headers: {'Authorization': 'test123'}})
      .then(() => {
        dispatch(fetchPosts())
      })
    }
  }

  export function detailPost(id) {
    return dispatch => {
      return fetch(`${url}/posts/${id}`, {headers: {'Authorization': 'test123'}})
      .then(res => res.json())
      .then(post => {
        post.id === undefined ? dispatch(notFound())
                              : dispatch(oneReceivePost(post))

      })
    }
  }

export function updateVote(id, voteResult) {
  return dispatch => {
    return fetch(`${url}/posts/${id}`, {method: 'POST', body: JSON.stringify({ option: voteResult }), headers: {'Content-Type':'application/json', 'Authorization':'test123'}})
    .then(() => {
      dispatch(fetchPosts())
    })
  }
}

export function updatePost(post) {
  return dispatch => {
    return fetch(`${url}/posts/${post.id}`, {method: 'PUT', body: JSON.stringify({...post}), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'test123'}})
    .then(res => res.json())
    .then(dispatch(fetchPosts(post)))
  }
}

export function voteSort(sortType, state) {
  let sortedPost;
  sortedPost = state
    return {
      type: VOTE_UP_SORT,
      sortedPost
    }
}

function oneReceivePost(post) {
  return {
    type: DETAIL_POST,
    post
  }
}

function receiveCategoryPosts(post) {
  return {
    type: RECEIVE_CATEGORY_POSTS,
    post
  }
}

function receivePosts(posts) {
  return {
    type: ALL_POST,
    posts
  }
}

function receiveCategoryPost(posts) {
  return {
    type: CATEGORY_POST,
    posts
  }
}

function notFound() {
  return {
    type: NOT_FOUND
  }
}
