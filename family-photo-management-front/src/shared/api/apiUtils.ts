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
    baseURL:
      import.meta.env.VITE_API_LOCAL_RUNNING === 'true'
        ? import.meta.env.VITE_API_LOCALHOST || 'http://localhost:3000'
        : import.meta.env.VITE_API_PUBLISHED_HOST,
    timeout: 30000,
    headers: {},
  },
};
