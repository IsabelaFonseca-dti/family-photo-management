export const API_ROUTES = {
  GET_USERS: "/users",
};

export const API = {
  DEFAULT_CONFIG: {
    baseURL: process.env.VITE_API_LOCAL_RUNNING
      ? `${process.env.VITE_API_HOST || "http://localhost:3000"}`
      : `${process.env.VITE_API_PUBLISHED_HOST || "http://localhost:3000"}`,
    timeout: 30000,
    headers: {},
  },
};
