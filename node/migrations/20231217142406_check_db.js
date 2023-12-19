// check_db.js
exports.up = async function (knex) {
  const databaseExists = await knex.raw(
    `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'nodedb'`
  );

  if (!databaseExists.length) {
    console.log("O banco de dados não existe. Criando...");

    await knex.raw(`CREATE DATABASE nodedb`);
    await knex.raw(`USE nodedb`);

    console.log("Banco de dados criado com sucesso.");
  } else {
    console.log("O banco de dados já existe.");
  }

  const tableExists = await knex.schema.hasTable("people");

  if (!tableExists) {
    console.log("A tabela não existe. Criando...");

    await knex.schema.createTable("people", function (table) {
      table.increments("id").primary();
      table.string("name");
    });

    console.log("Tabela criada com sucesso.");
  } else {
    console.log("A tabela já existe.");
  }
};

exports.down = async function (knex) {};
