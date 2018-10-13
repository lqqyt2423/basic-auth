'use strict';

/**
 * the basic auth middleware for express
 *
 * @param {string} user
 * @param {string} password
 *
 * @return {function} express middleware
 */
function basicAuth(user, password) {
  return (req, res, next) => {
    const headers = req.headers;
    const respondAuth = () => {
      res.status(401);
      res.append('WWW-Authenticate', 'Basic');
      res.end();
    };
    if (!headers.authorization) return respondAuth();

    let auth = headers.authorization.replace('Basic ', '');
    auth = new Buffer(auth, 'base64').toString();
    if (auth !== `${user}:${password}`) return respondAuth();

    next();
  };
}

module.exports = basicAuth;
