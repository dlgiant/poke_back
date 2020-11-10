const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

router.get("/list", async (req, res) => {
  try {
    let db = new sqlite3.Database('./sample.db');
    let sql = `SELECT * FROM battles`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        data: rows
      });
    });

  } catch (err) {
    res.status(400).json({
      message: "An error occured",
      err
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    let db = new sqlite3.Database('./sample.db');
    let sql = `SELECT * FROM battles WHERE id = ?`;
    db.get(sql, [id], (err, battle) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        data: battle
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured",
      err
    });
  }
});

router.get("/wins/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let db = new sqlite3.Database('./sample.db');
    let sql = `SELECT count(winner) as C FROM battles WHERE winner = ?`;
    db.get(sql, [name], (err, battle) => {
      if (err) {
        throw err;
      }
      console.log(battle);
      res.status(200).json({
        wins: battle.C
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured",
      err
    });
  }
});

router.get("/losses/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let db = new sqlite3.Database('./sample.db');
    let sql = `SELECT count(loser) as C FROM battles WHERE loser = ?`;
    db.get(sql, [name], (err, battle) => {
      if (err) {
        throw err;
      }
      console.log(battle);
      res.status(200).json({
        losses: battle.C
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured",
      err
    });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let db = new sqlite3.Database('./sample.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to database");
  });

  const sql = `INSERT INTO battles (winner, loser) VALUES (?, ?)`
  db.run(sql, [req.body.winner, req.body.loser], function(err){
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closing database connection');
  });
});

module.exports = router;
