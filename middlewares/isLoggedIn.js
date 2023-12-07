
const isLoggedIn = (req, res, next) => {
    const authToken = req.headers.authorization;

  
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized - User not logged in' });
    }
    next();
  };
  
  module.exports = isLoggedIn;
  