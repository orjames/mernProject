exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://orj-mern-project.herokuapp.com/'
    : 'http://localhost:3000';
