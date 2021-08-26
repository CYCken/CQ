const express = require("express");
const router = express.Router();
const WeaponOwnController = require("../controllers/weapon_own");

router.get("/:weaponId", WeaponOwnController.get_one);

router.post("/", WeaponOwnController.create_weapon);

router.delete("/:weaponId", WeaponOwnController.delete_one);

router.patch("/:weaponId", WeaponOwnController.update_one);

module.exports = router;
