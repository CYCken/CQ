const express = require("express");
const router = express.Router();
const WeaponSugController = require("../controllers/weapon_suggest");

router.get("/:weaponId", WeaponSugController.get_one);

router.post("/", WeaponSugController.create_weapon);

router.delete("/:weaponId", WeaponSugController.delete_one);

router.patch("/:weaponId", WeaponSugController.update_one);

module.exports = router;
