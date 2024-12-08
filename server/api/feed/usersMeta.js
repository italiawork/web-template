const { getUsers } = require('../../api-util/userService');
const { generateCSV } = require('../../api-util/csvExporter');

module.exports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 100;
    const { items } = await getUsers(page, perPage);
    const fields = ['image', 'name', 'url'];
    const csv = generateCSV(items, fields);

    res
      .header('Content-Type', 'text/csv')
      .attachment('feed.csv')
      .send(csv);
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    res.status(500).json({
      error: 'Failed to fetch user data',
    });
  }
};
