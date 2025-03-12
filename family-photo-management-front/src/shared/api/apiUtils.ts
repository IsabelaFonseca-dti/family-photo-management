export const API_ROUTES = {
  GET_USERS: '/users',
  GET_ALBUMS_BY_USER: '/users/{userId}/albums',
  DELETE_ALBUMS: '/albums/{albumId}',
  POST_ALBUM: '/albums',
};

export const API = {
  DEFAULT_CONFIG: {
    baseURL: import.meta.env.VITE_API_LOCAL_RUNNING
      ? `${import.meta.env.VITE_API_HOST || 'http://localhost:3000'}`
      : `${import.meta.env.VITE_API_PUBLISHED_HOST || 'http://localhost:3000'}`,
    timeout: 30000,
    headers: {},
  },
};
