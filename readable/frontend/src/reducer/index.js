import { combineReducers } from 'redux'
import { fetchCategory, receiveCategory} from './category';
import { fetchComment, createComment, detailComment } from './comment';
import { fetchPosts, deletePost, detailPost, createPost, fetchCategoryPosts} from './post';

export default combineReducers({
  fetchCategory,
  fetchPosts,
  createPost,
  deletePost,
  fetchCategoryPosts,
  detailPost,
  fetchComment,
  createComment,
  detailComment
});
