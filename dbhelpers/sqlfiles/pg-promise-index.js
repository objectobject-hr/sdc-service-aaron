const { QueryFile } = require("pg-promise");
const path = require("path");

// module.exports = {
//   dates: {
//     create: sql("./dates.sql")
//   },
//   listings: {
//     create: sql("./listings.sql")
//   }
// };

function sql(fullPath) {
  // const fullPath = path.join(__dirname, file); // generating full path

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true

    // See also property 'params' for two-step template formatting
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

module.exports = sql;
