module.exports = (res, data) => {
  res.cookie('logintoken', JSON.stringify(data), {
    expires: new Date(Date.now() + 2 * 604800000),
    path: '/'
  });
};
