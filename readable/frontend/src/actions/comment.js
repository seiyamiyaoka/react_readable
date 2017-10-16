export const COMMENT_INDEX = "COMMENT_INDEX"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const COMMENT_ERROR = "COMMENT_ERROR"
export const SHOW_COMMENT = "SHOW_COMMENT"
export const DETAIL_COMMENT = "DETAIL_COMMENT"

const url = `${process.env.REACT_APP_BACKEND}`

export function fetchPostComments(id) {
  return dispatch => {
    return fetch(`${url}/posts/${id}/comments`, {headers: {'Authorization': 'test123'}})
    .then(res => res.json())
    .then(json => {dispatch(receivePosts(json))})
    .catch(function (error){
      console.log(`${error}`);
      dispatch(commentErrored(true))
    })
  }
}

export function createComment(comment) {
  // 作成するresposneで何を受け取るか確認
  const id = comment.parentId
  return dispatch => {
    return fetch(`${url}/comments`, {method: 'POST', body: JSON.stringify(comment), headers: { 'Content-Type': 'application/json', 'Authorization': 'test123'}})
    .then(() => {
      dispatch(fetchPostComments(id))
    })
  }
}

export function deleteComment(id) {
  const postId = id
  return dispatch => {
    return fetch(`${url}/comments/${id}`, {method: 'DELETE', headers: {'Authorization': 'test123'}})
    .then(() => {
      dispatch(fetchPostComments(postId))
    })
  }
}

export function editComment(id) {
  // debugger
  return dispatch => {
    return fetch(`${url}/comments/${id}`, {headers: {'Authorization': 'test123'}})
    .then(res => res.json())
    .then(json => dispatch(detailComment(json)))
  }
}

export function updateComment(comment) {
  // commentのidを取得
  // commentの内容をjsonに変換
  // let targetComment = Object.assign({}, {
  //   body: comment.body
  // })
  const parentId = comment.parentId
  return dispatch => {
    return fetch(`${url}/comments/${comment.id}`, {method: 'PUT', body: JSON.stringify({body: comment.body}), headers: {'Content-Type': 'application/json', 'Authorization': 'test123'}})
    .then(() => {
      dispatch(fetchPostComments(parentId))
    })
  }
}

export function detailComment(comment) {
  return {
    type: DETAIL_COMMENT,
    comment
  }
}

function receivePosts(comments) {
    return {
    type: COMMENT_INDEX,
    comments
  }
}

function commentErrored(bool) {
    return {
        type: COMMENT_ERROR,
        hasErrored: bool
    };
}

function showComment(comments) {
  return {
    type: SHOW_COMMENT,
    comments
  }
}
