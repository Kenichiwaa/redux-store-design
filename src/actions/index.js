import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // same thing as above
    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value()
};

export const fetchPosts = () => 
    async dispatch => {
        const response = await jsonPlaceholder.get('/posts')

        dispatch({type: "FETCH_POSTS", payload: response.data})
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type: "FETCH_USER", payload: response.data})
};

// using lodash memoize to check it data is only called once if same data is called multiple times
// export const fetchUser = (id) => async dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({type: "FETCH_USER", payload: response.data})
// })