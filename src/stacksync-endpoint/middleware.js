/**
 * Middleware function to check if the user has admin privileges.
 * If the user is not an admin, it sends a 403 Forbidden response.
 *
 * @function
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @param {Function} next - Express.js next middleware function.
 * @returns {void}
 */
export default function auth(req, res, next) {
  if (req.accountability?.admin === false) {
    return res.status(403).json({
      status: false,
      message: "You don't have permission to access this.",
    });
  }
  next();
}
