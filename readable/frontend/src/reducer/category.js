import { ALL_CATEGORY } from '../actions/category'

export function categories(state=[], action) {

  switch (action.type) {
    case ALL_CATEGORY:
      return action.categories.categories
    default:
      return state
  }
}
