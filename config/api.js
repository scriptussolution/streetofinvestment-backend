module.exports = ({env}) => ({
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  // baseURL: env('BACKEND_URL', 'http://localhost:1337')
});
