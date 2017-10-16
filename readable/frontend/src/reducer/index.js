import { combineReducers } from 'redux'
import { categories } from './category';
import { comments, createComment, detailComment } from './comment';
import { posts, deletePost, post, createPost, fetchCategoryPosts} from './post';

export default combineReducers({
  categories,
  posts,
  createPost,
  deletePost,
  fetchCategoryPosts,
  post,
  comments,
  createComment,
  detailComment
});
