module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd33256a65a95edc61f6198fb6c57ccf6'),
  },
});
