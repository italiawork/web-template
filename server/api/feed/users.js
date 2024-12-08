const { getUsers } = require('../../api-util/userService');

module.exports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 100;

    const { items, meta } = await getUsers(page, perPage);

    res.status(200).json({
      items,
      meta,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);

    res.status(500).json({
      error: 'Failed to fetch user data',
    });
  }
};
