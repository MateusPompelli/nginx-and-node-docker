const express = require("express");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");

const insertQuery = `INSERT INTO people(name) VALUES('tomewhere')`;

app.get("/", (req, res) => {
  const selectQuery = `SELECT * FROM people`;
  const connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return res.status(500).send("Erro interno no servidor");
    }

    connection.query(insertQuery, (err, results) => {
      if (err) {
        console.error("Erro ao inserir dados no banco de dados:", err);
      } else {
        console.log("Dados inseridos no banco de dados com sucesso");
      }

      connection.query(selectQuery, (err, results) => {
        connection.end();
        if (err) {
          console.error("Erro ao buscar dados no banco de dados:", err);
          return res.status(500).send("Erro interno no servidor");
        }

        const names = results.map((result) => result.name).join(", ");
        res.send(
          `<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrados: ${names}</p>`
        );
      });
    });
  });
});

app.listen(port, () => {
  console.log("Escutando na porta " + port);
});
