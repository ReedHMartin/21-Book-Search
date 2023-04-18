const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via req.query, headers or cookies
    let token = req.query.token || req.headers.authorization || req.cookies.token;

    // Check for the token in the cookie, and set it in the header for requests that do not have it set
    if (req.cookies.token && !req.headers.authorization) {
      req.headers.authorization = `Bearer ${req.cookies.token}`;
      token = req.cookies.token;
    }

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token:', err);
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    next();
  },

  // function to sign a JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // sign the JWT token with the payload and secret, and set expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};