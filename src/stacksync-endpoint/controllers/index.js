/**
 * Handles the status endpoint, indicating whether the endpoint is active.
 *
 * @param {Object} req - Express.js request object.
 * @param {Object} res - Express.js response object.
 * @returns {void}
 */
export const status = (req, res) => {
  res.status(200).json({ status: true, message: 'endpoint is active' });
};
