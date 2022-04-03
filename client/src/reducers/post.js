// eslint-disable-next-line import/no-anonymous-default-export
export default function (posts = [], action) {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'UPDATE':
    case 'LIKES':
      return posts.map((post)=> post._id === action.payload._id ? action.payload : post);
    case 'DELETE':
      return posts.map((post)=> post._id !== action.payload)
    case 'CREATE':
      return [...posts, action.payload];
    default:
      return posts;
  }
}