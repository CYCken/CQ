const express = require("express");
const router = express.Router();
const OccupationController = require("../controllers/occupation");

router.get("/", OccupationController.get_all);
router.get("/:occupation", OccupationController.get_one);

router.post("/", OccupationController.create_occupation);

router.delete("/:occupation", OccupationController.delete_occupation);

router.patch("/:occupation/heros", OccupationController.delete_heros);
router.patch("/:occupation", OccupationController.create_heros);

module.exports = router;
