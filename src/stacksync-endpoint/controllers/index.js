export const status = (req, res) => {
  res.status(200).json({ status: 'active' });
};
