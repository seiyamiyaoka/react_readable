import {
  COMMENT_INDEX,
  CREATE_COMMENT,
  SHOW_COMMENT,
  DETAIL_COMMENT
} from '../actions/comment'

const initComment = {
  body: "",
  author: "",
  id: "",
  timestamp: null
}

export function comments(state=[], action) {
  switch (action.type) {
    case COMMENT_INDEX:
      return action.comments
    default:
      return state
  }
}

export function createComment(state=[], action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return action.comment
    default:
      return state
  }
}

export function detailComment(state=[], action) {
  switch (action.type) {
    case DETAIL_COMMENT:
      return action.comment
    default:
      return state
  }
}
