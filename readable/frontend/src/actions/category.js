export const ALL_CATEGORY = 'ALL_CATEGORY'
export const REQUEST_CATEGORY = 'REQUEST_CATEGORY'
const url = `${process.env.REACT_APP_BACKEND}`

export function receiveCategory(categories) {
  return {
    type: ALL_CATEGORY,
    categories
  }
}

export function indexCategory(categories) {
  return {
    type: REQUEST_CATEGORY,
    categories
  }
}

export function fetchCategory() {
  return dispatch => {
    return fetch(`${url}/categories`, {headers: {'Authorization':'test123'}})
      .then(res => res.json())
      .then(json => dispatch(receiveCategory(json)))
  }
}
