const { Parser } = require('json2csv');

const generateCSV = (data, fields) => {
  const parser = new Parser({
    fields,
  });
  
  return parser.parse(data);
}

module.exports = { generateCSV };
