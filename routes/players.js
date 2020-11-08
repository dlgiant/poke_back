const express = require("express");
const router = express.Router();
let battles = require("../dummyDb");

router.get("/list", async (req, res) => {
  try {
    res.status(200).json({
      data: battles
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
    let battle = battles.find(battle => battle._id === id);
    res.status(200).json({
      data: battle
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occured",
      err
    });
  }
});

module.exports = router;
