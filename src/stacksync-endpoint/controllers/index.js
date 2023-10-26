export const status = (req, res) => {
  res.status(200).json({ status: true, message: 'endpoint is active' });
};
