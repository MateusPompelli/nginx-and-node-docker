// knexfile.js
module.exports = {
  client: "mysql",
  connection: {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};
