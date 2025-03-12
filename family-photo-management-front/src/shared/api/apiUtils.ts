export const API_ROUTES = {
  GET_USERS: '/users',
  GET_ALBUMS_BY_USER: '/users/{userId}/albums',
  GET_PHOTOS_BY_ALBUM: '/albums/{albumId}/photos',
  DELETE_ALBUMS: '/albums/{albumId}',
  DELETE_PHOTO: '/photos/{photoId}',
  POST_ALBUM: '/albums',
  POST_PHOTO: '/photos',
};

export const API = {
  DEFAULT_CONFIG: {
    baseURL: `${'http://localhost:3000'}`,
    timeout: 30000,
    headers: {},
  },
};
