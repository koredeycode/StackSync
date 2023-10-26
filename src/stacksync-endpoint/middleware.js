export default function auth(req, res, next) {
  if (req.accountability?.admin === false) {
    return res.status(403).json({
      status: false,
      message: "You don't have permission to access this.",
    });
  }
  next();
}
