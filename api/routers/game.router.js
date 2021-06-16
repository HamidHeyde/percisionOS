var express = require('express');
var gameController = require('../controllers/game.controller');

const router = new express.Router();

//Authentication
router.route("/getGame").get(gameController.getGame);
router.route("/getAllGames").get(gameController.getAllGames);
router.route("/addGame").post(gameController.addGame);
router.route("/updateGame").put(gameController.updateGame);
router.route("/deleteGame").delete(gameController.deleteGame);


module.exports = router;
